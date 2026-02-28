'use client';

import { useEffect, useRef, useState } from 'react';
import Image, { ImageProps } from 'next/image';

/**
 * LazyImage — wraps Next.js Image with an IntersectionObserver so
 * below-fold images only load when they enter the viewport.
 * Above-fold images should continue using <Image priority />.
 *
 * Usage: Drop-in replacement for <Image /> on cards and grids.
 *   <LazyImage src="/img.webp" alt="..." fill className="object-contain" />
 */
type LazyImageProps = Omit<ImageProps, 'loading'> & {
  /** Extra margin around viewport for prefetch. Default: 200px */
  rootMargin?: string;
};

export function LazyImage({ rootMargin = '200px', ...props }: LazyImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If IntersectionObserver isn't available, just show immediately
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className="contents">
      {isVisible ? (
        <Image {...props} loading="lazy" />
      ) : (
        // Placeholder — same dimensions, no network request
        <div
          className="animate-pulse bg-[var(--color-bg-secondary)]"
          style={{ position: 'absolute', inset: 0 }}
        />
      )}
    </div>
  );
}
