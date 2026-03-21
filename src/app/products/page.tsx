import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllCategories, getCategoryRepresentativeImage } from '@/lib/products';
import { ArrowRight, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Aqueous Parts Washers — All Models & Categories | Magido USA',
  description:
    'Browse 75+ Magido USA aqueous parts washers and water-based parts cleaning systems — manual, top load, front load, immersion, conveyor, rotary drum, and rotary immersion. Every stainless steel parts washer built from AISI 304, made in Italy.',
  alternates: {
    canonical: 'https://magidousa.com/products',
  },
  openGraph: {
    title: 'Aqueous Parts Washers — All Models & Categories | Magido USA',
    description:
      'Browse 75+ aqueous parts washers and water-based cleaning systems — 7 machine types, all built from AISI 304 stainless steel, made in Italy since 1980.',
    url: 'https://magidousa.com/products',
    images: [{ url: 'https://magidousa.com/images/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aqueous Parts Washers — All Models & Categories | Magido USA',
    description:
      '75+ aqueous parts washers — manual, top load, front load, immersion, conveyor, rotary drum and immersion. All AISI 304 stainless steel, made in Italy.',
  },
};

export default function ProductsIndexPage() {
  const categories = getAllCategories();

  return (
    <>
      {/* ─── Breadcrumb ─── */}
      <nav
        className="border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Breadcrumb"
      >
        <div className="mx-auto flex max-w-7xl items-center gap-2 text-sm">
          <Link
            href="/"
            className="text-[var(--color-text-muted)] transition-colors hover:text-magido-orange"
          >
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-[var(--color-text-muted)]" />
          <span className="font-medium text-[var(--color-text)]">Products</span>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="hero-bg px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="font-display text-sm font-semibold uppercase tracking-widest text-magido-orange">
            7 Categories • 20 Series • 84 Models
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Aqueous Parts Washing Systems
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">
            From compact manual stations to fully automated conveyor and rotary
            systems — every Magido machine is built entirely from AISI 304
            stainless steel and engineered in Italy.
          </p>
        </div>
      </section>

      {/* ─── Category Grid ─── */}
      <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => {
              const image = getCategoryRepresentativeImage(cat.slug);
              return (
                <Link
                  key={cat.slug}
                  href={`/products/${cat.slug}`}
                  className="group flex flex-col overflow-hidden rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] transition-all hover:border-magido-orange/30 hover:shadow-lg"
                >
                  {/* Image */}
                  <div className="product-card-image-bg relative flex aspect-[16/10] items-center justify-center overflow-hidden">
                    {image ? (
                      <Image
                        src={image}
                        alt={cat.name}
                        fill
                        className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="text-[var(--color-text-muted)] opacity-40">
                        <svg className="h-20 w-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <path d="m21 15-5-5L5 21" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="font-display text-xl font-bold text-[var(--color-text)] transition-colors group-hover:text-magido-orange">
                      {cat.name}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                      {cat.shortDescription}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs font-medium text-[var(--color-text-muted)]">
                        {cat.totalProducts} models • {cat.series.length} series
                      </span>
                      <span className="flex items-center gap-1 text-xs font-semibold text-magido-orange transition-transform group-hover:translate-x-1">
                        Explore <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
