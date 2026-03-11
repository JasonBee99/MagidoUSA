import type { Metadata } from 'next';
import Link from 'next/link';
import {
  productCatalog,
  getResourcesByCategory,
  getBrochuresByCategory,
} from '@/data/resources';
import { ResourceAccordion } from './ResourceAccordion';

export const metadata: Metadata = {
  title: 'Resources & Documentation',
  description:
    'Technical documentation, product catalogs, startup guides, and service instructions for all Magido USA aqueous parts washing systems.',
  alternates: {
    canonical: 'https://www.magidousa.com/resources',
  },
};

export default function ResourcesPage() {
  const grouped = getResourcesByCategory();
  const brochureGroups = getBrochuresByCategory();

  return (
    <>
      {/* Hero */}
      <section className="hero-bg py-16 text-white lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-300">Resources</span>
          </nav>

          <p className="mb-2 font-display text-sm font-semibold uppercase tracking-widest text-magido-orange">
            Documentation
          </p>
          <h1 className="font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl lg:text-5xl">
            Resources &amp; Docs
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">
            Technical documentation, product catalogs, startup guides, and
            service instructions for all Magido USA aqueous parts washing
            systems.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* ─── Product Catalog Card ─── */}
        <div className="mb-14 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-card-bg)] shadow-lg">
          <div className="flex flex-col sm:flex-row">
            <div className="flex items-center justify-center bg-magido-blue/10 p-8 sm:w-40">
              <span className="text-5xl">📘</span>
            </div>
            <div className="flex flex-1 flex-col justify-center p-6 sm:p-8">
              <p className="mb-1 font-display text-xs font-semibold uppercase tracking-wider text-magido-orange">
                Complete Reference
              </p>
              <h2 className="font-display text-xl font-bold text-[var(--color-text)] sm:text-2xl">
                {productCatalog.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {productCatalog.summary}
              </p>
              <div className="mt-4">
                <Link
                  href="/resources/catalog"
                  className="inline-flex items-center gap-2 rounded-lg bg-magido-orange px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-magido-orange-dark"
                >
                  View Full Catalog →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Technical Documentation ─── */}
        <div className="mb-8">
          <p className="font-display text-xs font-semibold uppercase tracking-wider text-magido-orange">
            By Product Type
          </p>
          <h2 className="mt-1 font-display text-2xl font-bold text-[var(--color-text)]">
            Technical Documentation
          </h2>
        </div>

        <div className="space-y-10 mb-14">
          {grouped.map((group) => (
            <div key={group.categoryName}>
              {/* Category header */}
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold text-[var(--color-text)]">
                  {group.categoryName}
                </h3>
                <Link
                  href={group.productLink}
                  className="text-xs font-medium text-magido-orange transition-colors hover:text-magido-orange-dark"
                >
                  View Products →
                </Link>
              </div>

              {/* Document accordions */}
              <div className="space-y-3">
                {group.docs.map((doc) => (
                  <ResourceAccordion key={doc.slug} doc={doc} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ─── Series Brochures ─── */}
        <div className="mb-14">
          <p className="font-display text-xs font-semibold uppercase tracking-wider text-magido-orange">
            Series Brochures
          </p>
          <h2 className="mt-1 mb-6 font-display text-2xl font-bold text-[var(--color-text)]">
            Download by Series
          </h2>

          <div className="space-y-8">
            {brochureGroups.map((group) => (
              <div key={group.categoryName}>
                <h3 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
                  {group.categoryName}
                </h3>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {group.brochures.map((b) => (
                    <a
                      key={b.seriesSlug}
                      href={`/docs/series/${encodeURIComponent(b.fileName)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-card-bg)] p-4 transition-all hover:border-magido-orange/40 hover:shadow-md"
                    >
                      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-magido-blue/10 text-magido-blue transition-colors group-hover:bg-magido-orange/10 group-hover:text-magido-orange">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                          <path fillRule="evenodd" d="M4.5 2A1.5 1.5 0 0 0 3 3.5v13A1.5 1.5 0 0 0 4.5 18h11a1.5 1.5 0 0 0 1.5-1.5V7.621a1.5 1.5 0 0 0-.44-1.06l-4.12-4.122A1.5 1.5 0 0 0 11.378 2H4.5Zm4.75 6.75a.75.75 0 0 1 1.5 0v2.546l.943-1.048a.75.75 0 1 1 1.114 1.004l-2.25 2.5a.75.75 0 0 1-1.114 0l-2.25-2.5a.75.75 0 1 1 1.114-1.004l.943 1.048V8.75Z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[var(--color-text)] transition-colors group-hover:text-magido-orange">
                          {b.seriesName}
                        </p>
                        <p className="text-xs text-[var(--color-text-secondary)]">PDF Brochure</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Bottom CTA ─── */}
        <div className="mt-16 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-8 text-center">
          <h2 className="font-display text-xl font-bold text-[var(--color-text)]">
            Need help choosing the right system?
          </h2>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Talk to Scott Morin — free consultation, same-day response.
          </p>
          <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex rounded-lg bg-magido-orange px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-magido-orange-dark"
            >
              Request a Quote
            </Link>
            <Link
              href="/contact?subject=consultation"
              className="inline-flex rounded-lg border border-magido-blue px-6 py-2.5 text-sm font-semibold text-magido-blue transition-colors hover:bg-magido-blue hover:text-white dark:border-[var(--color-border)] dark:text-[var(--color-text-secondary)] dark:hover:bg-[var(--color-bg-tertiary)]"
            >
              Free Consultation →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
