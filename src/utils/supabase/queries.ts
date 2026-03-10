import { createClient } from './server';

export type PricingPlan = {
    id: number;
    plan_name: string;
    billing_cycle: string;
    currency: string;
    price: number;
    discount_percent: number;
    trial_period_days: number;
    razorpay_plan_id: string | null;
    user_limit_per_outlet: number | null;
};

export async function getPricingPlans(): Promise<PricingPlan[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('plan_pricing')
        .select('*')
        .order('price', { ascending: true });

    if (error) {
        console.error('Error fetching pricing plans:', error);
        return [];
    }

    return data as PricingPlan[];
}
