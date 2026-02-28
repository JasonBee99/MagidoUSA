import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Product } from '@/lib/products';

interface ProductNavigationProps {
  prev: Product | null;
  next: Product | null;
  categorySlug: string;
  categoryName: string;
}

function getDisplayModel(model: string): string {
  return model.replace(/-(\d)/, '/$1');
}

export function ProductNavigation({
  prev,
  next,
  categorySlug,
  categoryName,
}: ProductNavigationProps) {
  if (!prev && !next) return null;

  return (
    <div className="border-b border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        {/* Previous */}
        {prev ? (
          <Link
            href={`/products/${categorySlug}/${prev.slug}`}
            className="group flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors hover:bg-[var(--color-bg-secondary)]"
          >
            <ChevronLeft className="h-4 w-4 text-[var(--color-text-muted)] transition-transform group-hover:-translate-x-0.5" />
            <span className="hidden sm:inline">
              <span className="text-[var(--color-text-muted)]">Prev: </span>
              <span className="font-medium text-[var(--color-text-secondary)] group-hover:text-magido-orange">
                {getDisplayModel(prev.model)}
              </span>
            </span>
            <span className="font-medium text-[var(--color-text-secondary)] group-hover:text-magido-orange sm:hidden">
              {getDisplayModel(prev.model)}
            </span>
          </Link>
        ) : (
          <div />
        )}

        {/* Center - category link */}
        <Link
          href={`/products/${categorySlug}`}
          className="text-xs font-medium text-[var(--color-text-muted)] transition-colors hover:text-magido-orange"
        >
          All {categoryName}
        </Link>

        {/* Next */}
        {next ? (
          <Link
            href={`/products/${categorySlug}/${next.slug}`}
            className="group flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors hover:bg-[var(--color-bg-secondary)]"
          >
            <span className="hidden sm:inline">
              <span className="text-[var(--color-text-muted)]">Next: </span>
              <span className="font-medium text-[var(--color-text-secondary)] group-hover:text-magido-orange">
                {getDisplayModel(next.model)}
              </span>
            </span>
            <span className="font-medium text-[var(--color-text-secondary)] group-hover:text-magido-orange sm:hidden">
              {getDisplayModel(next.model)}
            </span>
            <ChevronRight className="h-4 w-4 text-[var(--color-text-muted)] transition-transform group-hover:translate-x-0.5" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
