import Link from 'next/link';
import type { Metadata } from 'next';
import type { Solution, SolutionsData } from '@/types/solutions';
import solutionsData from '@/data/solutions.json';

const { solutions } = solutionsData as SolutionsData;

export const metadata: Metadata = {
  title: 'Parts Washing Solutions & Guides',
  description:
    'Expert guides on aqueous parts washing — comparisons, application guides, and industry resources to help you choose the right parts washer for your operation.',
  alternates: { canonical: 'https://www.magidousa.com/solutions' },
  openGraph: {
    title: 'Parts Washing Solutions & Guides',
    description:
      'Expert guides on aqueous parts washing — comparisons, application guides, and industry resources to help you choose the right parts washer for your operation.',
    url: 'https://www.magidousa.com/solutions',
    images: [{ url: 'https://www.magidousa.com/images/og-default.png', width: 1200, height: 630 }],
  },
};

const typeLabels: Record<string, string> = {
  comparison: 'Comparison Guide',
  'use-case': 'Application Guide',
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
            Practical guides to help you choose the right parts washing technology — from side-by-side
            comparisons to application-specific recommendations.
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
            className="inline-block font-semibold py-3 px-8 rounded-lg"
            style={{ backgroundColor: '#EB6C1C', color: 'white' }}
          >
            Contact Us
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
      className="group block rounded-xl border p-6 transition-shadow hover:shadow-lg"
      style={{ backgroundColor: 'var(--color-card-bg)', borderColor: 'var(--color-border)' }}
    >
      <div className="mb-3">
        <span
          className="inline-block text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
          style={{ backgroundColor: '#EB6C1C20', color: '#EB6C1C' }}
        >
          {solution.type === 'comparison' ? 'Comparison Guide' : 'Application Guide'}
        </span>
      </div>
      <h3
        className="text-lg font-bold mb-2 group-hover:underline"
        style={{ color: '#315687', fontFamily: 'var(--font-display)' }}
      >
        {solution.headline}
      </h3>
      <p
        className="text-sm leading-relaxed line-clamp-3"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {solution.intro}
      </p>
      <div className="mt-4 text-sm font-semibold" style={{ color: '#EB6C1C' }}>
        Read Guide →
      </div>
    </Link>
  );
}
