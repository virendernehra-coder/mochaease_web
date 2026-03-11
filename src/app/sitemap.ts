import type { MetadataRoute } from 'next';
import { createStaticClient } from '@/utils/supabase/static';
import { BLOG_POSTS } from '@/data/blog';
import { SOLUTIONS } from '@/data/solutions';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://mochaease.com';

    // Static pages
    const staticPages = [
        '',
        '/pricing',
        '/demo',
        '/about',
        '/contact',
        '/support',
        '/blog',
        '/calculator',
        '/guides',
        '/login',
        '/register',
        '/resources/hardware',
        '/solutions',
        '/privacy',
        '/terms',
        '/cookie-policy',
        '/cancellation-and-refund',
        '/shipping-and-delivery',
    ];

    const staticEntries: MetadataRoute.Sitemap = staticPages.map((path) => ({
        url: `${baseUrl}${path}`,
        lastModified: new Date(),
        changeFrequency: path === '/blog' ? 'daily' : 'weekly',
        priority: path === '' ? 1.0 : path === '/pricing' ? 0.9 : 0.7,
    }));

    // Dedicated Solution Pages
    const solutionEntries: MetadataRoute.Sitemap = SOLUTIONS.map((solution) => ({
        url: `${baseUrl}/solutions/${solution.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    // Dynamic blog posts from Supabase
    let blogEntries: MetadataRoute.Sitemap = [];
    
    try {
        const supabase = createStaticClient();
        const { data: blogPosts, error } = await supabase
            .from('blog_translations')
            .select('slug_localized, published_at')
            .eq('language_code', 'en')
            .eq('is_published', true);

        if (!error && blogPosts && blogPosts.length > 0) {
            blogEntries = blogPosts.map((post) => ({
                url: `${baseUrl}/blog/${post.slug_localized}`,
                lastModified: post.published_at ? new Date(post.published_at) : new Date(),
                changeFrequency: 'weekly' as const,
                priority: 0.8,
            }));
        } else if (error) {
            console.warn('Sitemap: Supabase fetch failed, falling back to static blog data:', error);
        }
    } catch (err) {
        console.warn('Sitemap: Could not fetch from Supabase, using static fallback:', err);
    }

    // Fallback to static blog data if Supabase fetch yielded nothing
    if (blogEntries.length === 0) {
        blogEntries = BLOG_POSTS.map((post) => ({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: new Date(post.date),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        }));
    }

    return [...staticEntries, ...solutionEntries, ...blogEntries];
}
