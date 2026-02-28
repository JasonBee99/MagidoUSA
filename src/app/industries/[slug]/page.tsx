import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ArrowRight, Phone } from 'lucide-react';
import { getIndustryPage, getAllIndustrySlugs, industryPages } from '@/data/industries';

export function generateStaticParams() {
  return getAllIndustrySlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = getIndustryPage(params.slug);
  if (!page) return {};
  return { title: page.metaTitle + ' | Magido USA', description: page.metaDescription };
}

export default function IndustryPageRoute({ params }: { params: { slug: string } }) {
  const page = getIndustryPage(params.slug);
  if (!page) notFound();

  return (
    <>
      <nav className="border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-3 sm:px-6 lg:px-8" aria-label="Breadcrumb">
        <div className="mx-auto flex max-w-7xl items-center gap-2 text-sm">
          <Link href="/" className="text-[var(--color-text-muted)] transition-colors hover:text-magido-orange">Home</Link>
          <ChevronRight className="h-3.5 w-3.5 text-[var(--color-text-muted)]" />
          <Link href="/industries" className="text-[var(--color-text-muted)] transition-colors hover:text-magido-orange">Industries</Link>
          <ChevronRight className="h-3.5 w-3.5 text-[var(--color-text-muted)]" />
          <span className="font-medium text-[var(--color-text)]">{page.name}</span>
        </div>
      </nav>

      <section className="hero-bg px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="font-display text-sm font-semibold uppercase tracking-widest text-magido-orange">Industry Solutions</p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">Parts Washers for {page.name}</h1>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-3xl">
          <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]">{page.intro}</p>

          <div className="mt-10 space-y-8">
            {page.sections.map((section, i) => (
              <div key={i}>
                <h2 className="font-display text-xl font-bold text-[var(--color-text)]">{section.heading}</h2>
                <p className="mt-2 text-base leading-relaxed text-[var(--color-text-secondary)]">{section.content}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-sm font-medium text-[var(--color-text-secondary)]">{page.cta}</div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg bg-magido-orange px-6 py-3 text-sm font-semibold text-white hover:bg-magido-orange-dark">Request a Quote <ArrowRight className="h-4 w-4" /></Link>
            <a href="tel:8444624436" className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-6 py-3 text-sm font-semibold text-[var(--color-text)] hover:bg-[var(--color-bg-secondary)]"><Phone className="h-4 w-4" /> 844-4MA-GIDO</a>
          </div>

          <div className="mt-14 border-t border-[var(--color-border)] pt-8">
            <h3 className="font-display text-lg font-bold text-[var(--color-text)]">Other Industries</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {industryPages.filter((p) => p.slug !== params.slug).map((p) => (
                <Link key={p.slug} href={`/industries/${p.slug}`} className="rounded-lg border border-[var(--color-border)] px-3 py-1.5 text-sm text-[var(--color-text-secondary)] transition-colors hover:border-magido-orange/30 hover:text-magido-orange">{p.name}</Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
