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

export type PayrollReport = {
    payroll_business_id: string;
    payroll_outlet_id: string;
    employee_id: string;
    payroll_start: string;
    payroll_end: string;
    pay_day: string;
    employee_name: string;
    base_salary: number | null;
    earned_base_salary: number;
    employee_bonus: number | null;
    calculated_variable_pay: number;
    overtime_pay: number;
    undertime_deduction: number;
    gross_salary: number;
    income_tax: number;
    total_advance_payment: number;
    net_salary: number;
    country_code: string;
    hourly_rate: number;
    expected_total_working_hours: number;
    total_actual_worked_hours: number;
    overtime_or_undertime_hours: number;
    total_sales_target: number;
    actual_total_sales: number;
    is_current_period: boolean;
};

export type EmployeeDetails = {
    id: number;
    created_at: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    business_id: string;
    business_name: string;
    role_id_employee: string;
    profile_pic: string;
    role_id_creator: string;
    employee_id: string;
    outlet_id: string;
    outlet_name: string;
    employee_fix_pay: number;
    employee_variable_pay: number;
    employee_bonus: number;
    daily_shift_status: boolean;
    backup_shift: boolean;
    weekly_off_days: number;
    preferred_shift: string;
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

export async function getUserProfile(userId: string) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is 'no rows found'
        console.error('Error fetching user profile:', error);
    }
    return data;
}

export async function getEmployeeProfile(userId: string) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('employee_details')
        .select('*')
        .eq('employee_id', userId)
        .single();

    if (error && error.code !== 'PGRST116') {
        console.error('Error fetching employee profile:', error);
    }
    return data;
}
