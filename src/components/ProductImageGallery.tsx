'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductImageGalleryProps {
  images: string[];
  alt: string;
}

export function ProductImageGallery({ images, alt }: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const hasImages = images.length > 0;

  // Keyboard navigation in lightbox
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowLeft' && selectedIndex > 0) setSelectedIndex(selectedIndex - 1);
      if (e.key === 'ArrowRight' && selectedIndex < images.length - 1)
        setSelectedIndex(selectedIndex + 1);
    },
    [lightboxOpen, selectedIndex, images.length]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxOpen]);

  if (!hasImages) {
    return (
      <div className="product-image-bg flex aspect-square items-center justify-center rounded-xl">
        <div className="flex flex-col items-center gap-3 text-[var(--color-text-muted)]">
          <svg
            className="h-24 w-24 opacity-30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="m21 15-5-5L5 21" />
          </svg>
          <span className="text-sm">Image coming soon</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Main image */}
      <div className="relative">
        <button
          onClick={() => setLightboxOpen(true)}
          className="product-image-bg group relative flex aspect-square w-full cursor-zoom-in items-center justify-center overflow-hidden rounded-xl"
          aria-label="Open image lightbox"
        >
          <Image
            src={images[selectedIndex]}
            alt={`${alt} — image ${selectedIndex + 1}`}
            fill
            className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          {/* Zoom overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/5 dark:group-hover:bg-white/5">
            <div className="rounded-full bg-white/80 p-2 opacity-0 shadow-lg transition-opacity group-hover:opacity-100 dark:bg-black/60">
              <ZoomIn className="h-5 w-5 text-[var(--color-text)]" />
            </div>
          </div>
        </button>

        {/* Image counter badge */}
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {selectedIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-3 flex gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={`product-card-image-bg relative flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border-2 transition-all sm:h-20 sm:w-20 ${
                i === selectedIndex
                  ? 'border-magido-orange shadow-md'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <Image
                src={img}
                alt={`${alt} thumbnail ${i + 1}`}
                fill
                className="object-contain p-1.5"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox overlay */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Prev/Next in lightbox */}
          {selectedIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex(selectedIndex - 1);
              }}
              className="absolute left-4 z-10 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}
          {selectedIndex < images.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex(selectedIndex + 1);
              }}
              className="absolute right-4 z-10 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

          {/* Full-size image */}
          <div
            className="relative h-[85vh] w-[85vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[selectedIndex]}
              alt={`${alt} — full size image ${selectedIndex + 1}`}
              fill
              className="object-contain"
              sizes="85vw"
              quality={95}
            />
          </div>

          {/* Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
              {selectedIndex + 1} / {images.length}
            </div>
          )}
        </div>
      )}
    </>
  );
}
