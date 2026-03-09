-- ============================================================
-- DEMO BOOKINGS TABLE
-- Run this in Supabase Dashboard → SQL Editor
-- ============================================================

CREATE TABLE public.demo_bookings (
  id             UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name      TEXT        NOT NULL,
  business_name  TEXT        NOT NULL,
  email          TEXT        NOT NULL,
  phone          TEXT        NOT NULL,
  business_type  TEXT        NOT NULL,
  status         TEXT        DEFAULT 'new',        -- new | contacted | scheduled | completed
  notes          TEXT,                              -- internal notes for sales team
  created_at     TIMESTAMPTZ DEFAULT now(),
  updated_at     TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.demo_bookings ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts only (form submissions from the website)
CREATE POLICY "Allow anonymous insert" ON public.demo_bookings
  FOR INSERT TO anon WITH CHECK (true);

-- Block anonymous reads (nobody can dump the table from the browser)
CREATE POLICY "Block anonymous read" ON public.demo_bookings
  FOR SELECT TO anon USING (false);

-- Authenticated users (admin dashboard) get full access
CREATE POLICY "Authenticated full access" ON public.demo_bookings
  FOR ALL TO authenticated USING (true) WITH CHECK (true);
