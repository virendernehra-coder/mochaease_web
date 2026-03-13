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
