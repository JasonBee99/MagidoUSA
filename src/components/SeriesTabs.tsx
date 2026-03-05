'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import type { Series, Product } from '@/lib/products';

interface SeriesTabsProps {
  seriesList: Series[];
  allProducts: Product[];
  categorySlug: string;
}

export function SeriesTabs({
  seriesList,
  allProducts,
  categorySlug,
}: SeriesTabsProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeSeries = searchParams.get('series');

  function handleTabClick(seriesSlug: string | null) {
    if (seriesSlug === null) {
      // "All" tab — remove query param
      router.push(pathname, { scroll: false });
    } else {
      router.push(`${pathname}?series=${seriesSlug}`, { scroll: false });
    }
  }

  return (
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
  );
}
