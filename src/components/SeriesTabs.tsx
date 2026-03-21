'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { BarChart2 } from 'lucide-react';
import type { Series, Product } from '@/lib/products';

interface SeriesTabsProps {
  seriesList: Series[];
  allProducts: Product[];
  categorySlug: string;
  /** Controlled from parent — true when "View All Specs" is active */
  specsMode: boolean;
  onSpecsModeChange: (value: boolean) => void;
}

export function SeriesTabs({
  seriesList,
  allProducts,
  categorySlug,
  specsMode,
  onSpecsModeChange,
}: SeriesTabsProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeSeries = searchParams.get('series');

  function handleTabClick(seriesSlug: string | null) {
    if (seriesSlug === null) {
      router.push(pathname, { scroll: false });
    } else {
      router.push(`${pathname}?series=${seriesSlug}`, { scroll: false });
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {/* Series filter tabs row */}
      <div className="flex items-center gap-2">
        {/* Tabs — scrollable with right-fade hint on mobile */}
        <div className="relative min-w-0 flex-1">
          <div className="scrollbar-thin flex items-center gap-2 overflow-x-auto pb-1">
            {/* All tab */}
            <button
              onClick={() => handleTabClick(null)}
              className={`flex-shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                !activeSeries
                  ? 'bg-magido-orange text-white'
                  : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text)]'
              }`}
            >
              All
            </button>

            {/* Series tabs */}
            {seriesList.map((series) => {
              const tabSlug = `${series.slug}-series`;
              const isActive = activeSeries === tabSlug;

              return (
                <button
                  key={series.slug}
                  onClick={() => handleTabClick(tabSlug)}
                  className={`flex-shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-magido-orange text-white'
                      : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text)]'
                  }`}
                >
                  {series.name}
                </button>
              );
            })}
          </div>
          {/* Right-fade scroll hint — visible only when tabs overflow */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[var(--color-bg)] to-transparent sm:hidden" aria-hidden="true" />
        </div>

        {/* View All Specs toggle — right-aligned, desktop only */}
        <button
          onClick={() => onSpecsModeChange(!specsMode)}
          aria-pressed={specsMode}
          className={`hidden flex-shrink-0 items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-semibold transition-colors duration-150 sm:flex ${
            specsMode
              ? 'border-magido-blue bg-magido-blue text-white hover:bg-magido-blue/90'
              : 'border-magido-blue bg-transparent text-magido-blue hover:bg-magido-blue hover:text-white'
          }`}
        >
          <BarChart2 className="h-4 w-4" />
          {specsMode ? 'Hide Specs' : 'View All Specs'}
        </button>
      </div>

      {/* View All Specs toggle — mobile only, full-width below tabs */}
      <button
        onClick={() => onSpecsModeChange(!specsMode)}
        aria-pressed={specsMode}
        className={`flex items-center justify-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-semibold transition-colors duration-150 sm:hidden ${
          specsMode
            ? 'border-magido-blue bg-magido-blue text-white'
            : 'border-magido-blue bg-transparent text-magido-blue'
        }`}
      >
        <BarChart2 className="h-4 w-4" />
        {specsMode ? 'Hide Specs' : 'View All Specs'}
      </button>
    </div>
  );
}
