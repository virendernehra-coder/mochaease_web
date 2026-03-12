# Supabase Database Schemas

This file serves as the reference for all database table structures, relationships, and business logic definitions. 

## Tables
(Paste table schemas below)

-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.add_new_category (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  category_name text,
  user_id uuid DEFAULT gen_random_uuid(),
  business_id uuid DEFAULT gen_random_uuid(),
  role_id text,
  outlet_name text,
  outlet_id uuid,
  CONSTRAINT add_new_category_pkey PRIMARY KEY (id)
);
CREATE TABLE public.add_new_products (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  category_name text,
  user_id uuid DEFAULT gen_random_uuid(),
  product_name text,
  product_price double precision,
  product_image text,
  business_id uuid DEFAULT gen_random_uuid(),
  role_id text,
  outlet_name text,
  outlet_id uuid,
  barcode text,
  is_out_of_stock boolean NOT NULL DEFAULT false,
  CONSTRAINT add_new_products_pkey PRIMARY KEY (id),
  CONSTRAINT fk_outlet FOREIGN KEY (outlet_id) REFERENCES public.business_details(outlet_id)
);
CREATE TABLE public.ai_accessible_tables (
  table_name text NOT NULL,
  description text,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT ai_accessible_tables_pkey PRIMARY KEY (table_name)
);
CREATE TABLE public.ai_knowledge_base (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  entry_type USER-DEFINED NOT NULL,
  industry_context text NOT NULL DEFAULT 'General'::text,
  metric_name text NOT NULL,
  description text NOT NULL,
  causes_or_factors text NOT NULL,
  recommended_actions text NOT NULL,
  embedding USER-DEFINED,
  CONSTRAINT ai_knowledge_base_pkey PRIMARY KEY (id)
);
CREATE TABLE public.ai_query_logs (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  business_id uuid,
  user_query text,
  generated_sql text,
  response_type text,
  was_successful boolean DEFAULT false,
  error_message text,
  CONSTRAINT ai_query_logs_pkey PRIMARY KEY (id)
);
CREATE TABLE public.attendance_logs (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone,
  business_id uuid NOT NULL,
  outlet_id uuid NOT NULL,
  employee_uid uuid NOT NULL,
  clock_in_time timestamp with time zone NOT NULL DEFAULT now(),
  clock_out_time timestamp with time zone,
  work_date date NOT NULL DEFAULT CURRENT_DATE,
  clock_in_lat double precision,
  clock_in_long double precision,
  clock_out_lat double precision,
  clock_out_long double precision,
  clock_in_photo_url text,
  clock_out_photo_url text,
  status text NOT NULL DEFAULT 'working'::text,
  notes text,
  total_duration_minutes integer,
  verification_method text NOT NULL DEFAULT 'manual'::text,
  device_id text,
  shift_type text DEFAULT 'regular'::text,
  CONSTRAINT attendance_logs_pkey PRIMARY KEY (id)
);
CREATE TABLE public.audit_input (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  inventory_id bigint NOT NULL,
  business_id uuid NOT NULL,
  outlet_name text NOT NULL,
  actual_quantity numeric NOT NULL,
  audited_by_user_id uuid NOT NULL,
  audit_notes text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  approval_status boolean,
  CONSTRAINT audit_input_pkey PRIMARY KEY (id),
  CONSTRAINT fk_audit_input_inventory FOREIGN KEY (inventory_id) REFERENCES public.track_inventory(id)
);
CREATE TABLE public.blog_translations (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  blog_id uuid,
  language_code text NOT NULL,
  title text NOT NULL,
  excerpt text,
  slug_localized text NOT NULL UNIQUE,
  content_html text,
  seo_description text,
  seo_keywords ARRAY,
  published_at timestamp with time zone,
  is_published boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT blog_translations_pkey PRIMARY KEY (id),
  CONSTRAINT blog_translations_blog_id_fkey FOREIGN KEY (blog_id) REFERENCES public.blogs(id)
);
CREATE TABLE public.blogs (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  canonical_slug text NOT NULL,
  featured_image text,
  tags ARRAY,
  author text,
  status text DEFAULT 'draft'::text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT blogs_pkey PRIMARY KEY (id)
);
CREATE TABLE public.business_details (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  business_name text DEFAULT '0'::text,
  outlet_name text DEFAULT '0'::text,
  business_id uuid DEFAULT gen_random_uuid(),
  role_id text DEFAULT '0'::text,
  outlet_id uuid DEFAULT gen_random_uuid() UNIQUE,
  outlet_address text DEFAULT '0'::text,
  outlet_phone bigint DEFAULT '0'::bigint,
  outlet_currency text,
  receipt_footer_message text,
  audit_approval boolean,
  image_1 text,
  image_2 text,
  image_3 text,
  image_4 text,
  country_code character,
  outlet_logo text,
  outlet_email text,
  tax_rate smallint,
  timezone text,
  CONSTRAINT business_details_pkey PRIMARY KEY (id),
  CONSTRAINT fk_business_country FOREIGN KEY (country_code) REFERENCES public.countries(code)
);
CREATE TABLE public.business_expanses (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  user_id uuid DEFAULT gen_random_uuid(),
  business_id uuid,
  business_name text,
  role_id text,
  expanses_title text,
  expanses_category text,
  expanses_amount double precision,
  expanses_description text,
  expanses_receipt_url text,
  payment_method text,
  created_at_local timestamp without time zone,
  user_name text,
  outlet_name text,
  CONSTRAINT business_expanses_pkey PRIMARY KEY (id)
);
CREATE TABLE public.business_health_scores (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  business_id uuid NOT NULL,
  outlet_id uuid,
  score_date date NOT NULL,
  score_type USER-DEFINED NOT NULL,
  overall_score numeric NOT NULL,
  financial_score numeric NOT NULL,
  operational_score numeric NOT NULL,
  workforce_score numeric NOT NULL,
  customer_score numeric NOT NULL,
  calculated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT business_health_scores_pkey PRIMARY KEY (id),
  CONSTRAINT business_health_scores_outlet_id_fkey FOREIGN KEY (outlet_id) REFERENCES public.business_details(outlet_id)
);
CREATE TABLE public.business_offers (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  business_id uuid DEFAULT gen_random_uuid(),
  outlet_name text,
  user_id uuid DEFAULT gen_random_uuid(),
  promo_name text,
  status boolean,
  start_date date,
  end_date date,
  promo_code text,
  discount_type text NOT NULL DEFAULT 'percentage'::text,
  discount_value numeric,
  bogo_buy_qty smallint,
  bogo_get_qty smallint,
  min_order_amount numeric DEFAULT 0,
  applicable_product_ids ARRAY,
  outlet_id uuid,
  CONSTRAINT business_offers_pkey PRIMARY KEY (id)
);
CREATE TABLE public.cart_items_duplicate_test (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  category_name text,
  user_id uuid DEFAULT gen_random_uuid(),
  product_name text,
  product_price double precision,
  product_image text,
  qty smallint,
  cashier_name text,
  payment_method_cash text,
  online_orders text,
  payment_method_digital_wallet text,
  payment_method_edc text,
  order_type text,
  business_id uuid,
  role_id text DEFAULT ''::text,
  order_status text DEFAULT ''::text,
  notes text DEFAULT ''::text,
  customer_name text DEFAULT ''::text,
  email text DEFAULT ''::text,
  cafe_name text DEFAULT ''::text,
  created_at_local timestamp with time zone,
  order_number_n bigint,
  item_discount numeric,
  discount_type text,
  customer_phone text,
  invoice_pdf_url text,
  payment_status text DEFAULT 'PAID'::text,
  CONSTRAINT cart_items_duplicate_test_pkey PRIMARY KEY (id),
  CONSTRAINT cart_items_duplicate_test_user_id_fkey_cascade FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.cashier_names (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  cashier_name text,
  user_id uuid DEFAULT gen_random_uuid(),
  business_id uuid DEFAULT gen_random_uuid(),
  role_id text,
  outlet_name text,
  CONSTRAINT cashier_names_pkey PRIMARY KEY (id)
);
CREATE TABLE public.countries (
  code character NOT NULL,
  name text NOT NULL UNIQUE,
  default_currency character,
  timezone text,
  CONSTRAINT countries_pkey PRIMARY KEY (code)
);
CREATE TABLE public.crawl_queue (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  location text NOT NULL,
  category text NOT NULL,
  status text NOT NULL DEFAULT 'pending'::text,
  last_run_at timestamp without time zone,
  try_count integer DEFAULT 0,
  error_message text,
  created_at timestamp without time zone DEFAULT now(),
  CONSTRAINT crawl_queue_pkey PRIMARY KEY (id)
);
CREATE TABLE public.customer_booking (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  customer_name text,
  customer_email text,
  customer_phone text,
  notes text,
  business_id uuid,
  outlet_id uuid,
  user_id uuid,
  local_date_time timestamp without time zone,
  booking_status USER-DEFINED DEFAULT 'pending'::booking_status_enum,
  status_updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT customer_booking_pkey PRIMARY KEY (id)
);
CREATE TABLE public.customer_display_orders (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  outlet_id uuid NOT NULL,
  user_id uuid NOT NULL,
  order_number text NOT NULL,
  status text NOT NULL DEFAULT 'open'::text,
  items jsonb NOT NULL,
  subtotal numeric NOT NULL DEFAULT 0,
  tax numeric NOT NULL DEFAULT 0,
  discount numeric NOT NULL DEFAULT 0,
  total numeric NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT customer_display_orders_pkey PRIMARY KEY (id),
  CONSTRAINT customer_display_orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.daily_sales_summary_email (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  business_id uuid NOT NULL,
  sent_at timestamp with time zone DEFAULT now(),
  email_subject text,
  recipient_emails text,
  CONSTRAINT daily_sales_summary_email_pkey PRIMARY KEY (id)
);
CREATE TABLE public.demo_bookings (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  business_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  business_type text NOT NULL,
  status text DEFAULT 'new'::text,
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  report_sent boolean DEFAULT false,
  CONSTRAINT demo_bookings_pkey PRIMARY KEY (id)
);
CREATE TABLE public.demo_requests (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  preferred_date date,
  preferred_time text,
  notes text,
  status text DEFAULT 'pending'::text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  CONSTRAINT demo_requests_pkey PRIMARY KEY (id),
  CONSTRAINT demo_requests_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);
CREATE TABLE public.email_log (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  business_id uuid NOT NULL,
  outlet_name text,
  email_type text NOT NULL,
  recipients ARRAY NOT NULL,
  subject text NOT NULL,
  sent_at timestamp with time zone DEFAULT now(),
  response jsonb,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT email_log_pkey PRIMARY KEY (id)
);
CREATE TABLE public.email_preferences (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  user_id uuid NOT NULL,
  business_id uuid NOT NULL,
  outlet_id uuid,
  outlet_name text,
  email text NOT NULL,
  role_id text,
  employee_name text,
  send_stock_alerts boolean DEFAULT true,
  send_stock_insights boolean DEFAULT true,
  send_daily_sales_summary boolean DEFAULT true,
  send_weekly_reports boolean DEFAULT true,
  send_monthly_reports boolean DEFAULT true,
  send_audit_reports boolean DEFAULT true,
  send_expiry_alerts boolean DEFAULT true,
  send_low_stock_alerts boolean DEFAULT true,
  send_critical_stock_alerts boolean DEFAULT true,
  email_frequency text DEFAULT 'immediate'::text CHECK (email_frequency = ANY (ARRAY['immediate'::text, 'daily'::text, 'weekly'::text, 'monthly'::text])),
  preferred_time time without time zone DEFAULT '09:00:00'::time without time zone,
  timezone text DEFAULT 'UTC'::text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT email_preferences_pkey PRIMARY KEY (id)
);
CREATE TABLE public.email_templates (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text NOT NULL UNIQUE,
  content text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT email_templates_pkey PRIMARY KEY (id)
);
CREATE TABLE public.employee_advance_payment (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  employee_name text,
  outlet_name text,
  business_id uuid DEFAULT gen_random_uuid(),
  advance_payment double precision,
  user_id uuid DEFAULT gen_random_uuid(),
  employee_id uuid DEFAULT gen_random_uuid(),
  outlet_id uuid,
  CONSTRAINT employee_advance_payment_pkey PRIMARY KEY (id)
);
CREATE TABLE public.employee_calendar (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  calendar_date date NOT NULL,
  employee_id uuid NOT NULL,
  business_id uuid NOT NULL,
  employee_name text,
  role_id text,
  day_status text NOT NULL DEFAULT 'Available'::text,
  type_shift text,
  notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  outlet_name text,
  workday_status text,
  is_within_filter_range boolean DEFAULT false,
  outlet_id uuid,
  is_forced_assignment boolean DEFAULT false,
  CONSTRAINT employee_calendar_pkey PRIMARY KEY (id)
);
CREATE TABLE public.employee_details (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  first_name text,
  creator_id uuid DEFAULT gen_random_uuid(),
  last_name text,
  email text,
  phone_number text,
  business_id text,
  business_name text,
  role_id_employee text,
  profile_pic text,
  role_id_creator text,
  employee_id uuid NOT NULL,
  outlet_id uuid,
  outlet_name text,
  employee_fix_pay double precision,
  employee_variable_pay double precision,
  employee_bonus double precision,
  daily_shift_status boolean,
  backup_shift boolean,
  weekly_off_days numeric,
  preferred_shift text,
  CONSTRAINT employee_details_pkey PRIMARY KEY (id),
  CONSTRAINT fk_employee_auth_user FOREIGN KEY (employee_id) REFERENCES auth.users(id)
);
CREATE TABLE public.employee_email_preferences (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  is_active boolean DEFAULT true,
  receive_daily_demo_report boolean DEFAULT false,
  receive_weekly_summary boolean DEFAULT false,
  CONSTRAINT employee_email_preferences_pkey PRIMARY KEY (id)
);
CREATE TABLE public.employee_payroll_deductions (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  income_tax smallint,
  govt_schemes_employers smallint,
  business_id uuid DEFAULT gen_random_uuid(),
  country_id text,
  income_tax_calculation boolean,
  CONSTRAINT employee_payroll_deductions_pkey PRIMARY KEY (id)
);
CREATE TABLE public.employee_payroll_period (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  payroll_start date,
  payroll_end date,
  business_id uuid DEFAULT gen_random_uuid(),
  outlet_name text,
  normal_working_hours smallint,
  weekly_off_day smallint,
  pay_day date,
  undertime_overtime_inclusion boolean,
  CONSTRAINT employee_payroll_period_pkey PRIMARY KEY (id)
);
CREATE TABLE public.feature_access (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  business_id uuid DEFAULT gen_random_uuid(),
  table_management boolean,
  inbuilt_upi_payment boolean,
  industry_type text,
  invoice_feature boolean,
  expanse_management boolean,
  customer_display boolean,
  kitchen_display boolean,
  payroll_management boolean,
  attendance_managment boolean,
  reservation_management boolean,
  merchant_customer_management boolean,
  barcode_management boolean,
  employee_schedule_managment boolean,
  inventory_management boolean,
  ai_analyst_reporter boolean,
  CONSTRAINT feature_access_pkey PRIMARY KEY (id)
);
CREATE TABLE public.feature_request_mochaease_user (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  business_id uuid DEFAULT gen_random_uuid(),
  user_id uuid DEFAULT gen_random_uuid(),
  feature_title text,
  category text,
  description text,
  priority text,
  CONSTRAINT feature_request_mochaease_user_pkey PRIMARY KEY (id)
);
CREATE TABLE public.gmb_leads (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  business_name text NOT NULL,
  phone text,
  website text,
  address text,
  location text,
  category text,
  rating numeric,
  total_reviews integer,
  place_id text UNIQUE,
  is_chain boolean DEFAULT false,
  lead_score integer DEFAULT 0,
  source jsonb,
  created_at timestamp without time zone DEFAULT now(),
  pin_code text,
  email text,
  phone_type text,
  cleaned_phone_number text,
  source_query text,
  country_code text,
  CONSTRAINT gmb_leads_pkey PRIMARY KEY (id)
);
CREATE TABLE public.gofood_integrations (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  outlet_id uuid NOT NULL UNIQUE,
  encrypted_gofood_client_key text NOT NULL,
  encrypted_gofood_client_secret text NOT NULL,
  webhook_path text NOT NULL UNIQUE,
  is_active boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT gofood_integrations_pkey PRIMARY KEY (id),
  CONSTRAINT gofood_integrations_outlet_id_fkey FOREIGN KEY (outlet_id) REFERENCES public.business_details(outlet_id)
);
CREATE TABLE public.health_score_recommendations (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  health_score_id uuid NOT NULL,
  recommendation_text text NOT NULL,
  category USER-DEFINED NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT health_score_recommendations_pkey PRIMARY KEY (id),
  CONSTRAINT health_score_recommendations_health_score_id_fkey FOREIGN KEY (health_score_id) REFERENCES public.business_health_scores(id)
);
CREATE TABLE public.income_tax_slabs (
  id integer NOT NULL DEFAULT nextval('income_tax_slabs_id_seq'::regclass),
  min_income numeric NOT NULL,
  max_income numeric,
  tax_rate numeric NOT NULL,
  country_code character,
  base_tax_from_lower_brackets numeric,
  CONSTRAINT income_tax_slabs_pkey PRIMARY KEY (id)
);
CREATE TABLE public.inventory_audit_log (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  inventory_id bigint NOT NULL,
  business_id uuid NOT NULL,
  outlet_name text NOT NULL,
  item_name text NOT NULL,
  expected_quantity numeric NOT NULL,
  actual_quantity numeric NOT NULL,
  variance_quantity numeric NOT NULL,
  audited_by_user_id uuid NOT NULL,
  audit_date timestamp with time zone DEFAULT now(),
  audit_notes text,
  created_at timestamp with time zone DEFAULT now(),
  is_approved boolean NOT NULL DEFAULT false,
  CONSTRAINT inventory_audit_log_pkey PRIMARY KEY (id),
  CONSTRAINT fk_audit_log_inventory FOREIGN KEY (inventory_id) REFERENCES public.track_inventory(id)
);
CREATE TABLE public.inventory_batches (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  inventory_id bigint NOT NULL,
  business_id uuid NOT NULL,
  outlet_name text NOT NULL,
  batch_number text,
  quantity numeric NOT NULL,
  received_date date DEFAULT CURRENT_DATE,
  expiry_date date NOT NULL,
  status text DEFAULT 'active'::text,
  disposed_reason text,
  disposed_date timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT inventory_batches_pkey PRIMARY KEY (id),
  CONSTRAINT fk_batches_inventory FOREIGN KEY (inventory_id) REFERENCES public.track_inventory(id)
);
CREATE TABLE public.invoice_configurations (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  currency text NOT NULL UNIQUE,
  company_name text NOT NULL,
  company_address text NOT NULL,
  tax_id_label text NOT NULL,
  tax_id text NOT NULL,
  tax_rate numeric NOT NULL,
  is_tax_inclusive boolean NOT NULL DEFAULT false,
  logo_url text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  support_email text,
  website_url text,
  youtube_url text,
  instagram_url text,
  linkedin_url text,
  calendly_url text,
  whatsapp_url text,
  CONSTRAINT invoice_configurations_pkey PRIMARY KEY (id)
);
CREATE TABLE public.invoice_requests (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  order_number_n bigint NOT NULL,
  status text DEFAULT 'pending'::text,
  invoice_pdf_url text,
  error_message text,
  CONSTRAINT invoice_requests_pkey PRIMARY KEY (id)
);
CREATE TABLE public.invoices (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  external_id text NOT NULL UNIQUE,
  payment_url text NOT NULL,
  status text NOT NULL DEFAULT 'PENDING'::text,
  amount bigint NOT NULL,
  paid_at timestamp with time zone,
  xendit_subscription_id bigint,
  payment_provider text NOT NULL DEFAULT 'xendit'::text,
  razorpay_payment_link_id text,
  razorpay_payment_id text,
  razorpay_subscription_id bigint,
  pdf_url text,
  email_sent_at timestamp with time zone,
  CONSTRAINT invoices_pkey PRIMARY KEY (id),
  CONSTRAINT invoices_razorpay_subscription_id_fkey FOREIGN KEY (razorpay_subscription_id) REFERENCES public.subscriptions(id),
  CONSTRAINT invoices_xendit_subscription_id_fkey FOREIGN KEY (xendit_subscription_id) REFERENCES public.xendit_subscriptions(id)
);
CREATE TABLE public.job_applications (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now(),
  job_id text NOT NULL,
  job_title text NOT NULL,
  department text,
  full_name text NOT NULL,
  email text NOT NULL,
  linkedin_url text,
  github_url text,
  portfolio_url text,
  resume_url text,
  status text DEFAULT 'pending'::text CHECK (status = ANY (ARRAY['pending'::text, 'reviewed'::text, 'accepted'::text, 'rejected'::text])),
  CONSTRAINT job_applications_pkey PRIMARY KEY (id)
);
CREATE TABLE public.job_postings (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  department text NOT NULL,
  location text NOT NULL,
  type text NOT NULL,
  level text NOT NULL,
  description text NOT NULL,
  challenges jsonb DEFAULT '[]'::jsonb,
  requirements jsonb DEFAULT '[]'::jsonb,
  stack jsonb DEFAULT '[]'::jsonb,
  salary text,
  is_active boolean DEFAULT true,
  CONSTRAINT job_postings_pkey PRIMARY KEY (id)
);
CREATE TABLE public.kitchen_display_orders (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  business_id uuid NOT NULL,
  outlet_id uuid NOT NULL,
  user_id uuid NOT NULL,
  order_number text NOT NULL,
  items jsonb NOT NULL,
  kitchen_status text NOT NULL DEFAULT 'pending'::text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  local_time timestamp without time zone,
  CONSTRAINT kitchen_display_orders_pkey PRIMARY KEY (id),
  CONSTRAINT kitchen_display_orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.leave_requests (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  business_id uuid NOT NULL,
  outlet_id uuid NOT NULL,
  employee_uid uuid NOT NULL,
  leave_type text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  total_days integer NOT NULL DEFAULT 1,
  status text NOT NULL DEFAULT 'pending'::text,
  reason_user text,
  reason_manager text,
  approved_by_uid uuid,
  approved_at timestamp with time zone,
  CONSTRAINT leave_requests_pkey PRIMARY KEY (id)
);
CREATE TABLE public.marketing_contacts (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  businessName text,
  totalScore numeric,
  reviewsCount integer,
  street text,
  city text,
  state text,
  countryCode text,
  website text,
  phone text,
  categoryName text,
  url text,
  phone_clean text,
  wa_status text DEFAULT 'pending_verification'::text,
  last_verified_at timestamp with time zone,
  campaign_status text DEFAULT 'pending'::text,
  message_sent_at timestamp with time zone,
  message_id text,
  error_message text,
  CONSTRAINT marketing_contacts_pkey PRIMARY KEY (id)
);
CREATE TABLE public.merchant_invoice_requests (
  id integer NOT NULL DEFAULT nextval('email_queue_id_seq'::regclass),
  order_number_n bigint NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  status text DEFAULT 'pending'::text,
  invoice_pdf_url text,
  error_message text,
  CONSTRAINT merchant_invoice_requests_pkey PRIMARY KEY (id)
);
CREATE TABLE public.merchant_invoice_settings (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  business_id uuid NOT NULL,
  outlet_id uuid NOT NULL UNIQUE,
  logo_url text,
  digital_signature_url text,
  legal_business_name text NOT NULL,
  display_address text NOT NULL,
  city text NOT NULL,
  state_province text NOT NULL,
  postal_code text NOT NULL,
  country text NOT NULL,
  contact_phone text,
  contact_email text,
  tax_label text DEFAULT 'GSTIN'::text,
  tax_number text,
  bank_name text,
  account_holder_name text,
  account_number text,
  bank_ifsc_or_swift text,
  upi_id text,
  terms_and_conditions text,
  footer_note text,
  CONSTRAINT merchant_invoice_settings_pkey PRIMARY KEY (id)
);
CREATE TABLE public.mochaease_company_details (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  business_name text,
  business_address text,
  country_id text,
  phone_number text,
  email text,
  company_tax_id text,
  company_logo text,
  CONSTRAINT mochaease_company_details_pkey PRIMARY KEY (id)
);
CREATE TABLE public.mochaease_internal_employees (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  is_active boolean DEFAULT true,
  receive_daily_demo_report boolean DEFAULT false,
  receive_weekly_summary boolean DEFAULT false,
  CONSTRAINT mochaease_internal_employees_pkey PRIMARY KEY (id)
);
CREATE TABLE public.mochaease_partner_newletters (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  email text,
  industry text,
  CONSTRAINT mochaease_partner_newletters_pkey PRIMARY KEY (id)
);
CREATE TABLE public.new_customers (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  user_id uuid DEFAULT gen_random_uuid(),
  business_id uuid DEFAULT gen_random_uuid(),
  customer_name text,
  customer_email text,
  customer_birthday timestamp without time zone,
  customer_phone text,
  outlet_id uuid,
  CONSTRAINT new_customers_pkey PRIMARY KEY (id)
);
CREATE TABLE public.order_number (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  user_id uuid DEFAULT gen_random_uuid(),
  order_number bigint UNIQUE,
  business_id uuid DEFAULT gen_random_uuid(),
  outlet_name text DEFAULT '0'::text,
  CONSTRAINT order_number_pkey PRIMARY KEY (id)
);
CREATE TABLE public.orders (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  outlet_id uuid NOT NULL,
  gofood_order_id text NOT NULL UNIQUE,
  order_payload jsonb NOT NULL,
  status text NOT NULL DEFAULT 'new'::text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT orders_pkey PRIMARY KEY (id),
  CONSTRAINT orders_outlet_id_fkey FOREIGN KEY (outlet_id) REFERENCES public.business_details(outlet_id)
);
CREATE TABLE public.outlet_sales_goal (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  user_id uuid DEFAULT gen_random_uuid(),
  business_id uuid DEFAULT gen_random_uuid(),
  outlet_sales_goal double precision,
  outlet_name text,
  role_id text,
  outlet_id uuid,
  CONSTRAINT outlet_sales_goal_pkey PRIMARY KEY (id)
);
CREATE TABLE public.payment_method_options (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  country_code text NOT NULL,
  category text NOT NULL,
  provider_name text NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT payment_method_options_pkey PRIMARY KEY (id)
);
CREATE TABLE public.payroll_configuration (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  business_id uuid NOT NULL,
  outlet_id uuid NOT NULL UNIQUE,
  period_start_day smallint NOT NULL CHECK (period_start_day >= 1 AND period_start_day <= 28),
  pay_day_of_month smallint NOT NULL CHECK (pay_day_of_month >= 1 AND pay_day_of_month <= 31),
  normal_working_hours smallint NOT NULL,
  weekly_off_day smallint NOT NULL,
  undertime_overtime_inclusion boolean NOT NULL DEFAULT false,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  country_code character,
  CONSTRAINT payroll_configuration_pkey PRIMARY KEY (id),
  CONSTRAINT fk_payroll_config_country FOREIGN KEY (country_code) REFERENCES public.countries(code)
);
CREATE TABLE public.plan_pricing (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  plan_name text NOT NULL,
  billing_cycle text NOT NULL,
  currency text NOT NULL,
  price numeric,
  discount_percent numeric DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  trial_period_days integer NOT NULL DEFAULT 0,
  razorpay_plan_id text,
  user_limit_per_outlet smallint,
  CONSTRAINT plan_pricing_pkey PRIMARY KEY (id)
);
CREATE TABLE public.pos_qr_payments (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  merchant_id uuid NOT NULL,
  amount numeric NOT NULL,
  razorpay_qr_id text,
  qr_image_url text,
  status text DEFAULT 'pending'::text,
  razorpay_payment_id text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  paid_at timestamp with time zone,
  outlet_id uuid,
  CONSTRAINT pos_qr_payments_pkey PRIMARY KEY (id)
);
CREATE TABLE public.printer_connection (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  user_id uuid,
  business_id uuid DEFAULT gen_random_uuid(),
  mac_address_printer text,
  outlet_id uuid DEFAULT gen_random_uuid(),
  paper_size smallint,
  CONSTRAINT printer_connection_pkey PRIMARY KEY (id)
);
CREATE TABLE public.product_recipes (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  outlet_name text,
  product_name text,
  ingredient_name text,
  quantity numeric,
  measuring_unit text,
  user_id uuid DEFAULT gen_random_uuid(),
  business_id uuid DEFAULT gen_random_uuid(),
  CONSTRAINT product_recipes_pkey PRIMARY KEY (id)
);
CREATE TABLE public.promo_code_usages (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  user_id uuid NOT NULL,
  promo_code_id bigint NOT NULL,
  business_id uuid,
  CONSTRAINT promo_code_usages_pkey PRIMARY KEY (id),
  CONSTRAINT promo_code_usages_promo_code_id_fkey FOREIGN KEY (promo_code_id) REFERENCES public.promo_codes(id),
  CONSTRAINT promo_code_usages_user_id_fkey_cascade FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.promo_codes (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  code text NOT NULL UNIQUE,
  discount_type text NOT NULL CHECK (discount_type = ANY (ARRAY['PERCENT'::text, 'FIXED_AMOUNT'::text])),
  discount_value numeric NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  expires_at timestamp with time zone,
  max_uses integer,
  uses_count integer NOT NULL DEFAULT 0,
  CONSTRAINT promo_codes_pkey PRIMARY KEY (id)
);
CREATE TABLE public.reminder_messages (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  user_id uuid DEFAULT gen_random_uuid(),
  title text,
  message text,
  schedule_at timestamp without time zone,
  business_id uuid DEFAULT gen_random_uuid(),
  outlet_name text,
  frequency text,
  CONSTRAINT reminder_messages_pkey PRIMARY KEY (id)
);
CREATE TABLE public.resend_api_key (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  resend_api_key text,
  CONSTRAINT resend_api_key_pkey PRIMARY KEY (id)
);
CREATE TABLE public.roles (
  id integer NOT NULL DEFAULT nextval('roles_id_seq'::regclass),
  role_id text NOT NULL UNIQUE,
  CONSTRAINT roles_pkey PRIMARY KEY (id)
);
CREATE TABLE public.saved_order_details (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  category_name text,
  user_id uuid DEFAULT gen_random_uuid(),
  product_name text,
  product_price double precision,
  product_image text,
  qty smallint,
  order_number smallint,
  cashier_name text,
  order_type text,
  table_number text,
  customer_name text,
  cafe_name text,
  business_id uuid,
  email text,
  outlet_id uuid,
  order_number_n bigint,
  CONSTRAINT saved_order_details_pkey PRIMARY KEY (id)
);
CREATE TABLE public.sent_emails (
  order_number bigint NOT NULL,
  sent_at timestamp without time zone DEFAULT now(),
  CONSTRAINT sent_emails_pkey PRIMARY KEY (order_number)
);
CREATE TABLE public.set_employee_shift (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  business_id uuid DEFAULT gen_random_uuid(),
  user_id uuid DEFAULT gen_random_uuid(),
  shift_details text,
  shift_start_time time without time zone,
  shift_end_time time without time zone,
  outlet_name text,
  shift_rotation text,
  store_opening_schedule text,
  shift_sales_goal double precision,
  outlet_id uuid,
  CONSTRAINT set_employee_shift_pkey PRIMARY KEY (id)
);
CREATE TABLE public.set_outlet_currency (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  business_id uuid,
  outlet_id uuid,
  business_name text,
  outlet_currency text,
  outlet_name text,
  CONSTRAINT set_outlet_currency_pkey PRIMARY KEY (id)
);
CREATE TABLE public.set_shift_target (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  morning_shift_target double precision,
  evening_shift_target double precision,
  user_id uuid DEFAULT '42acb099-b9cd-465a-8fae-4b94fe6d7611'::uuid,
  business_id uuid,
  outlet_id uuid,
  CONSTRAINT set_shift_target_pkey PRIMARY KEY (id)
);
CREATE TABLE public.shift_change_requests (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  user_id uuid NOT NULL,
  employee_name text NOT NULL,
  outlet_name text NOT NULL,
  current_off_day date NOT NULL,
  requested_off_day date NOT NULL,
  status text DEFAULT 'Pending'::text CHECK (status = ANY (ARRAY['Pending'::text, 'Approved'::text, 'Denied'::text])),
  approved_by text,
  business_id uuid DEFAULT gen_random_uuid(),
  employee_id uuid DEFAULT gen_random_uuid(),
  CONSTRAINT shift_change_requests_pkey PRIMARY KEY (id)
);
CREATE TABLE public.shift_details (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  user_id uuid DEFAULT gen_random_uuid(),
  shift_starting_time timestamp without time zone,
  shift_ending_time timestamp without time zone,
  cash_drawer_starting_amount double precision,
  cash_drawer_ending_amount double precision,
  shift_status boolean,
  business_id uuid DEFAULT gen_random_uuid(),
  outlet_name text,
  user_name text,
  overtime_or_undertime numeric DEFAULT '0'::numeric,
  outlet_id uuid,
  requires_review boolean NOT NULL DEFAULT false,
  CONSTRAINT shift_details_pkey PRIMARY KEY (id),
  CONSTRAINT fk_shift_outlet FOREIGN KEY (outlet_id) REFERENCES public.business_details(outlet_id)
);
CREATE TABLE public.subscription_plans_razarpay (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  plan_id_razarpay character varying,
  plan_name text,
  amount bigint,
  billing_cycle text,
  country_id text,
  trial_period_days integer NOT NULL DEFAULT 0,
  CONSTRAINT subscription_plans_razarpay_pkey PRIMARY KEY (id)
);
CREATE TABLE public.subscriptions (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  user_id uuid NOT NULL,
  razorpay_plan_id text,
  razorpay_subscription_id text UNIQUE,
  status text,
  current_period_end timestamp without time zone,
  plan_name text,
  invoice_url text,
  business_id uuid,
  mode USER-DEFINED NOT NULL DEFAULT 'paid'::subscription_mode,
  trial_ends_at timestamp with time zone,
  plan_pricing_id bigint,
  trial_email_sent_at timestamp with time zone,
  CONSTRAINT subscriptions_pkey PRIMARY KEY (id),
  CONSTRAINT subscriptions_plan_pricing_id_fkey FOREIGN KEY (plan_pricing_id) REFERENCES public.plan_pricing(id),
  CONSTRAINT subscriptions_user_id_fkey_cascade FOREIGN KEY (user_id) REFERENCES public.users(id)
);
CREATE TABLE public.table_number (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  user_id uuid DEFAULT gen_random_uuid(),
  business_id uuid DEFAULT gen_random_uuid(),
  role_id text,
  table_number text,
  outlet_id uuid,
  CONSTRAINT table_number_pkey PRIMARY KEY (id)
);
CREATE TABLE public.tasks (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  business_id uuid NOT NULL,
  outlet_name text NOT NULL,
  title text NOT NULL,
  description text,
  status text NOT NULL DEFAULT 'todo'::text CHECK (lower(status) = ANY (ARRAY['todo'::text, 'in_progress'::text, 'review'::text, 'done'::text, 'cancelled'::text])),
  priority text NOT NULL DEFAULT 'medium'::text CHECK (lower(priority) = ANY (ARRAY['low'::text, 'medium'::text, 'high'::text, 'critical'::text])),
  assigned_to_user_id uuid,
  created_by_user_id uuid,
  due_date timestamp with time zone,
  recommendation_reference_id text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  employee_name text,
  CONSTRAINT tasks_pkey PRIMARY KEY (id)
);
CREATE TABLE public.track_inventory (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  business_id uuid NOT NULL,
  outlet_name text NOT NULL,
  item_name text NOT NULL,
  sku text,
  base_unit_of_measure text,
  quantity_on_hand numeric NOT NULL DEFAULT 0.00,
  average_cost_per_base_unit numeric DEFAULT 0.00,
  last_purchase_unit text,
  last_purchase_quantity numeric,
  last_purchase_price_per_unit numeric,
  last_purchase_size_info text,
  needs_review boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  last_updated_at timestamp with time zone NOT NULL DEFAULT now(),
  last_updated_by_user_id uuid,
  suggested_category text,
  suggested_base_unit text,
  extracted_attributes jsonb,
  user_defined_purchase_unit text,
  user_defined_conversion_factor numeric,
  outlet_id uuid,
  lead_time_days integer NOT NULL DEFAULT 3,
  track_expiry boolean NOT NULL DEFAULT false,
  last_purchase_expiry_date date,
  target_stock_days integer NOT NULL DEFAULT 30,
  CONSTRAINT track_inventory_pkey PRIMARY KEY (id)
);
CREATE TABLE public.users (
  id uuid NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  first_name text,
  last_name text,
  email text,
  phone_number bigint,
  business_id uuid DEFAULT gen_random_uuid(),
  business_name text,
  role_id text DEFAULT ''::text,
  profile_pic text,
  outlet_name text,
  country_name text,
  account_status text,
  industry_type text,
  updated_at timestamp with time zone,
  CONSTRAINT users_pkey PRIMARY KEY (id),
  CONSTRAINT users_id_fkey_cascade FOREIGN KEY (id) REFERENCES auth.users(id)
);
