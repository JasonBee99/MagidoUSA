import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, FlaskConical } from 'lucide-react';

// ─── Static data ────────────────────────────────────────────────────────────

const STATS = [
  { value: '50+', label: 'Years of Innovation' },
  { value: '20+', label: 'Washer Series' },
  { value: '6',   label: 'Industries Served' },
];

const TICKER_ITEMS = [
  'Aqueous Parts Washing',
  'Spray Cabinet Systems',
  'Rotary Immersion Washers',
  'In-Line Conveyor Systems',
  'Manual Cabinet Washers',
  'Eco-Friendly Solutions',
  'Custom Engineered Systems',
  '24/7 Technical Support',
];

// ─── Component ───────────────────────────────────────────────────────────────

export function HomeHero() {
  return (
    <>
      {/* ─── Hero section ─── */}
      <section className="hero-bg relative px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">

          {/* Main hero: FLS spotlight */}
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-12">

            {/* Left: Text */}
            <div className="max-w-2xl lg:w-1/2 lg:max-w-none">
              {/* Badge */}
              <span className="inline-flex items-center gap-1.5 rounded-full bg-magido-orange/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-magido-orange">
                New Product
              </span>

              {/* Heading */}
              <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                FLS Series
              </h1>
              <p className="mt-2 font-display text-lg font-medium text-magido-orange sm:text-xl">
                Front Load Spray Cabinet Washers
              </p>

              {/* Description */}
              <p className="mt-4 text-base leading-relaxed text-gray-300 sm:text-lg">
                The newest addition to the Magido lineup. Heavy-duty front-loading design for large,
                heavy components — built entirely from AISI 304 stainless steel with automated wash cycles.
              </p>

              {/* CTAs */}
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/products/front-load-washers"
                  className="inline-flex items-center gap-2 rounded-lg bg-magido-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-magido-orange-dark"
                >
                  Explore FLS Series
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact?model=FLS-35"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Request a Quote
                </Link>
              </div>

              {/* Secondary links */}
              <div className="mt-6 flex flex-wrap gap-4 border-t border-white/10 pt-6">
                <Link
                  href="/products/top-load-washers"
                  className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
                >
                  Browse Top Load Washers →
                </Link>
                <Link
                  href="/contact#evaluation"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-300 transition-colors hover:text-white"
                >
                  <FlaskConical className="h-3.5 w-3.5 text-magido-orange" />
                  Free Process Evaluation
                </Link>
                <Link
                  href="/how-to-choose"
                  className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
                >
                  Help Me Choose →
                </Link>
              </div>
            </div>

            {/* Right: FLS product image */}
            <div className="flex lg:w-1/2 items-center justify-center">
              <div className="product-halo relative h-60 w-60 sm:h-72 sm:w-72 lg:h-96 lg:w-96">
                <Image
                  src="/images/products/fls/fls35-open.webp"
                  alt="FLS-35 Front Load Spray Cabinet Washer"
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 240px, (max-width: 1024px) 288px, 384px"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="mt-10 flex items-center justify-center gap-6 border-t border-white/10 pt-8 sm:gap-16">
            {STATS.map((stat, i) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-2xl font-bold text-white sm:text-3xl">
                  {stat.value}
                </div>
                <div className="text-2xs font-medium uppercase tracking-wider text-gray-400 sm:text-xs">
                  {stat.label}
                </div>
                {/* Divider between stats (not after last) */}
                {i < STATS.length - 1 && (
                  <div className="sr-only">|</div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── Ticker bar (CSS-only animation, no JS) ─── */}
      <div className="overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)] py-3">
        <div className="ticker-track flex whitespace-nowrap">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span
              key={i}
              className="mx-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)]"
            >
              <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-magido-orange" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
