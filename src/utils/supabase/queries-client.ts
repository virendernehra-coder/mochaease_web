'use client';

import { createClient } from './client';
import { type PayrollReport, type EmployeeDetails } from './queries';

export async function getUserProfile(userId: string) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

    if (error && error.code !== 'PGRST116') {
        console.error('Error fetching user profile:', error);
    }
    return data;
}

export async function getEmployeeProfile(userId: string) {
    const supabase = createClient();
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

export async function getBusinessOutlets(businessId: string) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('business_details')
        .select('*')
        .eq('business_id', businessId);

    if (error) {
        console.error('Error fetching business outlets:', error);
    }
    return data || [];
}

export async function createOutlet(outletData: Record<string, unknown>) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('business_details')
        .insert([outletData])
        .select()
        .single();

    if (error) {
        console.error('Supabase creation error:', error);
        throw new Error(error.message || 'Database rejected insertion');
    }
    console.log('Successfully created outlet row:', data);
    return data;
}

export async function getPayrollReport(
    contextId: string, 
    isGlobal: boolean,
    startDate?: string,
    endDate?: string
): Promise<PayrollReport[]> {
    const supabase = createClient();
    
    let query = supabase
        .from('automated_payroll_report')
        .select('*');

    if (isGlobal) {
        query = query.eq('payroll_business_id', contextId);
    } else {
        query = query.eq('payroll_outlet_id', contextId);
    }

    if (startDate) {
        // Correct overlap logic: row ends after or on query start
        query = query.gte('payroll_end', startDate);
    }
    if (endDate) {
        // Correct overlap logic: row starts before or on query end
        query = query.lte('payroll_start', endDate);
    }

    const { data, error } = await query.order('pay_day', { ascending: false });

    if (error) {
        console.error('Error fetching payroll report:', error);
        return [];
    }

    return data as PayrollReport[];
}

export async function getEmployees(contextId: string, isGlobal: boolean): Promise<EmployeeDetails[]> {
    const supabase = createClient();
    let query = supabase.from('employee_details').select('*');
    
    if (isGlobal) {
        query = query.eq('business_id', contextId);
    } else {
        query = query.eq('outlet_id', contextId);
    }

    const { data, error } = await query.order('first_name', { ascending: true });
    if (error) {
        console.error('Error fetching employees:', error);
        return [];
    }
    return data as EmployeeDetails[];
}

export async function updateEmployeePayDetails(
    employeeId: string, 
    payData: { 
        employee_fix_pay: number; 
        employee_variable_pay: number; 
        employee_bonus: number; 
    }
) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('employee_details')
        .update(payData)
        .eq('employee_id', employeeId)
        .select();
    
    if (error) throw error;
    return data;
}

export async function updateEmployeeSalary(employeeId: string, salary: number) {
    const supabase = createClient();
    const { error } = await supabase
        .from('employee_details')
        .update({ employee_fix_pay: salary })
        .eq('employee_id', employeeId);
    
    if (error) throw error;
}

export async function updateEmployeeGovernance(employeeId: string, updates: Partial<EmployeeDetails>) {
    const supabase = createClient();
    const { error } = await supabase
        .from('employee_details')
        .update(updates)
        .eq('employee_id', employeeId);
    
    if (error) throw error;
}

export interface BusinessOutlet {
    id: number;
    outlet_id: string;
    outlet_name: string;
    outlet_address: string;
    outlet_phone: number;
}

export type AdvancePayment = {
    id: number;
    created_at: string;
    employee_name: string;
    outlet_name: string;
    business_id: string;
    advance_payment: number;
    user_id: string;
    employee_id: string;
    outlet_id: string;
    status: 'pending' | 'approved' | 'rejected';
    approved_by_user_id?: string;
    approved_at?: string;
    approval_notes?: string;
};

export async function getAdvancePayments(
    contextId: string, 
    isGlobal: boolean,
    startDate?: string,
    endDate?: string
): Promise<AdvancePayment[]> {
    const supabase = createClient();
    let query = supabase.from('employee_advance_payment').select('*');
    
    if (isGlobal) {
        query = query.eq('business_id', contextId);
    } else {
        query = query.eq('outlet_id', contextId);
    }

    if (startDate) {
        query = query.gte('created_at', startDate);
    }
    if (endDate) {
        query = query.lte('created_at', endDate + 'T23:59:59.999Z');
    }

    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) {
        console.error('Error fetching advances:', error);
        return [];
    }
    return data as AdvancePayment[];
}

export async function createAdvancePayment(payment: Omit<AdvancePayment, 'id' | 'created_at'>) {
    const supabase = createClient();
    const { error } = await supabase
        .from('employee_advance_payment')
        .insert([payment]);
    
    if (error) throw error;
}

export async function deleteAdvancePayment(id: number) {
    const supabase = createClient();
    const { error } = await supabase
        .from('employee_advance_payment')
        .delete()
        .eq('id', id);
    
    if (error) throw error;
}

export async function updateAdvanceStatus(
    id: number, 
    status: 'approved' | 'rejected', 
    userId: string, 
    notes?: string
) {
    const supabase = createClient();
    const { error } = await supabase
        .from('employee_advance_payment')
        .update({
            status,
            approved_by_user_id: userId,
            approved_at: new Date().toISOString(),
            approval_notes: notes || ''
        })
        .eq('id', id);
    
    if (error) throw error;
}
export type BusinessInfo = {
    id: number;
    created_at: string;
    business_currency: string;
    business_monthly_revenue_goal: number;
    business_id: string;
    user_id: string;
    updated_at: string;
};

export async function getBusinessInfo(businessId: string): Promise<BusinessInfo | null> {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('business_info')
        .select('*')
        .eq('business_id', businessId)
        .single();

    if (error && error.code !== 'PGRST116') {
        console.error('Error fetching business info:', error);
    }
    return data;
}

export async function updateBusinessInfo(
    businessId: string, 
    details: Partial<Omit<BusinessInfo, 'id' | 'created_at' | 'business_id'>>
) {
    const supabase = createClient();
    
    // First check if it exists
    const existing = await getBusinessInfo(businessId);
    
    if (existing) {
        const { error } = await supabase
            .from('business_info')
            .update({
                ...details,
                updated_at: new Date().toISOString()
            })
            .eq('business_id', businessId);
        if (error) throw error;
    } else {
        const { error } = await supabase
            .from('business_info')
            .insert([{
                ...details,
                business_id: businessId,
                updated_at: new Date().toISOString()
            }]);
        if (error) throw error;
    }
}

export type SalesPeriod = 'today' | 'yesterday' | 'this_week' | 'last_week' | 'this_month' | 'last_month';

/**
 * Fetches sales performance for a specific date range using the RPC function.
 */
export async function getSalesByDateRange(
    businessId: string,
    outletId: string | null,
    startDate: string,
    endDate: string
): Promise<import('./queries').SalesPerformanceRecord | null> {
    const supabase = createClient();
    
    // Call the v2 RPC that handles aggregation for custom ranges
    const { data, error } = await supabase.rpc('get_business_sales_by_date_range_v2', {
        p_business_id: businessId,
        p_start_date: startDate,
        p_end_date: endDate
    });

    if (error) {
        console.error('Error in get_business_sales_by_date_range_v2:', error);
        return null;
    }

    // Map output to match our UI-expected field names
    // Note: The RPC returns both business-level (outlet_id null) and outlet rows.
    // We filter for the one we need.
    const records = data as any[];
    const targetRecord = records.find(r => 
        outletId && outletId !== 'business' 
            ? r.outlet_id === outletId 
            : r.outlet_id === null
    );

    if (!targetRecord) return null;

    // Mapping total_sales -> gross_sales to match SalesPerformanceRecord type
    return {
        ...targetRecord,
        gross_sales: Number(targetRecord.total_sales || 0),
        net_sales: Number(targetRecord.net_sales || 0),
        order_count: Number(targetRecord.order_count || 0),
        total_items_sold: Number(targetRecord.total_items_sold || 0)
    } as import('./queries').SalesPerformanceRecord;
}

/**
 * Fetches sales performance data. Switches between static Views (for today/yesterday) 
 * and dynamic RPC (for custom ranges) for optimal performance.
 */
export async function getSalesPerformance(
    period: SalesPeriod,
    businessId: string,
    outletId: string | null,
    startDate?: string,
    endDate?: string
): Promise<import('./queries').SalesPerformanceRecord | null> {
    // If we have custom dates, always use the RPC path
    if (startDate && endDate) {
        return getSalesByDateRange(businessId, outletId, startDate, endDate);
    }

    // Fallback or optimized quick filters using static views
    const supabase = createClient();
    const tableName = `business_sales_${period}_v1`;
    
    let query = supabase
        .from(tableName)
        .select('*')
        .eq('business_id', businessId);
    
    if (outletId && outletId !== 'business') {
        query = query.eq('outlet_id', outletId);
    } else {
        query = query.is('outlet_id', null);
    }
    
    const { data, error } = await query.single();
    
    if (error && error.code !== 'PGRST116') {
        console.error(`Error fetching sales for ${period}:`, error);
    }
    
    return data as import('./queries').SalesPerformanceRecord | null;
}

/**
 * Fetches Day of the Week performance data.
 */
export async function getDOWPerformance(
    businessId: string,
    outletId: string | null
): Promise<import('./queries').DOWPerformanceRecord[]> {
    const supabase = createClient();
    let query = supabase
        .from('business_sales_by_dow_last_7_weeks_v1')
        .select('*')
        .eq('business_id', businessId)
        .order('dow_number', { ascending: true });

    if (outletId && outletId !== 'business') {
        query = query.eq('outlet_id', outletId);
    } else {
        query = query.is('outlet_id', null);
    }

    const { data, error } = await query;
    if (error) {
        console.error('Error fetching DOW performance:', error);
        return [];
    }
    return data as import('./queries').DOWPerformanceRecord[];
}

/**
 * Fetches daily sales trend data for the last 30 days.
 */
export async function getDailyTrendLine(
    businessId: string,
    outletId: string | null
): Promise<import('./queries').DailyTrendRecord[]> {
    const supabase = createClient();
    let query = supabase
        .from('business_sales_last_30_days_graph_data_v1')
        .select('*')
        .eq('business_id', businessId)
        .order('sale_date', { ascending: true });

    if (outletId && outletId !== 'business') {
        query = query.eq('outlet_id', outletId);
    } else {
        query = query.is('outlet_id', null);
    }

    const { data, error } = await query;
    if (error) {
        console.error('Error fetching daily trend:', error);
        return [];
    }
    return data as import('./queries').DailyTrendRecord[];
}

/**
 * Fetches hourly performance data for temporal trends.
 */
export async function getHourlyPerformance(
    businessId: string,
    outletId: string | null
): Promise<import('./queries').HourlyPerformanceRecord[]> {
    const supabase = createClient();
    
    let query = supabase
        .from('hourly_business_performance_v1')
        .select('*')
        .eq('business_id', businessId)
        .order('hour_of_day', { ascending: true });
    
    if (outletId && outletId !== 'business') {
        query = query.eq('outlet_id', outletId);
    } else {
        query = query.is('outlet_id', null);
    }
    
    const { data, error } = await query;
    
    if (error) {
        console.error(`Error fetching hourly performance:`, error);
        return [];
    }
    
    return (data || []) as import('./queries').HourlyPerformanceRecord[];
}

/**
 * Fetches product performance data for a specific date range using the RPC function.
 */
export async function getProductPerformance(
    businessId: string,
    outletId: string | null,
    startDate: string,
    endDate: string
): Promise<import('./queries').ProductPerformance[]> {
    const supabase = createClient();
    
    // Call the RPC that handles product-level aggregation
    // Parameters: business_id, startdate, enddate
    const { data, error } = await supabase.rpc('get_unique_items_sold_v2', {
        p_business_id: businessId,
        p_start_date: startDate,
        p_end_date: endDate
    });

    if (error) {
        console.error('Error in get_unique_items_sold_v2:', error);
        return [];
    }

    const records = (data || []) as any[];
    
    return records as import('./queries').ProductPerformance[];
}

/**
 * Fetches true net profit performance data for a specific date range using the RPC function.
 */
export async function getNetProfitPerformance(
    businessId: string,
    outletId: string | null,
    startDate: string,
    endDate: string
): Promise<import('./queries').NetProfitPerformance | null> {
    const supabase = createClient();
    
    // Call the RPC that handles financial aggregation
    const { data, error } = await supabase.rpc('get_true_net_profit_v1', {
        p_business_id: businessId,
        p_start_date: startDate,
        p_end_date: endDate
    });

    if (error) {
        console.error('Error in get_true_net_profit_v1:', error);
        return null;
    }

    const records = (data || []) as any[];
    
    // Find the record for the specific context
    const targetRecord = records.find(r => 
        outletId && outletId !== 'business' 
            ? r.outlet_id === outletId 
            : r.outlet_id === null
    );

    return (targetRecord || null) as import('./queries').NetProfitPerformance | null;
}

/**
 * Fetches elite product performance data (categorization) from the elite view.
 */
export async function getProductElitePerformance(
    businessId: string,
    outletId: string | null
): Promise<import('./queries').ElitePerformanceRecord[]> {
    const supabase = createClient();
    
    let query = supabase
        .from('product_performance_elite_v1')
        .select('*')
        .eq('business_id', businessId);

    if (outletId && outletId !== 'business') {
        query = query.eq('outlet_id', outletId);
    } else {
        query = query.is('outlet_id', null);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching elite product performance:', error);
        return [];
    }

    return (data || []) as import('./queries').ElitePerformanceRecord[];
}

/**
 * Fetches category performance data from the comprehensive category view.
 */
export async function getCategoryPerformance(
    businessId: string,
    outletId: string | null,
    startDate: string,
    endDate: string
): Promise<import('./queries').CategoryPerformanceRecord[]> {
    const supabase = createClient();
    
    const { data, error } = await supabase.rpc('get_category_analytics_v1', {
        p_business_id: businessId,
        p_start_date: startDate,
        p_end_date: endDate
    });

    if (error) {
        console.error('Error fetching category performance via RPC:', error);
        return [];
    }

    const records = (data || []) as any[];
    
    // Filter by outlet if applicable
    const filtered = records.filter(r => 
        outletId && outletId !== 'business' 
            ? r.outlet_id === outletId 
            : r.outlet_id === null
    );

    return filtered as import('./queries').CategoryPerformanceRecord[];
}

export async function getCategoryTrend(
    businessId: string,
    outletId: string | null = null,
    startDate?: string,
    endDate?: string
): Promise<import('./queries').CategoryTrendRecord[]> {
    const supabase = createClient();
    
    // If dates are provided, use the dynamic RPC
    if (startDate && endDate) {
        const { data, error } = await supabase.rpc('get_category_analytics_v1', {
            p_business_id: businessId,
            p_start_date: startDate,
            p_end_date: endDate
        });

        if (error) {
            console.error('Error fetching category trend via RPC:', error);
            return [];
        }

        const records = (data || []) as any[];
        return records.filter(r => 
            outletId && outletId !== 'business' 
                ? r.outlet_id === outletId 
                : r.outlet_id === null
        ) as import('./queries').CategoryTrendRecord[];
    }

    // Fallback to static view if no dates (legacy support)
    let query = supabase
        .from('category_trend_analysis_v1')
        .select('*')
        .eq('business_id', businessId);

    if (outletId && outletId !== 'business') {
        query = query.eq('outlet_id', outletId);
    } else {
        query = query.is('outlet_id', null);
    }

    const { data, error } = await query.order('net_sales', { ascending: false });

    if (error) {
        console.error('Error fetching category trend:', error);
        return [];
    }

    return (data || []) as import('./queries').CategoryTrendRecord[];
}
