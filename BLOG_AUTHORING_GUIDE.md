# MochaEase Blog Authoring Guide

> Follow this guide every time you write a new article.
> A well-structured post keeps readers engaged, looks great on the site, and ranks better on Google.

---

## 1. The Golden Structure

Every article should follow this exact flow:

```
1. Hook paragraph  (the problem / why it matters)
2. h2: First major section
3. Body paragraphs + list items
4. [Optional] Inline image or video
5. h2: Second major section
...
6. h2: Closing / takeaway section
```

**Word count target:** 600–1,200 words. Long enough to be useful, short enough to actually be read.

---

## 2. SQL Template to Insert a New Article

Copy this into Supabase → SQL Editor. Replace all `PLACEHOLDER` values.

```sql
-- Step 1: Create the blog row
INSERT INTO public.blogs (id, canonical_slug, featured_image, author, tags, status)
VALUES (
  gen_random_uuid(),
  'your-slug-here',                          -- URL slug, lowercase, hyphens only
  'https://your-image-url.com/image.jpg',    -- Hero / cover image (1200x630px ideal)
  'Your Name, Your Role',
  ARRAY['Product Updates'],                  -- Pick one: Product Updates | Cafe Management | Retail Tips | Enterprise
  'published'
);

-- Step 2: Insert the English translation using dollar quoting
DO $$
DECLARE
  v_id UUID;
  v_content TEXT;
BEGIN
  SELECT id INTO v_id FROM public.blogs WHERE canonical_slug = 'your-slug-here';

  v_content := $content$

  <!-- YOUR ARTICLE HTML GOES HERE — see Section 3 for all allowed HTML -->

  $content$;

  INSERT INTO public.blog_translations (
    blog_id, language_code, title, excerpt,
    slug_localized, content_html, seo_description,
    seo_keywords, published_at, is_published
  )
  VALUES (
    v_id, 'en',
    'Your Full Article Title Here',
    'A 1–2 sentence summary that appears on the blog card and in SEO meta description. Make it compelling.',
    'your-slug-here',
    v_content,
    'SEO description — same as excerpt or slightly reworded. Max 160 characters.',
    ARRAY['keyword 1', 'keyword 2', 'keyword 3'],
    now(),
    true
  );
END;
$$;
```

---

## 3. HTML Elements Reference

Use these exact HTML snippets inside `v_content`. All are fully styled.

### Heading 2 — Major Section Break
```html
<h2>Your Section Title Here</h2>
```
> Use for major topic shifts. Each h2 gets a full separator line below it and generous spacing above.

### Heading 3 — Sub-section
```html
<h3>Your Subsection Title</h3>
```
> Gets a lime-green left border accent. Use inside a section to break up sub-topics.

### Paragraph
```html
<p>Your paragraph text here. Use full sentences. Aim for 3–5 sentences per paragraph before a break.</p>
```

### Bold text inside a paragraph
```html
<p>This is a normal sentence, and <strong>this part is super important</strong> so it stands out.</p>
```

### Bullet / List Items (styled as pill cards)
Always wrap `<li>` in a `<ul>`:
```html
<ul>
  <li><strong>Key Term:</strong> Explanation of what it means and why it matters.</li>
  <li><strong>Another Point:</strong> Description here.</li>
  <li><strong>Third Point:</strong> Keep each item to 1–2 sentences.</li>
</ul>
```
> Each `<li>` renders as a dark pill card with a green `→` arrow. Looks premium.

### Blockquote — Pull Quote
```html
<blockquote>
  This is a key insight or striking statistic that deserves to stand out on its own.
</blockquote>
```

### Callout Box — Stat Highlight
```html
<div class="callout">
  <strong>40% reduction</strong>
  in perishable waste within the first 90 days of switching to data-driven ordering.
</div>
```
> Use for big numbers, key metrics, or important warnings. Gets a lime/blue gradient background.

---

## 4. Inline Images

Upload your image to Cloudinary, Supabase Storage, or Unsplash, then embed:

### Simple image
```html
<img src="https://your-image-url.com/image.jpg" alt="Descriptive alt text" />
```

### Image with caption (recommended)
```html
<figure>
  <img src="https://your-image-url.com/image.jpg" alt="Descriptive alt text" />
  <figcaption>Caption: What this image shows and why it matters.</figcaption>
</figure>
```

**Image specs:**
- Width: `1200px` minimum for full-width display
- Aspect ratio: `16:9` or `3:2` looks best
- Format: WebP preferred, JPG acceptable
- Max file size: 500KB (compress before uploading)

**Free image sources:** [Unsplash](https://unsplash.com) · [Pexels](https://pexels.com) · [StockSnap](https://stocksnap.io)

---

## 5. Video Embeds (YouTube)

Always use the `video-wrapper` div for responsive 16:9 video:

```html
<div class="video-wrapper">
  <iframe
    src="https://www.youtube.com/embed/VIDEO_ID_HERE"
    title="Video title here"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
  </iframe>
</div>
```

To get the `VIDEO_ID_HERE`: Go to your YouTube video → Share → Copy Link → the ID is the part after `?v=` in the URL.

**Example:** `https://youtube.com/watch?v=dQw4w9WgXcQ` → ID is `dQw4w9WgXcQ`

---

## 6. Article Checklist Before Publishing

Before setting `is_published = true`, check all of these:

**Content**
- [ ] Title is specific and benefit-driven (not generic like "Our New Feature")
- [ ] Excerpt is 1–2 compelling sentences and under 160 characters
- [ ] Article has at least 2 `<h2>` section breaks
- [ ] No paragraphs longer than 6 sentences
- [ ] At least one `<ul>` list or `<blockquote>` for visual variety
- [ ] Ends with a clear takeaway or call to action

**Images**
- [ ] Cover image is set in `featured_image` column
- [ ] All inline images have `alt` text
- [ ] Images are compressed (< 500KB each)

**SEO & Metadata**
- [ ] `slug_localized` is lowercase, hyphen-separated, no special characters
- [ ] `seo_description` is under 160 characters
- [ ] `seo_keywords` has 4–6 relevant keywords
- [ ] `author` field is `Full Name, Role` format (e.g., `Sarah Chen, Product Lead`)
- [ ] `tags` array has exactly one category that matches the filter buttons on the blog

**Tags Reference (pick exactly one):**
| Tag | Used for |
|---|---|
| `Product Updates` | New features, platform announcements |
| `Cafe Management` | Coffee shops, cafes, bakeries |
| `Retail Tips` | Fashion, grocery, general retail |
| `Enterprise` | Franchises, chains, multi-outlet businesses |

---

## 7. Complete Article Example

Here is a minimal but properly structured article you can use as a template:

```sql
DO $$
DECLARE
  v_id UUID;
  v_content TEXT;
BEGIN
  -- Replace 'your-slug' with the canonical_slug you inserted in Step 1
  SELECT id INTO v_id FROM public.blogs WHERE canonical_slug = 'your-slug';

  v_content := $content$
<h2>The Problem</h2>
<p>Start with a compelling description of the pain point your reader faces. Make it specific and relatable. One strong paragraph is enough to hook them.</p>

<h2>Why It Happens</h2>
<p>Explain the root cause. Use data or a relatable scenario to build credibility.</p>
<ul>
  <li><strong>Reason One:</strong> Brief explanation.</li>
  <li><strong>Reason Two:</strong> Brief explanation.</li>
</ul>

<figure>
  <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200" alt="Cafe POS system in use" />
  <figcaption>Modern POS systems eliminate these problems by automating the decision-making process.</figcaption>
</figure>

<h2>The Solution</h2>
<p>Explain the fix clearly. Be direct. Use a callout box for a key stat if you have one.</p>

<div class="callout">
  <strong>35% improvement</strong>
  in staff efficiency reported by MochaEase clients within the first month.
</div>

<h2>Getting Started</h2>
<p>End with a practical next step. What should the reader do right now? Make it easy and specific.</p>
<blockquote>
  The best time to fix your operations was yesterday. The second best time is today.
</blockquote>
  $content$;

  INSERT INTO public.blog_translations (
    blog_id, language_code, title, excerpt,
    slug_localized, content_html, seo_description,
    seo_keywords, published_at, is_published
  ) VALUES (
    v_id, 'en',
    'Your Article Title',
    'Your compelling 1-2 sentence excerpt.',
    'your-slug',
    v_content,
    'SEO description under 160 chars.',
    ARRAY['keyword1', 'keyword2', 'keyword3'],
    now(),
    true
  );
END;
$$;
```

---

## 8. Quick Reference Card

| Element | HTML Tag | Notes |
|---|---|---|
| Section title | `<h2>` | Major breaks; use 2–4 per article |
| Sub-section | `<h3>` | Green left border; use inside sections |
| Paragraph | `<p>` | Generous spacing built-in |
| Bullet list | `<ul><li>...</li></ul>` | Renders as pill cards |
| Bold | `<strong>` | Pure white — use for key terms |
| Italic / quote | `<em>` | Subtle emphasis |
| Pull quote | `<blockquote>` | Stand-out quotes or statistics |
| Stat highlight | `<div class="callout">` | Big number + explanation |
| Image | `<img>` or `<figure>` | Rounded, dark border |
| YouTube video | `<div class="video-wrapper"><iframe...>` | Responsive 16:9 |
