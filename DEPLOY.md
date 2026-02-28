# MAGIDO USA — Phase 1 Deployment Guide
## Getting the Foundation onto Your Server

### What's in this archive

```
magido-phase1.tar.gz (7.6 MB)
├── package.json          # Dependencies (Next.js 14, React 18, Tailwind, Lucide icons)
├── next.config.js        # Image optimization, caching headers
├── tailwind.config.js    # Brand colors, dark mode, animations
├── postcss.config.js     # PostCSS + Tailwind pipeline
├── tsconfig.json         # TypeScript config with path aliases
├── .gitignore
├── src/
│   ├── app/
│   │   ├── layout.tsx    # Root layout (fonts, theme, header, footer)
│   │   └── page.tsx      # Homepage (hero + category grid)
│   ├── components/
│   │   ├── ThemeProvider.tsx  # Dark/light theme system
│   │   ├── Header.tsx         # Responsive nav with product dropdown
│   │   └── Footer.tsx         # Contact info, category links, CTAs
│   ├── data/
│   │   └── products.json      # ⭐ Unified product data (84 products, 20 series, 7 categories)
│   ├── lib/
│   │   └── products.ts        # Data access layer (typed functions for querying)
│   └── styles/
│       └── globals.css         # Tailwind + theme tokens + hero backgrounds + industrial grid
└── public/
    └── images/
        └── products/           # 96 optimized WebP images organized by series
            ├── agita/
            ├── dg/
            ├── eco/
            ├── fls/
            ├── gold-1b/
            ├── gold-2b/
            ├── hp/
            ├── jolly/
            ├── l-series/
            ├── platinum/
            ├── silver/
            ├── spira-1b/
            ├── spira-2b/
            ├── x51/
            ├── x51-2/
            ├── x51hp/
            ├── x53/
            ├── x53-2/
            └── x81/
```

### Deployment Steps

**1. Upload the archive to your server:**
```bash
scp magido-phase1.tar.gz jasonbee@your-server:~/
```

**2. SSH into the server and back up the existing site (just in case):**
```bash
cd ~/new.magidousa.com
# If there's existing content you want to preserve:
cp -r . ../new.magidousa.com.backup
```

**3. Extract the archive into the site directory:**
```bash
cd ~/new.magidousa.com
tar xzf ~/magido-phase1.tar.gz
```

**4. Install dependencies:**
```bash
npm install
```

**5. Build the project:**
```bash
npm run build
```

**6. Restart with pm2:**
```bash
pm2 restart all
# or if starting fresh:
pm2 start npm --name "magido" -- start
```

**7. Verify it's running:**
```bash
curl -s http://localhost:8080 | head -5
```

Then visit https://newv2.magidousa.com to see the site live.

### What You'll See

- A responsive homepage with hero section (industrial grid background + orange glow accents)
- Dark/light theme toggle in the header
- Navigation with product category dropdown (7 categories, all linked)
- Footer with full business info and CTAs
- All 96 product images served as optimized WebP

### Data Architecture

The product data lives in `src/data/products.json`. To add a new product later, you just add
an entry to this file — no code changes needed. The data access layer in `src/lib/products.ts`
provides typed functions for querying products, series, and categories.

### Next Steps (Phase 2)

Phase 2 will build out:
- Category pages with product cards, hero images, and series grouping
- Individual product pages with image lightbox, spec tables, prev/next navigation
- Compare feature
- Contact forms
- Blog pages
- SEO metadata per page
