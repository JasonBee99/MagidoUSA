import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { ChevronRight, Droplets, FlaskConical } from 'lucide-react';
import type { Solution, SolutionsData } from '@/types/solutions';
import solutionsData from '@/data/solutions.json';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

const { solutions } = solutionsData as SolutionsData;

export const metadata: Metadata = {
  title: 'Aqueous Parts Washer Guides & Solutions | Magido USA',
  description:
    'Aqueous parts washer guides: water-based vs solvent, spray vs immersion, cutting oil and coolant removal from machined parts. Automotive, aerospace, machining.',
  alternates: { canonical: 'https://magidousa.com/solutions' },
  openGraph: {
    title: 'Aqueous Parts Washer Guides & Solutions | Magido USA',
    description:
      'Compare aqueous vs. solvent parts washers, spray cabinet vs. immersion, and find the right water-based cleaning solution for your application.',
    url: 'https://magidousa.com/solutions',
    images: [{ url: 'https://magidousa.com/images/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aqueous Parts Washer Guides & Solutions | Magido USA',
    description:
      'Compare aqueous vs. solvent parts washers, spray vs. immersion, and find the right cleaning solution for your application.',
  },
};

export default function SolutionsIndexPage() {
  const comparisons = solutions.filter((s: Solution) => s.type === 'comparison');
  const useCases = solutions.filter((s: Solution) => s.type === 'use-case');

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Solutions', url: '/solutions' },
      ]} />

      {/* ─── Breadcrumb ─── */}
      <nav
        className="border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Breadcrumb"
      >
        <div className="mx-auto flex max-w-7xl items-center gap-2 text-sm">
          <Link href="/" className="text-[var(--color-text-muted)] transition-colors hover:text-magido-orange">Home</Link>
          <ChevronRight className="h-3.5 w-3.5 text-[var(--color-text-muted)]" />
          <span className="font-medium text-[var(--color-text)]">Solutions</span>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="hero-bg px-4 py-10 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">

            {/* Text */}
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-magido-orange/30 bg-magido-orange/10 px-4 py-1.5 text-sm font-medium text-magido-orange">
                <Droplets className="h-3.5 w-3.5" aria-hidden="true" />
                Aqueous vs Solvent · Spray vs Immersion · Application Guides
              </div>

              <h1 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
                Parts Washing Solutions &amp; Guides
              </h1>

              <p className="mt-4 max-w-2xl text-justify text-base leading-relaxed text-gray-300 sm:text-lg">
                Practical guides to choosing the right industrial aqueous parts washer — <a href="/solutions/aisi-304-stainless-steel-parts-washers" className="font-medium text-magido-orange hover:text-magido-blue">AISI 304 stainless steel</a> spray cabinet, immersion, belt conveyor, rotary drum, and manual parts washers. Water-based parts washer vs solvent, cutting oil and coolant removal, machined parts cleaning for automotive, aerospace, and machining.
              </p>

              {/* CTAs — btn-sm side-by-side */}
              <div className="mt-6 flex justify-center gap-2 sm:justify-start">
                <Link href="/how-to-choose" className="btn-primary btn-sm whitespace-nowrap">
                  Help Me Choose
                  <span className="btn-arrow">→</span>
                </Link>
                <Link href="/contact" className="btn-ghost-dark btn-sm whitespace-nowrap">
                  Talk to an Expert
                </Link>
              </div>

              {/* Secondary links — pipe-separated */}
              <div className="mt-5 flex items-center justify-center gap-x-2 border-t border-white/10 pt-5 sm:justify-start sm:gap-x-4">
                <Link
                  href="/products"
                  className="whitespace-nowrap text-xs font-medium text-gray-300 transition-colors hover:text-white sm:text-sm"
                >
                  Browse Washers
                </Link>
                <span className="text-white/20" aria-hidden="true">|</span>
                <Link
                  href="/contact#evaluation"
                  className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-xs font-medium text-gray-300 transition-colors hover:text-white sm:gap-1.5 sm:text-sm"
                >
                  <FlaskConical className="h-3 w-3 text-magido-orange sm:h-3.5 sm:w-3.5" />
                  Process Evaluation
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="w-full flex-shrink-0 lg:w-80 xl:w-96">
              <div className="product-halo relative h-52 w-full lg:h-60">
                <Image
                  src="/images/products/platinum/p1200.webp"
                  alt="Magido Platinum Series rotary immersion aqueous parts washer"
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 1024px) 100vw, 384px"
                  priority
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── Comparison Guides ─── */}
      <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-10 text-center font-display text-3xl font-bold text-[var(--color-text)] lg:text-4xl">
            Comparison Guides
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {comparisons.map((s: Solution) => (
              <SolutionCard key={s.slug} solution={s} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Application Guides ─── */}
      <section className="border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-10 text-center font-display text-3xl font-bold text-[var(--color-text)] lg:text-4xl">
            Application Guides
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {useCases.map((s: Solution) => (
              <SolutionCard key={s.slug} solution={s} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Bottom CTA ─── */}
      <section className="bg-magido-blue px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
            Still have questions? We can help.
          </h2>
          <p className="mb-8 mt-4 text-lg text-blue-200">
            Our team works with industrial shops of all sizes to find the right cleaning solution.
          </p>
          <Link href="/contact" className="btn-primary">
            Contact Us <span className="btn-arrow">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

function SolutionCard({ solution }: { solution: Solution }) {
  return (
    <Link
      href={`/solutions/${solution.slug}`}
      className="solution-card group block rounded-xl border border-[var(--color-border)] bg-[var(--color-card-bg)] p-6 transition-shadow hover:shadow-md"
    >
      {/* Top row: badge + gear icon */}
      <div className="mb-3 flex items-center justify-between">
        <span className="inline-block rounded-full bg-magido-orange/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-widest text-magido-orange">
          {solution.type === 'comparison' ? 'Comparison Guide' : 'Application Guide'}
        </span>

        {/* Gear icon — spins in on hover */}
        <svg
          className="solution-card-gear h-6 w-6 flex-shrink-0 text-magido-orange"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
          <path d="M19.622 10.395l-1.097-2.65L20 6l-2-2-1.735 1.483-2.707-1.113L12.935 2h-1.954l-.632 2.401-2.645 1.115L6 4 4 6l1.453 1.789-1.08 2.657L2 11v2l2.401.655L5.516 16.3 4 18l2 2 1.791-1.46 2.606 1.072L11 22h2l.604-2.387 2.651-1.098C16.697 19.48 18 20 18 20l2-2-1.484-1.75 1.106-2.75L22 13v-2l-2.378-.605Z" />
        </svg>
      </div>

      {/* Title */}
      <h3 className="mb-2 font-display text-lg font-bold text-[var(--color-text)] transition-colors duration-200 group-hover:text-magido-orange">
        {solution.headline}
      </h3>

      {/* Excerpt */}
      <p className="line-clamp-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
        {solution.intro}
      </p>

      {/* CTA row */}
      <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-magido-orange">
        <span>Read Guide</span>
        <span className="solution-card-arrow">→</span>
      </div>
    </Link>
  );
}
