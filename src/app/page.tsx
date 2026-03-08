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
    return <HomeComponent country="us" />;
}
