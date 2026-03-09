/**
 * JSON-LD Structured Data for SEO
 * Provides rich snippets for Google search results
 */

export function getOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'MochaEase',
        legalName: 'MochaEase Tech Private Limited',
        url: 'https://mochaease.com',
        logo: 'https://mochaease.com/icon',
        description: 'Enterprise-grade, AI-powered POS and business management platform for cafes, restaurants, retail, and enterprise chains.',
        foundingDate: '2024',
        contactPoint: {
            '@type': 'ContactPoint',
            email: 'support@mochaease.com',
            contactType: 'customer support',
            availableLanguage: ['English', 'Hindi', 'Indonesian'],
        },
        sameAs: [
            'https://www.youtube.com/@MochaEase',
            'https://www.instagram.com/mochaeasetech',
            'https://www.linkedin.com/company/mochaease/',
        ],
    };
}

export function getSoftwareApplicationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'MochaEase',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web, Android, iOS',
        description: 'AI-powered POS platform with inventory management, CRM, staff scheduling, and franchise management.',
        offers: [
            {
                '@type': 'Offer',
                name: 'MochaLite',
                price: '19',
                priceCurrency: 'USD',
                description: 'For single-location cafes & shops',
            },
            {
                '@type': 'Offer',
                name: 'MochaCore',
                price: '29',
                priceCurrency: 'USD',
                description: 'For growing multi-outlet brands',
            },
            {
                '@type': 'Offer',
                name: 'MochaMax',
                price: '49',
                priceCurrency: 'USD',
                description: 'For enterprise retail chains',
            },
        ],
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            ratingCount: '150',
            bestRating: '5',
        },
    };
}

export function getFAQSchema(faqs: { question: string; answer: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };
}

export function getBlogPostSchema(post: {
    title: string;
    description: string;
    slug: string;
    publishedAt: string;
    author?: string;
    image?: string;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        url: `https://mochaease.com/blog/${post.slug}`,
        datePublished: post.publishedAt,
        author: {
            '@type': 'Organization',
            name: post.author || 'MochaEase',
        },
        publisher: {
            '@type': 'Organization',
            name: 'MochaEase',
            logo: { '@type': 'ImageObject', url: 'https://mochaease.com/icon' },
        },
        image: post.image || 'https://mochaease.com/blog/blog_ai_inventory_1773002441722.png',
    };
}
