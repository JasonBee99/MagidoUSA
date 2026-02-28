# MAGIDO USA — Phase 2 Handoff Summary

## Project Overview
Building a new website for **MAGIDO USA** (industrial aqueous parts washers) using Next.js 14, React 18, Tailwind CSS, and Lucide React icons. Hosted on a DreamHost VPS (Ubuntu 22.04, Node 20, pm2, port 8080). Live at: https://newv2.magidousa.com

## Server Details
- Ubuntu 22.04, DreamHost VPS, 4GB RAM, 24GB disk
- Node 20.20.0 (nvm), npm 10.8.2
- pm2 process manager, port 8080
- App path: `/home/jasonbee/new.magidousa.com`
- No sudo available

## What Phase 1 Delivered (already on server)
1. **Next.js 14 project skeleton** with TypeScript, Tailwind, App Router
2. **Unified product data layer** — `src/data/products.json` containing:
   - 7 categories (Manual, Top Load, Front Load, Immersion, In-Line Belt Conveyor, Rotary Drum, Rotary Immersion)
   - 20 series across those categories
   - 84 individual products with full specifications parsed from raw data
   - Image path mappings for all products
3. **Data access library** — `src/lib/products.ts` with typed functions:
   - `getAllCategories()`, `getCategoryBySlug()`, `getAllCategorySlugs()`
   - `getAllSeries()`, `getSeriesBySlug()`, `getSeriesByCategory()`
   - `getAllProducts()`, `getProductBySlug()`, `getProductsBySeries()`, `getProductsByCategory()`
   - `getCategoryNavigation()` — returns prev/next products spanning entire category
   - `getSeriesRepresentativeImage()`, `getCategoryRepresentativeImage()`
   - `getAllProductSlugs()` — for static path generation
   - `searchProducts()` — for compare feature
4. **96 optimized WebP product images** in `public/images/products/` organized by series slug
5. **Theme system** — dark/light toggle with CSS custom properties, persisted to localStorage
6. **Brand design tokens** — Tailwind config with Magido blue (#315687) and orange (#eb6c1c)
7. **Industrial hero background** — CSS grid pattern with orange glow accents (top-left, bottom-right)
8. **Responsive header** with product category dropdown, theme toggle, phone CTA, mobile menu
9. **Footer** with full business info, category links, resource links, CTAs
10. **Minimal homepage** with hero section and category grid (placeholder for Phase 2 expansion)

## What Phase 2 Needs to Build

### Priority 1: Category Pages (`/products/[category]`)
- Hero section with industrial grid background
- Right side of hero: representative product PNG with subtle halo effect
- Product cards grouped by series (reference: https://new.magidousa.com/products/top-load-washers)
- Cards should have 3D-ish subtle lighter background for images
- Tabs per product card: 'Get Quote', 'Compare', 'Video' (where applicable)

### Priority 2: Individual Product Pages (`/products/[category]/[product]`)
- Product image with lightbox/zoom capability, subtle light background
- Use largest images possible without hurting page speed
- Previous/Next arrows spanning entire category (data function already exists)
- Tabbed content: Features, Options, Safety Features, Specifications table
- Comparison table below showing all models in same series
- Reference: https://new.magidousa.com/products/rotary-drum-washers/sp320

### Priority 3: Compare Feature
- Cross-category comparison, user selects 4-8 products
- Variable selection across different categories
- Side-by-side spec comparison

### Priority 4: Contact Page & Forms
- Quote request form
- Parts cleaning process evaluation form
- Business contact info (already in footer)
- Phone: 844-4MA-GIDO (844-462-4436), Email: Sales@MagidoUSA.com
- Address: 1500 S Sylvania Ave, Sturtevant, WI 53177

### Priority 5: Homepage Enhancement
- Hero carousel/slider with 2-3 panels (FLS washer prominent as new product, Top Load as best sellers)
- Product images in hero section
- Reference: https://theglobal1group.com/ for layout inspiration

### Priority 6: Content Pages
- How to Choose a Parts Washer
- About page
- Blog (5 full posts already written in content files)
- Industry pages (6 pages: Automotive, Aerospace, Machining, Heavy Equipment, Medical Device, Food Processing)

### Priority 7: SEO Implementation
- Per-page meta descriptions and title tags (content in SEO markdown files)
- Schema markup: Organization, LocalBusiness, Product, BreadcrumbList
- OpenGraph + Twitter Card tags
- Image alt text
- Breadcrumb navigation
- XML sitemap

### Priority 8: Polish & Extras
- Water ripple mouse effect (toggleable on/off)
- i18n for European viewers (only if not problematic)

## Key Build Spec Notes
- Use #315687 instead of black for fonts where applicable
- Hero background with grid + mild #eb6c1c glow top-left, #eb6c1c glow bottom-right
- Industrial look preferred
- All content should be data-driven (products.json), not hard-coded
- Products with missing images should use a placeholder — easy to add later
- FLS series is NEW and should be prominent
- Prev/Next arrows on product pages span ENTIRE category, not just series
- SP950-2 not SP950/2 display should use '/' not '-'
- The `v2build` directory on the server should be IGNORED

## SEO Content Files Available
The user has 6 markdown files with pre-written content:
1. `1_SEO_Extraction.md` — Current site metadata, keywords, business info
2. `2_SEO_Implementation_Guide.md` — Meta descriptions, schema markup for every page
3. `3_NextJS_SEO_Guide.md` — Full App Router implementation with code examples
4. `4_SEO_Competitor_Analysis.md` — 5 competitors analyzed
5. `5_SEO_Content_Package.md` — Landing page copy, category descriptions, product descriptions, blog outlines
6. `6_Complete_Content_Part2.md` — 5 full blog posts, all remaining product descriptions, 6 industry pages

These files will need to be re-uploaded or their content referenced from the server.

## Image Gaps (products without images — use placeholder)
- A600 (Agita), entire Ultra series (U600-U1300)
- J210, J210/2, J320/2 (Jolly)
- SP210, SP210/2 (Spira)
- FLS-30, FLS-45 (only FLS-35 has images)

## File Structure on Server
```
~/new.magidousa.com/
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ThemeProvider.tsx
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── data/
│   │   └── products.json      # ⭐ Master data file
│   ├── lib/
│   │   └── products.ts        # Data access functions
│   └── styles/
│       └── globals.css
└── public/
    └── images/
        └── products/           # 96 WebP images by series
```

## Tech Stack Summary
- Next.js 14.2 (App Router, SSG)
- React 18.3
- TypeScript 5.6
- Tailwind CSS 3.4
- Lucide React (icons, MIT licensed)
- clsx (class name utility)

## Notes for Phase 2 Chat
- The user cannot upload all files again easily — work from server file listings
- Ask the user to run `find` or `cat` commands on the server to get file contents when needed
- Products.json is the single source of truth — all pages should be generated from it
- The user prefers Claude make all code edits directly
- Suggest easier approaches when possible without sacrificing quality
- The site must be expandable — adding products/series later should require only data changes
