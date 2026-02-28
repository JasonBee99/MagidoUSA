import Link from 'next/link';
import { Metadata } from 'next';
import { Home, Search, Phone, ArrowRight } from 'lucide-react';
import { getAllCategories } from '@/lib/products';

export const metadata: Metadata = {
  title: '404 — Page Not Found',
  description: 'The page you are looking for could not be found. Browse our aqueous parts washers or contact us for help.',
};

export default function NotFound() {
  const categories = getAllCategories();

  return (
    <>
      {/* ━━━ Hero ━━━ */}
      <section className="hero-bg px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-display text-6xl font-extrabold text-magido-orange sm:text-8xl">
            404
          </p>
          <h1 className="mt-4 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Page Not Found
          </h1>
          <p className="mt-4 text-base leading-relaxed text-gray-300 sm:text-lg">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Let&apos;s get you back on track.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-magido-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-magido-orange-dark"
            >
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Search className="h-4 w-4" />
              Browse Products
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Phone className="h-4 w-4" />
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* ━━━ Quick Links ━━━ */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center font-display text-lg font-bold text-[var(--color-text)]">
            Or explore our product categories
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/products/${cat.slug}`}
                className="group flex items-center justify-between rounded-lg border border-[var(--color-card-border)] bg-[var(--color-card-bg)] px-4 py-3 transition-all hover:border-magido-orange/30 hover:shadow-md"
              >
                <div>
                  <p className="text-sm font-semibold text-[var(--color-text)] transition-colors group-hover:text-magido-orange">
                    {cat.name}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    {cat.totalProducts} models
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-[var(--color-text-muted)] transition-transform group-hover:translate-x-1 group-hover:text-magido-orange" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
