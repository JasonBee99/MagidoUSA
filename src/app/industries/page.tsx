// src/app/industries/page.tsx
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { INDUSTRIES } from '@/data/industries';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Industries Served — Aqueous Parts Washers for Every Sector | Magido USA',
  description:
    'Industrial aqueous parts washers for automotive, aerospace, machining, heavy equipment, medical, and food processing — stainless steel spray cabinet, immersion, belt conveyor, rotary drum, and manual parts washers. Water-based parts cleaning systems, AISI 304 stainless steel, made in Italy.',
  alternates: {
    canonical: 'https://magidousa.com/industries',
  },
  openGraph: {
    title: 'Industries Served — Aqueous Parts Washers for Every Sector | Magido USA',
    description:
      'Stainless steel aqueous parts washing systems for automotive, aerospace, machining, heavy equipment, medical, and food processing.',
    url: 'https://magidousa.com/industries',
    images: [{ url: 'https://magidousa.com/images/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Industries Served | Magido USA',
    description:
      'Aqueous parts washers for automotive, aerospace, machining, heavy equipment, medical, and food processing.',
  },
};

export default function IndustriesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Industries', url: '/industries' },
        ]}
      />

      {/* ─── Hero ─── */}
      <section className="border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="font-display text-sm font-semibold uppercase tracking-widest text-magido-orange">
              Industries Served
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight text-[var(--color-text)] sm:text-5xl">
              We Serve the Toughest Sectors
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)]">
              From the production line to the maintenance bay, Magido industrial aqueous parts washers — spray cabinet, immersion, belt conveyor, rotary drum, and manual — remove cutting oil, coolant, and machining residue from machined parts. Water-based parts washer systems, AISI 304 stainless steel throughout, made in Italy.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Industry Grid ─── */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((ind) => (
              <Link
                key={ind.slug}
                href={`/industries/${ind.slug}`}
                className="group flex flex-col rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-8 transition-all hover:border-magido-orange/40 hover:shadow-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-magido-blue/10 text-3xl ring-1 ring-magido-blue/20 transition-colors group-hover:bg-magido-orange/10 group-hover:ring-magido-orange/30">
                    {ind.icon}
                  </div>
                  <h2 className="font-display text-xl font-bold text-[var(--color-text)] transition-colors group-hover:text-magido-orange">
                    {ind.name}
                  </h2>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-secondary)] flex-1">
                  {ind.tagline}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {ind.recommendedSystems.slice(0, 2).map((sys) => (
                    <span
                      key={sys.categorySlug}
                      className="rounded-md bg-magido-blue/10 px-2.5 py-1 text-xs font-medium text-magido-blue ring-1 ring-magido-blue/20"
                    >
                      {sys.categoryName}
                    </span>
                  ))}
                </div>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-magido-orange opacity-0 transition-opacity group-hover:opacity-100">
                  Explore Solutions <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Why Magido ─── */}
      <section className="border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="font-display text-sm font-semibold uppercase tracking-widest text-magido-orange">
              Why Magido
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight text-[var(--color-text)]">
              One Platform. Every Industry.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { stat: '100%', label: 'Stainless Steel', desc: 'AISI 304 throughout — no painted carbon steel, no hidden rust risk.' },
              { stat: '74', label: 'Models', desc: 'From compact manual cabinets to fully automated conveyor systems.' },
              { stat: '7', label: 'Categories', desc: 'Manual, top load, front load, immersion, conveyor, drum, and rotary immersion.' },
              { stat: '1', label: 'Expert to Call', desc: 'Scott Morin — National Sales Manager — handles every inquiry personally.' },
            ].map((item) => (
              <div key={item.stat} className="rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-6 text-center">
                <p className="font-display text-4xl font-bold text-magido-blue">{item.stat}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">{item.label}</p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="border-t border-[var(--color-border)] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-xl font-bold text-[var(--color-text)]">
            Don't see your industry?
          </h2>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Magido systems are used across dozens of industries. Talk to Scott — he'll find the right solution for your application.
          </p>
          <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex rounded-lg bg-magido-orange px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-magido-orange-dark"
            >
              Contact Scott
            </Link>
            <Link
              href="/products"
              className="inline-flex rounded-lg border border-magido-blue px-6 py-2.5 text-sm font-semibold text-magido-blue transition-colors hover:bg-magido-blue hover:text-white dark:border-[var(--color-border)] dark:text-[var(--color-text-secondary)] dark:hover:bg-[var(--color-bg-tertiary)]"
            >
              Browse All Products →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
