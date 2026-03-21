import { MetadataRoute } from 'next';

const BASE = 'https://magidousa.com';

// ─── Static routes ───────────────────────────────────────────────────────────
// lastModified: use a real date — only update this when the page content changes.
// This tells Google "this page actually changed on X" rather than "today" every build.
const staticRoutes: MetadataRoute.Sitemap = [
  { url: `${BASE}/`,              lastModified: new Date('2025-01-01'), changeFrequency: 'weekly',  priority: 1.0 },
  { url: `${BASE}/products`,      lastModified: new Date('2025-01-01'), changeFrequency: 'weekly',  priority: 0.9 },
  { url: `${BASE}/solutions`,     lastModified: new Date('2025-01-01'), changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE}/resources`,     lastModified: new Date('2025-01-01'), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE}/contact`,       lastModified: new Date('2025-01-01'), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE}/about`,         lastModified: new Date('2025-01-01'), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE}/how-to-choose`, lastModified: new Date('2025-01-01'), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE}/compare`,       lastModified: new Date('2025-01-01'), changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE}/blog`,          lastModified: new Date('2025-01-01'), changeFrequency: 'weekly',  priority: 0.7 },
  { url: `${BASE}/industries`,    lastModified: new Date('2025-01-01'), changeFrequency: 'monthly', priority: 0.8 },
  // FAQ — added Phase 11
  { url: `${BASE}/faq`,           lastModified: new Date('2025-03-01'), changeFrequency: 'monthly', priority: 0.7 },
  // SEO landing pages — added Phase 19
  { url: `${BASE}/aqueous-parts-washers`, lastModified: new Date('2026-03-18'), changeFrequency: 'monthly', priority: 0.9 },
  // Catalog — added Phase 22
  { url: `${BASE}/resources/catalog`,     lastModified: new Date('2026-03-01'), changeFrequency: 'monthly', priority: 0.8 },
];

// ─── Product category pages ───────────────────────────────────────────────────
const categoryRoutes: MetadataRoute.Sitemap = [
  'manual-washers',
  'top-load-washers',
  'front-load-washers',
  'immersion-washers',
  'in-line-belt-conveyor-washers',
  'rotary-drum-washers',
  'rotary-immersion-washers',
].map((cat) => ({
  url: `${BASE}/products/${cat}`,
  lastModified: new Date('2025-01-01'),
  changeFrequency: 'monthly' as const,
  priority: 0.8,
}));

// ─── Individual product pages ─────────────────────────────────────────────────
const productRoutes: MetadataRoute.Sitemap = [
  // Manual Washers
  '/products/manual-washers/dg-8',
  '/products/manual-washers/dg-9',
  '/products/manual-washers/l-7',
  '/products/manual-washers/l-10',
  '/products/manual-washers/hp-25',
  '/products/manual-washers/hp-30',
  // Top Load Washers
  '/products/top-load-washers/l101',
  '/products/top-load-washers/l102',
  '/products/top-load-washers/l122',
  '/products/top-load-washers/l152',
  '/products/top-load-washers/l-35',
  '/products/top-load-washers/l-55',
  '/products/top-load-washers/l-90',
  '/products/top-load-washers/l800fp',
  '/products/top-load-washers/l901fp',
  '/products/top-load-washers/l902fp',
  '/products/top-load-washers/l922fp',
  '/products/top-load-washers/l101hp',
  '/products/top-load-washers/l102hp',
  '/products/top-load-washers/l122hp',
  '/products/top-load-washers/l103',
  '/products/top-load-washers/l123',
  '/products/top-load-washers/l153',
  '/products/top-load-washers/tr450',
  // Front Load Washers
  '/products/front-load-washers/l160',
  '/products/front-load-washers/l190',
  '/products/front-load-washers/l210',
  '/products/front-load-washers/l240',
  '/products/front-load-washers/l162',
  '/products/front-load-washers/l192',
  '/products/front-load-washers/l212',
  '/products/front-load-washers/l242',
  '/products/front-load-washers/fls-30',
  '/products/front-load-washers/fls-35',
  '/products/front-load-washers/fls-45',
  // Immersion Washers
  '/products/immersion-washers/a700',
  '/products/immersion-washers/a900',
  '/products/immersion-washers/a1100',
  '/products/immersion-washers/a1300',
  // In-Line Belt Conveyor Washers
  '/products/in-line-belt-conveyor-washers/g200',
  '/products/in-line-belt-conveyor-washers/g300',
  '/products/in-line-belt-conveyor-washers/g400',
  '/products/in-line-belt-conveyor-washers/g500',
  '/products/in-line-belt-conveyor-washers/g600',
  '/products/in-line-belt-conveyor-washers/g700',
  '/products/in-line-belt-conveyor-washers/g800',
  '/products/in-line-belt-conveyor-washers/g900',
  '/products/in-line-belt-conveyor-washers/g1000',
  '/products/in-line-belt-conveyor-washers/g200-2',
  '/products/in-line-belt-conveyor-washers/g300-2',
  '/products/in-line-belt-conveyor-washers/g400-2',
  '/products/in-line-belt-conveyor-washers/g500-2',
  '/products/in-line-belt-conveyor-washers/g600-2',
  '/products/in-line-belt-conveyor-washers/g700-2',
  '/products/in-line-belt-conveyor-washers/g800-2',
  '/products/in-line-belt-conveyor-washers/g900-2',
  '/products/in-line-belt-conveyor-washers/g1000-2',
  '/products/in-line-belt-conveyor-washers/s200',
  '/products/in-line-belt-conveyor-washers/s300',
  '/products/in-line-belt-conveyor-washers/s400',
  // Rotary Drum Washers
  '/products/rotary-drum-washers/j320',
  '/products/rotary-drum-washers/j320-2',
  '/products/rotary-drum-washers/sp320',
  '/products/rotary-drum-washers/sp480',
  '/products/rotary-drum-washers/sp640',
  '/products/rotary-drum-washers/sp950',
  '/products/rotary-drum-washers/sp320-2',
  '/products/rotary-drum-washers/sp480-2',
  '/products/rotary-drum-washers/sp640-2',
  '/products/rotary-drum-washers/sp950-2',
  // Rotary Immersion Washers
  '/products/rotary-immersion-washers/pm400',
  '/products/rotary-immersion-washers/p600-2',
  '/products/rotary-immersion-washers/p900-2',
  '/products/rotary-immersion-washers/p1200-2',
  '/products/rotary-immersion-washers/p1500-2',
].map((url) => ({
  url: `${BASE}${url}`,
  lastModified: new Date('2025-01-01'),
  changeFrequency: 'monthly' as const,
  priority: 0.7,
}));

// ─── Industry pages ───────────────────────────────────────────────────────────
const industryRoutes: MetadataRoute.Sitemap = [
  'automotive',
  'aerospace',
  'machining',
  'heavy-equipment',
  'medical',
  'food-processing',
].map((slug) => ({
  url: `${BASE}/industries/${slug}`,
  lastModified: new Date('2025-01-01'),
  changeFrequency: 'monthly' as const,
  priority: 0.8,
}));

// ─── Solution landing pages ───────────────────────────────────────────────────
const solutionRoutes: MetadataRoute.Sitemap = [
  'aqueous-vs-solvent-parts-washers',
  'spray-cabinet-vs-immersion-parts-washers',
  'cleaning-brake-components',
  'removing-cutting-oil-and-coolant',
  'industrial-parts-washing-for-mro',
  'cleaning-hydraulic-components',
  'cleaning-automotive-transmission-parts',
  'removing-stamping-and-forming-lubricants',
  'food-and-beverage-equipment-cleaning',
  'cleaning-electrical-and-electronic-components',
  'cleaning-aerospace-components',
  'cleaning-medical-device-components',
  'aisi-304-stainless-steel-parts-washers',
].map((slug) => ({
  url: `${BASE}/solutions/${slug}`,
  lastModified: new Date('2025-01-01'),
  changeFrequency: 'monthly' as const,
  priority: 0.8,
}));

// ─── Blog post pages ──────────────────────────────────────────────────────────
const blogRoutes: MetadataRoute.Sitemap = [
  'aqueous-vs-solvent-parts-cleaning',
  'stainless-steel-parts-washers-outlast-competition',
  'spray-washing-vs-immersion-cleaning',
  'aqueous-parts-washer-maintenance-guide',
  'choosing-right-parts-washer-size',
  'how-often-change-parts-washer-solution',
  '5-signs-parts-washer-needs-servicing',
  'parts-washing-medical-device-manufacturing',
  'water-based-parts-washing-complete-guide',
  'how-to-size-a-parts-washer',
  'aqueous-parts-washers-automotive-manufacturing',
].map((slug) => ({
  url: `${BASE}/blog/${slug}`,
  lastModified: new Date('2026-03-01'),
  changeFrequency: 'monthly' as const,
  priority: 0.7,
}));


// Note: /resources (the main page) is already in staticRoutes — do not duplicate it here.
const resourceRoutes: MetadataRoute.Sitemap = [
  'top-load-washers',
  'front-load-washers',
  'manual-washers',
  'hp-service-instructions',
  'belt-conveyor-washers',
  'immersion-washers',
  'rotary-immersion-washers',
  'rotary-drum-washers',
].map((slug) => ({
  url: `${BASE}/resources/${slug}`,
  lastModified: new Date('2025-01-01'),
  changeFrequency: 'monthly' as const,
  priority: 0.6,
}));

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes,    //  13 pages (inc. FAQ, aqueous landing, catalog)
    ...categoryRoutes,  //   7 pages
    ...productRoutes,   //  75 pages
    ...industryRoutes,  //   6 pages
    ...solutionRoutes,  //  12 pages
    ...resourceRoutes,  //   8 pages
    ...blogRoutes,      //  11 pages
    // Total: 132 URLs
  ];
}
