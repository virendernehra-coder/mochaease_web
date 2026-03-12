import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const supabase = await createClient()

        // Check if the current user is authorized (Owner/Admin)
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const {
            first_name,
            last_name,
            email,
            phone_number,
            business_id,
            business_name,
            role_id_employee,
            outlet_id,
            outlet_name,
            employee_fix_pay,
            employee_variable_pay,
            employee_bonus,
            preferred_shift,
            weekly_off_days,
            daily_shift_status,
            backup_shift
        } = body

        // Validate required fields
        if (!first_name || !last_name || !email || !role_id_employee) {
            return NextResponse.json({ error: 'Missing required employee identity fields' }, { status: 400 })
        }

        // Call the Supabase Edge Function 'add-employee'
        // This function handles: 1. Auth Account Creation, 2. Database Insertion
        // We pass the current body and add creator details.
        const { data: functionData, error: functionError } = await supabase.functions.invoke('add-employee', {
            body: {
                ...body,
                role_id_creator: body.role_id_creator || user.role || 'owner',
                creator_id: user.id
            }
        });

        if (functionError) {
            console.error('Edge Function Error:', functionError);
            return NextResponse.json({ 
                error: functionError.message || 'Failed to execute onboarding function' 
            }, { status: 500 });
        }

        // SUPPLEMENTAL UPDATE
        // The Edge Function only handles core identity. We need to update the record with pay and shift details.
        const employeeId = functionData?.employee?.employee_id;
        if (employeeId) {
            // Update employee_details
            await supabase
                .from('employee_details')
                .update({
                    employee_fix_pay: parseFloat(employee_fix_pay) || 0,
                    employee_variable_pay: parseFloat(employee_variable_pay) || 0,
                    employee_bonus: parseFloat(employee_bonus) || 0,
                    preferred_shift: preferred_shift || 'Morning',
                    weekly_off_days: parseInt(weekly_off_days) || 1,
                    daily_shift_status: daily_shift_status ?? true,
                    backup_shift: backup_shift ?? false,
                    role_id_creator: body.role_id_creator || user.role || 'owner'
                })
                .eq('employee_id', employeeId);

            // Also update main employees table to ensure role_id_creator is captured there
            await supabase
                .from('employees')
                .update({
                    role_id_creator: body.role_id_creator || user.role || 'owner'
                })
                .eq('employee_id', employeeId);
        }

        return NextResponse.json({ success: true, data: functionData });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
