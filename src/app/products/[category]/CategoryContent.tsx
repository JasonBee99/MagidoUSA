'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Category, Series, Product } from '@/lib/products';
import { CategoryHero } from '@/components/CategoryHero';
import { CategoryProductGrid } from '@/components/CategoryProductGrid';
import { SeriesTabs } from '@/components/SeriesTabs';
import { SolutionsCallout } from '@/components/SolutionsCallout';

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

  const activeSeries = activeSeriesParam
    ? seriesList.find((s) => `${s.slug}-series` === activeSeriesParam)
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
