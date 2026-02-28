'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Series, Product } from '@/lib/products';

interface SeriesComparisonTableProps {
  series: Series;
  products: Product[];
  currentProductSlug: string;
  categorySlug: string;
}

function getDisplayModel(model: string): string {
  return model.replace(/-(\d)/, '/$1');
}

export function SeriesComparisonTable({
  series,
  products,
  currentProductSlug,
  categorySlug,
}: SeriesComparisonTableProps) {
  const { specTable } = series;
  const [showAll, setShowAll] = useState(false);

  // Show first 8 rows by default, expand to all
  const visibleRows = showAll ? specTable.rows : specTable.rows.slice(0, 8);
  const hasMore = specTable.rows.length > 8;

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--color-card-border)]">
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full min-w-[600px]">
          {/* Header row with model names */}
          <thead>
            <tr className="bg-[var(--color-bg-secondary)]">
              <th className="sticky left-0 z-10 bg-[var(--color-bg-secondary)] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                Specification
              </th>
              {specTable.models.map((model) => {
                // Find the product for this model to get its slug
                const modelProduct = products.find(
                  (p) => p.model === model || p.model === model.replace('/', '-')
                );
                const isCurrent = modelProduct?.slug === currentProductSlug;
                const displayModel = getDisplayModel(model);

                return (
                  <th
                    key={model}
                    className={`px-4 py-3 text-center text-sm font-bold ${
                      isCurrent
                        ? 'bg-magido-orange/10 text-magido-orange'
                        : 'text-[var(--color-text)]'
                    }`}
                  >
                    {modelProduct ? (
                      <Link
                        href={`/products/${categorySlug}/${modelProduct.slug}`}
                        className="transition-colors hover:text-magido-orange"
                      >
                        {displayModel}
                      </Link>
                    ) : (
                      displayModel
                    )}
                    {isCurrent && (
                      <span className="ml-1.5 inline-block rounded bg-magido-orange px-1.5 py-0.5 text-2xs font-bold text-white">
                        Current
                      </span>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>

          {/* Spec rows */}
          <tbody>
            {visibleRows.map((row, i) => (
              <tr
                key={row.name}
                className={`border-t border-[var(--color-border-light)] ${
                  i % 2 === 0 ? 'bg-[var(--color-card-bg)]' : 'bg-[var(--color-bg-secondary)]/40'
                }`}
              >
                <td className="sticky left-0 z-10 bg-inherit px-4 py-2.5 text-sm font-medium text-[var(--color-text-secondary)]">
                  {row.name}
                  {row.unit && (
                    <span className="ml-1 text-2xs text-[var(--color-text-muted)]">
                      ({row.unit})
                    </span>
                  )}
                </td>
                {specTable.models.map((model) => {
                  const modelProduct = products.find(
                    (p) => p.model === model || p.model === model.replace('/', '-')
                  );
                  const isCurrent = modelProduct?.slug === currentProductSlug;
                  const val = row.values[model] || '–';

                  return (
                    <td
                      key={model}
                      className={`px-4 py-2.5 text-center text-sm ${
                        isCurrent
                          ? 'bg-magido-orange/5 font-semibold text-[var(--color-text)]'
                          : 'text-[var(--color-text-secondary)]'
                      }`}
                    >
                      {val}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Show more/less toggle */}
      {hasMore && (
        <div className="border-t border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] px-4 py-2.5 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm font-medium text-magido-orange transition-colors hover:text-magido-orange-dark"
          >
            {showAll
              ? 'Show fewer specifications'
              : `Show all ${specTable.rows.length} specifications`}
          </button>
        </div>
      )}

      {/* Bottom CTA row */}
      <div className="border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-3">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {specTable.models.map((model) => {
            const modelProduct = products.find(
              (p) => p.model === model || p.model === model.replace('/', '-')
            );
            if (!modelProduct) return null;
            return (
              <Link
                key={model}
                href={`/contact?model=${encodeURIComponent(model)}`}
                className="rounded-lg bg-magido-orange/10 px-3 py-1.5 text-xs font-semibold text-magido-orange transition-colors hover:bg-magido-orange hover:text-white"
              >
                Quote {getDisplayModel(model)}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
