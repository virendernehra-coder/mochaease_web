import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SOLUTIONS, getSolutionBySlug } from '@/data/solutions';
import { CONTENT } from '@/data/experience';
import SolutionPageContent from '@/components/SolutionPageContent';
import { createStaticClient } from '@/utils/supabase/static';
import { BlogPostSummary } from '@/app/blog/BlogClient';
import { BLOG_POSTS } from '@/data/blog';

export const revalidate = 3600; // Cache for 1 hour

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return SOLUTIONS.map((solution) => ({
        slug: solution.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const solution = getSolutionBySlug(slug);

    if (!solution) return {};

    return {
        title: solution.metaTitle,
        description: solution.metaDescription,
        alternates: {
            canonical: `https://mochaease.com/solutions/${slug}`,
        },
        openGraph: {
            title: solution.metaTitle,
            description: solution.metaDescription,
            type: 'website',
            url: `https://mochaease.com/solutions/${slug}`,
        },
    };
}

const STATIC_POSTS: BlogPostSummary[] = BLOG_POSTS.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    featured_image: p.coverImage,
    category: p.category,
    read_time: p.readTime,
    published_at: new Date(p.date).toISOString(),
    author: p.author,
}));

async function getRelevantBlogs(tag: string): Promise<BlogPostSummary[]> {
    try {
        const supabase = createStaticClient();
        const { data, error } = await supabase
            .from('blog_translations')
            .select(`
                id,
                slug_localized,
                title,
                excerpt,
                published_at,
                blogs!inner (
                    id,
                    canonical_slug,
                    featured_image,
                    author,
                    tags
                )
            `)
            .eq('language_code', 'en')
            .eq('is_published', true)
            .order('published_at', { ascending: false })
            .limit(10); // Get more to filter locally by tag if needed, or query specifically

        if (!error && data && data.length > 0) {
            const allPosts: BlogPostSummary[] = data.map((t) => {
                const blog = Array.isArray(t.blogs) ? t.blogs[0] : t.blogs;
                const tags = (blog as { tags?: string[] })?.tags ?? [];
                const category = tags[0] ?? 'Product Updates';

                return {
                    id: t.id,
                    slug: t.slug_localized,
                    title: t.title,
                    excerpt: t.excerpt ?? '',
                    featured_image: (blog as { featured_image?: string })?.featured_image ?? null,
                    category,
                    read_time: '5 min read',
                    published_at: t.published_at ?? new Date().toISOString(),
                    author: (blog as { author?: string })?.author ?? 'MochaEase Team',
                };
            });

            // Filter by tag case-insensitively
            const filtered = allPosts.filter(p => 
                p.category.toLowerCase().includes(tag.toLowerCase()) || 
                p.title.toLowerCase().includes(tag.toLowerCase())
            );
            
            return filtered.slice(0, 3);
        }
    } catch (err) {
        console.warn('Supabase fetch failed for solution blogs:', err);
    }

    // Fallback to static posts
    return STATIC_POSTS
        .filter(p => p.category.toLowerCase().includes(tag.toLowerCase()) || p.title.toLowerCase().includes(tag.toLowerCase()))
        .slice(0, 3);
}

export default async function Page({ params }: Props) {
    const { slug } = await params;
    const solution = getSolutionBySlug(slug);

    if (!solution) {
        notFound();
    }

    const originalIndustryContent = CONTENT[solution.id as Exclude<typeof solution.id, null>];
    
    // Transform industry content to be serializable (replace Icon components with names)
    const industryContent = {
        ...originalIndustryContent,
        steps: originalIndustryContent.steps.map(step => ({
            ...step,
            iconName: step.icon.displayName || step.icon.name || 'Zap',
            icon: undefined // Remove the function
        }))
    };

    const relevantBlogs = await getRelevantBlogs(solution.blogTag);

    return (
        <SolutionPageContent 
            solution={solution} 
            industryContent={industryContent as any}
            relevantBlogs={relevantBlogs}
        />
    );
}
