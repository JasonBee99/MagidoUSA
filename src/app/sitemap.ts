import { MetadataRoute } from 'next';

const BASE = 'https://www.magidousa.com';

// ─── Static routes ───
const staticRoutes: MetadataRoute.Sitemap = [
  { url: `${BASE}/`,               lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
  { url: `${BASE}/products`,       lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
  { url: `${BASE}/solutions`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE}/resources`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE}/resources/catalog`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE}/contact`,        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE}/about`,          lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE}/how-to-choose`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE}/compare`,        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE}/blog`,           lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
  { url: `${BASE}/industries`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
];

// ─── Product category pages ───
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
  lastModified: new Date(),
  changeFrequency: 'monthly' as const,
  priority: 0.8,
}));

// ─── Individual product pages (74 total) ───
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
  lastModified: new Date(),
  changeFrequency: 'monthly' as const,
  priority: 0.7,
}));

// ─── Industries pages (Phase 10) ───
const industryRoutes: MetadataRoute.Sitemap = [
  'automotive',
  'aerospace',
  'machining',
  'heavy-equipment',
  'medical',
  'food-processing',
].map((slug) => ({
  url: `${BASE}/industries/${slug}`,
  lastModified: new Date(),
  changeFrequency: 'monthly' as const,
  priority: 0.8,
}));

// ─── Solution landing pages ───
const solutionRoutes: MetadataRoute.Sitemap = [
  'aqueous-vs-solvent-parts-washers',
  'spray-cabinet-vs-immersion-parts-washers',
  'cleaning-brake-components',
  'removing-cutting-oil-and-coolant',
  'industrial-parts-washing-for-mro',
  // Phase 9 additions
  'cleaning-hydraulic-components',
  'cleaning-automotive-transmission-parts',
  'removing-stamping-and-forming-lubricants',
  'food-and-beverage-equipment-cleaning',
  'cleaning-electrical-and-electronic-components',
  'cleaning-aerospace-components',
  'cleaning-medical-device-components',
].map((slug) => ({
  url: `${BASE}/solutions/${slug}`,
  lastModified: new Date(),
  changeFrequency: 'monthly' as const,
  priority: 0.8,
}));

// ─── Resource / documentation pages ───
const resourceRoutes: MetadataRoute.Sitemap = [
  'catalog',
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
  lastModified: new Date(),
  changeFrequency: 'monthly' as const,
  priority: 0.6,
}));

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes,    //  11 pages
    ...categoryRoutes,  //   7 pages
    ...productRoutes,   //  75 pages
    ...industryRoutes,  //   6 pages
    ...solutionRoutes,  //  12 pages
    ...resourceRoutes,  //   9 pages
    // Total: 119 URLs
  ];
}
