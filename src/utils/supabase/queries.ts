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

export type SalesPerformanceRecord = {
    idx: number;
    business_id: string;
    outlet_id: string | null;
    gross_sales: number;
    net_sales: number;
    canceled_sales_amount: number;
    total_items_sold: number;
    order_count: number;
    confirmed_orders: number;
    canceled_orders: number;
    total_expanses: number;
    payment_method_cash: number;
    online_order_sales: number;
    payment_method_edc: number;
    payment_method_digital_wallet: number;
    average_order_value: number;
};

export type HourlyPerformanceRecord = {
    idx: number;
    business_id: string;
    outlet_id: string | null;
    hour_of_day: number;
    avg_hourly_revenue: number;
    avg_hourly_orders: number;
    total_90d_orders: number;
};

export type DOWPerformanceRecord = {
    idx: number;
    business_id: string;
    outlet_id: string | null;
    dow_number: number;
    dow_name: string;
    total_sales_for_dow: number;
    net_sales_for_dow: number;
    total_items_sold_for_dow: number;
    total_orders_for_dow: number;
    total_confirmed_orders_for_dow: number;
    total_canceled_orders_for_dow: number;
    average_order_value_for_dow: number;
};

export type DailyTrendRecord = {
    idx: number;
    sale_date: string;
    business_id: string;
    outlet_id: string | null;
    total_sales: number;
};

export type ProductPerformance = {
    business_id: string;
    outlet_id: string | null;
    product_name: string;
    total_quantity: number;
    total_price: number;
    net_sales: number;
    gross_profit: number;
};

export type NetProfitPerformance = {
    business_id: string;
    outlet_id: string | null;
    net_sales: number;
    total_cogs: number;
    gross_profit: number;
    total_opex: number;
    true_net_profit: number;
    gross_margin_pct: number;
};

export type ElitePerformanceRecord = {
    idx: number;
    business_id: string;
    outlet_id: string | null;
    product_name: string;
    current_qty: number;
    current_net_sales: number;
    growth_pct: string;
    product_classification: 'Star' | 'Cash Cow' | 'Rising Star' | 'Dog';
};

export type CategoryPerformanceRecord = {
    idx: number;
    business_id: string;
    outlet_id: string | null;
    category_name: string;
    total_qty: number;
    net_sales: number;
    sales_share_pct: string;
    estimated_category_profit: string;
};

export type CategoryTrendRecord = {
    idx: number;
    business_id: string;
    outlet_id: string | null;
    category_name: string;
    net_sales: number;
    growth_pct: number;
    avg_unit_price: number;
    margin_pct: number;
};

export type Recommendation = {
    id: string;
    category: string;
    recommendation_text?: string;
    text?: string;
    created_at: string;
};

export type HealthSummary = {
    business_id: string;
    outlet_id?: string | null;
    overall_score: number | string;
    financial_score: number | string;
    operational_score: number | string;
    workforce_score: number | string;
    customer_score: number | string;
    recommendations: Recommendation[];
    financial_recs?: string | Recommendation[];
    operational_recs?: string | Recommendation[];
    workforce_recs?: string | Recommendation[];
    customer_recs?: string | Recommendation[];
    period_start_date: string;
    is_current_period: boolean;
    score_type: string;
};
export type Task = {
    id: number;
    business_id: string;
    outlet_id: string;
    title: string;
    description: string | null;
    status: 'todo' | 'in_progress' | 'review' | 'done' | 'cancelled';
    priority: 'low' | 'medium' | 'high' | 'critical';
    assigned_to_user_id: string | null;
    created_by_user_id: string | null;
    due_date: string | null;
    recommendation_reference_id: string | null;
    created_at: string;
    updated_at: string;
    employee_name: string | null;
};
export type InventoryStock = {
    idx: number;
    inventory_id: number;
    business_id: string;
    outlet_name: string;
    item_name: string;
    sku: string;
    base_unit_of_measure: string;
    current_stock: number | string;
    unit_cost: number | string;
    stock_value: number | string;
    suggested_category: string;
    consumption_30_days: number | string;
    orders_using_ingredient_30_days: number;
    avg_consumption_per_order: number | string;
    daily_consumption_rate: number | string;
    min_consumption_per_order: number | string;
    max_consumption_per_order: number | string;
    consumption_volatility: number | string;
    dependent_products: string;
    product_dependency_count: number;
    stock_status: string;
    stock_status_description: string;
    days_until_stockout: number | string;
    reorder_urgency: string;
    suggested_reorder_quantity: number | string;
    reorder_timing: string;
    reorder_cost: number | string;
    business_impact_level: string;
    stock_health_color: 'GREEN' | 'YELLOW' | 'RED';
    months_of_stock_remaining: number | string;
    safety_stock: number | string;
    reorder_point: number | string;
    economic_order_quantity: number | string;
    lead_time_days: number;
    max_stock_level: number | string;
    audit_adjustment_30_days: number | string;
    audit_value_30_days: number | string;
    audit_count_30_days: number;
    last_audit_date: string | null;
    expiry_date: string | null;
    expiry_status: string | null;
    days_until_expiry: number | null;
    expiring_quantity: number;
    expired_quantity: number;
    disposed_quantity: number;
    expired_value: number | string;
    disposed_value: number | string;
    total_loss_value_30_days: number | string;
    loss_breakdown: string;
    loss_percentage: number | string;
    stockout_risk: string;
    needs_review: boolean;
    last_calculated_at: string;
    target_stock_days: number;
};
