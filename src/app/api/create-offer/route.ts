import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const supabase = await createClient()
        
        // Check authentication
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const { 
            business_id, 
            outlet_name, 
            promo_name, 
            promo_code, 
            status, 
            start_date, 
            end_date, 
            discount_type, 
            discount_value, 
            bogo_buy_qty, 
            bogo_get_qty, 
            min_order_amount, 
            applicable_product_ids 
        } = body

        // Validate required fields
        if (!business_id || !promo_name ) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        // Insert the new offer
        const { data, error } = await supabase
            .from('business_offers')
            .insert({
                business_id,
                outlet_name,
                user_id: user.id,
                promo_name,
                promo_code,
                status: status ?? true,
                start_date,
                end_date,
                discount_type: discount_type || 'percentage',
                discount_value,
                bogo_buy_qty,
                bogo_get_qty,
                min_order_amount: min_order_amount || 0,
                applicable_product_ids: applicable_product_ids || []
            })
            .select()
            .single()

        if (error) {
            console.error('Error creating offer:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ success: true, data })
    } catch (error) {
        console.error('API Error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
