'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check, GitCompareArrows, Play, X } from 'lucide-react';
import { useCompare } from './CompareProvider';
import type { Product } from '@/lib/products';

interface ProductCardProps {
  product: Product;
  categorySlug: string;
  seriesName?: string;
  seriesDescription?: string;
}

export function ProductCard({ product, categorySlug, seriesName, seriesDescription }: ProductCardProps) {
  const { isInCompare, addProduct, removeProduct, isFull } = useCompare();
  const [showVideo, setShowVideo] = useState(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const inCompare = isInCompare(product.slug);
  const hasImage = product.images.length > 0;
  const videos = product.videoUrls || (product.videoUrl ? [product.videoUrl] : []);
  const videoTitles = product.videoTitles || videos.map((_, i) => `Video ${i + 1}`);
  const hasVideo = videos.length > 0;

  const handleCompareToggle = () => {
    if (inCompare) {
      removeProduct(product.slug);
    } else if (!isFull) {
      addProduct(product.slug);
    }
  };

  return (
    <>
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

          {/* Series badge — top left on image */}
          {seriesName && (
            <div className="absolute left-0 top-0 rounded-br-lg bg-[#eb6c1c] px-3 py-1 text-xs font-bold text-white">
              {seriesName}
            </div>
          )}

          {/* Compare badge on image */}
          {inCompare && (
            <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-magido-orange px-2 py-0.5 text-2xs font-bold text-white">
              <Check className="h-3 w-3" />
              Comparing
            </div>
          )}
        </Link>

        {/* Content area */}
        <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
          {/* Product title */}
          <Link href={`/products/${categorySlug}/${product.slug}`}>
            <h3 className="font-display text-base font-bold leading-snug text-[var(--color-text)] transition-colors group-hover:text-magido-orange">
              {product.name}
            </h3>
          </Link>

          {/* One-liner description from series */}
          {seriesDescription && (
            <p className="mt-1 text-xs text-[var(--color-text-muted)]">
              {seriesDescription}
            </p>
          )}

          {/* View Details link */}
          <Link
            href={`/products/${categorySlug}/${product.slug}`}
            className="mt-2 text-xs font-medium text-magido-orange transition-colors hover:text-magido-orange-dark"
          >
            View Details →
          </Link>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Action buttons row */}
          <div className="mt-3 flex items-center gap-2 border-t border-[var(--color-border-light)] pt-3">
            <Link
              href={`/contact?product=${encodeURIComponent(product.slug)}`}
              className="rounded-md bg-magido-orange/10 px-3 py-1.5 text-xs font-semibold text-magido-orange transition-colors hover:bg-magido-orange hover:text-white"
            >
              Get Quote
            </Link>

            {hasVideo && (
              <button
                onClick={() => setShowVideo(true)}
                className="flex items-center gap-1 rounded-md px-2 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text)]"
              >
                <Play className="h-3 w-3" />
                Video{videos.length > 1 ? `s (${videos.length})` : ''}
              </button>
            )}

            <button
              onClick={handleCompareToggle}
              disabled={!inCompare && isFull}
              className={`flex items-center gap-1 rounded-md px-2 py-1.5 text-xs font-medium transition-colors ${
                inCompare
                  ? 'bg-magido-orange text-white'
                  : isFull
                    ? 'cursor-not-allowed text-[var(--color-text-muted)] opacity-40'
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text)]'
              }`}
              aria-label={inCompare ? 'Remove from comparison' : 'Add to comparison'}
              title={isFull && !inCompare ? 'Compare list is full (max 8)' : undefined}
            >
              <GitCompareArrows className="h-3 w-3" />
              Compare
            </button>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && videos.length > 0 && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => { setShowVideo(false); setActiveVideoIndex(0); }}
        >
          <div
            className="relative w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => { setShowVideo(false); setActiveVideoIndex(0); }}
              className="absolute -right-2 -top-10 rounded-full bg-white/10 p-1.5 text-white transition-colors hover:bg-white/20"
              aria-label="Close video"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="aspect-video w-full overflow-hidden rounded-xl">
              <iframe
                src={videos[activeVideoIndex]}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={videoTitles[activeVideoIndex]}
              />
            </div>

            {/* Tabs + title below video */}
            {videos.length > 1 && (
              <div className="mt-3">
                <div className="flex items-center gap-1">
                  {videos.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveVideoIndex(i)}
                      className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                        i === activeVideoIndex
                          ? 'bg-magido-orange text-white'
                          : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
                      }`}
                    >
                      {videoTitles[i]}
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-sm text-white/80">
                  {videoTitles[activeVideoIndex]}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
