-- ============================================================
-- MochaEase Supabase Row Level Security (RLS) Policies
-- Run this in your Supabase Dashboard → SQL Editor
-- This ensures the anon key can ONLY read published content.
-- ============================================================

-- STEP 1: Enable RLS on both tables
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_translations ENABLE ROW LEVEL SECURITY;

-- STEP 2: Drop any existing policies (safe to re-run)
DROP POLICY IF EXISTS "allow_public_read_published_blogs" ON public.blogs;
DROP POLICY IF EXISTS "allow_public_read_published_translations" ON public.blog_translations;

-- STEP 3: Create read-only policy for blogs
-- Anon users can ONLY see blogs with status = 'published'
CREATE POLICY "allow_public_read_published_blogs"
ON public.blogs
FOR SELECT
TO anon
USING (status = 'published');

-- STEP 4: Create read-only policy for blog_translations
-- Anon users can ONLY see translations that are published
CREATE POLICY "allow_public_read_published_translations"
ON public.blog_translations
FOR SELECT
TO anon
USING (is_published = true);

-- STEP 5: Authenticated users (admins) can do everything
-- (This keeps your admin dashboard access intact)
CREATE POLICY "allow_authenticated_all_blogs"
ON public.blogs
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "allow_authenticated_all_translations"
ON public.blog_translations
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Verification: Check that RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename IN ('blogs', 'blog_translations');
