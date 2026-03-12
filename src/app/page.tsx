import HomeComponent from "@/components/HomeComponent";
import { getOrganizationSchema, getSoftwareApplicationSchema } from "@/data/structured-data";

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
                        getOrganizationSchema(),
                        getSoftwareApplicationSchema()
                    ])
                }}
            />
            <HomeComponent country="us" />
        </>
    );
}
