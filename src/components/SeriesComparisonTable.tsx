'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
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

function abbreviateUnit(unit: string): string {
  if (!unit) return '';
  const u = unit.toLowerCase().trim();
  const MAP: Record<string, string> = {
    'inches': '"', 'inch': '"', 'in': '"', 'in.': '"',
    'lbs': 'lbs', 'lb': 'lbs', 'pounds': 'lbs',
    'gal us': 'gal', 'gal': 'gal', 'gallons': 'gal',
    'kw': 'kW', 'hp': 'HP',
    'gpm': 'GPM', 'gph': 'GPH',
    'psi': 'PSI', 'rpm': 'RPM',
    '°f': '°F', '°c': '°C', 'degrees f': '°F', 'degrees c': '°C',
    'mm': 'mm', 'cm': 'cm', 'm': 'm', 'kg': 'kg',
    'minutes': 'min', 'minute': 'min',
    'v': 'V', 'amps': 'A', 'a': 'A',
  };
  return MAP[u] ?? unit;
}

export function SeriesComparisonTable({
  series,
  products,
  currentProductSlug,
  categorySlug,
}: SeriesComparisonTableProps) {
  const { specTable } = series;
  const [showAll, setShowAll] = useState(false);
  const [frozen, setFrozen] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      setIsScrolled(scrollRef.current.scrollLeft > 8);
    }
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const compressed = frozen && isScrolled;
  const visibleRows = showAll ? specTable.rows : specTable.rows.slice(0, 8);
  const hasMore = specTable.rows.length > 8;

  const thLabelClass = frozen ? 'sticky left-0 z-10 bg-[var(--color-bg-secondary)]' : '';
  const tdLabelClass = frozen ? 'sticky left-0 z-10 bg-inherit' : '';

  // Label column width — fixed in both states so table never reflows
  // Compressed: column stays same width, content just swaps to abbreviation
  const LABEL_WIDTH_FULL = '160px';
  const LABEL_WIDTH_COMPRESSED = '2.5rem';
  const labelColWidth = compressed ? LABEL_WIDTH_COMPRESSED : LABEL_WIDTH_FULL;
  const labelStyle: React.CSSProperties = {
    width: labelColWidth,
    minWidth: labelColWidth,
    maxWidth: labelColWidth,
    overflow: 'hidden',
    transition: 'width 0.25s ease, min-width 0.25s ease, max-width 0.25s ease',
    padding: compressed ? '0.5rem 0.25rem' : undefined,
    whiteSpace: 'nowrap',
  };

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--color-card-border)]">

      {/* Freeze toggle */}
      <div className="flex items-center justify-end border-b border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] px-3 py-1.5">
        <button
          onClick={() => {
            setFrozen(f => !f);
            if (frozen && scrollRef.current) scrollRef.current.scrollLeft = 0;
            setIsScrolled(false);
          }}
          aria-pressed={frozen}
          className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
            frozen
              ? 'bg-magido-orange/15 text-magido-orange'
              : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
          }`}
        >
          {frozen ? '🔒 Col Frozen' : '↔ Free Scroll'}
        </button>
      </div>

      <div ref={scrollRef} className="overflow-x-auto scrollbar-thin">
        <table className="w-full min-w-[600px]" style={{ tableLayout: 'fixed' }}>
          <thead>
            <tr className="bg-[var(--color-bg-secondary)]">
              <th
                className={`${thLabelClass} px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]`}
                style={labelStyle}
              >
                {compressed ? <span aria-hidden="true">—</span> : 'Specification'}
              </th>
              {specTable.models.map((model) => {
                const modelProduct = products.find(
                  (p) => p.model === model || p.model === model.replace('/', '-')
                );
                const isCurrent = modelProduct?.slug === currentProductSlug;
                const displayModel = getDisplayModel(model);
                return (
                  <th
                    key={model}
                    className={`px-4 py-3 text-center text-sm font-bold ${
                      isCurrent ? 'bg-magido-orange/10 text-magido-orange' : 'text-[var(--color-text)]'
                    }`}
                  >
                    {modelProduct ? (
                      <Link href={`/products/${categorySlug}/${modelProduct.slug}`} className="transition-colors hover:text-magido-orange">
                        {displayModel}
                      </Link>
                    ) : displayModel}
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
          <tbody>
            {visibleRows.map((row, i) => {
              const unitAbbr = row.unit ? abbreviateUnit(row.unit) : '';
              return (
                <tr
                  key={row.name}
                  className={`border-t border-[var(--color-border-light)] ${
                    i % 2 === 0 ? 'bg-[var(--color-card-bg)]' : 'bg-[var(--color-bg-secondary)]/40'
                  }`}
                >
                  <td
                    className={`${tdLabelClass} px-4 py-2.5 text-sm font-medium text-[var(--color-text-secondary)]`}
                    style={labelStyle}
                  >
                    {compressed ? (
                      <span className="block text-center text-xs font-bold uppercase tracking-wide text-[var(--color-text-muted)]" title={row.name}>
                        {unitAbbr || row.name.slice(0, 4)}
                      </span>
                    ) : (
                      <>
                        {row.name}
                        {row.unit && (
                          <span className="ml-1 text-2xs text-[var(--color-text-muted)]">({row.unit})</span>
                        )}
                      </>
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
              );
            })}
          </tbody>
        </table>
      </div>

      {hasMore && (
        <div className="border-t border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] px-4 py-2.5 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm font-medium text-magido-orange transition-colors hover:text-magido-orange-dark"
          >
            {showAll ? 'Show fewer specifications' : `Show all ${specTable.rows.length} specifications`}
          </button>
        </div>
      )}

      <div className="border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-3">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {specTable.models.map((model) => {
            const modelProduct = products.find(
              (p) => p.model === model || p.model === model.replace('/', '-')
            );
            if (!modelProduct) return null;
            return (
              <Link key={model} href={`/contact?model=${encodeURIComponent(model)}`} className="btn-quote btn-quote-sm">
                Quote {getDisplayModel(model)}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
