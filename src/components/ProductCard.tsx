'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, FileText, GitCompareArrows, Check } from 'lucide-react';
import { useCompare } from './CompareProvider';
import type { Product } from '@/lib/products';

interface ProductCardProps {
  product: Product;
  categorySlug: string;
}

// Key specs to show on cards (in display order)
const CARD_SPEC_KEYS = [
  'Load Weight',
  'Tank Capacity',
  'Turntable Basket Diameter',
  'Working Dimensions',
  'Max Part Size',
  'Belt Width',
  'Basket Diameter',
  'Drum Diameter',
  'Heater',
  'Pump(s)',
];

function getDisplayModel(model: string): string {
  return model.replace(/-(\d)/, '/$1');
}

function getKeySpecs(specs: Product['specs']): { label: string; value: string }[] {
  const result: { label: string; value: string }[] = [];
  for (const key of CARD_SPEC_KEYS) {
    if (specs[key] && specs[key].value && specs[key].value !== '–') {
      result.push({ label: key, value: specs[key].value });
      if (result.length >= 3) break;
    }
  }
  return result;
}

export function ProductCard({ product, categorySlug }: ProductCardProps) {
  const { isInCompare, addProduct, removeProduct, isFull } = useCompare();
  const inCompare = isInCompare(product.slug);
  const hasImage = product.images.length > 0;
  const displayModel = getDisplayModel(product.model);
  const keySpecs = getKeySpecs(product.specs);

  const handleCompareToggle = () => {
    if (inCompare) {
      removeProduct(product.slug);
    } else if (!isFull) {
      addProduct(product.slug);
    }
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] transition-all hover:border-magido-orange/30 hover:shadow-lg">
      {/* Image area */}
      <Link
        href={`/products/${categorySlug}/${product.slug}`}
        className="relative block"
      >
        <div className="product-card-image-bg relative flex aspect-[4/3] items-center justify-center overflow-hidden p-4">
          {hasImage ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-[var(--color-text-muted)]">
              <svg
                className="h-16 w-16 opacity-30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-5-5L5 21" />
              </svg>
              <span className="text-xs">Image coming soon</span>
            </div>
          )}
        </div>

        {/* Compare badge on image */}
        {inCompare && (
          <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-magido-orange px-2 py-0.5 text-2xs font-bold text-white">
            <Check className="h-3 w-3" />
            Comparing
          </div>
        )}
      </Link>

      {/* Content area */}
      <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
        {/* Model + name */}
        <Link href={`/products/${categorySlug}/${product.slug}`}>
          <h3 className="font-display text-lg font-bold text-[var(--color-text)] transition-colors group-hover:text-magido-orange">
            {displayModel}
          </h3>
        </Link>

        {/* Key specs */}
        {keySpecs.length > 0 && (
          <dl className="mt-2 space-y-1">
            {keySpecs.map((spec) => (
              <div key={spec.label} className="flex items-baseline justify-between gap-2 text-xs">
                <dt className="truncate text-[var(--color-text-muted)]">
                  {spec.label}
                </dt>
                <dd className="flex-shrink-0 font-medium text-[var(--color-text-secondary)]">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Action tabs */}
        <div className="mt-3 flex items-center gap-1 border-t border-[var(--color-border-light)] pt-3">
          <Link
            href={`/contact?model=${encodeURIComponent(product.model)}`}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-magido-orange/10 px-2 py-2 text-xs font-semibold text-magido-orange transition-colors hover:bg-magido-orange hover:text-white"
          >
            <FileText className="h-3.5 w-3.5" />
            Get Quote
          </Link>
          <button
            onClick={handleCompareToggle}
            disabled={!inCompare && isFull}
            className={`flex items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-xs font-medium transition-colors ${
              inCompare
                ? 'bg-magido-orange text-white'
                : isFull
                  ? 'cursor-not-allowed text-[var(--color-text-muted)] opacity-40'
                  : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text)]'
            }`}
            aria-label={inCompare ? 'Remove from comparison' : 'Add to comparison'}
            title={isFull && !inCompare ? 'Compare list is full (max 8)' : undefined}
          >
            <GitCompareArrows className="h-3.5 w-3.5" />
          </button>
          <Link
            href={`/products/${categorySlug}/${product.slug}`}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-xs font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text)]"
          >
            Details
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
