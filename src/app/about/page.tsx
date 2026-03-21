import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ArrowRight, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Magido USA — Italian-Engineered Stainless Steel Parts Washers',
  description: 'Magido USA aqueous parts washers since 1980. Spray cabinet, immersion, belt conveyor, rotary drum, and manual. AISI 304 stainless steel, made in Italy.',
  alternates: {
    canonical: 'https://magidousa.com/about',
  },
  openGraph: {
    title: 'About Magido USA — Italian-Engineered Stainless Steel Parts Washers',
    description: 'Engineering aqueous parts washing systems since 1980 — stainless steel spray cabinet, immersion, conveyor, rotary drum, and manual parts washers. AISI 304 stainless steel, made in Italy. US sales and support in Sturtevant, WI.',
    url: 'https://magidousa.com/about',
    images: [{ url: 'https://magidousa.com/images/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Magido USA — Italian-Engineered Stainless Steel Parts Washers',
    description: 'Engineering aqueous parts washing systems since 1980. 100% AISI 304 stainless steel, made in Italy.',
  },
};

export default function AboutPage() {
  return (
    <>
      <nav className="border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-3 sm:px-6 lg:px-8" aria-label="Breadcrumb">
        <div className="mx-auto flex max-w-7xl items-center gap-2 text-sm">
          <Link href="/" className="text-[var(--color-text-muted)] hover:text-magido-orange">Home</Link>
          <ChevronRight className="h-3.5 w-3.5 text-[var(--color-text-muted)]" />
          <span className="font-medium text-[var(--color-text)]">About</span>
        </div>
      </nav>
      <section className="hero-bg px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="font-display text-sm font-semibold uppercase tracking-widest text-magido-orange">About Magido USA</p>
              <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">Leaders in Aqueous Cleaning Solutions</h1>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-300 sm:text-lg">Engineered in Italy. Built from AISI 304 stainless steel. Industrial aqueous parts washers for automotive, aerospace, machining, and heavy equipment — supported across the United States.</p>
            </div>

            {/* Italian facility photo */}
            <div className="w-full flex-shrink-0 lg:w-80 xl:w-96">
              <div className="cta-banner-grid overflow-hidden rounded-xl border border-magido-orange/30">
                <Image
                  src="/images/about/magido-sede-italia.webp"
                  alt="Magido manufacturing facility in Italy"
                  width={480}
                  height={280}
                  className="h-52 w-full object-cover object-center lg:h-60"
                  priority
                />
              </div>
              <p className="mt-2 text-center text-xs text-white/40">
                Magido — Manufacturing facility, Italy
              </p>
            </div>

          </div>
        </div>
      </section>
      <article className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-3xl space-y-8 text-[var(--color-text-secondary)] leading-relaxed">
          <section>
            <h2 className="font-display text-2xl font-bold text-[var(--color-text)]">Our Story</h2>
            <div className="mt-3 flex flex-col gap-6 sm:flex-row sm:items-start">
              <div className="flex-1 space-y-3">
                <p>Magido has been engineering and manufacturing parts washing systems from our facility in Italy for decades. What began as a commitment to building better cleaning equipment has grown into one of the broadest lines of aqueous parts washing systems available from a single manufacturer — 84 models across 7 product categories. Our water-based parts cleaning systems remove cutting oil, coolant, metallic fines, and machining residue from automotive, aerospace, and industrial machined parts.</p>
                <p>Every Magido machine is built entirely from AISI 304 stainless steel. Not painted mild steel. Not powder-coated carbon steel. True corrosion-resistant stainless. That commitment to materials is what separates Magido from the rest of the market.</p>
              </div>
              <div className="w-full flex-shrink-0 sm:w-52 lg:w-60">
                <div className="overflow-hidden rounded-xl border border-[var(--color-card-border)]">
                  <Image
                    src="/images/about/magido-welding.webp"
                    alt="Welders assembling Magido stainless steel parts washers"
                    width={320}
                    height={400}
                    className="h-56 w-full object-cover object-center sm:h-64"
                  />
                </div>
                <p className="mt-2 text-center text-xs text-[var(--color-text-muted)]">Stainless steel fabrication</p>
              </div>
            </div>
          </section>
          <section>
            <h2 className="font-display text-2xl font-bold text-[var(--color-text)]">Why Stainless Steel Changes Everything</h2>
            <div className="mt-3 flex flex-col gap-6 sm:flex-row-reverse sm:items-start">
              <div className="flex-1">
                <p>Most parts washers are built from mild steel with a painted finish that degrades under hot alkaline cleaning solutions. Magido builds every component — tank, cabinet, wash basket, nozzle headers, internal plumbing — from AISI 304 stainless steel. This is not an upgrade option. It is standard across the entire product line.</p>
              </div>
              <div className="w-full flex-shrink-0 sm:w-52 lg:w-60">
                <div className="overflow-hidden rounded-xl border border-[var(--color-card-border)]">
                  <Image
                    src="/images/about/magido-parts-washer.webp"
                    alt="Magido stainless steel parts washers ready for delivery"
                    width={320}
                    height={240}
                    className="h-48 w-full object-cover object-center"
                  />
                </div>
                <p className="mt-2 text-center text-xs text-[var(--color-text-muted)]">Ready for delivery — Sturtevant, WI</p>
              </div>
            </div>
          </section>
          <section>
            <h2 className="font-display text-2xl font-bold text-[var(--color-text)]">What Sets Us Apart</h2>
            <p className="mt-3">The broadest range of aqueous cleaning technologies under one brand. We evaluate your parts, contamination, throughput, and cleanliness standards, then recommend the right system. Machines designed for easy maintenance with accessible components. Replacement parts ship within 24–48 hours.</p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-bold text-[var(--color-text)]">US Presence</h2>
            <p className="mt-3">Magido USA is headquartered in Sturtevant, Wisconsin, providing sales, application engineering, and after-sale support across the United States.</p>
          </section>
          <div className="flex flex-wrap gap-3 pt-4">
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg bg-magido-orange px-6 py-3 text-sm font-semibold text-white hover:bg-magido-orange-dark">Contact Us <ArrowRight className="h-4 w-4" /></Link>
            <a href="tel:8444624436" className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-6 py-3 text-sm font-semibold text-[var(--color-text)] hover:border-magido-orange/30"><Phone className="h-4 w-4" /> 844-4MA-GIDO</a>
          </div>
        </div>
      </article>
    </>
  );
}
