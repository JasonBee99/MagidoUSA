import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  getAllCategorySlugs,
  getCategoryBySlug,
  getSeriesByCategory,
  getProductsBySeries,
  getCategoryRepresentativeImage,
  getSeriesRepresentativeImage,
} from '@/lib/products';
import { ProductCard } from '@/components/ProductCard';
import { ChevronRight } from 'lucide-react';

// ─── Static generation for all category slugs ───
export function generateStaticParams() {
  return getAllCategorySlugs().map((slug) => ({ category: slug }));
}

// ─── Dynamic metadata per category ───
export function generateMetadata({
  params,
}: {
  params: { category: string };
}): Metadata {
  const category = getCategoryBySlug(params.category);
  if (!category) return {};

  return {
    title: `${category.name} — Industrial Aqueous Parts Washers`,
    description: `Explore Magido's ${category.name.toLowerCase()} — ${category.shortDescription.toLowerCase()}. ${category.totalProducts} models across ${category.series.length} series, all built from AISI 304 stainless steel.`,
    openGraph: {
      title: `${category.name} | Magido USA`,
      description: category.shortDescription,
    },
  };
}

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const category = getCategoryBySlug(params.category);
  if (!category) notFound();

  const seriesList = getSeriesByCategory(params.category);
  const heroImage = getCategoryRepresentativeImage(params.category);

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
          <Link
            href="/products"
            className="text-[var(--color-text-muted)] transition-colors hover:text-magido-orange"
          >
            Products
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-[var(--color-text-muted)]" />
          <span className="font-medium text-[var(--color-text)]">
            {category.name}
          </span>
        </div>
      </nav>

      {/* ─── Hero Section ─── */}
      <section className="hero-bg px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-between lg:gap-12">
            {/* Left: text */}
            <div className="max-w-2xl lg:max-w-xl">
              <p className="font-display text-sm font-semibold uppercase tracking-widest text-magido-orange">
                {category.series.length} Series •{' '}
                {category.totalProducts} Models
              </p>
              <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {category.name}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-gray-300 sm:text-lg">
                {category.shortDescription}. Every machine built entirely
                from AISI 304 stainless steel — engineered in Italy for
                lasting performance.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-magido-orange px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-magido-orange-dark"
                >
                  Request a Quote
                </Link>
                <Link
                  href="/how-to-choose"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Help Me Choose
                </Link>
              </div>
            </div>

            {/* Right: hero product image */}
            {heroImage && (
              <div className="relative flex-shrink-0">
                <div className="product-halo relative h-56 w-56 sm:h-72 sm:w-72 lg:h-80 lg:w-80">
                  <Image
                    src={heroImage}
                    alt={`${category.name} representative product`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 224px, (max-width: 1024px) 288px, 320px"
                    priority
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── Series Sections ─── */}
      <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          {seriesList.map((series) => {
            const products = getProductsBySeries(series.slug);
            const seriesImage = getSeriesRepresentativeImage(series.slug);

            return (
              <div key={series.slug} className="mb-14 last:mb-0" id={series.slug}>
                {/* Series header */}
                <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="font-display text-2xl font-bold tracking-tight text-[var(--color-text)] sm:text-3xl">
                        {series.name}
                      </h2>
                      {series.isNew && (
                        <span className="rounded-full bg-magido-orange px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-white">
                          New
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                      {series.type} • {products.length} model
                      {products.length !== 1 ? 's' : ''}
                    </p>
                    {series.description && (
                      <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-[var(--color-text-secondary)]">
                        {series.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Product cards grid */}
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {products.map((product) => (
                    <ProductCard
                      key={product.slug}
                      product={product}
                      categorySlug={params.category}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
