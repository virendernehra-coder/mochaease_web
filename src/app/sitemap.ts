import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
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
        '/experience',
        '/privacy',
        '/terms',
        '/cookie-policy',
        '/cancellation-and-refund',
        '/shipping-and-delivery',
    ];

    // Business type experience pages
    const businessTypes = [
        'cafe', 'qsr', 'full-service', 'bars', 'food-trucks', 'bakeries',
        'fashion', 'beauty', 'grocery', 'home', 'vape',
        'enterprise', 'multi-brand', 'stadiums',
    ];

    const staticEntries: MetadataRoute.Sitemap = staticPages.map((path) => ({
        url: `${baseUrl}${path}`,
        lastModified: new Date(),
        changeFrequency: path === '/blog' ? 'daily' : 'weekly',
        priority: path === '' ? 1.0 : path === '/pricing' ? 0.9 : 0.7,
    }));

    const businessEntries: MetadataRoute.Sitemap = businessTypes.map((type) => ({
        url: `${baseUrl}/experience?role=${type}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [...staticEntries, ...businessEntries];
}
