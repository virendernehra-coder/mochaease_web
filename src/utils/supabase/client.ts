import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
    // Check both prefixed and non-prefixed versions. 
    // next.config.ts will help expose SUPABASE_URL if it's not prefixed.
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

    // Use placeholders during build to prevent a hard client-side crash.
    const url = supabaseUrl || 'https://placeholder.supabase.co';
    const key = supabaseKey || 'placeholder';

    return createBrowserClient(url, key);
}
