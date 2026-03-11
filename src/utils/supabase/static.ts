import { createClient } from '@supabase/supabase-js';

export function createStaticClient() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    return createClient(
        supabaseUrl || 'https://placeholder.supabase.co',
        supabaseKey || 'placeholder'
    );
}
