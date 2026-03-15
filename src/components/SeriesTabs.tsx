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
    <div className="flex flex-wrap items-center gap-2 pb-1">
      {/* Series filter tabs */}
      <div className="scrollbar-thin flex flex-1 items-center gap-2 overflow-x-auto">
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

      {/* View All Specs toggle — right-aligned, hidden on mobile to avoid tab overlap */}
      <button
        onClick={() => onSpecsModeChange(!specsMode)}
        aria-pressed={specsMode}
        className={`hidden sm:flex flex-shrink-0 items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-semibold transition-colors duration-150 ${
          specsMode
            ? 'border-magido-blue bg-magido-blue text-white hover:bg-magido-blue/90'
            : 'border-magido-blue bg-transparent text-magido-blue hover:bg-magido-blue hover:text-white'
        }`}
      >
        <BarChart2 className="h-4 w-4" />
        {specsMode ? 'Hide Specs' : 'View All Specs'}
      </button>
    </div>
  );
}
