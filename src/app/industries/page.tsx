import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ArrowRight, Factory } from 'lucide-react';
import { industryPages } from '@/data/industries';

export const metadata: Metadata = {
  title: 'Industries We Serve — Aqueous Parts Washing Solutions',
  description: 'Magido aqueous parts washers serve automotive, aerospace, machining, heavy equipment, medical device, and food processing industries.',
  alternates: {
    canonical: 'https://www.magidousa.com/industries',
  },
};

export default function IndustriesPage() {
  return (
    <>
      <nav className="border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-3 sm:px-6 lg:px-8" aria-label="Breadcrumb">
        <div className="mx-auto flex max-w-7xl items-center gap-2 text-sm">
          <Link href="/" className="text-[var(--color-text-muted)] transition-colors hover:text-magido-orange">Home</Link>
          <ChevronRight className="h-3.5 w-3.5 text-[var(--color-text-muted)]" />
          <span className="font-medium text-[var(--color-text)]">Industries</span>
        </div>
      </nav>

      <section className="hero-bg px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="font-display text-sm font-semibold uppercase tracking-widest text-magido-orange">Industry Solutions</p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">Industries We Serve</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">Magido aqueous parts washers are at work across a wide range of industries. Find your application.</p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-6 sm:grid-cols-2">
            {industryPages.map((ind) => (
              <Link key={ind.slug} href={`/industries/${ind.slug}`} className="group rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-6 transition-all hover:border-magido-orange/30 hover:shadow-lg">
                <Factory className="h-8 w-8 text-magido-orange opacity-70" />
                <h2 className="mt-3 font-display text-lg font-bold text-[var(--color-text)] transition-colors group-hover:text-magido-orange">{ind.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)] line-clamp-3">{ind.intro}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-magido-orange">Learn More <ArrowRight className="h-3.5 w-3.5" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
