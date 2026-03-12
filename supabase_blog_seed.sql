-- ============================================================
-- MochaEase Blog Seed Script
-- Run this in your Supabase Dashboard → SQL Editor
-- This seeds the existing 6 static blog posts into the DB.
-- ============================================================

-- Step 1: Insert parent blog rows
INSERT INTO public.blogs (id, canonical_slug, featured_image, author, tags, status)
VALUES
  ('00000001-0000-0000-0000-000000000001', 'ai-future-inventory',     '/blog/blog_ai_inventory_1773002441722.png',     'Sarah Chen, Product Lead', ARRAY['Product Updates'],  'published'),
  ('00000001-0000-0000-0000-000000000002', 'offline-first-pos',       '/blog/blog_offline_pos_1773002463665.png',      'Rahul Gupta',              ARRAY['Cafe Management'],  'published'),
  ('00000001-0000-0000-0000-000000000003', 'building-loyalty-crm',    '/blog/blog_loyalty_crm_1773002482486.png',      'Tina Agarwal',             ARRAY['Retail Tips'],      'published'),
  ('00000001-0000-0000-0000-000000000004', 'mochaease-ecosystem-sync','/blog/blog_ecosystem_sync_1773002498734.png',   'Vikram Singh, CTO',        ARRAY['Product Updates'],  'published'),
  ('00000001-0000-0000-0000-000000000005', 'managing-genz-staff',     '/blog/blog_genz_staff_1773002519251.png',       'Maya Patel',               ARRAY['Retail Tips'],      'published'),
  ('00000001-0000-0000-0000-000000000006', 'franchise-royalty-reports','/blog/blog_franchise_reports_1773002538260.png','Arjun Reddy',             ARRAY['Enterprise'],       'published')
ON CONFLICT (id) DO NOTHING;


-- Step 2: Insert English translations for each blog
INSERT INTO public.blog_translations (blog_id, language_code, title, excerpt, slug_localized, content_html, seo_description, seo_keywords, published_at, is_published)
VALUES

-- Post 1: AI Inventory
(
  '00000001-0000-0000-0000-000000000001', 'en',
  'How AI is Rewriting the Future of Multi-Outlet Inventory Management',
  'Discover how predictive forecasting is reducing stockouts by 40% and cutting perishables waste in half across Asian F&B chains.',
  'ai-future-inventory',
  '<h2>The Chaos of Spreadsheets</h2>
  <p>If you are managing inventory across five or more outlets, you know the pain of Monday morning stock counts. Managers guessing their par levels, central kitchens over-prepping, and ultimately—thousands of dollars of organic produce winding up in the bin by Friday night.</p>
  <p>Traditional Point-of-Sale (POS) systems only tell you what you <em>did</em> sell. They run historical reports that look backward. But in the fast-paced food and beverage industry, pulling a report from last month doesn''t help you order for a sudden heatwave this weekend.</p>
  <h2>Enter Predictive AI</h2>
  <p>Modern enterprise Operations systems like MochaEase 2.0 aren''t just recording data; they''re learning from it.</p>
  <p>By analyzing millions of data points—from localized weather forecasts, local holidays, foot traffic patterns, and historical sales trends—our AI models calculate predictive par levels for every single SKU.</p>
  <h3>Impact at Scale</h3>
  <p>For a mid-sized coffee chain:</p>
  <ul>
    <li><strong>40% Reduction in Stockouts:</strong> No more turning away customers because you ran out of oat milk at 10 AM.</li>
    <li><strong>50% Cut in Perishables Waste:</strong> The system knows when demand is going to drop, advising central kitchens to scale back prep specifically on short-shelf-life items.</li>
    <li><strong>Automated Supplier Sync:</strong> When the AI detects a forecasted spike in demand, it automatically drafts the purchase order for your suppliers.</li>
  </ul>
  <p>The future of multi-outlet management isn''t working harder to review reports; it''s trusting intelligent systems to keep you stocked, profitable, and focused on your customers.</p>',
  'Discover how predictive AI forecasting is reducing stockouts by 40% across Asian F&B chains.',
  ARRAY['inventory management', 'AI forecasting', 'food waste reduction', 'POS systems', 'MochaEase'],
  '2024-10-12 00:00:00+00', true
),

-- Post 2: Offline POS
(
  '00000001-0000-0000-0000-000000000002', 'en',
  '5 Reasons Your Cafe Needs an Offline-First POS',
  'Internet drops shouldn''t mean pausing your business. Here is why an offline-first POS architecture is non-negotiable for high-volume cafes.',
  'offline-first-pos',
  '<h2>The Nightmare of the Spinning Wheel</h2>
  <p>It''s 8:30 in the morning. A line is practically out the door of your cafe. The barista is pulling shots at record speed. And suddenly—the Wi-Fi router blinks red.</p>
  <p>If your Point of Sale relies entirely on the cloud, your entire operation just slammed to a halt. This is exactly why <strong>Offline-First Architecture</strong> isn''t a luxury feature—it''s a fundamental requirement.</p>
  <h3>1. Zero Downtime Transactions</h3>
  <p>An offline-first POS operates locally on the iPad or terminal. When the internet drops, it seamlessly switches to an internal local-area network (LAN) mode.</p>
  <h3>2. No Data Loss</h3>
  <p>Every transaction completed while offline is securely encrypted and stored locally on the device''s hard drive. The moment you regain connectivity, the system quietly syncs all data to the cloud.</p>
  <h3>3. Kitchen Operations Stay Intact</h3>
  <p>Offline-first systems route print jobs through a local IP network, meaning the barista and kitchen never lose their sync.</p>
  <h3>4. Staff Confidence</h3>
  <p>When technology breaks, panic sets in. An offline-first system removes this anxiety from your front-of-house staff, allowing them to remain focused on hospitality.</p>',
  'Why an offline-first POS architecture is non-negotiable for high-volume cafes.',
  ARRAY['offline POS', 'cafe management', 'cloud POS reliability', 'restaurant operations'],
  '2024-10-05 00:00:00+00', true
),

-- Post 3: Loyalty CRM
(
  '00000001-0000-0000-0000-000000000003', 'en',
  'Building a Loyalty Program That Actually Works',
  'Stop using physical stamp cards. Learn how to leverage digital CRM and automated WhatsApp campaigns to turn walk-ins into regulars.',
  'building-loyalty-crm',
  '<h2>Beyond the Paper Stamp Card</h2>
  <p>Walk into almost any indie coffee shop and you''ll find a massive fishbowl of crumpled paper loyalty cards on the counter. Customers lose them, staff forget to stamp them, and business owners get zero data from them.</p>
  <p>In 2024, if you aren''t capturing a phone number or email with your transactions, you are leaving money on the table.</p>
  <h3>The Power of Digital CRM</h3>
  <ul>
    <li><strong>Frictionless Onboarding:</strong> Cashiers can enroll a customer simply by asking for their phone number during checkout. No app downloads required.</li>
    <li><strong>Behavioral Tracking:</strong> You learn instantly that a customer always visits on Tuesday mornings and orders an Iced Oat Latte.</li>
    <li><strong>Automated Re-engagement:</strong> If a customer hasn''t visited in 14 days, the system fires off a personalized WhatsApp message with a discount.</li>
  </ul>
  <h3>Gamification Yields Retention</h3>
  <p>When customers can track their points digitally via Apple Wallet integration, it creates a gamified loop that dramatically increases their lifetime value to your brand.</p>',
  'How to leverage digital CRM and automated WhatsApp campaigns to build loyalty.',
  ARRAY['loyalty programs', 'CRM', 'retail marketing', 'customer retention', 'WhatsApp campaigns'],
  '2024-09-28 00:00:00+00', true
),

-- Post 4: Ecosystem Sync
(
  '00000001-0000-0000-0000-000000000004', 'en',
  'MochaEase 2.0: The Ecosystem Approach',
  'We rebuilt our core architecture to seamlessly sync iOS, Android, and Web backoffice in real-time. Here is a look under the hood.',
  'mochaease-ecosystem-sync',
  '<h2>Silos Hinder Growth</h2>
  <p>For years, restaurant technology has been heavily siloed. The team managing the kitchen display system used one app, front-of-house staff used an iPad POS, and management used a clunky web dashboard that only updated every 24 hours.</p>
  <h2>Introducing the Unified Ecosystem</h2>
  <p>With the launch of <strong>MochaEase 2.0</strong>, we completely rewrote our backend architecture utilizing edge-compute nodes and WebSockets to create a perfectly synchronized web of data.</p>
  <ul>
    <li><strong>Real-Time Menu Publishing:</strong> Change the price of a croissant on your laptop and watch the price update instantly on every device.</li>
    <li><strong>Live Sales Dashboards:</strong> Area managers can watch gross sales tick upward in real-time on their mobile app.</li>
    <li><strong>Universal Platform Support:</strong> MochaEase runs natively on iOS, flawlessly on Android, and lightning-fast on any Web Browser.</li>
  </ul>
  <p>We don''t build disconnected tools; we build a living ecosystem that breathes with your business.</p>',
  'A look at how MochaEase 2.0 syncs iOS, Android, and Web backoffice in real-time.',
  ARRAY['POS architecture', 'real-time sync', 'MochaEase 2.0', 'restaurant technology', 'cloud ecosystem'],
  '2024-09-15 00:00:00+00', true
),

-- Post 5: Gen Z Staff
(
  '00000001-0000-0000-0000-000000000005', 'en',
  'Managing Gen Z Staff in the QSR Industry',
  'Retention is the new recruitment. Practical frameworks for onboarding, scheduling, and retaining young talent in fast-paced environments.',
  'managing-genz-staff',
  '<h2>A New Generational Workforce</h2>
  <p>The Quick Service Restaurant (QSR) sector relies heavily on young, entry-level talent. But the old management playbooks—rigid shift requirements and top-down communication—are actively driving Gen Z workers away.</p>
  <h3>Shift Flexibility via Software</h3>
  <p>Gen Z highly values work-life balance. By utilizing integrated Staff Management software, employees can view their upcoming shifts on their smartphones, request shift swaps instantly, and set personal dark-out dates for exams.</p>
  <h3>Instant Communication</h3>
  <p>Move away from confusing WhatsApp groups where important announcements get buried. A unified team communication app ensures training modules and menu updates are delivered clearly.</p>
  <h3>Fast Payments</h3>
  <p>Consider integrating daily or weekly wage-access tools. The ability to track earned wages in real-time provides immense job satisfaction and reduces anxiety.</p>',
  'Practical frameworks for onboarding, scheduling, and retaining Gen Z talent in QSR.',
  ARRAY['QSR staffing', 'Gen Z management', 'restaurant scheduling software', 'employee retention'],
  '2024-09-02 00:00:00+00', true
),

-- Post 6: Franchise Reports
(
  '00000001-0000-0000-0000-000000000006', 'en',
  'Demystifying Franchise Royalty Reports',
  'Manual royalty calculations cause friction between HQ and franchisees. See how automated gross-sales reporting restores trust.',
  'franchise-royalty-reports',
  '<h2>The Trust Deficit</h2>
  <p>In the franchise model, the relationship between Headquarters and the Franchise Owner is delicate. The friction often stems from one tedious monthly event: Royalty Calculations.</p>
  <p>When HQ relies on the franchisee to manually export end-of-month sales figures and calculate percentage splits on spreadsheets, it introduces delays, human error, and a baseline level of mistrust.</p>
  <h3>Automation Brings Transparency</h3>
  <ul>
    <li><strong>Automated Gross-Sales Aggregation:</strong> Advanced enterprise software automatically isolates gross sales from tax liabilities and voided items natively in the cloud.</li>
    <li><strong>Instant Royalty Ledgers:</strong> HQ maintains a live dashboard viewing the royalty split accumulating in real-time, completely verified by the terminal ledgers.</li>
    <li><strong>Automated Invoicing:</strong> On the 1st of the month, the system automatically generates an immutable invoice and initiates the transfer.</li>
  </ul>
  <p>When the technology acts as a neutral, flawless mediator, business partners can stop squabbling over spreadsheet errors and focus on scaling the brand.</p>',
  'How automated gross-sales reporting removes friction from franchise royalty calculations.',
  ARRAY['franchise management', 'royalty automation', 'enterprise POS', 'restaurant chains', 'business scaling'],
  '2024-08-20 00:00:00+00', true
)
ON CONFLICT (slug_localized) DO NOTHING;
