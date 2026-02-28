import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  getAllProductSlugs,
  getProductBySlug,
  getCategoryBySlug,
  getSeriesBySlug,
  getProductsBySeries,
  getCategoryNavigation,
} from '@/lib/products';
import { ProductImageGallery } from '@/components/ProductImageGallery';
import { ProductSpecTabs } from '@/components/ProductSpecTabs';
import { SeriesComparisonTable } from '@/components/SeriesComparisonTable';
import { ProductNavigation } from '@/components/ProductNavigation';
import { ChevronRight, FileText, Phone } from 'lucide-react';
import { ProductJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';

// ─── Static generation for all product slugs ───
export function generateStaticParams() {
  return getAllProductSlugs().map(({ categorySlug, productSlug }) => ({
    category: categorySlug,
    product: productSlug,
  }));
}

// ─── Dynamic metadata per product ───
export function generateMetadata({
  params,
}: {
  params: { category: string; product: string };
}): Metadata {
  const product = getProductBySlug(params.product);
  if (!product) return {};

  const category = getCategoryBySlug(params.category);
  const series = getSeriesBySlug(product.seriesSlug);
  const displayModel = product.model.replace(/-(\d)/, '/$1');

  // Build a short spec summary for description
  const specHighlights: string[] = [];
  if (product.specs['Load Weight']) specHighlights.push(`Load: ${product.specs['Load Weight'].value}`);
  if (product.specs['Tank Capacity']) specHighlights.push(`Tank: ${product.specs['Tank Capacity'].value}`);
  if (product.specs['Heater']) specHighlights.push(`Heater: ${product.specs['Heater'].value} kW`);

  const description = `${displayModel} ${series?.type || ''} parts washer by Magido USA. ${specHighlights.join(', ')}. Built from AISI 304 stainless steel.`;

  return {
    title: `${displayModel} — ${category?.name || 'Parts Washer'}`,
    description,
    openGraph: {
      title: `${displayModel} | Magido USA`,
      description,
      images: product.images.length > 0 ? [{ url: product.images[0] }] : undefined,
    },
  };
}

function getDisplayModel(model: string): string {
  return model.replace(/-(\d)/, '/$1');
}

export default function ProductPage({
  params,
}: {
  params: { category: string; product: string };
}) {
  const product = getProductBySlug(params.product);
  if (!product) notFound();

  const category = getCategoryBySlug(params.category);
  if (!category) notFound();

  const series = getSeriesBySlug(product.seriesSlug);
  const seriesProducts = getProductsBySeries(product.seriesSlug);
  const { prev, next } = getCategoryNavigation(product.slug);
  const displayModel = getDisplayModel(product.model);

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
          <Link
            href={`/products/${params.category}`}
            className="text-[var(--color-text-muted)] transition-colors hover:text-magido-orange"
          >
            {category.name}
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-[var(--color-text-muted)]" />
          <span className="font-medium text-[var(--color-text)]">
            {displayModel}
          </span>
        </div>
      </nav>

      {/* ─── Prev/Next Navigation ─── */}
      <ProductNavigation
        prev={prev}
        next={next}
        categorySlug={params.category}
        categoryName={category.name}
      />

      {/* ─── Product Hero ─── */}
      <section className="px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
            {/* Left: Image gallery */}
            <div className="lg:w-1/2">
              <ProductImageGallery
                images={product.images}
                alt={product.name}
              />
            </div>

            {/* Right: Product info */}
            <div className="lg:w-1/2">
              {/* Series badge */}
              {series && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[var(--color-text-muted)]">
                    {series.name}
                  </span>
                  {series.isNew && (
                    <span className="rounded-full bg-magido-orange px-2 py-0.5 text-2xs font-bold uppercase tracking-wider text-white">
                      New
                    </span>
                  )}
                </div>
              )}

              {/* Model title */}
              <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-4xl">
                {displayModel}
              </h1>

              {/* Type description */}
              <p className="mt-2 text-base text-[var(--color-text-secondary)]">
                {series?.type || 'Parts Washer'} • Built from AISI 304
                Stainless Steel
              </p>

              {/* Quick specs */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                {product.specs['Load Weight'] && product.specs['Load Weight'].value !== '–' && (
                  <QuickSpec label="Load Capacity" value={product.specs['Load Weight'].value} />
                )}
                {product.specs['Tank Capacity'] && product.specs['Tank Capacity'].value !== '–' && (
                  <QuickSpec label="Tank Capacity" value={product.specs['Tank Capacity'].value} />
                )}
                {product.specs['Heater'] && product.specs['Heater'].value !== '–' && (
                  <QuickSpec label="Heater" value={`${product.specs['Heater'].value} kW`} />
                )}
                {product.specs['Voltage'] && product.specs['Voltage'].value !== '–' && (
                  <QuickSpec label="Voltage" value={`${product.specs['Voltage'].value}V`} />
                )}
                {product.specs['Turntable Basket Diameter'] && product.specs['Turntable Basket Diameter'].value !== '–' && (
                  <QuickSpec label="Basket Diameter" value={product.specs['Turntable Basket Diameter'].value} />
                )}
                {product.specs['Pump(s)'] && product.specs['Pump(s)'].value !== '–' && (
                  <QuickSpec label="Pump(s)" value={product.specs['Pump(s)'].value} />
                )}
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={`/contact?model=${encodeURIComponent(product.model)}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-magido-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-magido-orange-dark"
                >
                  <FileText className="h-4 w-4" />
                  Request a Quote
                </Link>
                <a
                  href="tel:8444624436"
                  className="inline-flex items-center gap-2 rounded-lg border border-magido-blue px-6 py-3 text-sm font-semibold text-magido-blue transition-colors hover:bg-magido-blue hover:text-white dark:border-[var(--color-border)] dark:text-[var(--color-text-secondary)] dark:hover:bg-[var(--color-bg-tertiary)]"
                >
                  <Phone className="h-4 w-4" />
                  844-4MA-GIDO
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Spec Tabs ─── */}
      <section className="px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ProductSpecTabs product={product} />
        </div>
      </section>

      {/* ─── Series Comparison Table ─── */}
      {series && seriesProducts.length > 1 && (
        <section className="border-t border-[var(--color-border)] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <h2 className="font-display text-2xl font-bold tracking-tight text-[var(--color-text)] sm:text-3xl">
              Compare {series.name} Models
            </h2>
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
              Side-by-side specifications for all {seriesProducts.length} models
              in the {series.name}
            </p>
            <div className="mt-6">
              <SeriesComparisonTable
                series={series}
                products={seriesProducts}
                currentProductSlug={product.slug}
                categorySlug={params.category}
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
}

// ─── Quick Spec Card ───
function QuickSpec({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-[var(--color-bg-secondary)] px-3 py-2.5">
      <dt className="text-2xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
        {label}
      </dt>
      <dd className="mt-0.5 text-sm font-semibold text-[var(--color-text)]">
        {value}
      </dd>
    </div>
  );
}
