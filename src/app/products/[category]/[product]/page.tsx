import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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

  const specHighlights: string[] = [];
  if (product.specs['Load Weight']) specHighlights.push(`Load: ${product.specs['Load Weight'].value}`);
  if (product.specs['Tank Capacity']) specHighlights.push(`Tank: ${product.specs['Tank Capacity'].value}`);
  if (product.specs['Heater']) specHighlights.push(`Heater: ${product.specs['Heater'].value} kW`);

  const metaDescription = product.description
    ? `${product.description.slice(0, 155)}...`
    : `${product.name} by Magido USA. ${series?.type || 'Parts Washer'}. ${specHighlights.join(', ')}. Built from AISI 304 stainless steel.`;

  return {
    title: `${product.name} | Magido USA`,
    description: metaDescription,
    openGraph: {
      title: `${product.name} | Magido USA`,
      description: metaDescription,
      images: product.images.length > 0 ? [{ url: product.images[0] }] : undefined,
    },
  };
}

// ─── Key specs to display as inline pairs (order matters) ───
const KEY_SPEC_DISPLAY: { specKey: string; label: string }[] = [
  { specKey: 'Belt Width', label: 'Belt Width' },
  { specKey: 'Turntable Basket Diameter', label: 'Basket' },
  { specKey: 'Drum Diameter', label: 'Drum' },
  { specKey: 'Working Dimensions', label: 'Working Size' },
  { specKey: 'Max Part Size', label: 'Max Part' },
  { specKey: 'Load Weight', label: 'Load Weight' },
  { specKey: 'Load Height', label: 'Wash Height' },
  { specKey: 'Tank Capacity', label: 'Wash Tank' },
  { specKey: 'Pump(s)', label: 'Wash Pump' },
  { specKey: 'Flow Rate', label: 'Flow Rate' },
  { specKey: 'Max Operating Temperature', label: 'Temperature' },
  { specKey: 'Voltage', label: 'Power Supply' },
  { specKey: 'Timer', label: 'Timer' },
];

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
  const { prev, next } = getCategoryNavigation(params.product);
  const prevSeries = prev ? getSeriesBySlug(prev.seriesSlug) : null;
  const nextSeries = next ? getSeriesBySlug(next.seriesSlug) : null;

  // Build key specs for display
  const keySpecs = KEY_SPEC_DISPLAY
    .filter((ks) => {
      const spec = product.specs[ks.specKey];
      return spec && spec.value && spec.value !== '–' && spec.value !== '-';
    })
    .map((ks) => {
      const spec = product.specs[ks.specKey];
      let displayValue = spec.value;
      // Append unit if not already included
      if (spec.unit && !spec.value.toLowerCase().includes(spec.unit.toLowerCase())) {
        displayValue = `${spec.value} ${spec.unit}`;
      }
      return { label: ks.label, value: displayValue };
    })
    .slice(0, 8); // max 8 key specs shown

  return (
    <>
      {/* ─── Breadcrumb ─── */}
      <nav
        className="border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Breadcrumb"
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-1.5 text-sm">
          <Link
            href="/"
            className="text-[var(--color-text-muted)] transition-colors hover:text-magido-orange"
          >
            Home
          </Link>
          <span className="text-[var(--color-text-muted)]">›</span>
          <Link
            href={`/products/${params.category}`}
            className="text-[var(--color-text-muted)] transition-colors hover:text-magido-orange"
          >
            {category.name}
          </Link>
          {series && (
            <>
              <span className="text-[var(--color-text-muted)]">›</span>
              <Link
                href={`/products/${params.category}?series=${series.slug}-series`}
                className="text-[var(--color-text-muted)] transition-colors hover:text-magido-orange"
              >
                {series.name}
              </Link>
            </>
          )}
          <span className="text-[var(--color-text-muted)]">›</span>
          <span className="font-medium text-[var(--color-text)]">
            {product.name}
          </span>
        </div>
      </nav>

      {/* ─── Product Hero ─── */}
      <section className="px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
            {/* Left: Prev button + Image + Next button */}
            <div className="lg:w-5/12">
              <div className="flex items-center gap-2">
                {/* Prev button */}
                {prev ? (
                  <Link
                    href={`/products/${params.category}/${prev.slug}`}
                    className="flex flex-col items-center gap-0.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-card-bg)] px-2 py-3 text-center transition-colors hover:border-magido-orange/40 hover:bg-[var(--color-bg-secondary)]"
                    title={prev.name}
                  >
                    <ChevronLeft className="h-4 w-4 text-magido-orange" />
                    <span className="text-2xs font-semibold text-magido-orange">{prevSeries?.displayName}</span>
                    <span className="text-2xs font-bold text-[var(--color-text)]">{prev.model}</span>
                  </Link>
                ) : (
                  <div className="w-14 flex-shrink-0" />
                )}

                {/* Image — slightly reduced */}
                <div className="flex-1 min-w-0">
                  <ProductImageGallery
                    images={product.images}
                    alt={product.name}
                    seriesName={series?.displayName}
                    model={product.model}
                  />
                </div>

                {/* Next button */}
                {next ? (
                  <Link
                    href={`/products/${params.category}/${next.slug}`}
                    className="flex flex-col items-center gap-0.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-card-bg)] px-2 py-3 text-center transition-colors hover:border-magido-orange/40 hover:bg-[var(--color-bg-secondary)]"
                    title={next.name}
                  >
                    <ChevronRight className="h-4 w-4 text-magido-orange" />
                    <span className="text-2xs font-semibold text-magido-orange">{nextSeries?.displayName}</span>
                    <span className="text-2xs font-bold text-[var(--color-text)]">{next.model}</span>
                  </Link>
                ) : (
                  <div className="w-14 flex-shrink-0" />
                )}
              </div>
            </div>

            {/* Right: Product info */}
            <div className="lg:w-7/12">
              {/* Series badge */}
              {series && (
                <p className="text-sm font-medium text-[var(--color-text-muted)]">
                  {series.name}
                </p>
              )}

              {/* Product title */}
              <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-[var(--color-text)] sm:text-3xl lg:text-4xl">
                {product.name}
              </h1>

              {/* Description */}
              {(product.description || series?.description) && (
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)] sm:text-base">
                  {product.description || series?.description}
                </p>
              )}

              {/* Key specs — bold label / value pairs */}
              {keySpecs.length > 0 && (
                <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 lg:grid-cols-4">
                  {keySpecs.map((ks) => (
                    <div key={ks.label}>
                      <dt className="text-xs font-medium text-[var(--color-text-muted)]">
                        {ks.label}
                      </dt>
                      <dd className="mt-0.5 text-sm font-bold text-[var(--color-text)]">
                        {ks.value}
                      </dd>
                    </div>
                  ))}
                </div>
              )}

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={`/contact?product=${encodeURIComponent(product.slug)}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-magido-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-magido-orange-dark"
                >
                  Request a Quote
                </Link>
                <Link
                  href="/contact?type=evaluation"
                  className="inline-flex items-center gap-2 rounded-lg border border-magido-blue px-6 py-3 text-sm font-semibold text-magido-blue transition-colors hover:bg-magido-blue hover:text-white dark:border-[var(--color-border)] dark:text-[var(--color-text-secondary)] dark:hover:bg-[var(--color-bg-tertiary)]"
                >
                  Process Evaluation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Spec Tabs (Features | Options | Full Specifications) ─── */}
      <section className="px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ProductSpecTabs product={product} series={series || null} />
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
              All specifications shown side-by-side for easy selection.
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

      {/* ─── Bottom CTA ─── */}
      <section className="border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-xl font-bold text-[var(--color-text)]">
            Ready to Move Forward?
          </h2>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Contact our team for a quote, process evaluation, or to discuss
            custom configurations for your specific parts cleaning application.
          </p>
          <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex rounded-lg bg-magido-orange px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-magido-orange-dark"
            >
              Request a Quote
            </Link>
            <a
              href="tel:8444624436"
              className="inline-flex rounded-lg border border-magido-blue px-6 py-2.5 text-sm font-semibold text-magido-blue transition-colors hover:bg-magido-blue hover:text-white dark:border-[var(--color-border)] dark:text-[var(--color-text-secondary)] dark:hover:bg-[var(--color-bg-tertiary)]"
            >
              📞 844-462-4436
            </a>
          </div>
        </div>
      </section>

      {/* ─── JSON-LD ─── */}
      <ProductJsonLd
        name={product.name}
        model={product.model}
        description={product.description || series?.description || `${product.name} by Magido USA.`}
        image={product.images[0]}
        category={category.name}
        url={`/products/${params.category}/${product.slug}`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: category.name, url: `/products/${params.category}` },
          ...(series ? [{ name: series.name, url: `/products/${params.category}?series=${series.slug}-series` }] : []),
          { name: product.name, url: `/products/${params.category}/${product.slug}` },
        ]}
      />
    </>
  );
}
