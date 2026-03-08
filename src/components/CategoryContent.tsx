'use client';

import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ProductCard } from '@/components/ProductCard';
import { SeriesTabs } from '@/components/SeriesTabs';
import type { Category, Series, Product } from '@/lib/products';

interface CategoryContentProps {
  category: Category;
  seriesList: Series[];
  /** All products in this category, pre-loaded */
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

  // Find the active series by matching "{slug}-series" pattern
  const activeSeries = activeSeriesParam
    ? seriesList.find((s) => `${s.slug}-series` === activeSeriesParam)
    : null;

  // Filter products
  const allProducts = seriesList.flatMap(
    (s) => productsBySeries[s.slug] || []
  );
  const displayProducts = activeSeries
    ? productsBySeries[activeSeries.slug] || []
    : allProducts;

  // Hero title & description
  const heroTitle = activeSeries ? activeSeries.name : category.name;
  const heroDescription = activeSeries
    ? activeSeries.description || `${activeSeries.type} aqueous parts washing systems.`
    : category.description || category.shortDescription;

  return (
    <>
      {/* ─── Hero Section ─── */}
      <section className="hero-bg px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-10">
            {/* Text — appears first on all screens */}
            <div className="lg:flex-1 text-center lg:text-left">
              <p className="font-display text-sm font-semibold uppercase tracking-widest text-magido-orange">
                {category.name}
              </p>
              <h1 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
                {heroTitle}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-gray-300 sm:text-lg">
                {heroDescription}
              </p>
            </div>

            {/* Image — below text on mobile, right side on desktop */}
            {heroImage && (
              <div className="flex items-center justify-center lg:flex-1">
                <div className="product-halo relative h-56 w-56 sm:h-64 sm:w-64 lg:h-80 lg:w-80">
                  <Image
                    src={heroImage}
                    alt={`${heroTitle} representative product`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 224px, (max-width: 1024px) 256px, 320px"
                    priority
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── Series Tabs + Products ─── */}
      <section className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-7xl">
          {/* Tabs */}
          <SeriesTabs
            seriesList={seriesList}
            allProducts={allProducts}
            categorySlug={category.slug}
          />

          {/* Product count */}
          <p className="mt-4 text-sm text-[var(--color-text-muted)]">
            {displayProducts.length} system
            {displayProducts.length !== 1 ? 's' : ''} found
          </p>

          {/* Product grid */}
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {displayProducts.map((product) => {
              const productSeries = seriesList.find(
                (s) => s.products?.includes(product.slug) || s.slug === product.seriesSlug
              );
              return (
                <ProductCard
                  key={product.slug}
                  product={product}
                  categorySlug={category.slug}
                  seriesName={productSeries?.displayName}
                  seriesDescription={productSeries?.description}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Documentation Section ─── */}
      {resourceDocs.length > 0 && (
        <section className="border-t border-[var(--color-border)] px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="font-display text-xs font-semibold uppercase tracking-wider text-magido-orange">
              Downloads
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold text-[var(--color-text)]">
              {category.name} Documentation
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {/* Always include catalog */}
              <Link
                href="/resources/catalog"
                className="group flex gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-card-bg)] p-5 transition-shadow hover:shadow-md"
              >
                <span className="text-2xl">📘</span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[var(--color-text)] transition-colors group-hover:text-magido-orange">
                    MAGIDO USA Product Catalog
                  </p>
                  <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                    Complete catalog with full specifications for all systems.
                  </p>
                </div>
              </Link>
              {resourceDocs.map((doc) => (
                <Link
                  key={doc.slug}
                  href={`/resources/${doc.slug}`}
                  className="group flex gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-card-bg)] p-5 transition-shadow hover:shadow-md"
                >
                  <span className="text-2xl">📄</span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[var(--color-text)] transition-colors group-hover:text-magido-orange">
                      {doc.title}
                    </p>
                    <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                      Technical documentation for {category.name.toLowerCase()}.
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-4">
              <Link
                href="/resources"
                className="text-sm font-medium text-magido-orange transition-colors hover:text-magido-orange-dark"
              >
                View all documentation →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ─── Other Systems ─── */}
      {otherCategories.length > 0 && (
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
                <Link
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
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Bottom CTA ─── */}
      <section className="border-t border-[var(--color-border)] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-xl font-bold text-[var(--color-text)]">
            Not sure which system is right for you?
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
              href="/how-to-choose"
              className="inline-flex rounded-lg border border-magido-blue px-6 py-2.5 text-sm font-semibold text-magido-blue transition-colors hover:bg-magido-blue hover:text-white dark:border-[var(--color-border)] dark:text-[var(--color-text-secondary)] dark:hover:bg-[var(--color-bg-tertiary)]"
            >
              How to Choose →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
