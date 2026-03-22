'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import type { ReactNode } from 'react';
import Link from 'next/link';
import type { Category, Series, Product } from '@/lib/products';
import { CategoryHero } from '@/components/CategoryHero';
import { CategoryProductGrid } from '@/components/CategoryProductGrid';
import { SeriesTabs } from '@/components/SeriesTabs';
import { SolutionsCallout } from '@/components/SolutionsCallout';

// ─── SEO intro copy — keyword-rich paragraph per category ────────────────────
// Targets: "aqueous parts washer", "water-based parts washer",
//          "stainless steel parts washer" and category-specific long-tail terms.
// Rendered as visible body text between the hero and product grid for
// maximum crawl weight without keyword stuffing.
const CATEGORY_SEO_INTRO: Record<string, { headline: string; body: ReactNode }> = {
  'manual-washers': {
    headline: 'Manual Aqueous Parts Washers — Stainless Steel, Built to Last',
    body: <>Magido manual aqueous parts washers give maintenance shops and production floors a water-based degreasing solution that replaces hazardous solvents without sacrificing cleaning power. Every manual washer is constructed entirely from <a href='/solutions/aisi-304-stainless-steel-parts-washers' className='underline decoration-magido-orange/60 hover:decoration-magido-orange'>AISI 304 stainless steel</a> — tank, housing, and internal components — delivering corrosion resistance that outlasts painted carbon steel alternatives by decades. Choose from sink-style, vat-style, or high-pressure HP series configurations to match your parts, throughput, and workspace. All Magido manual washers use environmentally safe, water-based cleaning chemistry compatible with a wide range of industrial detergents.</>,
  },
  'top-load-washers': {
    headline: 'Top Load Aqueous Parts Washers — Spray Cabinet Washers for Every Part Size',
    body: <>Magido top load spray cabinet washers are the most versatile aqueous parts washers in the lineup — available in 18 models with turntable diameters from 14″ to 55″ and load capacities up to 1,500 lbs. These water-based parts washers use a motorized rotating turntable and precision-angled jet nozzles to blast hot aqueous cleaning solution across all part surfaces simultaneously, removing machining oils, coolants, chips, and carbon deposits in a single automated cycle. Every top load washer is built entirely from <a href='/solutions/aisi-304-stainless-steel-parts-washers' className='underline decoration-magido-orange/60 hover:decoration-magido-orange'>AISI 304 stainless steel</a> with optional filtration, rinse, and drying stages. The X51, X51/2, X81, and Eco series cover everything from compact benchtop units to full industrial-capacity spray cabinet washers.</>,
  },
  'front-load-washers': {
    headline: 'Front Load Aqueous Parts Washers — Heavy-Duty Spray Cabinets for Large Components',
    body: <>Magido front load aqueous parts washers handle the large, heavy components that top load spray cabinets cannot — engine blocks, transmission housings, gearboxes, and fabricated assemblies up to 5,000 lbs. These water-based parts washers use a fixed spray ramp with angled jet nozzles and a removable turntable platform that rolls out on a mobile cart for loading outside the wash chamber. Operating at temperatures up to 160°F, front load stainless steel parts washers deliver the same thorough aqueous cleaning performance as top load models at a larger scale. The X53, X53/2, and FLS series are built 100% from <a href='/solutions/aisi-304-stainless-steel-parts-washers' className='underline decoration-magido-orange/60 hover:decoration-magido-orange'>AISI 304 stainless steel</a> with options for multi-stage wash, rinse, and drying.</>,
  },
  'immersion-washers': {
    headline: 'Immersion Aqueous Parts Washers — Full-Submersion Cleaning for Complex Geometries',
    body: <>Magido immersion aqueous parts washers solve the cleaning challenge that spray cabinets cannot — blind holes, internal channels, threaded bores, and complex part geometries where spray impingement alone cannot reach. The Agita series fully submerges parts in heated aqueous cleaning solution at up to 167°F, then oscillates the platform pneumatically to force water-based cleaning chemistry into every cavity and internal passage. These stainless steel parts washers are the right choice for hydraulic components, precision machined parts, castings, and medical device components requiring the highest cleanliness standards. All Agita immersion washers are constructed entirely from <a href='/solutions/aisi-304-stainless-steel-parts-washers' className='underline decoration-magido-orange/60 hover:decoration-magido-orange'>AISI 304 stainless steel</a>.</>,
  },
  'in-line-belt-conveyor-washers': {
    headline: 'In-Line Belt Conveyor Aqueous Parts Washers — Continuous Production Cleaning',
    body: <>Magido in-line belt conveyor aqueous parts washers integrate directly into your production line, delivering continuous water-based parts cleaning without manual handling or batching. Parts travel on a stainless steel mesh belt through enclosed wash and rinse zones at controlled belt speeds, ensuring every part receives identical aqueous cleaning exposure cycle after cycle. Available in compact Silver series and high-capacity Gold series configurations — 21 models total — these conveyor washers scale from low-volume CNC cell integration to full high-throughput production line deployment. Every machine is constructed entirely from <a href='/solutions/aisi-304-stainless-steel-parts-washers' className='underline decoration-magido-orange/60 hover:decoration-magido-orange'>AISI 304 stainless steel</a> and uses environmentally safe aqueous cleaning chemistry.</>,
  },
  'rotary-drum-washers': {
    headline: 'Rotary Drum Aqueous Parts Washers — Bulk Water-Based Cleaning for Small Parts',
    body: <>Magido rotary drum aqueous parts washers are purpose-built for high-volume bulk cleaning of small loose parts — fasteners, stampings, springs, machined components, and castings — where loading individual parts into a spray cabinet is impractical. The helical auger drum continuously tumbles and advances parts through the aqueous wash zone, delivering thorough water-based cleaning on all surfaces simultaneously. Parts load at one end and emerge clean at the other in a continuous, non-stop process. Available in single-stage Jolly series and dual-stage Spira series configurations, all rotary drum washers are built entirely from <a href='/solutions/aisi-304-stainless-steel-parts-washers' className='underline decoration-magido-orange/60 hover:decoration-magido-orange'>AISI 304 stainless steel</a> with 14 models to match your throughput requirements.</>,
  },
  'rotary-immersion-washers': {
    headline: 'Rotary Immersion Aqueous Parts Washers — Multi-Action Precision Cleaning',
    body: <>Magido rotary immersion aqueous parts washers deliver the most thorough water-based parts cleaning in the lineup — combining turbulent immersion washing, spray impingement, and basket rotation in a single automated cycle. Parts in baskets or fixtures rotate through the immersion bath while receiving simultaneous spray cleaning, then advance through spray and immersion rinse stages with an available drying stage. These stainless steel parts washers are specified for critical aerospace components, precision automotive assemblies, and medical device parts where cleanliness tolerances are measured in microns. Every Platinum series rotary immersion washer is engineered to your exact specifications and built entirely from <a href='/solutions/aisi-304-stainless-steel-parts-washers' className='underline decoration-magido-orange/60 hover:decoration-magido-orange'>AISI 304 stainless steel</a>.</>,
  },
};

interface CategoryContentProps {
  category: Category;
  seriesList: Series[];
  productsBySeries: Record<string, Product[]>;
  heroImage: string | null;
  otherCategories: { name: string; slug: string; shortDescription: string }[];
  resourceDocs: { title: string; slug: string }[];
}

export function CategoryContent({
  category,
  seriesList,
  productsBySeries,
  heroImage,
  otherCategories,
  resourceDocs,
}: CategoryContentProps) {
  const searchParams = useSearchParams();
  const activeSeriesParam = searchParams.get('series');
  const [specsMode, setSpecsMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const activeSeries = mounted && activeSeriesParam
    ? seriesList.find((s) => `${s.slug}-series` === activeSeriesParam) ?? null
    : null;

  const allProducts = seriesList.flatMap((s) => productsBySeries[s.slug] || []);
  const displayProducts = activeSeries
    ? productsBySeries[activeSeries.slug] || []
    : allProducts;

  const heroTitle = activeSeries ? activeSeries.name : category.name;
  const heroDescription = activeSeries
    ? activeSeries.description || `${activeSeries.type} aqueous parts washing systems.`
    : category.description || category.shortDescription;

  return (
    <>
      {/* Hero — pure server component, no hydration cost */}
      <CategoryHero
        heroTitle={heroTitle}
        heroDescription={heroDescription}
        categoryName={category.name}
        heroImage={heroImage}
      />

      {/* SEO Intro — keyword-rich copy, visible to crawlers, hidden when series tab is active */}
      {(!mounted || !activeSeries) && CATEGORY_SEO_INTRO[category.slug] && (
        <section className="border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-3 font-display text-xl font-bold text-[var(--color-text)] lg:text-2xl">
              {CATEGORY_SEO_INTRO[category.slug].headline}
            </h2>
            <p className="max-w-4xl text-sm leading-relaxed text-[var(--color-text-secondary)] lg:text-base">
              {CATEGORY_SEO_INTRO[category.slug].body}
            </p>
          </div>
        </section>
      )}

      {/* Tabs + grid — tabs are client (URL state), grid renders immediately */}
      <section className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-7xl">
          <h2 className="sr-only">Browse {category.name}</h2>

          <SeriesTabs
            seriesList={seriesList}
            allProducts={allProducts}
            categorySlug={category.slug}
            specsMode={specsMode}
            onSpecsModeChange={setSpecsMode}
          />

          <p className="mt-4 text-sm text-[var(--color-text-secondary)]">
            {displayProducts.length} system
            {displayProducts.length !== 1 ? 's' : ''} found
          </p>

          <CategoryProductGrid
            products={displayProducts}
            seriesList={seriesList}
            categorySlug={category.slug}
            specsMode={specsMode}
          />
        </div>
      </section>

      {/* Documentation */}
      {resourceDocs.length > 0 && (
        <CategoryDocs category={category} resourceDocs={resourceDocs} />
      )}

      {/* Solutions Callout */}
      <SolutionsCallout categorySlug={category.slug} />

      {/* Other Systems */}
      {otherCategories.length > 0 && (
        <OtherSystems otherCategories={otherCategories} />
      )}

      {/* Bottom CTA */}
      <CategoryCta />
    </>
  );
}

// ─── Sub-components (no client state needed — kept in same file for simplicity) ───

function CategoryDocs({
  category,
  resourceDocs,
}: {
  category: Category;
  resourceDocs: { title: string; slug: string }[];
}) {
  return (
    <section className="border-t border-[var(--color-border)] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="font-display text-xs font-semibold uppercase tracking-wider text-magido-orange">
          Downloads
        </p>
        <h2 className="mt-1 font-display text-2xl font-bold text-[var(--color-text)]">
          {category.name} Documentation
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <a
            href="/resources/catalog"
            className="group flex gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-card-bg)] p-5 transition-shadow hover:shadow-md"
          >
            <span className="text-2xl" aria-hidden="true">📘</span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[var(--color-text)] transition-colors group-hover:text-magido-orange">
                MAGIDO USA Product Catalog
              </p>
              <p className="mt-0.5 text-xs text-[var(--color-text-secondary)]">
                Complete catalog with full specifications for all systems.
              </p>
            </div>
          </a>
          {resourceDocs.map((doc) => (
            <a
              key={doc.slug}
              href={`/resources/${doc.slug}`}
              className="group flex gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-card-bg)] p-5 transition-shadow hover:shadow-md"
            >
              <span className="text-2xl" aria-hidden="true">📄</span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[var(--color-text)] transition-colors group-hover:text-magido-orange">
                  {doc.title}
                </p>
                <p className="mt-0.5 text-xs text-[var(--color-text-secondary)]">
                  Technical documentation for {category.name.toLowerCase()}.
                </p>
              </div>
            </a>
          ))}
        </div>
        <div className="mt-4">
          <a
            href="/resources"
            className="text-sm font-medium text-magido-orange transition-colors hover:text-magido-orange-dark"
          >
            View all documentation →
          </a>
        </div>
      </div>
    </section>
  );
}

function OtherSystems({
  otherCategories,
}: {
  otherCategories: { name: string; slug: string; shortDescription: string }[];
}) {
  return (
    <section className="border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="font-display text-xs font-semibold uppercase tracking-wider text-magido-orange">
          Explore More
        </p>
        <h2 className="mt-1 font-display text-2xl font-bold text-[var(--color-text)]">
          Other Systems
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {otherCategories.slice(0, 3).map((cat) => (
            <a
              key={cat.slug}
              href={`/products/${cat.slug}`}
              className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-card-bg)] p-6 transition-shadow hover:shadow-md"
            >
              <h3 className="font-display text-lg font-semibold text-[var(--color-text)] transition-colors group-hover:text-magido-orange">
                {cat.name}
              </h3>
              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                {cat.shortDescription.length > 100
                  ? cat.shortDescription.slice(0, 100) + '…'
                  : cat.shortDescription}
              </p>
              <p className="mt-3 text-xs font-medium text-magido-orange">
                View Series →
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryCta() {
  return (
    <section className="border-t border-[var(--color-border)] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-xl font-bold text-[var(--color-text)]">
          Not sure which system is right for you?
        </h2>
        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
          Talk to Scott Morin — free consultation, same-day response.
        </p>
        <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="/contact"
            className="btn-quote"
          >
            Request a Quote
          </a>
          <a
            href="/how-to-choose"
            className="inline-flex rounded-lg border border-magido-blue px-6 py-2.5 text-sm font-semibold text-magido-blue transition-colors hover:bg-magido-blue hover:text-white dark:border-[var(--color-border)] dark:text-[var(--color-text-secondary)] dark:hover:bg-[var(--color-bg-tertiary)]"
          >
            How to Choose →
          </a>
        </div>
      </div>
    </section>
  );
}
