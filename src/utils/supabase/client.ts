import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Use placeholders during build OR if environment variables are missing in the browser
    // to prevent a hard client-side crash. Note: Active functionality (like login)
    // still requires these keys to be set in the deployment environment.
    const url = supabaseUrl || 'https://placeholder.supabase.co';
    const key = supabaseKey || 'placeholder';

    return createBrowserClient(url, key);
}
