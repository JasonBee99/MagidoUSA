import Image from 'next/image';
import Link from 'next/link';
import { FlaskConical, Phone } from 'lucide-react';


// ─── Component ───────────────────────────────────────────────────────────────

export function HomeHero() {
  return (
    <>
      {/* ─── Hero section ─── */}
      <section className="hero-bg relative px-4 pt-6 pb-12 sm:px-6 lg:px-8 lg:pt-10 lg:pb-24">
        <div className="mx-auto max-w-7xl">

          {/* Tap-to-call — mobile only, above fold */}
          <div className="relative z-10 mb-4 flex justify-center lg:hidden">
            <a
              href="tel:8444624436"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-white/20"
            >
              <Phone className="h-3.5 w-3.5 text-magido-orange" />
              844-462-4436 · M–F 8am–5pm CST
            </a>
          </div>

          {/* Main hero: FLS spotlight */}
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-12">

            {/* Left: Text */}
            <div className="w-full text-center lg:w-1/2 lg:text-left">

              {/* Heading — full width, badge inline after title */}
              <h1 className="flex w-full flex-wrap items-baseline justify-center gap-x-3 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:justify-start lg:text-6xl">
                FLS Series
                <span className="inline-flex items-center rounded-full bg-magido-orange/20 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-magido-orange">
                  New Product
                </span>
              </h1>

              {/* Subtitle with lines */}
              <div className="mt-3 flex items-center justify-center gap-3">
                <div className="h-px flex-1 max-w-[4rem] bg-magido-orange/30" />
                <p className="shrink-0 font-display text-lg font-medium text-magido-orange sm:text-xl">
                  Front Load Spray Cabinet Washers
                </p>
                <div className="h-px flex-1 max-w-[4rem] bg-magido-orange/30" />
              </div>

              {/* Description */}
              <p className="mt-4 text-justify text-base leading-relaxed text-gray-300 sm:text-lg">
                The newest addition to the Magido lineup. Heavy-duty front-loading design for large,
                heavy components — built entirely from <a href="/solutions/aisi-304-stainless-steel-parts-washers" className="font-medium text-magido-orange hover:text-magido-blue">AISI 304 stainless steel</a> with automated wash cycles.
              </p>

              {/* CTAs — compact, side-by-side */}
              <div className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start">
                <Link
                  href="/products/front-load-washers"
                  className="btn-primary btn-sm"
                >
                  Explore FLS Series
                  <span className="btn-arrow">→</span>
                </Link>
              </div>

              {/* Secondary links — desktop only, hidden on mobile to avoid clutter */}
              <div className="mt-6 hidden flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-white/10 pt-5 sm:flex lg:justify-start">
                <Link
                  href="/products"
                  className="whitespace-nowrap text-sm font-medium text-gray-300 transition-colors hover:text-white"
                >
                  Browse Washers →
                </Link>
                <span className="text-white/20" aria-hidden="true">|</span>
                <Link
                  href="/contact#evaluation"
                  className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-sm font-medium text-gray-300 transition-colors hover:text-white"
                >
                  <FlaskConical className="h-3.5 w-3.5 text-magido-orange" />
                  Process Evaluation
                </Link>
                <span className="text-white/20" aria-hidden="true">|</span>
                <Link
                  href="/how-to-choose"
                  className="whitespace-nowrap text-sm font-medium text-gray-300 transition-colors hover:text-white"
                >
                  Help Me Choose →
                </Link>
              </div>
            </div>

            {/* Right: FLS product image — fills half-width container */}
            <div className="flex w-full items-center justify-center lg:w-1/2">
              <div className="product-halo relative h-72 w-full sm:h-96 lg:h-[32rem]">
                <Image
                  src="/images/products/fls/fls35-open.webp"
                  alt="FLS-35 Front Load Spray Cabinet Washer"
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                  priority
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
