import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getResourceBySlug,
  getAllResourceSlugs,
  SERIES_BROCHURES,
} from '@/data/resources';
import { getSeriesBySlug, getProductsBySeries } from '@/lib/products';
import { ResourceSeriesCard, type SeriesCardData } from '@/components/ResourceSeriesCard';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

// ─── Static params ───
export function generateStaticParams() {
  return getAllResourceSlugs().map((slug) => ({ slug }));
}

// ─── Metadata ───
export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const doc = getResourceBySlug(params.slug);
  if (!doc) return { title: 'Not Found' };
  return {
    title: `${doc.title} | Magido USA`,
    description: doc.metaDescription,
    alternates: { canonical: `https://magidousa.com/resources/${params.slug}` },
    openGraph: {
      title: `${doc.title} | Magido USA`,
      description: doc.metaDescription,
      url: `https://magidousa.com/resources/${params.slug}`,
      images: [{ url: 'https://magidousa.com/images/og-default.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${doc.title} | Magido USA`,
      description: doc.metaDescription,
    },
  };
}

export default function ResourceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const doc = getResourceBySlug(params.slug);
  if (!doc) notFound();

  // Build per-series card data
  const seriesCards: SeriesCardData[] = doc.relatedSeries
    .map((seriesSlug): SeriesCardData | null => {
      const series = getSeriesBySlug(seriesSlug);
      if (!series) return null;

      const products = getProductsBySeries(seriesSlug);
      const representativeImage =
        products.find((p) => p.images.length > 0)?.images[0] ?? null;

      const brochureEntry = SERIES_BROCHURES.find((b) => b.seriesSlug === seriesSlug);

      return {
        slug: series.slug,
        name: series.name,
        displayName: series.displayName,
        type: series.type,
        description: series.description,
        isNew: series.isNew,
        standardFeatures: series.standardFeatures ?? [],
        availableOptions: series.availableOptions ?? [],
        safetyFeatures: series.safetyFeatures ?? [],
        categorySlug: doc.categorySlug,
        representativeImage,
        brochureFile: brochureEntry?.fileName ?? null,
        specTable:
          series.specTable && series.specTable.rows.length > 0
            ? series.specTable
            : null,
      };
    })
    .filter((s): s is SeriesCardData => s !== null);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Resources', url: '/resources' },
          { name: doc.title, url: `/resources/${doc.slug}` },
        ]}
      />
      {/* ─── Hero ─── */}
      <section className="hero-bg py-12 text-white lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-4 flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="transition-colors hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/resources" className="transition-colors hover:text-white">Resources</Link>
            <span>/</span>
            <span className="text-gray-300">{doc.title}</span>
          </nav>
          <p className="mb-2 font-display text-sm font-semibold uppercase tracking-widest text-magido-orange">
            {doc.categoryName}
          </p>
          <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            {doc.title}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-gray-300">
            {doc.summary}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {doc.productLink && (
              <Link
                href={doc.productLink}
                className="inline-flex items-center gap-2 rounded-lg bg-magido-orange px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-magido-orange-dark"
              >
                View {doc.categoryName} →
              </Link>
            )}
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Content ─── */}
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">

        {/* Overview prose sections (no h4 content — just intro text) */}
        {doc.sections
          .filter((s) => !/<h4/i.test(s.body) && s.body.trim())
          .map((section, i) => (
            <section key={i} className="mb-10">
              <h2 className="font-display text-xl font-bold text-[var(--color-text)] sm:text-2xl">
                {section.heading}
              </h2>
              <div
                className="resource-content mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]"
                dangerouslySetInnerHTML={{ __html: section.body }}
              />
            </section>
          ))}

        {/* Series count badge */}
        {seriesCards.length > 0 && (
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-[var(--color-border)]" />
            <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-1 text-xs font-semibold text-[var(--color-text-muted)]">
              {seriesCards.length} {seriesCards.length === 1 ? 'Series' : 'Series'}
            </span>
            <div className="h-px flex-1 bg-[var(--color-border)]" />
          </div>
        )}

        {/* Per-series cards */}
        <div className="space-y-8">
          {seriesCards.map((series) => (
            <ResourceSeriesCard key={series.slug} series={series} />
          ))}
        </div>

        {/* ─── Bottom nav ─── */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-[var(--color-border)] pt-8 sm:flex-row">
          <Link
            href="/resources"
            className="text-sm font-medium text-magido-blue transition-colors hover:text-magido-orange"
          >
            ← Back to Resources
          </Link>
          <Link
            href="/contact"
            className="btn-quote btn-quote-sm"
          >
            Request a Quote
          </Link>
        </div>
      </div>
    </>
  );
}
