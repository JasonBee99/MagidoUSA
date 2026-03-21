// Phase 8 update — built 2026-03-10T13:59:08Z
'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Solution, SolutionProduct } from '@/types/solutions';

// Maps seriesSlug → short badge label shown on product cards
const SERIES_BADGE: Record<string, string> = {
  'x51':      'X51',
  'x51hp':    'X51HP',
  'x51-2':    'X51/2',
  'x81':      'X81',
  'x53':      'X53',
  'x53-2':    'X53/2',
  'gold-1b':  'Gold 1b',
  'gold-2b':  'Gold 2b',
  'silver':   'Silver',
  'dg':       'DG',
  'l':        'L',
  'hp':       'HP',
  'eco':      'Eco',
  'agita':    'Agita',
  'jolly':    'Jolly',
  'spira-1b': 'Spira 1b',
  'spira-2b': 'Spira 2b',
  'platinum': 'Platinum',
  'fls':      'FLS',
};

interface SolutionPageProps {
  solution: Solution;
  relatedProducts: SolutionProduct[];
}

export default function SolutionPage({ solution, relatedProducts }: SolutionPageProps) {
  const isComparison = solution.type === 'comparison';

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>

      {/* ── Hero ── */}
      <section className="hero-bg py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm" aria-label="Breadcrumb">
            <Link href="/" className="hover:underline" style={{ color: 'var(--color-text-secondary)' }}>
              Home
            </Link>
            <span style={{ color: 'var(--color-text-muted)' }}>/</span>
            <Link href="/solutions" className="hover:underline" style={{ color: 'var(--color-text-secondary)' }}>
              Solutions
            </Link>
            <span style={{ color: 'var(--color-text-muted)' }}>/</span>
            <span style={{ color: 'var(--color-text-muted)' }}>{solution.title}</span>
          </nav>

          {/* Badge */}
          <div className="mb-4">
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ backgroundColor: '#EB6C1C20', color: '#EB6C1C' }}
            >
              {isComparison ? 'Comparison Guide' : 'Application Guide'}
            </span>
          </div>

          {/* Title — full width */}
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-8"
            style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}
          >
            {solution.headline}
          </h1>

          {/* Below title: text left, image right */}
          <div className={`flex flex-col gap-8 ${solution.heroImage ? 'lg:flex-row lg:items-start lg:gap-12' : ''}`}>
            {/* Intro text */}
            <div className="flex-1 min-w-0">
              <p
                className="text-lg md:text-xl leading-relaxed"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {solution.intro}
              </p>
            </div>

            {/* Hero image — optional */}
            {solution.heroImage && (
              <div className="w-full flex-shrink-0 lg:w-80 xl:w-96">
                <div className="relative overflow-hidden rounded-xl border border-magido-orange/30" style={{ height: '18em' }}>
                  <Image
                    src={solution.heroImage}
                    alt={solution.heroImageAlt ?? solution.title}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 384px"
                    priority
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Article body */}
            <div className="lg:col-span-2 space-y-10">
              {solution.sections.map((section, idx) => (
                <div key={idx}>
                  <h2
                    className="text-xl md:text-2xl font-bold mb-4 pl-3 border-l-4"
                    style={{
                      fontFamily: 'var(--font-display)',
                      borderLeftColor: '#EB6C1C', background: 'transparent',
                      color: 'var(--color-text)',
                    }}
                  >
                    {section.heading}
                  </h2>
                  {section.contentHtml ? (
                    <div
                      className="leading-relaxed mb-4 last:mb-0 space-y-4"
                      style={{ color: 'var(--color-text)' }}
                      dangerouslySetInnerHTML={{ __html: section.contentHtml }}
                    />
                  ) : (
                    section.content.split('\n\n').map((para, pIdx) => (
                      <p
                        key={pIdx}
                        className="leading-relaxed mb-4 last:mb-0"
                        style={{ color: 'var(--color-text)' }}
                      >
                        {para}
                      </p>
                    ))
                  )}
                </div>
              ))}

              {/* Comparison Table */}
              {solution.comparisonTable && (
                <div>
                  <h2
                    className="text-xl md:text-2xl font-bold mb-6 pl-3 border-l-4"
                    style={{
                      fontFamily: 'var(--font-display)',
                      borderLeftColor: '#EB6C1C', background: 'transparent',
                      color: 'var(--color-text)',
                    }}
                  >
                    Side-by-Side Comparison
                  </h2>
                  <div className="overflow-x-auto rounded-xl border" style={{ borderColor: 'var(--color-border)' }}>
                    <table className="w-full text-sm">
                      <thead>
                        <tr style={{ backgroundColor: '#315687' }}>
                          {solution.comparisonTable.headers.map((h, i) => (
                            <th
                              key={i}
                              className="px-4 py-3 text-left font-semibold text-white"
                              style={{ textAlign: i === 0 ? 'left' : 'center' }}
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {solution.comparisonTable.rows.map((row, rIdx) => (
                          <tr
                            key={rIdx}
                            style={{
                              backgroundColor: rIdx % 2 === 0 ? 'var(--color-card-bg)' : 'var(--color-bg-secondary)',
                            }}
                          >
                            {row.map((cell, cIdx) => (
                              <td
                                key={cIdx}
                                className="px-4 py-3 border-t"
                                style={{
                                  borderColor: 'var(--color-border)',
                                  fontWeight: cIdx === 0 ? 600 : 400,
                                  color: 'var(--color-text)',
                                  textAlign: cIdx === 0 ? 'left' : 'center',
                                }}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Verdict / Summary */}
              {solution.verdict && (
                <div
                  className="rounded-xl p-6 border-l-4"
                  style={{
                    backgroundColor: 'var(--color-bg-secondary)',
                    borderLeftColor: '#315687',
                  }}
                >
                  <h3
                    className="text-lg font-bold mb-3"
                    style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}
                  >
                    Bottom Line
                  </h3>
                  <p className="leading-relaxed" style={{ color: 'var(--color-text)' }}>
                    {solution.verdict}
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">

              {/* Key Benefits */}
              {solution.keyBenefits && solution.keyBenefits.length > 0 && (
                <div
                  className="rounded-xl p-6 border"
                  style={{ backgroundColor: 'var(--color-card-bg)', borderColor: 'var(--color-border)' }}
                >
                  <h3
                    className="text-base font-bold mb-4"
                    style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}
                  >
                    Key Benefits
                  </h3>
                  <ul className="space-y-3">
                    {solution.keyBenefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span
                          className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold"
                          style={{ backgroundColor: '#EB6C1C' }}
                          aria-hidden="true"
                        >
                          ✓
                        </span>
                        <span className="text-sm leading-snug" style={{ color: 'var(--color-text)' }}>
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA Card */}
              <div
                className="rounded-xl p-6 border"
                style={{ backgroundColor: '#315687', borderColor: '#315687' }}
              >
                <h3 className="text-base font-bold mb-3 text-white" style={{ fontFamily: 'var(--font-display)' }}>
                  {solution.ctaHeading}
                </h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: '#cbd5e1' }}>
                  {solution.ctaText}
                </p>
                <Link
                  href="/contact"
                  className="block w-full text-center text-sm font-semibold py-3 px-4 rounded-lg transition-all duration-150"
                  style={{ backgroundColor: '#EB6C1C', color: 'white' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#c95a14')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#EB6C1C')}
                >
                  Request a Consultation
                </Link>
                <Link
                  href="/contact#evaluation"
                  className="block w-full text-center text-sm font-semibold py-3 px-4 rounded-lg mt-3 transition-all duration-150"
                  style={{ border: '1px solid rgba(255,255,255,0.4)', color: 'white', backgroundColor: 'transparent' }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = '#315687'; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'white'; }}
                >
                  Request an Evaluation Unit
                </Link>
                <Link
                  href="/resources/catalog"
                  className="block w-full text-center text-sm font-semibold py-3 px-4 rounded-lg mt-3 transition-all duration-150"
                  style={{ border: '1px solid rgba(255,255,255,0.4)', color: 'white', backgroundColor: 'transparent' }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = '#315687'; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'white'; }}
                >
                  View Product Catalog
                </Link>
              </div>

              {/* Solutions Index */}
              <div
                className="rounded-xl p-6 border"
                style={{ backgroundColor: 'var(--color-card-bg)', borderColor: 'var(--color-border)' }}
              >
                <h3
                  className="text-sm font-bold mb-4 uppercase tracking-wide"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  More Guides
                </h3>
                <ul className="space-y-1 text-sm">
                  {[
                    { href: '/solutions/aqueous-vs-solvent-parts-washers', label: 'Aqueous vs. Solvent Washers' },
                    { href: '/solutions/spray-cabinet-vs-immersion-parts-washers', label: 'Spray Cabinet vs. Immersion' },
                    { href: '/solutions/aisi-304-stainless-steel-parts-washers', label: 'AISI 304 Stainless Steel' },
                    { href: '/solutions/cleaning-brake-components', label: 'Cleaning Brake Components' },
                    { href: '/solutions/removing-cutting-oil-and-coolant', label: 'Removing Cutting Oil & Coolant' },
                    { href: '/solutions/industrial-parts-washing-for-mro', label: 'Parts Washing for MRO' },
                  ].map(({ href, label }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150"
                        style={{ color: '#315687', backgroundColor: 'transparent' }}
                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#315687'; e.currentTarget.style.color = 'white'; }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#315687'; }}
                      >
                        <span style={{ color: '#EB6C1C', flexShrink: 0 }}>›</span>
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Related Products ── */}
      {relatedProducts.length > 0 && (
        <section className="py-12 md:py-16" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              className="text-2xl md:text-3xl font-bold mb-8 pl-3 border-l-4"
              style={{
                fontFamily: 'var(--font-display)',
                borderLeftColor: '#EB6C1C', background: 'transparent',
                color: 'var(--color-text)',
              }}
            >
              {solution.relatedProductHeading}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {relatedProducts.map((product) => (
                <Link
                  key={product.slug}
                  href={product.url}
                  className="group block rounded-xl border overflow-hidden transition-shadow hover:shadow-lg"
                  style={{ backgroundColor: 'var(--color-card-bg)', borderColor: 'var(--color-border)' }}
                >
                  {product.images && product.images[0] && (
                    <div className="relative h-40 product-card-image-bg">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-contain p-3"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      {SERIES_BADGE[product.seriesSlug] && (
                        <span
                          className="absolute top-0 left-0 text-2xs font-semibold uppercase tracking-wider px-2 py-1"
                          style={{
                            backgroundColor: '#EB6C1C',
                            color: '#ffffff',
                            borderBottomRightRadius: '0.375rem',
                          }}
                        >
                          {SERIES_BADGE[product.seriesSlug]}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="p-4">
                    <p
                      className="text-sm font-medium leading-snug group-hover:underline"
                      style={{ color: 'var(--color-text)' }}
                    >
                      {product.name}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/resources/catalog"
                className="inline-block text-sm font-semibold px-6 py-3 rounded-lg border-2 transition-colors"
                style={{ borderColor: '#315687', color: '#315687' }}
              >
                View Full Product Catalog →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Bottom CTA Banner ── */}
      <section className="py-12 md:py-16" style={{ backgroundColor: '#315687' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-2xl md:text-3xl font-bold text-white mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Ready to Find the Right Washer for Your Operation?
          </h2>
          <p className="mb-8 text-lg" style={{ color: '#cbd5e1' }}>
            Our team can help you match the right Magido model to your specific parts, contaminants, and throughput requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block font-semibold py-3 px-8 rounded-lg transition-colors"
              style={{ backgroundColor: '#EB6C1C', color: 'white' }}
            >
              Contact Us
            </Link>
            <Link
              href="/resources/catalog"
              className="inline-block font-semibold py-3 px-8 rounded-lg border-2 border-white text-white hover:bg-white/10 transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
