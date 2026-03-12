-- ============================================================
-- NEW BLOG POST: Test Article
-- Run this in Supabase Dashboard → SQL Editor
-- Uses $$ dollar quoting so apostrophes in content never break!
-- ============================================================

-- Step 1: Insert the parent blog row
INSERT INTO public.blogs (id, canonical_slug, featured_image, author, tags, status)
VALUES (
  '00000001-0000-0000-0000-000000000007',
  'inventory-mistakes-fb-chains',
  'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80',
  'Rohan Mehra, Operations Lead',
  ARRAY['Cafe Management', 'Retail Tips'],
  'published'
)
ON CONFLICT (id) DO NOTHING;


-- Step 2: Insert the English translation
-- Note: dollar quoting ($$) is used for content_html so apostrophes work fine
DO $$
DECLARE
  v_content TEXT;
BEGIN
  v_content := $content$
<h2>The Problem Nobody Talks About</h2>
<p>Ask any F&amp;B chain owner what their biggest challenge is, and they will say hiring, or rising ingredient costs, or customer acquisition. Rarely will they point to <strong>inventory management</strong> — yet it is quietly draining 15 to 20 percent of their profit margin every single month.</p>
<p>The good news? These losses stem from three specific, repeatable mistakes — all of which modern POS and operations software can detect and auto-correct before they cost you another rupee.</p>

<h2>Mistake #1: Ordering Based on Gut Feel, Not Data</h2>
<p>The most common practice in independent F&amp;B outlets is what operators call the "Friday Phone Call" — the manager walks the back-of-house, eyeballs the shelves, and calls the supplier with rough quantities based on memory and instinct.</p>
<p>The consequences are severe and predictable:</p>
<li><strong>Over-ordering perishables</strong> that expire before the next busy weekend hits.</li>
<li><strong>Under-ordering popular SKUs</strong> that cause stockouts on your highest-margin items during peak hours.</li>
<li><strong>No accountability</strong> — when stock runs short, nobody can trace why.</li>
<p>The fix is simple: let sales velocity data drive your purchase orders. A real-time POS system tracks exactly how many units of every ingredient or product were consumed each day. Layered with local event calendars and weather data, it can auto-draft your purchase orders with near-perfect accuracy. Chains using data-driven ordering report an average <strong>40% reduction in perishable waste</strong> within the first quarter.</p>

<h2>Mistake #2: No Variance Tracking Between Theoretical and Actual Usage</h2>
<p>This is the silent killer that accountants hate and operators ignore: the gap between what your recipes say you <em>should</em> have used and what you <em>actually</em> used.</p>
<p>Every kitchen has wastage — burnt batches, over-portioning, spills, and yes, sometimes theft. The question is: <strong>do you know exactly how much?</strong></p>
<p>Most operations only discover a problem when the monthly stock count throws up a number that does not match. By then, the damage is done and untraceable.</p>
<p>Modern operations platforms solve this by calculating your <strong>theoretical consumption</strong> in real time — every time a menu item is sold, the system automatically deducts the recipe quantities from your ingredient inventory. At any moment, you can run a variance report that flags exactly which ingredients are being consumed faster than they should be, at which outlet, on which shift.</p>
<li><strong>A variance under 3%</strong> is normal kitchen wastage.</li>
<li><strong>A variance of 5 to 8%</strong> suggests over-portioning or preparation inconsistency.</li>
<li><strong>A variance above 10%</strong> almost certainly means a process breakdown or internal theft that requires immediate investigation.</li>

<h2>Mistake #3: Treating All Outlets the Same</h2>
<p>Multi-location operators often run a single, centralised menu and reorder schedule for all their outlets. It seems logical — but it is a costly oversimplification.</p>
<p>A flagship cafe in a corporate hub has completely different demand curves than your outlet inside a mall. One sells 200 black coffees before 10 AM; the other sells mostly blended drinks after noon. Running both outlets on identical inventory schedules means the mall outlet is perpetually over-stocked on Arabica beans and running out of frappe base — while the corporate outlet does the reverse.</p>
<p>The solution is <strong>outlet-level inventory intelligence</strong>. Each location should have its own historical sales profile that drives its own distinct reorder points, par levels, and supplier schedules. Centralised visibility with localised control is the new standard for any chain operating more than two outlets.</p>

<h2>The Compounding Effect of Getting This Right</h2>
<p>When these three mistakes are eliminated simultaneously, the impact is not additive — it is multiplicative. Operators who implement data-driven inventory control typically see:</p>
<li>15 to 20% reduction in food cost percentage within 90 days</li>
<li>Near elimination of out-of-stock moments that damage brand trust</li>
<li>Leaner working capital requirements as over-stocking cash gets freed up</li>
<li>Faster, more confident supplier negotiations backed by real consumption data</li>
<p>Inventory is not a back-office function. It is the engine of your profitability. Getting it right is one of the highest-leverage actions any F&amp;B operator can take — and with the right platform, it is no longer even difficult.</p>
$content$;

  INSERT INTO public.blog_translations (
    blog_id,
    language_code,
    title,
    excerpt,
    slug_localized,
    content_html,
    seo_description,
    seo_keywords,
    published_at,
    is_published
  )
  VALUES (
    '00000001-0000-0000-0000-000000000007',
    'en',
    'The 3 Biggest Inventory Mistakes F&B Chains Make (And How to Fix Them)',
    'Most food and beverage operators are losing 15 to 20 percent of their profit margin to three completely preventable inventory errors. Here is what they are and exactly how smart POS data eliminates them.',
    'inventory-mistakes-fb-chains',
    v_content,
    'Most F&B operators lose 15 to 20 percent of profit margin to three preventable inventory mistakes. Learn what they are and how smart POS data fixes them.',
    ARRAY['inventory management', 'F&B operations', 'food cost control', 'restaurant POS', 'multi-outlet management', 'MochaEase'],
    '2025-03-09 07:00:00+00',
    true
  )
  ON CONFLICT (slug_localized) DO NOTHING;
END;
$$;


-- After running, visit:
-- https://preview.mochaease.com/blog
-- A new 7th article should appear in the blog grid!
