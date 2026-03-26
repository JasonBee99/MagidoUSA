'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { linkAisi } from '@/lib/linkAisi';
import { BarChart2, Check, GitCompareArrows, Play, X } from 'lucide-react';
import { useCompare } from './CompareProvider';
import type { Product } from '@/lib/products';

// ─── Key specs priority list per category ─────────────────────────────────────
const KEY_SPECS_BY_CATEGORY: Record<string, string[]> = {
  'manual-washers': [
    'Load Weight', 'Working Area', 'Working Envelope', 'Fluid Capacity',
    'Heater', 'Pump', 'Flow Rate', 'Spray Pressure', 'Operating Temperature',
  ],
  'top-load-washers': [
    'Load Weight', 'Turntable Basket Diameter', 'Tank Capacity',
    'Fluid/Tank Capacity', 'Heater', 'Pump(s)', 'Pump', 'Flow Rate',
    'Spray Pressure', 'Max Operating Temperature',
  ],
  'front-load-washers': [
    'Load Weight', 'Load Height', 'Fluid/Tank Capacity', 'Tank Capacity',
    'Heater', 'Pump(s)', 'Flow Rate', 'Spray Pressure', 'Max Operating Temperature',
  ],
  'immersion-washers': [
    'Load Weight', 'Platform', 'Working Height', 'Fluid/Tank Capacity',
    'Heater', 'Operating Temperature',
  ],
  'in-line-belt-conveyor-washers': [
    'Width of Conveyor belt', 'Available width of conveyor belt',
    'Usable washing height', 'Real load', 'Wash Tank', 'Wash Pump',
    'Solution temperature', 'Power supply',
  ],
  'rotary-drum-washers': [
    'Drum diameter', 'Drum Length', 'Production', 'Wash tank',
    'Wash pump', 'Solution temperature', 'Overall width', 'Power supply',
  ],
  'rotary-immersion-washers': [
    'Load Weight', 'Basket Dimensions', 'Load Height', 'Wash Fluid Capacity',
    'Rinse Fluid Capacity', 'Wash Heater', 'Wash Pump',
  ],
};

const FALLBACK_SPEC_KEYS = [
  'Load Weight', 'Tank Capacity', 'Fluid/Tank Capacity', 'Heater',
  'Pump(s)', 'Pump', 'Operating Temperature', 'Working Area',
];

// Unit strings that are redundant when already embedded in the value
const SKIP_UNITS = new Set(['inches', 'in.', '']);

function formatSpecValue(val: string, unit: string): string {
  if (!unit) return val;
  const unitLower = unit.toLowerCase().trim();
  const valLower = val.toLowerCase();
  // Skip if unit already visually present in value or is inches (shown as ")
  if (SKIP_UNITS.has(unitLower)) return val;
  if (valLower.includes(unitLower)) return val;
  // Skip compound units where a part already appears in value (e.g. '46 gal' + 'gal US' -> avoid '46 gal gal')
  if (unitLower.split(/[\s/.]+/).some((part: string) => part.length > 1 && valLower.includes(part))) return val;
  // Normalize unit labels for clean display
  const unitMap: Record<string, string> = {
    'lbs': 'lbs', 'lb': 'lbs', 'lb/yd': 'lb/yd',
    'gal us': 'gal', 'gal.': 'gal',
    'hp': 'HP', 'kw': 'kW',
    'gpm': 'GPM', 'gph': 'GPH',
    'psi': 'PSI', 'rpm': 'RPM', 'fpm': 'fpm',
    'cfh': 'CFH', '°f': '°F', '°c': '°C',
    'v': 'V', 'a': 'A', 'ph': 'Ph',
    'minute': 'min', 'minutes': 'min',
  };
  const displayUnit = unitMap[unitLower] ?? unit;
  return `${val} ${displayUnit}`;
}

function pickKeySpecs(
  specs: Product['specs'],
  categorySlug: string,
  max = 5,
): { label: string; value: string }[] {
  const priorityKeys = KEY_SPECS_BY_CATEGORY[categorySlug] ?? FALLBACK_SPEC_KEYS;
  const result: { label: string; value: string }[] = [];
  for (const key of priorityKeys) {
    const entry = (specs as Record<string, unknown>)[key];
    if (!entry) continue;
    const val = typeof entry === 'string' ? entry : (entry as { value: string; unit?: string }).value;
    const unit = typeof entry === 'string' ? '' : ((entry as { unit?: string }).unit ?? '');
    if (val && val !== '–' && val !== '-' && val.trim() !== '') {
      result.push({ label: key, value: formatSpecValue(val, unit) });
      if (result.length >= max) break;
    }
  }
  return result;
}

interface ProductCardProps {
  product: Product;
  categorySlug: string;
  seriesName?: string;
  seriesDescription?: string;
  /** Sets initial spec view state on mount */
  defaultShowSpecs?: boolean;
  /** Controlled override — when parent toggles "View All Specs" this forces all cards */
  forcedSpecsMode?: boolean;
  /** First 4 cards get priority loading; rest are lazy */
  priority?: boolean;
}

export function ProductCard({
  product,
  categorySlug,
  seriesName,
  seriesDescription,
  defaultShowSpecs = false,
  forcedSpecsMode,
  priority = false,
}: ProductCardProps) {
  const { isInCompare, addProduct, removeProduct, isFull } = useCompare();
  const [showVideo, setShowVideo] = useState(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [showSpecs, setShowSpecs] = useState(defaultShowSpecs);

  // When "View All Specs" is toggled from the parent, override all cards
  useEffect(() => {
    if (forcedSpecsMode !== undefined) {
      setShowSpecs(forcedSpecsMode);
    }
  }, [forcedSpecsMode]);

  /** Extract YouTube video ID from embed or watch URL */
  function getYouTubeId(url: string): string | null {
    const embedMatch = url.match(/youtube\.com\/embed\/([^?&]+)/);
    if (embedMatch) return embedMatch[1];
    const watchMatch = url.match(/[?&]v=([^&]+)/);
    if (watchMatch) return watchMatch[1];
    const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
    if (shortMatch) return shortMatch[1];
    return null;
  }
  const inCompare = isInCompare(product.slug);
  const hasImage = product.images.length > 0;
  const videos = product.videoUrls || (product.videoUrl ? [product.videoUrl] : []);
  const videoTitles = product.videoTitles || videos.map((_, i) => `Video ${i + 1}`);
  const hasVideo = videos.length > 0;
  const keySpecs = pickKeySpecs(product.specs, categorySlug);

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
        {/* Image / Spec panel area — fixed aspect ratio, content swaps */}
        <Link
          href={`/products/${categorySlug}/${product.slug}`}
          className="relative block"
          tabIndex={showSpecs ? -1 : undefined}
        >
          <div className="product-card-image-bg relative flex aspect-[4/3] items-center justify-center overflow-hidden">
            {hasImage ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className={`object-contain transition-transform duration-300 group-hover:scale-105 ${showSpecs ? 'opacity-0' : 'opacity-100'}`}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                priority={priority}
                loading={priority ? undefined : 'lazy'}
              />
            ) : (
              <div className={`flex flex-col items-center gap-2 text-[var(--color-text-secondary)] ${showSpecs ? 'opacity-0' : 'opacity-100'}`}>
                <svg
                  className="h-16 w-16 opacity-30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="m21 15-5-5L5 21" />
                </svg>
                <span className="text-xs">Image coming soon</span>
              </div>
            )}

            {/* ── Spec panel overlay (same dimensions as image area) ── */}
            {showSpecs && (
              <div className="absolute inset-0 flex flex-col bg-[var(--color-card-bg)] px-4 pb-3 pt-3">
                {/* "Key Specs" label — absolutely centered, above badges */}
                <p className="key-specs-label absolute left-0 right-0 top-3 z-20 text-[10px] font-bold uppercase tracking-widest text-magido-blue">
                  Key Specs
                </p>
                {keySpecs.length > 0 ? (
                  <dl className="mt-5 flex flex-1 flex-col justify-around overflow-visible">
                    {keySpecs.map((spec) => (
                      <div key={spec.label} className="flex items-baseline justify-between gap-2 border-b border-[var(--color-border-light)] pb-1 last:border-0">
                        <dt className="min-w-0 text-[0.68em] leading-tight text-[var(--color-text-muted)]" style={{ wordBreak: 'break-word' }}>
                          {spec.label}
                        </dt>
                        <dd className="shrink-0 text-right text-[0.68em] font-semibold leading-tight text-[var(--color-text)]">
                          {spec.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="text-[0.7em] text-[var(--color-text-muted)]">
                    Specs not yet available.
                  </p>
                )}
                <span className="mt-2 block text-center text-[11px] font-semibold text-magido-orange">
                  Full specs &amp; details →
                </span>
              </div>
            )}
          </div>

          {/* Series badge — top left */}
          {seriesName && (
            <div className="absolute left-0 top-0 rounded-br-lg rounded-tl-lg bg-[#eb6c1c] px-3 py-1 text-xs font-bold text-white">
              {seriesName}
            </div>
          )}

          {/* Model badge — top right */}
          {product.model && (
            <div className="absolute right-0 top-0 rounded-bl-lg rounded-tr-lg bg-[#315687] px-3 py-1 text-xs font-bold text-white">
              {product.model}
            </div>
          )}

          {/* Compare badge */}
          {inCompare && (
            <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-magido-orange px-2 py-0.5 text-2xs font-bold text-white">
              <Check className="h-3 w-3" />
              Comparing
            </div>
          )}
        </Link>

        {/* View Key Specs toggle — sits between image and content, full width */}
        <button
          onClick={() => setShowSpecs((v) => !v)}
          className={`flex w-full items-center justify-center gap-1.5 border-b border-t border-[var(--color-border)] py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-colors duration-150 ${
            showSpecs
              ? 'bg-magido-blue text-white hover:bg-magido-blue/90'
              : 'bg-[var(--color-bg-secondary)] text-magido-blue hover:bg-magido-blue hover:text-white'
          }`}
          aria-pressed={showSpecs}
        >
          <BarChart2 className="h-3 w-3" />
          {showSpecs ? 'Hide Specs' : 'View Key Specs'}
        </button>

        {/* Content area */}
        <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
          <Link href={`/products/${categorySlug}/${product.slug}`}>
            <h3 className="font-display text-base font-bold leading-snug text-[var(--color-text)] transition-colors group-hover:text-magido-orange">
              {product.name}
            </h3>
          </Link>

          {seriesDescription && (
            <p
              className="mt-1 line-clamp-3 text-justify text-xs text-[var(--color-text-secondary)]"
              dangerouslySetInnerHTML={{ __html: linkAisi(seriesDescription) }}
            />
          )}

          <Link
            href={`/products/${categorySlug}/${product.slug}`}
            className="mt-2 text-xs font-medium text-magido-orange transition-colors hover:text-magido-orange-dark"
          >
            View Details →
            <span className="sr-only"> for {product.name}</span>
          </Link>

          <div className="flex-1" />

          {/* Action buttons — Get Quote left, video thumbnail centered, Compare right */}
          <div className="relative mt-3 flex items-center border-t border-[var(--color-border-light)] pt-3">
            <Link
              href={`/contact?product=${encodeURIComponent(product.slug)}`}
              className="btn-quote btn-quote-sm"
            >
              Get Quote
              <span className="sr-only"> for {product.name}</span>
            </Link>

            {hasVideo && (() => {
              const thumbId = getYouTubeId(videos[0]);
              const thumbSrc = thumbId
                ? `https://img.youtube.com/vi/${thumbId}/mqdefault.jpg`
                : null;
              return (
                <button
                  onClick={() => setShowVideo(true)}
                  className="group/video absolute left-1/2 -translate-x-1/2 flex items-center rounded-md px-2 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-bg-secondary)]"
                  aria-label={`Play video${videos.length > 1 ? ` (${videos.length})` : ''}`}
                >
                  {thumbSrc ? (
                    <span className="relative block h-7 w-12 flex-shrink-0 overflow-hidden rounded">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={thumbSrc}
                        alt=""
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover/video:bg-black/50">
                        <Play className="h-3 w-3 fill-white text-white drop-shadow" />
                      </span>
                    </span>
                  ) : (
                    <Play className="h-3 w-3" />
                  )}
                </button>
              );
            })()}

            <button
              onClick={handleCompareToggle}
              disabled={!inCompare && isFull}
              className={`ml-auto flex items-center gap-1 rounded-md px-2 py-1.5 text-xs font-medium transition-colors ${
                inCompare
                  ? 'bg-magido-orange text-white'
                  : isFull
                    ? 'cursor-not-allowed text-[var(--color-text-secondary)] opacity-40'
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
