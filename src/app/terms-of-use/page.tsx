import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Droplets } from 'lucide-react';
import { termsOfUseData } from '@/data/terms-of-use';

export const metadata: Metadata = {
  title: 'Terms of Use | Magido USA',
  description: 'Terms of use for magidousa.com — conditions governing your use of the Magido USA website.',
  alternates: { canonical: 'https://magidousa.com/terms-of-use' },
  robots: { index: true, follow: true },
};

export default function TermsOfUsePage() {
  return (
    <>
      {/* ─── Breadcrumb ─── */}
      <nav className="border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-3 sm:px-6 lg:px-8" aria-label="Breadcrumb">
        <div className="mx-auto flex max-w-7xl items-center gap-2 text-sm">
          <Link href="/" className="text-[var(--color-text-muted)] hover:text-magido-orange">Home</Link>
          <ChevronRight className="h-3.5 w-3.5 text-[var(--color-text-muted)]" />
          <span className="font-medium text-[var(--color-text)]">Terms of Use</span>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="hero-bg px-4 py-10 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-magido-orange/30 bg-magido-orange/10 px-4 py-1.5 text-sm font-medium text-magido-orange">
              <Droplets className="h-3.5 w-3.5" aria-hidden="true" />
              Legal
            </div>
            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Terms of Use
            </h1>
            <p className="mt-4 text-justify text-base leading-relaxed text-gray-300">
              These Terms of Use govern your access to and use of magidousa.com. Please read them carefully before using the Site.
            </p>
            <p className="mt-3 text-sm text-white/40">Last updated: {termsOfUseData.lastUpdated}</p>
          </div>
        </div>
      </section>

      {/* ─── Body ─── */}
      <article className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-3xl space-y-8 text-[var(--color-text-secondary)] leading-relaxed">
          {termsOfUseData.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-2xl font-bold text-[var(--color-text)]">{section.heading}</h2>
              {section.paragraphs.map((p, i) => (
                <p key={i} className="mt-3 text-justify">{p}</p>
              ))}
              {'contact' in section && section.contact && (
                <div className="mt-4 space-y-1.5 text-sm">
                  <p className="font-semibold text-[var(--color-text)]">{section.contact.company}</p>
                  <p>
                    <a href={section.contact.addressUrl} target="_blank" rel="noopener noreferrer" className="text-magido-orange hover:text-magido-blue">
                      {section.contact.addressText}
                    </a>
                  </p>
                  <p>
                    <a href={`mailto:${section.contact.email}`} className="text-magido-orange hover:text-magido-blue">
                      {section.contact.email}
                    </a>
                  </p>
                  <p>
                    <a href="tel:8444624436" className="text-magido-orange hover:text-magido-blue">
                      {section.contact.phone}
                    </a>
                  </p>
                  <p>{section.contact.hours}</p>
                </div>
              )}
            </section>
          ))}
        </div>
      </article>
    </>
  );
}
