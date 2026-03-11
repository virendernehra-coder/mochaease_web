import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { 
            business_id, 
            business_name, 
            role_id, 
            outlet_name, 
            outlet_address, 
            outlet_phone, 
            outlet_email, 
            outlet_currency,
            country_code,
            timezone
        } = body;

        // Validate required fields
        if (!business_id || !outlet_name) {
            return NextResponse.json(
                { success: false, error: 'Business ID and Outlet Name are required.' },
                { status: 400 }
            );
        }

        const supabase = await createClient();

        // Prepare data for insertion
        const insertData = {
            business_id,
            business_name: business_name || 'My Business',
            role_id: role_id || 'owner',
            outlet_name: outlet_name.trim(),
            outlet_address: outlet_address?.trim() || '',
            outlet_phone: parseInt(String(outlet_phone).replace(/\D/g, '')) || 0,
            outlet_email: outlet_email?.trim().toLowerCase() || '',
            outlet_currency: outlet_currency || 'USD',
            country_code: country_code || 'US',
            timezone: timezone || 'UTC',
            outlet_id: crypto.randomUUID(), // Explicitly generate a UUID if needed
        };

        const { data, error } = await supabase
            .from('business_details')
            .insert(insertData)
            .select()
            .single();

        if (error) {
            console.error('Supabase creation error:', error);
            return NextResponse.json(
                { success: false, error: error.message || 'Failed to create outlet in the database.' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, data, message: 'Outlet created successfully!' });

    } catch (err) {
        console.error('Internal Server Error:', err);
        return NextResponse.json(
            { success: false, error: 'An unexpected error occurred. Please try again.' },
            { status: 500 }
        );
    }
}
