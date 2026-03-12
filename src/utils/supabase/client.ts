import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Use placeholders ONLY during the server-side build/prerendering phase
    // to prevent the build from crashing when environment variables are missing.
    // At runtime in the browser, we use the real variables.
    const url = supabaseUrl || (typeof window === 'undefined' ? 'https://placeholder.supabase.co' : '');
    const key = supabaseKey || (typeof window === 'undefined' ? 'placeholder' : '');

    return createBrowserClient(url, key);
}
