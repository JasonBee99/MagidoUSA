# Magido USA Website — Complete Build Summary
## Date: February 27, 2026
## Project: adv.magidousa.com

---

## INFRASTRUCTURE

- **Framework:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS
- **Server:** DreamHost VPS, Ubuntu 22.04, Node 20, pm2 (process name: `advmagidousa`)
- **Port:** 8280
- **Domain:** adv.magidousa.com
- **Build command:** `cd ~/adv.magidousa.com && npm run build && pm2 restart advmagidousa`
- **Git:** Initialized in project root, first backup committed as "MagidoUSA backup #1"

---

## DESIGN SYSTEM

- **Fonts:** Inter (body, `--font-body`), Outfit (display/headings, `--font-display`)
- **Brand colors:**
  - Magido Blue: `#315687` (primary)
  - Magido Orange: `#eb6c1c` (accent/CTA)
- **Theme:** Light/dark mode toggle via `ThemeProvider` using CSS variables and `localStorage` key `magido-theme`
- **CSS variables** for all colors: `--color-bg`, `--color-text`, `--color-card-bg`, `--color-border`, etc.
- **Hero sections** use class `hero-bg` (dark gradient background)
- **Product image backgrounds** use class `product-card-image-bg`
- **Product glow effect** uses class `product-halo`

---

## DATA ARCHITECTURE

### Product Data (`src/data/products.json`)
- 84 products across 7 categories and 20 series
- Categories: Manual Washers, Top Load Washers, Front Load Washers, Immersion Washers, Conveyor Washers, Rotary Drum Washers, Rotary Immersion Washers
- Each product has: slug, model, name, images[], specs{}, features[]

### Product Library (`src/lib/products.ts`)
Key exported functions:
- `getAllCategories()`, `getCategoryBySlug(slug)`, `getAllCategorySlugs()`
- `getSeriesByCategory(catSlug)`, `getSeriesBySlug(seriesSlug)`, `getProductsBySeries(seriesSlug)`
- `getAllProducts()`, `getProductBySlug(catSlug, prodSlug)`, `getAllProductSlugs()`
- `getCategoryRepresentativeImage(catSlug)`, `getSeriesRepresentativeImage(seriesSlug)`
- `getCategoryNavigation(catSlug, prodSlug)` — returns prev/next for product detail pages

### Blog Data (`src/data/blog.ts`)
- 5 blog posts with full content
- `getAllBlogPosts()`, `getBlogPost(slug)`, `getAllBlogSlugs()`

### Industry Data (`src/data/industries.ts`)
- 6 industry pages: Automotive, Aerospace & Defense, Machining & Metal Fabrication, Heavy Equipment & MRO, Medical Devices, Food Processing
- `getIndustryPage(slug)`, `getAllIndustrySlugs()`

### Content Data (`src/data/content.ts`)
- About page content, How to Choose guide content

---

## PRODUCT IMAGES

- Location: `public/images/products/`
- 96 WebP images total
- Naming convention: `{model-slug}.webp` (e.g., `dg032.webp`, `l102.webp`)
- Model slugs use hyphens for slashes: `x51-2-800` = model `X51/2 800`

---

## ALL PAGES BUILT (Priorities 1–8)

### Priority 1: Category Pages ✅
- `src/app/products/page.tsx` — Products index (7 category cards with images)
- `src/app/products/[category]/page.tsx` — Category detail (hero, series-grouped product grids)
- `src/components/ProductCard.tsx` — Reusable product card with image, model, key specs

### Priority 2: Product Detail Pages ✅
- `src/app/products/[category]/[product]/page.tsx` — Full product page
- `src/components/ProductImageGallery.tsx` — Lightbox gallery with thumbnails, keyboard nav
- `src/components/ProductSpecTabs.tsx` — Tabbed specifications (Overview, Dimensions, Technical)
- `src/components/SeriesComparisonTable.tsx` — Compare all models in the same series
- `src/components/ProductNavigation.tsx` — Prev/Next within category

### Priority 3: Compare Feature ✅
- `src/components/CompareProvider.tsx` — React context, localStorage persistence, 2–8 products
- `src/components/CompareBar.tsx` — Floating bottom bar showing selected products
- `src/app/compare/page.tsx` — Full comparison page with side-by-side specs
- Compare buttons integrated into ProductCard and product detail pages

### Priority 4: Contact Page ✅
- `src/app/contact/page.tsx` — Dual-form page (Quote Request + Parts Cleaning Evaluation)
- Formspree integration (form IDs need to be set: `QUOTE_FORM_ID`, `EVAL_FORM_ID`)
- Deep linking: `/contact?model=L102` pre-fills model, `/contact#evaluation` opens eval form
- Right sidebar: phone, email, address, business hours, "Why Magido" card

### Priority 5: Homepage ✅
- `src/app/page.tsx` — Enhanced homepage
- `src/components/HeroCarousel.tsx` — 3-slide auto-advancing carousel:
  1. Front Load Washers (industrial hero)
  2. Top Load Washers (versatility)
  3. Process Evaluation CTA
- Category grid section (7 cards)
- Value propositions section (4 cards: Stainless Steel, Italian Engineering, Full Range, Expert Support)

### Priority 6: Content Pages ✅
- `src/app/about/page.tsx` — Company story, timeline, values, team
- `src/app/how-to-choose/page.tsx` — Guided washer selection (decision tree, comparison table)
- `src/app/blog/page.tsx` — Blog index (5 post cards)
- `src/app/blog/[slug]/page.tsx` — Blog post detail with full rendered content
- `src/app/industries/page.tsx` — Industries index (6 industry cards)
- `src/app/industries/[slug]/page.tsx` — Industry detail with sections and product recommendations

### Priority 7: SEO ✅
- `src/app/sitemap.ts` — Auto-generated sitemap.xml (~110 URLs)
- `src/app/robots.ts` — robots.txt with sitemap reference
- `src/components/JsonLd.tsx` — Structured data components:
  - `OrganizationJsonLd` — added to layout.tsx `<head>`
  - `ProductJsonLd` — for product pages
  - `BreadcrumbJsonLd` — for navigation schema
  - `ArticleJsonLd` — for blog posts
- `layout.tsx` updated: metadataBase → `adv.magidousa.com`, Twitter cards, expanded keywords, googleBot directives, canonical URL
- **Note:** Product page needs manual patch to add `ProductJsonLd` import and component (sed command provided)

### Priority 8: Polish & Performance ✅
- `src/app/not-found.tsx` — Custom branded 404 page with category links
- `src/components/Header.tsx` — Upgraded with:
  - Active page highlighting (orange text on current page)
  - Body scroll lock when mobile menu open
  - Auto-close mobile menu on route change
  - "All Products" link in dropdown
  - "Industries" added to nav
  - `aria-expanded` accessibility
- `src/components/WaterRipple.tsx` — Optional CSS-only ripple animation for hero sections
- `src/components/LazyImage.tsx` — IntersectionObserver lazy loading wrapper
- `globals.css` additions — Subtle shimmer animation on all `hero-bg` sections
- `next.config.js` — Image optimization (AVIF/WebP), 30-day image cache, 1-year static cache, gzip, no X-Powered-By header

---

## COMPLETE FILE TREE

```
~/adv.magidousa.com/
├── next.config.js
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── public/
│   └── images/
│       ├── favicon.png
│       ├── magido-usa-logo.png
│       ├── magido-usa-logo-light.png
│       └── products/
│           └── (96 .webp product images)
└── src/
    ├── app/
    │   ├── layout.tsx              (root layout w/ OrganizationJsonLd)
    │   ├── page.tsx                (homepage w/ carousel)
    │   ├── not-found.tsx           (custom 404)
    │   ├── sitemap.ts              (auto sitemap.xml)
    │   ├── robots.ts               (robots.txt)
    │   ├── about/page.tsx
    │   ├── blog/
    │   │   ├── page.tsx            (blog index)
    │   │   └── [slug]/page.tsx     (blog post)
    │   ├── compare/page.tsx
    │   ├── contact/page.tsx
    │   ├── how-to-choose/page.tsx
    │   ├── industries/
    │   │   ├── page.tsx            (industries index)
    │   │   └── [slug]/page.tsx     (industry detail)
    │   └── products/
    │       ├── page.tsx            (products index)
    │       ├── [category]/
    │       │   ├── page.tsx        (category detail)
    │       │   └── [product]/
    │       │       └── page.tsx    (product detail)
    ├── components/
    │   ├── CompareBar.tsx
    │   ├── CompareProvider.tsx
    │   ├── Footer.tsx
    │   ├── Header.tsx              (w/ active states)
    │   ├── HeroCarousel.tsx
    │   ├── JsonLd.tsx
    │   ├── LazyImage.tsx
    │   ├── ProductCard.tsx
    │   ├── ProductImageGallery.tsx
    │   ├── ProductNavigation.tsx
    │   ├── ProductSpecTabs.tsx
    │   ├── SeriesComparisonTable.tsx
    │   ├── ThemeProvider.tsx
    │   └── WaterRipple.tsx
    ├── data/
    │   ├── blog.ts
    │   ├── content.ts
    │   ├── industries.ts
    │   └── products.json
    ├── lib/
    │   └── products.ts
    └── styles/
        └── globals.css
```

---

## KNOWN PENDING ITEMS / TODO

1. **Formspree IDs** — `QUOTE_FORM_ID` and `EVAL_FORM_ID` in `src/app/contact/page.tsx` need real Formspree form IDs (sign up at formspree.io, create two forms, replace the placeholder strings)
2. **Product page JSON-LD patch** — Need to add `ProductJsonLd` and `BreadcrumbJsonLd` imports to `src/app/products/[category]/[product]/page.tsx` (sed command was provided in Priority 7)
3. **WaterRipple component** — Created but not yet integrated into any page. Optional: add `<WaterRipple />` inside hero sections for the animated effect
4. **LazyImage component** — Created but not yet swapped into ProductCard. Optional optimization for pages with many product cards
5. **Google Search Console** — Submit sitemap URL (`https://adv.magidousa.com/sitemap.xml`) once site is indexed
6. **Social media links** — `OrganizationJsonLd` has empty `sameAs` array; add social URLs when available
7. **Logo for dark mode** — `magido-usa-logo-light.png` exists in public/images but Header currently uses same logo for both themes

---

## USEFUL COMMANDS

```bash
# Build and deploy
cd ~/adv.magidousa.com
npm run build && pm2 restart advmagidousa

# Check build logs
pm2 logs advmagidousa

# Git backup
git add -A && git commit -m "description of changes"

# Check what's running
pm2 status
```

---

## CONVERSATION TRANSCRIPTS

Full transcripts of all build sessions are stored at:
- `/mnt/transcripts/2026-02-27-20-56-14-magido-phase2-build.txt` (Priorities 1–5)
- `/mnt/transcripts/2026-02-27-21-30-38-magido-phase2-homepage-carousel-logo.txt` (Homepage carousel)
- `/mnt/transcripts/2026-02-27-21-52-37-priority-6-content-pages-completion.txt` (Priority 6)
- `/mnt/transcripts/2026-02-27-21-53-27-priority-7-seo-kickoff.txt` (Priority 7 start)
