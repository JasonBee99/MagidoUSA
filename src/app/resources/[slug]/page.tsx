import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getResourceBySlug,
  getAllResourceSlugs,
} from '@/data/resources';
import { getSeriesBySlug } from '@/lib/products';

// ─── Static params for build-time generation ───
export function generateStaticParams() {
  return getAllResourceSlugs().map((slug) => ({ slug }));
}

// ─── Dynamic metadata for SEO ───
export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const doc = getResourceBySlug(params.slug);
  if (!doc) return { title: 'Not Found' };

  return {
    title: doc.title,
    description: doc.metaDescription,
  };
}

export default function ResourceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const doc = getResourceBySlug(params.slug);
  if (!doc) notFound();

  // Pull spec tables from products.json for related series
  const seriesWithSpecs = doc.relatedSeries
    .map((slug) => getSeriesBySlug(slug))
    .filter((s) => s && s.specTable && s.specTable.rows.length > 0);

  return (
    <>
      {/* Hero */}
      <section className="hero-bg py-12 text-white lg:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-4 flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/resources"
              className="transition-colors hover:text-white"
            >
              Resources
            </Link>
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
          {doc.productLink && (
            <Link
              href={doc.productLink}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-magido-orange px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-magido-orange-dark"
            >
              View {doc.categoryName} →
            </Link>
          )}
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Article sections */}
        <article className="space-y-10">
          {doc.sections.map((section, i) => (
            <section key={i}>
              <h2 className="font-display text-xl font-bold text-[var(--color-text)] sm:text-2xl">
                {section.heading}
              </h2>
              <div
                className="resource-content mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]"
                dangerouslySetInnerHTML={{ __html: section.body }}
              />
            </section>
          ))}
        </article>

        {/* ─── Spec Tables ─── */}
        {seriesWithSpecs.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 font-display text-2xl font-bold text-[var(--color-text)]">
              Full Specifications
            </h2>
            <div className="space-y-10">
              {seriesWithSpecs.map((series) => {
                if (!series) return null;
                const { specTable } = series;
                return (
                  <div key={series.slug}>
                    <h3 className="mb-3 font-display text-lg font-semibold text-[var(--color-text)]">
                      {series.name}
                    </h3>
                    <div className="scrollbar-thin overflow-x-auto rounded-xl border border-[var(--color-border)]">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
                            <th className="px-4 py-3 text-left font-semibold text-[var(--color-text)]">
                              Specification
                            </th>
                            <th className="px-3 py-3 text-left font-semibold text-[var(--color-text-muted)]">
                              Unit
                            </th>
                            {specTable.models.map((model) => (
                              <th
                                key={model}
                                className="px-3 py-3 text-center font-semibold text-magido-blue"
                              >
                                {model}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {specTable.rows.map((row, ri) => (
                            <tr
                              key={ri}
                              className={
                                ri % 2 === 0
                                  ? 'bg-[var(--color-card-bg)]'
                                  : 'bg-[var(--color-bg-secondary)]/50'
                              }
                            >
                              <td className="px-4 py-2.5 font-medium text-[var(--color-text)]">
                                {row.name}
                              </td>
                              <td className="px-3 py-2.5 text-[var(--color-text-muted)]">
                                {row.unit}
                              </td>
                              {specTable.models.map((model) => (
                                <td
                                  key={model}
                                  className="px-3 py-2.5 text-center text-[var(--color-text-secondary)]"
                                >
                                  {row.values[model] || '—'}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ─── Navigation ─── */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-[var(--color-border)] pt-8 sm:flex-row">
          <Link
            href="/resources"
            className="text-sm font-medium text-magido-blue transition-colors hover:text-magido-orange"
          >
            ← Back to Resources
          </Link>
          <Link
            href="/contact"
            className="inline-flex rounded-lg bg-magido-orange px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-magido-orange-dark"
          >
            Request a Quote
          </Link>
        </div>
      </div>
    </>
  );
}
