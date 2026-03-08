import HomeComponent from "@/components/HomeComponent";

export const dynamicParams = true; // allow other countries to be passed if needed

// Static paths for IN and ID
export function generateStaticParams() {
    return [{ country: 'in' }, { country: 'id' }];
}

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }) {
    const resolvedParams = await params;
    const country = resolvedParams.country.toLowerCase();

    // Custom metadata for India
    if (country === 'in') {
        return {
            title: "MochaEase India - Smart POS & Retail Management",
            description: "Manage your cafes and retail stores in India with MochaEase. AI-powered POS and inventory management.",
            alternates: {
                canonical: `https://mochaease.com/in`,
            }
        };
    }

    // Custom metadata for Indonesia
    if (country === 'id') {
        return {
            title: "MochaEase Indonesia - Smart POS & Retail Management",
            description: "Manage your cafes and retail stores in Indonesia with MochaEase. AI-powered POS and inventory management.",
            alternates: {
                canonical: `https://mochaease.com/id`,
            }
        };
    }

    return {
        title: `MochaEase ${country.toUpperCase()} - Smart POS`,
    };
}

export default async function CountryHome({ params }: { params: Promise<{ country: string }> }) {
    const resolvedParams = await params;
    return <HomeComponent country={resolvedParams.country} />;
}
