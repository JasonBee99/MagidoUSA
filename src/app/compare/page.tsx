'use client';

import { useCompare } from '@/components/CompareProvider';
import { getProductBySlug, getCategoryBySlug, getSeriesBySlug } from '@/lib/products';
import type { Product } from '@/lib/products';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronRight,
  X,
  GitCompareArrows,
  Plus,
  FileText,
} from 'lucide-react';
import { useState, useMemo } from 'react';

function getDisplayModel(model: string): string {
  return model.replace(/-(\d)/, '/$1');
}

export default function ComparePage() {
  const { compareSlugs, removeProduct, clearAll, count } = useCompare();
  const [showDifferencesOnly, setShowDifferencesOnly] = useState(false);

  // Resolve products
  const products = useMemo(
    () =>
      compareSlugs
        .map((slug) => getProductBySlug(slug))
        .filter((p): p is Product => p !== null && p !== undefined),
    [compareSlugs]
  );

  // Gather all unique spec keys across all selected products
  const allSpecKeys = useMemo(() => {
    const keySet = new Set<string>();
    for (const p of products) {
      for (const key of Object.keys(p.specs)) {
        keySet.add(key);
      }
    }
    return Array.from(keySet);
  }, [products]);

  // Filter to only rows where values differ (if toggle is on)
  const visibleSpecKeys = useMemo(() => {
    if (!showDifferencesOnly) return allSpecKeys;
    return allSpecKeys.filter((key) => {
      const values = products.map(
        (p) => p.specs[key]?.value || '–'
      );
      return new Set(values).size > 1;
    });
  }, [allSpecKeys, products, showDifferencesOnly]);

  // Empty state
  if (count === 0) {
    return (
      <>
        <Breadcrumb />
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <GitCompareArrows className="mx-auto h-16 w-16 text-[var(--color-text-muted)] opacity-40" />
            <h1 className="mt-6 font-display text-3xl font-bold text-[var(--color-text)]">
              Compare Products
            </h1>
            <p className="mt-3 text-[var(--color-text-secondary)]">
              You haven't selected any products to compare yet. Browse our
              categories and click the "Compare" button on product cards to add
              them here.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-magido-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-magido-orange-dark"
            >
              <Plus className="h-4 w-4" />
              Browse Products
            </Link>
          </div>
        </section>
      </>
    );
  }

  // Not enough products
  if (count === 1) {
    return (
      <>
        <Breadcrumb />
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <GitCompareArrows className="mx-auto h-16 w-16 text-magido-orange opacity-60" />
            <h1 className="mt-6 font-display text-3xl font-bold text-[var(--color-text)]">
              Add One More Product
            </h1>
            <p className="mt-3 text-[var(--color-text-secondary)]">
              You need at least 2 products to compare. Browse our categories and
              add another product.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-magido-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-magido-orange-dark"
            >
              <Plus className="h-4 w-4" />
              Add Products
            </Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Breadcrumb />

      {/* Header */}
      <section className="border-b border-[var(--color-border)] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-display text-2xl font-bold text-[var(--color-text)] sm:text-3xl">
                Compare Products
              </h1>
              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                {count} products selected • {visibleSpecKeys.length} specifications
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Differences toggle */}
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={showDifferencesOnly}
                  onChange={(e) => setShowDifferencesOnly(e.target.checked)}
                  className="h-4 w-4 rounded border-[var(--color-border)] text-magido-orange accent-magido-orange"
                />
                <span className="text-sm text-[var(--color-text-secondary)]">
                  Show differences only
                </span>
              </label>
              <button
                onClick={clearAll}
                className="rounded-lg border border-[var(--color-border)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-muted)] transition-colors hover:border-red-300 hover:text-red-500"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-x-auto rounded-xl border border-[var(--color-card-border)] scrollbar-thin">
            <table className="w-full min-w-[600px]">
              {/* Product header row - images + model names */}
              <thead>
                {/* Image row */}
                <tr className="border-b border-[var(--color-border)]">
                  <th className="sticky left-0 z-10 w-48 bg-[var(--color-bg-secondary)] px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                    Product
                  </th>
                  {products.map((product) => (
                    <th
                      key={product.slug}
                      className="relative min-w-[160px] bg-[var(--color-card-bg)] px-4 py-4 text-center"
                    >
                      {/* Remove button */}
                      <button
                        onClick={() => removeProduct(product.slug)}
                        className="absolute right-2 top-2 rounded-full p-1 text-[var(--color-text-muted)] transition-colors hover:bg-red-100 hover:text-red-500 dark:hover:bg-red-900/30"
                        aria-label={`Remove ${product.model}`}
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>

                      {/* Product image */}
                      <Link
                        href={`/products/${product.categorySlug}/${product.slug}`}
                        className="group"
                      >
                        <div className="product-card-image-bg mx-auto mb-3 flex h-28 w-28 items-center justify-center overflow-hidden rounded-lg">
                          {product.images.length > 0 ? (
                            <div className="relative h-full w-full">
                              <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                className="object-contain p-2 transition-transform group-hover:scale-105"
                                sizes="112px"
                              />
                            </div>
                          ) : (
                            <span className="text-xs text-[var(--color-text-muted)]">
                              No image
                            </span>
                          )}
                        </div>
                        <div className="font-display text-base font-bold text-[var(--color-text)] transition-colors group-hover:text-magido-orange">
                          {getDisplayModel(product.model)}
                        </div>
                      </Link>

                      {/* Category + series */}
                      <div className="mt-1 text-2xs text-[var(--color-text-muted)]">
                        {getCategoryBySlug(product.categorySlug)?.name}
                        {' • '}
                        {getSeriesBySlug(product.seriesSlug)?.name}
                      </div>

                      {/* Quote CTA */}
                      <Link
                        href={`/contact?model=${encodeURIComponent(product.model)}`}
                        className="btn-quote btn-quote-sm mt-2"
                      >
                        <FileText className="h-3 w-3" />
                        Get Quote
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Spec rows */}
              <tbody>
                {visibleSpecKeys.map((key, i) => {
                  const values = products.map(
                    (p) => p.specs[key]?.value || '–'
                  );
                  const allSame = new Set(values).size === 1;

                  return (
                    <tr
                      key={key}
                      className={`border-t border-[var(--color-border-light)] ${
                        i % 2 === 0
                          ? 'bg-[var(--color-card-bg)]'
                          : 'bg-[var(--color-bg-secondary)]/40'
                      }`}
                    >
                      <td className="sticky left-0 z-10 bg-inherit px-4 py-2.5 text-sm font-medium text-[var(--color-text-secondary)]">
                        {key}
                      </td>
                      {products.map((product) => {
                        const spec = product.specs[key];
                        const val = spec?.value || '–';
                        return (
                          <td
                            key={product.slug}
                            className={`px-4 py-2.5 text-center text-sm ${
                              !allSame && val !== '–'
                                ? 'font-semibold text-[var(--color-text)]'
                                : 'text-[var(--color-text-secondary)]'
                            }`}
                          >
                            {val}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Empty differences state */}
          {showDifferencesOnly && visibleSpecKeys.length === 0 && (
            <div className="mt-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-8 text-center">
              <p className="text-sm text-[var(--color-text-secondary)]">
                All specifications are identical across the selected products.
              </p>
              <button
                onClick={() => setShowDifferencesOnly(false)}
                className="mt-3 text-sm font-medium text-magido-orange hover:text-magido-orange-dark"
              >
                Show all specifications
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

// ─── Breadcrumb sub-component ───
function Breadcrumb() {
  return (
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
        <span className="font-medium text-[var(--color-text)]">Compare</span>
      </div>
    </nav>
  );
}
