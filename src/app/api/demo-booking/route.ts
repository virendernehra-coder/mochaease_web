import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { full_name, business_name, email, phone, business_type } = body;

        // Validate required fields
        if (!full_name || !business_name || !email || !phone || !business_type) {
            return NextResponse.json(
                { success: false, error: 'All fields are required.' },
                { status: 400 }
            );
        }

        // Basic email validation
        if (!email.includes('@') || !email.includes('.')) {
            return NextResponse.json(
                { success: false, error: 'Please enter a valid email address.' },
                { status: 400 }
            );
        }

        const supabase = await createClient();

        const { error } = await supabase
            .from('demo_bookings')
            .insert({
                full_name: full_name.trim(),
                business_name: business_name.trim(),
                email: email.trim().toLowerCase(),
                phone: phone.trim(),
                business_type,
            });

        if (error) {
            console.error('Supabase insert error:', error);
            return NextResponse.json(
                { success: false, error: 'Something went wrong. Please try again.' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, message: 'Demo booked successfully!' });

    } catch {
        return NextResponse.json(
            { success: false, error: 'Invalid request.' },
            { status: 400 }
        );
    }
}
