import { getPricingPlans } from '@/utils/supabase/queries';
import PricingClient from './PricingClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Pricing | MochaEase',
    description: 'Simple, transparent pricing. Start free, scale infinitely with MochaEase point of sale and restaurant management software.',
};

// Revalidate pricing data every hour (3600 seconds) 
// or use 'force-dynamic' if it needs to be instantly fresh on every hard reload
export const revalidate = 3600;

export default async function PricingPage() {
    // Fetch the latest pricing directly from Supabase server-side
    const plans = await getPricingPlans();

    return <PricingClient initialPlans={plans} />;
}
