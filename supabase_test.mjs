// Quick Supabase connection diagnostic
// Run with: node --env-file=.env.local supabase_test.mjs

import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_ANON_KEY;

if (!url || !key) {
    console.error('❌ MISSING: SUPABASE_URL or SUPABASE_ANON_KEY not found in .env.local');
    process.exit(1);
}

console.log('🔍 Supabase URL:', url);
console.log('🔍 Anon Key (first 20 chars):', key.substring(0, 20) + '...');

const supabase = createClient(url, key);

console.log('\n📡 Testing connection to blog_translations...');

const { data, error, count } = await supabase
    .from('blog_translations')
    .select('id, title, slug_localized, is_published', { count: 'exact' })
    .limit(10);

if (error) {
    console.error('\n❌ ERROR:', error.code, '-', error.message);
    if (error.hint) console.error('   Hint:', error.hint);
} else {
    console.log(`\n✅ Connected! Total rows: ${count}`);
    data?.forEach(p =>
        console.log(`   [${p.is_published ? 'published' : 'draft'}] ${p.slug_localized} → ${p.title}`)
    );
}

console.log('\n📡 Testing blogs table...');
const { data: blogs, error: blogsErr } = await supabase
    .from('blogs')
    .select('canonical_slug, status')
    .limit(10);

if (blogsErr) {
    console.error('❌ blogs table error:', blogsErr.message);
} else {
    console.log(`✅ blogs table: ${blogs?.length ?? 0} rows`);
    blogs?.forEach(b => console.log(`   [${b.status}] ${b.canonical_slug}`));
}
