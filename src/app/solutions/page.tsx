import Link from 'next/link';
import type { Metadata } from 'next';
import type { Solution, SolutionsData } from '@/types/solutions';
import solutionsData from '@/data/solutions.json';

const { solutions } = solutionsData as SolutionsData;

export const metadata: Metadata = {
  title: 'Aqueous Parts Washer Guides & Solutions | Magido USA',
  description:
    'Industrial aqueous parts washer guides — aqueous vs solvent parts washers, spray cabinet vs immersion, removing cutting oil and coolant, cleaning machined parts for automotive, aerospace, and machining. Stainless steel water-based parts cleaning systems, made in Italy.',
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
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>

      {/* Hero */}
      <section className="hero-bg py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-6 flex items-center gap-2 text-sm" aria-label="Breadcrumb">
            <Link href="/" className="hover:underline" style={{ color: 'var(--color-text-secondary)' }}>
              Home
            </Link>
            <span style={{ color: 'var(--color-text-muted)' }}>/</span>
            <span style={{ color: 'var(--color-text-muted)' }}>Solutions</span>
          </nav>
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}
          >
            Parts Washing Solutions &amp; Guides
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl leading-relaxed"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Practical guides to choosing the right industrial aqueous parts washer — AISI 304 stainless steel spray cabinet, immersion, belt conveyor, rotary drum, and manual parts washers. Water-based parts washer vs solvent, cutting oil and coolant removal, machined parts cleaning for automotive, aerospace, and machining.
          </p>
        </div>
      </section>

      {/* Comparison Guides */}
      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-2xl font-bold mb-8"
            style={{ color: '#315687', fontFamily: 'var(--font-display)' }}
          >
            Comparison Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {comparisons.map((s: Solution) => (
              <SolutionCard key={s.slug} solution={s} />
            ))}
          </div>
        </div>
      </section>

      {/* Application Guides */}
      <section className="py-12 md:py-16" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-2xl font-bold mb-8"
            style={{ color: '#315687', fontFamily: 'var(--font-display)' }}
          >
            Application Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((s: Solution) => (
              <SolutionCard key={s.slug} solution={s} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 md:py-16" style={{ backgroundColor: '#315687' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-2xl md:text-3xl font-bold text-white mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Still have questions? We can help.
          </h2>
          <p className="mb-8 text-lg" style={{ color: '#cbd5e1' }}>
            Our team works with industrial shops of all sizes to find the right cleaning solution.
          </p>
          <Link
            href="/contact"
            className="btn-primary"
          >
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
      className="solution-card group block rounded-xl border p-6"
      style={{ backgroundColor: 'var(--color-card-bg)', borderColor: 'var(--color-border)' }}
    >
      {/* Top row: badge + gear icon */}
      <div className="mb-3 flex items-center justify-between">
        <span
          className="inline-block text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
          style={{ backgroundColor: '#EB6C1C20', color: '#EB6C1C' }}
        >
          {solution.type === 'comparison' ? 'Comparison Guide' : 'Application Guide'}
        </span>

        {/* Gear icon — spins in on hover */}
        <svg
          className="solution-card-gear h-6 w-6 flex-shrink-0"
          style={{ color: '#EB6C1C' }}
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

      {/* Title — turns orange on hover */}
      <h3
        className="text-lg font-bold mb-2 transition-colors duration-200 group-hover:text-[#EB6C1C]"
        style={{ color: '#315687', fontFamily: 'var(--font-display)' }}
      >
        {solution.headline}
      </h3>

      {/* Excerpt */}
      <p
        className="text-sm leading-relaxed line-clamp-3"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {solution.intro}
      </p>

      {/* CTA row */}
      <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold" style={{ color: '#EB6C1C' }}>
        <span>Read Guide</span>
        <span className="solution-card-arrow">→</span>
      </div>
    </Link>
  );
}
