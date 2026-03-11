import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import {
  getAllCategorySlugs,
  getCategoryBySlug,
  getSeriesByCategory,
  getProductsBySeries,
  getCategoryRepresentativeImage,
  getAllCategories,
} from '@/lib/products';
import { getAllResourceDocuments } from '@/data/resources';
import { CategoryContent } from '@/components/CategoryContent';
import { ChevronRight } from 'lucide-react';

// ─── Static generation ───
export function generateStaticParams() {
  return getAllCategorySlugs().map((slug) => ({ category: slug }));
}

// ─── Dynamic metadata ───
export function generateMetadata({
  params,
}: {
  params: { category: string };
}): Metadata {
  const category = getCategoryBySlug(params.category);
  if (!category) return {};

  const metaDescription = category.description
    ? `${category.description.slice(0, 155)}...`
    : `Explore Magido's ${category.name.toLowerCase()} — ${category.shortDescription.toLowerCase()}. ${category.totalProducts} models across ${category.series.length} series, all built from AISI 304 stainless steel.`;

  return {
    title: `${category.name} — Industrial Aqueous Parts Washers`,
    description: metaDescription,
    alternates: {
      canonical: `https://www.magidousa.com/products/${params.category}`,
    },
    openGraph: {
      title: `${category.name} | Magido USA`,
      description: category.shortDescription,
      url: `https://www.magidousa.com/products/${params.category}`,
    },
  };
}

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const category = getCategoryBySlug(params.category);
  if (!category) notFound();

  const seriesList = getSeriesByCategory(params.category);
  const heroImage = getCategoryRepresentativeImage(params.category);

  // Pre-load all products grouped by series
  const productsBySeries: Record<string, ReturnType<typeof getProductsBySeries>> = {};
  for (const series of seriesList) {
    productsBySeries[series.slug] = getProductsBySeries(series.slug);
  }

  // Other categories for "Other Systems" section
  const allCategories = getAllCategories();
  const otherCategories = allCategories
    .filter((c) => c.slug !== params.category)
    .map((c) => ({
      name: c.name,
      slug: c.slug,
      shortDescription: c.shortDescription,
    }));

  // Find related resource docs for this category
  const allDocs = getAllResourceDocuments();
  const resourceDocs = allDocs
    .filter((d) => d.categorySlug === params.category)
    .map((d) => ({ title: d.title, slug: d.slug }));

  return (
    <>
      {/* ─── Breadcrumb ─── */}
      <nav
        className="border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Breadcrumb"
      >
        <div className="mx-auto flex max-w-7xl items-center gap-2 text-sm">
          <Link
            href="/"
            className="text-[var(--color-text-muted)] transition-colors hover:text-magido-orange"
          >
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-[var(--color-text-muted)]" />
          <Link
            href="/products"
            className="text-[var(--color-text-muted)] transition-colors hover:text-magido-orange"
          >
            Products
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-[var(--color-text-muted)]" />
          <span className="font-medium text-[var(--color-text)]">
            {category.name}
          </span>
        </div>
      </nav>

      {/* Client component handles tabs + filtering + all sections */}
      <Suspense fallback={null}>
        <CategoryContent
          category={category}
          seriesList={seriesList}
          productsBySeries={productsBySeries}
          heroImage={heroImage}
          otherCategories={otherCategories}
          resourceDocs={resourceDocs}
        />
      </Suspense>
    </>
  );
}
