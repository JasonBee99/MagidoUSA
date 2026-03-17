import Image from 'next/image';
import Link from 'next/link';
import { FlaskConical } from 'lucide-react';


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
                  className="btn-primary"
                >
                  Explore FLS Series
                  <span className="btn-arrow">→</span>
                </Link>
                <Link
                  href="/contact?model=FLS-35"
                  className="btn-ghost-dark"
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

        </div>
      </section>
    </>
  );
}
