'use client';

import { useCompare } from './CompareProvider';
import { getProductBySlug } from '@/lib/products';
import Image from 'next/image';
import Link from 'next/link';
import { X, GitCompareArrows, Trash2 } from 'lucide-react';

function getDisplayModel(model: string): string {
  return model.replace(/-(\d)/, '/$1');
}

export function CompareBar() {
  const { compareSlugs, removeProduct, clearAll, canCompare, count } = useCompare();

  if (count === 0) return null;

  // Resolve product data for each slug
  const products = compareSlugs
    .map((slug) => getProductBySlug(slug))
    .filter(Boolean);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--color-border)] bg-[var(--color-card-bg)]/95 shadow-2xl backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        {/* Icon + count */}
        <div className="flex items-center gap-2">
          <GitCompareArrows className="h-5 w-5 text-magido-orange" />
          <span className="text-sm font-semibold text-[var(--color-text)]">
            {count}
          </span>
          <span className="hidden text-sm text-[var(--color-text-secondary)] sm:inline">
            {count === 1 ? 'product' : 'products'} selected
          </span>
        </div>

        {/* Product preview pills */}
        <div className="flex flex-1 items-center gap-2 overflow-x-auto scrollbar-thin">
          {products.map((product) => {
            if (!product) return null;
            return (
              <div
                key={product.slug}
                className="flex flex-shrink-0 items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-secondary)] py-1 pl-1 pr-2.5"
              >
                {product.images.length > 0 ? (
                  <div className="relative h-6 w-6 overflow-hidden rounded-full bg-white">
                    <Image
                      src={product.images[0]}
                      alt={product.model}
                      fill
                      className="object-contain p-0.5"
                      sizes="24px"
                    />
                  </div>
                ) : (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-bg-tertiary)]">
                    <span className="text-2xs font-bold text-[var(--color-text-muted)]">
                      ?
                    </span>
                  </div>
                )}
                <span className="text-xs font-medium text-[var(--color-text)]">
                  {getDisplayModel(product.model)}
                </span>
                <button
                  onClick={() => removeProduct(product.slug)}
                  className="ml-0.5 rounded-full p-0.5 text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-bg-tertiary)] hover:text-red-500"
                  aria-label={`Remove ${product.model} from comparison`}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={clearAll}
            className="rounded-lg p-2 text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-bg-secondary)] hover:text-red-500"
            aria-label="Clear all"
            title="Clear all"
          >
            <Trash2 className="h-4 w-4" />
          </button>
          {canCompare ? (
            <Link
              href="/compare"
              className="inline-flex items-center gap-1.5 rounded-lg bg-magido-orange px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-magido-orange-dark"
            >
              <GitCompareArrows className="h-4 w-4" />
              Compare
            </Link>
          ) : (
            <span className="text-xs text-[var(--color-text-muted)]">
              Add {2 - count} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
