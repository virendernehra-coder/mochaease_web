import HomeComponent from "@/components/HomeComponent";

export const metadata = {
    title: "MochaEase - Smart POS & Management",
    description: "The all-in-one, AI-powered POS platform built for modern businesses across every vertical.",
    alternates: {
        canonical: 'https://mochaease.com',
        languages: {
            'en-US': 'https://mochaease.com',
            'en-IN': 'https://mochaease.com/in',
            'en-ID': 'https://mochaease.com/id',
        },
    },
};

export default function Home() {
    return (
        <>
            {/* Structured Data (JSON-LD) */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([
                        {
                            '@context': 'https://schema.org',
                            '@type': 'Organization',
                            'name': 'MochaEase',
                            'url': 'https://mochaease.com',
                            'logo': 'https://mochaease.com/logo.png',
                            'sameAs': [
                                'https://twitter.com/mochaease',
                                'https://linkedin.com/company/mochaease'
                            ],
                            'contactPoint': {
                                '@type': 'ContactPoint',
                                'telephone': '+91-XXXXXXXXXX',
                                'contactType': 'customer service',
                                'email': 'hello@mochaease.com',
                                'areaServed': 'Global',
                                'availableLanguage': 'en'
                            }
                        },
                        {
                            '@context': 'https://schema.org',
                            '@type': 'WebSite',
                            'name': 'MochaEase',
                            'url': 'https://mochaease.com',
                            'potentialAction': {
                                '@type': 'SearchAction',
                                'target': 'https://mochaease.com/search?q={search_term_string}',
                                'query-input': 'required name=search_term_string'
                            }
                        }
                    ])
                }}
            />
            <HomeComponent country="us" />
        </>
    );
}
