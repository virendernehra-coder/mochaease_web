import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { user_id, business_name, business_type, full_name, email, country } = body;

        // 1. Basic Validation
        if (!user_id || !business_name || !email) {
            return NextResponse.json(
                { success: false, error: 'User ID, Business Name, and Email are required.' },
                { status: 400 }
            );
        }

        const supabase = await createClient();

        // 2. Verify Session
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        if (authError || !user || user.id !== user_id) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized.' },
                { status: 401 }
            );
        }

        // 3. Prepare Data for public.users
        // Handle name splitting
        const nameParts = full_name?.trim().split(/\s+/) || [];
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';

        // 4. Insert into public.users
        const { error: dbError } = await supabase
            .from('users')
            .insert({
                id: user_id,
                first_name: firstName,
                last_name: lastName,
                email: email.trim().toLowerCase(),
                business_name: business_name.trim(),
                industry_type: business_type || 'other',
                country_name: country || 'India',
                account_status: 'trialing'
            });

        if (dbError) {
            console.error('Supabase users insertion error:', dbError);
            return NextResponse.json(
                { success: false, error: 'Failed to create user profile.' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, message: 'Profile created successfully!' });

    } catch (err: any) {
        console.error('Onboarding API Error:', err);
        return NextResponse.json(
            { success: false, error: 'Internal server error.' },
            { status: 500 }
        );
    }
}
