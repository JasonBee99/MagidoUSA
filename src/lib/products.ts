/**
 * MAGIDO USA — Product Data Access Layer
 * 
 * All product data is loaded from a single JSON file at build time.
 * Next.js will statically generate all pages from this data.
 * 
 * To add a new product: just add it to products.json — no code changes needed.
 */

import productsData from '@/data/products.json';

// ─── TYPES ───

export interface ProductSpec {
  value: string;
  unit: string;
}

export interface Product {
  slug: string;
  model: string;
  name: string;
  description?: string;
  cardDescription?: string;  // Short title-continuation text for category page cards
  seriesSlug: string;
  categorySlug: string;
  url: string;
  images: string[];
  videoUrl?: string;      // Legacy single video (still supported)
  videoUrls?: string[];   // Multiple videos
  videoTitles?: string[]; // Labels for each video tab
  specs: Record<string, ProductSpec>;
}

export interface SpecTableRow {
  name: string;
  unit: string;
  values: Record<string, string>;
}

export interface Series {
  slug: string;
  name: string;
  displayName: string;
  category: string;
  type: string;
  description: string;
  isNew?: boolean;
  products: string[];  // product slugs
  standardFeatures: string[];
  availableOptions: string[];
  safetyFeatures: string[];
  specTable: {
    models: string[];
    rows: SpecTableRow[];
  };
}

export interface SeriesSummary {
  slug: string;
  name: string;
  displayName: string;
  type: string;
  isNew: boolean;
}

export interface Category {
  name: string;
  slug: string;
  shortDescription: string;
  description?: string;
  order: number;
  series: SeriesSummary[];
  totalProducts: number;
}

// ─── DATA ACCESS FUNCTIONS ───

/**
 * Get all categories in display order
 */
export function getAllCategories(): Category[] {
  return (productsData.categories as unknown as Category[]).sort((a, b) => a.order - b.order);
}

/**
 * Get a single category by slug
 */
export function getCategoryBySlug(slug: string): Category | undefined {
  return (productsData.categories as unknown as Category[]).find(c => c.slug === slug);
}

/**
 * Get all series
 */
export function getAllSeries(): Series[] {
  return productsData.series as unknown as Series[];
}

/**
 * Get a single series by slug
 */
export function getSeriesBySlug(slug: string): Series | undefined {
  return (productsData.series as unknown as Series[]).find(s => s.slug === slug);
}

/**
 * Get all series in a category
 */
export function getSeriesByCategory(categorySlug: string): Series[] {
  const category = getCategoryBySlug(categorySlug);
  const seriesOrder: string[] = (category as unknown as Record<string, unknown>)?.seriesOrder as string[] ?? [];
  const filtered = (productsData.series as unknown as Series[]).filter(s => s.category === categorySlug);
  if (seriesOrder.length === 0) return filtered;
  return filtered.sort((a, b) => {
    const ai = seriesOrder.indexOf(a.slug);
    const bi = seriesOrder.indexOf(b.slug);
    if (ai === -1 && bi === -1) return 0;
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });
}

/**
 * Get all products
 */
export function getAllProducts(): Product[] {
  return productsData.products as unknown as Product[];
}

/**
 * Get a single product by slug
 */
export function getProductBySlug(slug: string): Product | undefined {
  return (productsData.products as unknown as Product[]).find(p => p.slug === slug);
}

/**
 * Get all products in a series
 */
export function getProductsBySeries(seriesSlug: string): Product[] {
  return (productsData.products as unknown as Product[]).filter(p => p.seriesSlug === seriesSlug);
}

/**
 * Get all products in a category
 */
export function getProductsByCategory(categorySlug: string): Product[] {
  return (productsData.products as unknown as Product[]).filter(p => p.categorySlug === categorySlug);
}

/**
 * Get prev/next products within the same category (for navigation arrows)
 * Spans across all series in the category, respecting seriesOrder from products.json.
 */
export function getCategoryNavigation(productSlug: string): {
  prev: Product | null;
  next: Product | null;
  current: Product | null;
  categoryProducts: Product[];
} {
  const product = getProductBySlug(productSlug);
  if (!product) return { prev: null, next: null, current: null, categoryProducts: [] };

  // Build the full ordered product list by walking series in their defined order,
  // then collecting each series' products in order — same logic as the category page.
  const orderedSeries = getSeriesByCategory(product.categorySlug);
  const categoryProducts: Product[] = [];
  for (const series of orderedSeries) {
    const seriesProducts = getProductsBySeries(series.slug);
    categoryProducts.push(...seriesProducts);
  }

  const currentIndex = categoryProducts.findIndex(p => p.slug === productSlug);

  return {
    prev: currentIndex > 0 ? categoryProducts[currentIndex - 1] : null,
    next: currentIndex < categoryProducts.length - 1 ? categoryProducts[currentIndex + 1] : null,
    current: product,
    categoryProducts,
  };
}

/**
 * Get the representative image for a series (first product with images)
 */
export function getSeriesRepresentativeImage(seriesSlug: string): string | null {
  const products = getProductsBySeries(seriesSlug);
  for (const p of products) {
    if (p.images.length > 0) return p.images[0];
  }
  return null;
}

/**
 * Get the representative image for a category (first product with images)
 */
export function getCategoryRepresentativeImage(categorySlug: string): string | null {
  // Use explicit heroImage if set on the category
  const category = getCategoryBySlug(categorySlug);
  if (category && (category as unknown as Record<string, unknown>).heroImage) {
    return (category as unknown as Record<string, unknown>).heroImage as string;
  }
  // Fallback: first product image found
  const products = getProductsByCategory(categorySlug);
  for (const p of products) {
    if (p.images.length > 0) return p.images[0];
  }
  return null;
}

/**
 * Get all unique category slugs (for static path generation)
 */
export function getAllCategorySlugs(): string[] {
  return (productsData.categories as unknown as Category[]).map(c => c.slug);
}

/**
 * Get all unique product slugs (for static path generation)
 */
export function getAllProductSlugs(): { categorySlug: string; productSlug: string }[] {
  return (productsData.products as unknown as Product[]).map(p => ({
    categorySlug: p.categorySlug,
    productSlug: p.slug,
  }));
}

/**
 * Search products by model name (for compare feature)
 */
export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return (productsData.products as unknown as Product[]).filter(p =>
    p.model.toLowerCase().includes(q) ||
    p.name.toLowerCase().includes(q) ||
    p.seriesSlug.includes(q)
  );
}
