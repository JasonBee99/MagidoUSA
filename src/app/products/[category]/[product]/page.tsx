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
    title: `${product.name} | ${series?.name || category?.name || 'Parts Washer'} | Magido USA`,
    description: metaDescription,
    alternates: {
      canonical: `https://magidousa.com/products/${params.category}/${params.product}`,
    },
    openGraph: {
      title: `${product.name} | ${series?.name || 'Magido USA'}`,
      description: metaDescription,
      url: `https://magidousa.com/products/${params.category}/${params.product}`,
      images: product.images.length > 0 ? [{ url: product.images[0] }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | ${series?.name || 'Magido USA'}`,
      description: metaDescription,
    },
  };
}

// ─── Series PDF brochure map — only series with a confirmed PDF ───
const SERIES_PDF: Record<string, string> = {
  'dg':      'MAGIDO_DG_USA.pdf',
  'eco':     'MAGIDO_ECO_USA.pdf',
  'fls':     'MAGIDO_FLS_USA.pdf',
  'gold-1b': 'MAGIDO_belt_converyor.pdf',
  'gold-2b': 'MAGIDO_belt_converyor.pdf',
  'hp':      'MAGIDO_HP_USA.pdf',
  'jolly':   'MAGIDO_SPRIALINE_USA.pdf',
  'l':       'MAGIDO_L_USA.pdf',
  'silver':  'MAGIDO_belt_converyor.pdf',
  'spira-1b':'MAGIDO_SPRIALINE_USA.pdf',
  'spira-2b':'MAGIDO_SPRIALINE_USA.pdf',
  'tr450':   'MAGIDO_TR450_USA.pdf',
  'x51-2':   'MAGIDO_X51_2_USA.pdf',
  'x51hp':   'MAGIDO_X51HP_USA.pdf',
  'x51':     'MAGIDO_X51_USA.pdf',
  'x53-2':   'MAGIDO_X53_2_USA.pdf',
  'x53':     'MAGIDO_X53_USA.pdf',
  'x81':     'MAGIDO_X81_USA.pdf',
};

// ─── Secondary PDF map — additional docs (e.g. service instructions) ───
const SERIES_PDF2: Record<string, { file: string; label: string }> = {
  'hp': { file: 'HP25_StartUpInstructions_USA.pdf', label: 'Start-Up Instructions' },
};

// ─── Key specs — ordered list of candidates, first match per label wins ───
const KEY_SPEC_CANDIDATES: { specKeys: string[]; label: string }[] = [
  { specKeys: ['Working Area', 'Working Envelope'],                       label: 'Working Area' },
  { specKeys: ['Turntable Basket Diameter'],                              label: 'Basket Dia.' },
  { specKeys: ['Turntable Basket', 'Basket Dimensions'],                  label: 'Basket Size' },
  { specKeys: ['Drum diameter', 'Drum Diameter'],                        label: 'Drum Dia.' },
  { specKeys: ['Drum Length'],                                            label: 'Drum Length' },
  { specKeys: ['Width of Conveyor belt', 'Available width of conveyor belt'], label: 'Belt Width' },
  { specKeys: ['Usable washing height'],                                  label: 'Wash Height' },
  { specKeys: ['Load Weight'],                                            label: 'Load Weight' },
  { specKeys: ['Load Height'],                                            label: 'Load Height' },
  { specKeys: ['Fluid/Tank Capacity', 'Fluid Capacity', 'Tank Capacity'], label: 'Tank' },
  { specKeys: ['Wash Tank', 'Wash Fluid Capacity'],                       label: 'Wash Tank' },
  { specKeys: ['Rinse Fluid Capacity'],                                   label: 'Rinse Tank' },
  { specKeys: ['Pump', 'Pump(s)', 'Wash Pump', 'Wash pump'],             label: 'Pump' },
  { specKeys: ['Flow Rate'],                                              label: 'Flow Rate' },
  { specKeys: ['Spray Pressure'],                                         label: 'Spray Pressure' },
  { specKeys: ['Heater', 'Wash Heater', 'Wash electrical heating'],       label: 'Heater' },
  { specKeys: ['Max Operating Temperature', 'Operating Temperature', 'Solution temperature'], label: 'Temperature' },
  { specKeys: ['Rotation Speed'],                                         label: 'Rotation' },
  { specKeys: ['Production'],                                             label: 'Production' },
  { specKeys: ['Voltage', 'Voltage / Amperage', 'Power supply'],          label: 'Power Supply' },
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
  const pdfFile = product.seriesSlug ? SERIES_PDF[product.seriesSlug] ?? null : null;
  const pdfHref = pdfFile ? `/brochures/${pdfFile}` : null;
  const pdf2Entry = product.seriesSlug ? SERIES_PDF2[product.seriesSlug] ?? null : null;
  const pdfHref2 = pdf2Entry ? `/brochures/${pdf2Entry.file}` : null;
  const pdfLabel2 = pdf2Entry?.label ?? null;
  const { prev, next } = getCategoryNavigation(params.product);
  const prevSeries = prev ? getSeriesBySlug(prev.seriesSlug) : null;
  const nextSeries = next ? getSeriesBySlug(next.seriesSlug) : null;

  // Build key specs — first matching specKey per candidate, deduplicate labels
  const seenLabels = new Set<string>();
  const keySpecs: { label: string; value: string }[] = [];

  for (const candidate of KEY_SPEC_CANDIDATES) {
    if (keySpecs.length >= 8) break;
    if (seenLabels.has(candidate.label)) continue;

    for (const specKey of candidate.specKeys) {
      const spec = product.specs[specKey];
      if (!spec?.value || spec.value === '–' || spec.value === '-') continue;

      let displayValue = spec.value;
      if (
        spec.unit &&
        spec.value !== spec.unit &&
        !spec.value.toLowerCase().includes(spec.unit.toLowerCase())
      ) {
        displayValue = `${spec.value} ${spec.unit}`;
      }

      keySpecs.push({ label: candidate.label, value: displayValue });
      seenLabels.add(candidate.label);
      break;
    }
  }

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

            {/* Left: Image with floating Prev / Next buttons */}
            <div className="lg:w-5/12">
              <div className="relative">
                <ProductImageGallery
                  images={product.images}
                  alt={product.name}
                  seriesName={series?.displayName}
                  model={product.model}
                />

                {prev && (
                  <Link
                    href={`/products/${params.category}/${prev.slug}`}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-0.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-card-bg)]/90 backdrop-blur-sm px-2 py-3 text-center shadow-md transition-colors hover:border-magido-orange/40 hover:bg-[var(--color-bg-secondary)]"
                    title={prev.name}
                  >
                    <ChevronLeft className="h-4 w-4 text-magido-orange" />
                    <span className="text-2xs font-semibold text-magido-orange">{prevSeries?.displayName}</span>
                    <span className="text-2xs font-bold text-[var(--color-text)]">{prev.model}</span>
                  </Link>
                )}

                {next && (
                  <Link
                    href={`/products/${params.category}/${next.slug}`}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-0.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-card-bg)]/90 backdrop-blur-sm px-2 py-3 text-center shadow-md transition-colors hover:border-magido-orange/40 hover:bg-[var(--color-bg-secondary)]"
                    title={next.name}
                  >
                    <ChevronRight className="h-4 w-4 text-magido-orange" />
                    <span className="text-2xs font-semibold text-magido-orange">{nextSeries?.displayName}</span>
                    <span className="text-2xs font-bold text-[var(--color-text)]">{next.model}</span>
                  </Link>
                )}
              </div>
            </div>

            {/* Right: Product info */}
            <div className="lg:w-7/12">
              {series && (
                <p className="text-sm font-semibold text-[var(--color-text-secondary)]">
                  {series.name}
                </p>
              )}

              <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-[var(--color-text)] sm:text-3xl lg:text-4xl">
                {product.name}
              </h1>

              {(product.description || series?.description) && (() => {
                const raw = product.description || series?.description || '';
                const html = raw.replace(
                  /AISI 304 stainless steel/gi,
                  '<a href="/solutions/aisi-304-stainless-steel-parts-washers" style="color:#eb6c1c;font-weight:500;text-decoration:none;" onmouseover="this.style.color=&apos;#315687&apos;" onmouseout="this.style.color=&apos;#eb6c1c&apos;">AISI 304 stainless steel</a>'
                );
                return (
                  <p
                    className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)] sm:text-base"
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                );
              })()}

              {/* Key specs — wrapped in <dl> for valid semantics */}
              {keySpecs.length > 0 && (
                <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 lg:grid-cols-4">
                  {keySpecs.map((ks) => (
                    <div key={ks.label}>
                      <dt className="text-xs font-medium text-[var(--color-text-secondary)]">
                        {ks.label}
                      </dt>
                      <dd className="mt-0.5 text-sm font-bold text-[var(--color-text)]">
                        {ks.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={`/contact?product=${encodeURIComponent(product.slug)}`}
                  className="btn-quote"
                >
                  Request a Quote
                </Link>
                <Link
                  href="/contact?type=evaluation"
                  className="inline-flex items-center gap-2 rounded-lg border border-magido-blue px-6 py-3 text-sm font-semibold text-magido-blue transition-colors hover:bg-magido-blue hover:text-white dark:border-[var(--color-border)] dark:text-[var(--color-text-secondary)] dark:hover:bg-[var(--color-bg-tertiary)]"
                >
                  Process Evaluation
                </Link>
                {pdfHref && (
                  <a
                    href={pdfHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-6 py-3 text-sm font-semibold text-[var(--color-text-secondary)] transition-colors hover:border-magido-orange hover:text-magido-orange"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                      <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
                      <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
                    </svg>
                    Download Brochure
                  </a>
                )}
                {pdfHref2 && (
                  <a
                    href={pdfHref2}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-6 py-3 text-sm font-semibold text-[var(--color-text-secondary)] transition-colors hover:border-magido-orange hover:text-magido-orange"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                      <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
                      <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
                    </svg>
                    {pdfLabel2}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Spec Tabs ─── */}
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
        <div className="mx-auto max-w-4xl">
          {/* Primary CTA */}
          <div className="text-center">
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
                className="btn-quote"
              >
                Request a Quote
              </Link>
              <a
                href="tel:8444624436"
                className="inline-flex rounded-lg border border-magido-blue px-6 py-2.5 text-sm font-semibold text-magido-blue transition-colors hover:bg-magido-blue hover:text-white dark:border-[var(--color-border)] dark:text-[var(--color-text-secondary)] dark:hover:bg-[var(--color-bg-tertiary)]"
              >
                <span aria-hidden="true">📞</span> 844-462-4436
              </a>
            </div>
          </div>

          {/* Secondary — guides for unsure users */}
          <div className="mt-10 border-t border-[var(--color-border)] pt-8">
            <p className="text-center text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-widest mb-5">
              Not sure yet? Start here.
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <Link
                href="/how-to-choose"
                className="group flex items-start gap-3 rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-4 transition hover:border-magido-orange/40 hover:shadow-sm"
              >
                <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-magido-orange/10 text-magido-orange text-base">🔍</span>
                <div>
                  <p className="text-sm font-semibold text-[var(--color-text)] group-hover:text-magido-orange">How to Choose a Parts Washer</p>
                  <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">Match machine type to your parts, contamination, and volume</p>
                </div>
              </Link>
              <Link
                href="/solutions/aqueous-vs-solvent-parts-washers"
                className="group flex items-start gap-3 rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-4 transition hover:border-magido-orange/40 hover:shadow-sm"
              >
                <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-magido-orange/10 text-magido-orange text-base">⚖️</span>
                <div>
                  <p className="text-sm font-semibold text-[var(--color-text)] group-hover:text-magido-orange">Aqueous vs. Solvent</p>
                  <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">Compare cleaning technologies side by side</p>
                </div>
              </Link>
              <Link
                href="/contact#evaluation"
                className="group flex items-start gap-3 rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-4 transition hover:border-magido-orange/40 hover:shadow-sm"
              >
                <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-magido-orange/10 text-magido-orange text-base">🧪</span>
                <div>
                  <p className="text-sm font-semibold text-[var(--color-text)] group-hover:text-magido-orange">Free Process Evaluation</p>
                  <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">Send us your parts — we validate the cleaning solution first</p>
                </div>
              </Link>
            </div>
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
