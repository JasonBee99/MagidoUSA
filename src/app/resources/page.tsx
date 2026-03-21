import type { Metadata } from 'next';
import Link from 'next/link';
import {
  productCatalog,
  getResourcesByCategory,
  getBrochuresByCategory,
} from '@/data/resources';
import { ResourceAccordion } from './ResourceAccordion';
import { ResourceVideoCard, type ResourceVideo } from '@/components/ResourceVideoCard';

// ─── Category icon map ────────────────────────────────────────────────────────
function CategoryIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    'Manual Washers': (
      <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7 w-7">
        <path d="M10 28V16l4-4h8l4 4v12H10z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="currentColor" fillOpacity="0.12"/>
        <path d="M15 28v-6h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <circle cx="18" cy="19" r="2" stroke="#eb6c1c" strokeWidth="1.5"/>
      </svg>
    ),
    'Top Load Washers': (
      <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7 w-7">
        <rect x="6" y="14" width="24" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.12"/>
        <path d="M12 14V10h12v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="18" cy="22" r="5" stroke="#eb6c1c" strokeWidth="1.5"/>
      </svg>
    ),
    'Front Load Washers': (
      <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7 w-7">
        <rect x="6" y="8" width="24" height="22" rx="2" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.12"/>
        <rect x="11" y="13" width="14" height="12" rx="6" stroke="#eb6c1c" strokeWidth="1.5" fill="none"/>
        <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      </svg>
    ),
    'Immersion Washers': (
      <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7 w-7">
        <rect x="6" y="16" width="24" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.12"/>
        <path d="M8 20c2-2 4-2 6 0s4 2 6 0 4-2 6 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="14" y="20" width="8" height="7" rx="1" stroke="#eb6c1c" strokeWidth="1.5" fill="#eb6c1c" fillOpacity="0.1"/>
        <path d="M12 16v-5M18 16v-7M24 16v-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
      </svg>
    ),
    'In-Line Belt Conveyor Washers': (
      <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7 w-7">
        <rect x="4" y="14" width="28" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.12"/>
        <circle cx="10" cy="26" r="3" stroke="#eb6c1c" strokeWidth="1.5" fill="none"/>
        <circle cx="26" cy="26" r="3" stroke="#eb6c1c" strokeWidth="1.5" fill="none"/>
        <line x1="10" y1="29" x2="26" y2="29" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <rect x="13" y="16" width="5" height="4" rx="1" fill="currentColor" fillOpacity="0.4"/>
        <rect x="20" y="16" width="5" height="4" rx="1" fill="currentColor" fillOpacity="0.4"/>
      </svg>
    ),
    'Rotary Drum Washers': (
      <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7 w-7">
        <ellipse cx="18" cy="20" rx="12" ry="8" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.12"/>
        <ellipse cx="18" cy="20" rx="5" ry="3" stroke="#eb6c1c" strokeWidth="1.5" fill="none"/>
        <path d="M22 13l2-4M14 13l-2-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      </svg>
    ),
    'Rotary Immersion Washers': (
      <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7 w-7">
        <circle cx="18" cy="20" rx="12" r="12" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.12"/>
        <circle cx="18" cy="20" r="6" stroke="#eb6c1c" strokeWidth="1.5" fill="#eb6c1c" fillOpacity="0.1"/>
        <path d="M18 8v4M18 28v4M6 20h4M26 20h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
        <circle cx="18" cy="20" r="2" fill="#eb6c1c"/>
      </svg>
    ),
  };
  return (
    <span className="text-magido-blue">
      {icons[name] ?? (
        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7 w-7">
          <circle cx="18" cy="18" r="12" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.12"/>
        </svg>
      )}
    </span>
  );
}

export const metadata: Metadata = {
  title: 'Resources & Documentation — Parts Washer Guides | Magido USA',
  description:
    'Technical documentation for Magido USA industrial aqueous parts washers — spray cabinet, immersion, belt conveyor, rotary drum, and manual parts washer catalogs, startup guides, and service instructions. Water-based parts cleaning systems, AISI 304 stainless steel, made in Italy.',
  alternates: {
    canonical: 'https://magidousa.com/resources',
  },
  openGraph: {
    title: 'Resources & Documentation — Parts Washer Guides | Magido USA',
    description:
      'Product catalogs, startup guides, service instructions, and technical documentation for all Magido USA aqueous parts washing systems.',
    url: 'https://magidousa.com/resources',
    images: [{ url: 'https://magidousa.com/images/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resources & Documentation | Magido USA',
    description:
      'Product catalogs, startup guides, and technical documentation for all Magido USA parts washing systems.',
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
            service instructions for Magido USA industrial aqueous parts washers — stainless steel spray cabinet, immersion, belt conveyor, rotary drum, and manual parts washers. Water-based parts washer systems for removing cutting oil, coolant, and machining residue from machined parts. Automotive, aerospace, machining.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* ─── Product Catalog Card ─── */}
        <div className="mb-14 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-card-bg)] shadow-lg">
          <div className="flex flex-col sm:flex-row">
            <div className="flex items-center justify-center bg-magido-blue/10 p-8 sm:w-40">
              <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-16 w-16">
                <rect x="8" y="6" width="36" height="48" rx="4" fill="#315687" fillOpacity="0.15" stroke="#315687" strokeWidth="2"/>
                <rect x="14" y="16" width="24" height="3" rx="1.5" fill="#315687" fillOpacity="0.5"/>
                <rect x="14" y="23" width="20" height="2" rx="1" fill="#315687" fillOpacity="0.3"/>
                <rect x="14" y="29" width="22" height="2" rx="1" fill="#315687" fillOpacity="0.3"/>
                <rect x="14" y="35" width="18" height="2" rx="1" fill="#315687" fillOpacity="0.3"/>
                <rect x="14" y="41" width="20" height="2" rx="1" fill="#315687" fillOpacity="0.3"/>
                <circle cx="46" cy="46" r="12" fill="#eb6c1c"/>
                <path d="M46 40v8M42 44h8" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
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

        {/* ─── Technical Documentation + Brochures (merged by category) ─── */}
        <div className="mb-8">
          <p className="font-display text-xs font-semibold uppercase tracking-wider text-magido-orange">
            By Product Type
          </p>
          <h2 className="mt-1 font-display text-2xl font-bold text-[var(--color-text)]">
            Technical Documentation
          </h2>
        </div>

        <div className="space-y-10 mb-14">
          {(() => {
            // Build a lookup map: categoryName → brochures[]
            const brochureMap = new Map(
              brochureGroups.map((bg) => [bg.categoryName, bg.brochures])
            );
            return grouped.map((group) => {
              const brochures = brochureMap.get(group.categoryName) ?? [];
              return (
                <div key={group.categoryName}>
                  {/* Category header */}
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
                        <CategoryIcon name={group.categoryName} />
                      </div>
                      <h3 className="font-display text-lg font-semibold text-[var(--color-text)]">
                        {group.categoryName}
                      </h3>
                    </div>
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

                  {/* Series brochures for this category — inline below docs */}
                  {brochures.length > 0 && (
                    <div className="mt-4">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
                        Series Brochures
                      </p>
                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {brochures.map((b) => (
                          <a
                            key={b.seriesSlug}
                            href={`/brochures/${b.fileName}`}
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
                  )}
                </div>
              );
            });
          })()}
        </div>

        {/* ─── Videos ─── */}
        <div className="mb-14">
          <p className="font-display text-xs font-semibold uppercase tracking-wider text-magido-orange">
            Videos
          </p>
          <h2 className="mt-1 mb-6 font-display text-2xl font-bold text-[var(--color-text)]">
            Product &amp; Installation Videos
          </h2>

          <h3 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
            Installation Guides
          </h3>
          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            {INSTALLATION_VIDEOS.map((v) => (
              <ResourceVideoCard key={v.id} video={v} />
            ))}
          </div>

          <h3 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
            Product Demonstrations
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DEMO_VIDEOS.map((v) => (
              <ResourceVideoCard key={v.id} video={v} />
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

// ─── Video data ───────────────────────────────────────────────────────────────

const INSTALLATION_VIDEOS: ResourceVideo[] = [
  {
    id: 'hp-instructional',
    title: 'HP Series Instructional Guide',
    description: 'Step-by-step instructional video for the HP Series high-pressure manual cabinet washers.',
    youtubeId: 'uuyJ0DRmT2M',
    productLink: '/products/manual-washers?series=hp-series',
    productLinkLabel: 'View HP Series',
  },
];

const DEMO_VIDEOS: ResourceVideo[] = [
  {
    id: 'hp-series-demo',
    title: 'HP Series',
    description: 'HP Series high-pressure manual cabinet washers — powerful spray wand cleaning for shop-floor applications.',
    youtubeId: 'sc5ArM0rB94',
    productLink: '/products/manual-washers?series=hp-series',
    productLinkLabel: 'View HP Series',
  },
  {
    id: 'platinum-demo',
    title: 'Platinum Series',
    description: 'Multi-action rotary immersion washers for the most demanding cleaning applications.',
    youtubeId: '1Qrr-9qi16s',
    productLink: '/products/rotary-immersion-washers',
    productLinkLabel: 'View Platinum Series',
  },
  {
    id: 'x51-demo',
    title: 'X51 Series',
    description: 'Professional single-stage top load spray cabinet washers.',
    youtubeId: 'A-BYLrmWdsg',
    productLink: '/products/top-load-washers?series=x51-series',
    productLinkLabel: 'View X51 Series',
  },
  {
    id: 'x51-2-demo',
    title: 'X51/2 Series',
    description: 'Dual-stage top load washers with separate wash and rinse tanks.',
    youtubeId: 'P-4oF1WX7Qw',
    productLink: '/products/top-load-washers?series=x51-2-series',
    productLinkLabel: 'View X51/2 Series',
  },
  {
    id: 'rotary-drum-demo',
    title: 'Rotary Drum Series',
    description: 'Helical drum washers for bulk cleaning of small, loose parts — Jolly, Spira 1b, and Spira 2b.',
    youtubeId: '4VWa99wPMK0',
    productLink: '/products/rotary-drum-washers',
    productLinkLabel: 'View Rotary Drum Series',
  },
];
