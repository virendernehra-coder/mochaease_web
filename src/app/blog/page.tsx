import { createClient } from '@/utils/supabase/server';
import BlogClient, { BlogPostSummary } from './BlogClient';
import { BLOG_POSTS } from '@/data/blog';

export const revalidate = 0; // Always fetch fresh data from Supabase on every request

// Map static blog data to the same shape as Supabase data
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

export default async function BlogPage() {
    let posts: BlogPostSummary[] = STATIC_POSTS; // default to static

    try {
        const supabase = await createClient();

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
            .order('published_at', { ascending: false });

        if (!error && data && data.length > 0) {
            // Use live Supabase data only if we got real results
            posts = data.map((t) => {
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
        }
    } catch (err) {
        console.warn('Supabase fetch failed, using static blog data:', err);
    }

    return <BlogClient posts={posts} />;
}
