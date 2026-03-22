import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Droplets, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { privacyPolicy } from '@/data/privacy-policy';
import { PrivacyPolicySectionNav } from '@/components/PrivacyPolicySectionNav';

export const metadata: Metadata = {
  title: privacyPolicy.meta.title,
  description: privacyPolicy.meta.description,
  alternates: {
    canonical: privacyPolicy.meta.canonical,
  },
  openGraph: {
    title: privacyPolicy.meta.title,
    description: privacyPolicy.meta.description,
    url: privacyPolicy.meta.canonical,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  const { hero, intro, sections, meta } = privacyPolicy;

  return (
    <>
      {/* ─── Breadcrumb ─── */}
      <nav
        className="border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Breadcrumb"
      >
        <div className="mx-auto flex max-w-7xl items-center gap-2 text-sm">
          <Link href="/" className="text-[var(--color-text-muted)] transition-colors hover:text-magido-orange">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-[var(--color-text-muted)]" />
          <span className="font-medium text-[var(--color-text)]">Privacy Policy</span>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="hero-bg px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-magido-orange/30 bg-magido-orange/10 px-4 py-1.5 text-sm font-medium text-magido-orange">
              <Droplets className="h-3.5 w-3.5" aria-hidden="true" />
              {hero.badge}
            </div>

            <h1 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
              {hero.heading}
            </h1>

            {/* Subtitle with lines */}
            <div className="mt-3 flex items-center gap-3">
              <div className="h-px w-12 bg-magido-orange/30" />
              <p className="shrink-0 font-display text-base font-medium text-magido-orange">
                {hero.subtitle}
              </p>
              <div className="h-px flex-1 max-w-[8rem] bg-magido-orange/30" />
            </div>

            <p className="mt-4 text-justify text-base leading-relaxed text-gray-300">
              {hero.description}
            </p>

            <p className="mt-3 text-sm text-white/40">
              Last updated: {meta.lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* ─── Sticky section nav ─── */}
      <PrivacyPolicySectionNav
        sections={sections.map((s) => ({ id: s.id, heading: s.heading }))}
      />

      {/* ─── Body ─── */}
      <article className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-3xl">

          {/* Intro */}
          <p className="text-justify text-sm leading-relaxed text-[var(--color-text-secondary)]">
            {intro}
          </p>

          {/* Sections */}
          <div className="mt-10 space-y-12">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <h2 className="font-display text-xl font-bold text-[var(--color-text)] lg:text-2xl">
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4">
                  {section.content.map((block, i) => (
                    <div key={i}>
                      {block.subheading && (
                        <h3 className="mb-1 font-display text-sm font-semibold uppercase tracking-wider text-magido-orange">
                          {block.subheading}
                        </h3>
                      )}
                      <p className="text-justify text-sm leading-relaxed text-[var(--color-text-secondary)]">
                        {block.body}
                      </p>
                    </div>
                  ))}

                  {/* Optional bullet list */}
                  {'list' in section && section.list && (
                    <ul className="mt-2 space-y-1.5 pl-4">
                      {section.list.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm leading-relaxed text-[var(--color-text-secondary)]"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-magido-orange" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Post-list paragraph */}
                  {'postList' in section && section.postList && (
                    <p className="text-justify text-sm leading-relaxed text-[var(--color-text-secondary)]">
                      {section.postList}
                    </p>
                  )}

                  {/* Contact block */}
                  {'contactBlock' in section && section.contactBlock && (
                    <div className="mt-4 rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-6">
                      <p className="font-display text-sm font-semibold text-[var(--color-text)]">
                        {section.contactBlock.company}
                      </p>
                      <div className="mt-3 space-y-2">
                        <div className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
                          <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-magido-orange" />
                          {section.contactBlock.address}
                        </div>
                        <a
                          href={`mailto:${section.contactBlock.email}`}
                          className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] transition-colors hover:text-magido-orange"
                        >
                          <Mail className="h-4 w-4 flex-shrink-0 text-magido-orange" />
                          {section.contactBlock.email}
                        </a>
                        <a
                          href="tel:8444624436"
                          className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] transition-colors hover:text-magido-orange"
                        >
                          <Phone className="h-4 w-4 flex-shrink-0 text-magido-orange" />
                          {section.contactBlock.phone}
                        </a>
                        <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                          <Clock className="h-4 w-4 flex-shrink-0 text-magido-orange" />
                          {section.contactBlock.hours}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            ))}
          </div>

          {/* Bottom nav */}
          <div className="mt-12 flex flex-wrap gap-4 border-t border-[var(--color-border)] pt-8 text-sm text-[var(--color-text-muted)]">
            <Link href="/" className="transition-colors hover:text-magido-orange">← Back to Home</Link>
            <Link href="/contact" className="transition-colors hover:text-magido-orange">Contact Us</Link>
          </div>
        </div>
      </article>
    </>
  );
}
