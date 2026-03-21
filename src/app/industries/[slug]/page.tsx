// src/app/industries/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { INDUSTRIES, getIndustry } from '@/data/industries';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import type { Metadata } from 'next';

// ─── Static params ────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return INDUSTRIES.map((ind) => ({ slug: ind.slug }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const industry = getIndustry(params.slug);
  if (!industry) return {};
  return {
    title: `${industry.name} Parts Washing Solutions | Magido USA`,
    description: industry.metaDescription,
    alternates: {
      canonical: `https://magidousa.com/industries/${industry.slug}`,
    },
    openGraph: {
      title: `${industry.name} Parts Washing Solutions | Magido USA`,
      description: industry.metaDescription,
      url: `https://magidousa.com/industries/${industry.slug}`,
      images: [{ url: 'https://magidousa.com/images/og-default.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${industry.name} Parts Washing Solutions | Magido USA`,
      description: industry.metaDescription,
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function IndustryPage({ params }: { params: { slug: string } }) {
  const industry = getIndustry(params.slug);
  if (!industry) notFound();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Industries', url: '/industries' },
          { name: industry.name, url: `/industries/${industry.slug}` },
        ]}
      />

      {/* ─── Hero ─── */}
      <section className="border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <nav className="mb-6 flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
            <Link href="/" className="hover:text-magido-orange transition-colors">Home</Link>
            <span>/</span>
            <Link href="/industries" className="hover:text-magido-orange transition-colors">Industries</Link>
            <span>/</span>
            <span className="text-[var(--color-text)]">{industry.name}</span>
          </nav>

          <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-5xl" aria-hidden="true">{industry.icon}</span>
                <p className="font-display text-sm font-semibold uppercase tracking-widest text-magido-orange">
                  {industry.name}
                </p>
              </div>
              <h1 className="mt-4 font-display text-4xl font-bold uppercase tracking-tight text-[var(--color-text)] sm:text-5xl">
                {industry.tagline}
              </h1>
              <p className="mt-6 text-base leading-relaxed text-[var(--color-text-secondary)]">
                {industry.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-magido-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-magido-orange-dark"
                >
                  Talk to an Expert <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/how-to-choose"
                  className="inline-flex items-center gap-2 rounded-lg border border-magido-blue px-6 py-3 text-sm font-semibold text-magido-blue transition-colors hover:bg-magido-blue hover:text-white dark:border-[var(--color-border)] dark:text-[var(--color-text-secondary)] dark:hover:bg-[var(--color-bg-tertiary)]"
                >
                  How to Choose →
                </Link>
              </div>
            </div>

            {/* Stat callout */}
            <div className="mt-12 lg:mt-0">
              <div className="rounded-2xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-10 text-center shadow-sm">
                <p className="font-display text-6xl font-bold text-magido-blue">
                  {industry.heroStat.value}
                </p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
                  {industry.heroStat.label}
                </p>
                <p className="mt-6 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  Every Magido system is built entirely from <a href="/solutions/aisi-304-stainless-steel-parts-washers" className="text-magido-orange hover:text-magido-blue font-medium">AISI 304 stainless steel</a> — no painted surfaces, no hidden carbon steel, no compromises.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Challenges ─── */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="font-display text-sm font-semibold uppercase tracking-widest text-magido-orange">
            Industry Challenges
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight text-[var(--color-text)] sm:text-4xl">
            What Makes {industry.name} Cleaning Difficult
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {industry.challenges.map((c, i) => (
              <div
                key={c.title}
                className="rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-6"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-magido-blue/10 text-sm font-bold text-magido-blue ring-1 ring-magido-blue/20">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="mt-4 font-display text-sm font-bold text-[var(--color-text)]">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  {c.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Recommended Systems ─── */}
      <section className="border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="font-display text-sm font-semibold uppercase tracking-widest text-magido-orange">
            Recommended Systems
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight text-[var(--color-text)] sm:text-4xl">
            The Right Machine for {industry.name}
          </h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {industry.recommendedSystems.map((sys) => (
              <div
                key={sys.categorySlug}
                className="flex flex-col rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-6 transition-all hover:border-magido-orange/40 hover:shadow-lg"
              >
                <h3 className="font-display text-lg font-bold text-[var(--color-text)]">
                  {sys.categoryName}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)] flex-1">
                  {sys.reason}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {sys.seriesSlugs.map((s) => (
                    <Link
                      key={s}
                      href={`/products/${sys.categorySlug}?series=${s}-series`}
                      className="rounded-md bg-magido-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-magido-blue ring-1 ring-magido-blue/20 transition-colors hover:bg-magido-blue hover:text-white"
                    >
                      {s.toUpperCase()}
                    </Link>
                  ))}
                </div>
                <Link
                  href={`/products/${sys.categorySlug}`}
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-magido-orange transition-colors hover:text-magido-orange-dark"
                >
                  View {sys.categoryName} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Related Solutions ─── */}
      {industry.relatedSolutionSlugs.length > 0 && (
        <section className="border-t border-[var(--color-border)] px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="font-display text-sm font-semibold uppercase tracking-widest text-magido-orange">
              Related Solutions
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold text-[var(--color-text)]">
              Application Guides for {industry.name}
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {industry.relatedSolutionSlugs.map((slug) => (
                <Link
                  key={slug}
                  href={`/solutions/${slug}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-5 py-2.5 text-sm font-semibold text-[var(--color-text)] transition-colors hover:border-magido-orange/40 hover:text-magido-orange"
                >
                  {slugToTitle(slug)} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Other Industries ─── */}
      <section className="border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="font-display text-xs font-semibold uppercase tracking-wider text-magido-orange">
            Explore More
          </p>
          <h2 className="mt-1 font-display text-2xl font-bold text-[var(--color-text)]">
            Other Industries We Serve
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.filter((i) => i.slug !== industry.slug)
              .slice(0, 3)
              .map((ind) => (
                <Link
                  key={ind.slug}
                  href={`/industries/${ind.slug}`}
                  className="group flex items-center gap-4 rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-5 transition-all hover:border-magido-orange/40 hover:shadow-md"
                >
                  <span className="text-3xl" aria-hidden="true">{ind.icon}</span>
                  <div>
                    <h3 className="font-display text-sm font-bold text-[var(--color-text)] transition-colors group-hover:text-magido-orange">
                      {ind.name}
                    </h3>
                    <p className="mt-0.5 text-xs text-[var(--color-text-secondary)]">
                      {ind.tagline}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="border-t border-[var(--color-border)] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-xl font-bold text-[var(--color-text)]">
            Ready to solve your {industry.name.toLowerCase()} cleaning challenge?
          </h2>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Talk to Scott Morin — free consultation, same-day response.
          </p>
          <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="btn-quote"
            >
              Request a Quote
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

// ─── Helper ───────────────────────────────────────────────────────────────────
function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}
