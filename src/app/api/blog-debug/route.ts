import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_ANON_KEY;

    // Check if env vars exist (don't expose key value for security)
    const envCheck = {
        SUPABASE_URL_present: !!url,
        SUPABASE_URL_value: url ? url.substring(0, 30) + '...' : 'MISSING',
        SUPABASE_ANON_KEY_present: !!key,
        SUPABASE_ANON_KEY_length: key ? key.length : 0,
        SUPABASE_ANON_KEY_starts_with_eyJ: key ? key.startsWith('eyJ') : false,
    };

    if (!url || !key) {
        return NextResponse.json({
            status: 'ERROR',
            message: 'Env vars missing on this deployment!',
            env: envCheck
        }, { status: 500 });
    }

    // Try connecting
    try {
        const supabase = await createClient();
        const { data, error, count } = await supabase
            .from('blog_translations')
            .select('id, title, slug_localized', { count: 'exact' })
            .eq('is_published', true)
            .limit(10);

        if (error) {
            return NextResponse.json({
                status: 'SUPABASE_ERROR',
                error: error.message,
                hint: error.hint,
                env: envCheck
            }, { status: 500 });
        }

        return NextResponse.json({
            status: 'OK',
            total_posts: count,
            posts: data?.map(p => p.slug_localized),
            env: envCheck
        });

    } catch (err) {
        return NextResponse.json({
            status: 'EXCEPTION',
            error: String(err),
            env: envCheck
        }, { status: 500 });
    }
}
