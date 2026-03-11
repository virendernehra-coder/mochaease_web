import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // During build or if env is missing, return a client with placeholders to prevent crashing
    return createBrowserClient(
        supabaseUrl || 'https://placeholder.supabase.co',
        supabaseKey || 'placeholder'
    )
}
