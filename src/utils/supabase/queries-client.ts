'use client';

import { createClient } from './client';

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
