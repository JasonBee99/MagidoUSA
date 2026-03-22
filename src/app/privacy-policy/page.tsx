import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Droplets } from 'lucide-react';
import { privacyPolicyData } from '@/data/privacy-policy';

export const metadata: Metadata = {
  title: 'Privacy Policy | Magido USA',
  description: 'Privacy policy for magidousa.com — how we collect, use, and protect your information.',
  alternates: { canonical: 'https://magidousa.com/privacy-policy' },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* ─── Breadcrumb ─── */}
      <nav className="border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-3 sm:px-6 lg:px-8" aria-label="Breadcrumb">
        <div className="mx-auto flex max-w-7xl items-center gap-2 text-sm">
          <Link href="/" className="text-[var(--color-text-muted)] hover:text-magido-orange">Home</Link>
          <ChevronRight className="h-3.5 w-3.5 text-[var(--color-text-muted)]" />
          <span className="font-medium text-[var(--color-text)]">Privacy Policy</span>
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
              Privacy Policy
            </h1>
            <p className="mt-4 text-justify text-base leading-relaxed text-gray-300">
              Magido USA is committed to protecting your privacy. This policy explains what information we collect when you visit magidousa.com, how we use it, and your rights.
            </p>
            <p className="mt-3 text-sm text-white/40">Last updated: {privacyPolicyData.lastUpdated}</p>
          </div>
        </div>
      </section>

      {/* ─── Body ─── */}
      <article className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-3xl space-y-8 text-[var(--color-text-secondary)] leading-relaxed">
          {privacyPolicyData.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-2xl font-bold text-[var(--color-text)]">{section.heading}</h2>
              {section.paragraphs.map((p, i) => (
                <p key={i} className="mt-3 text-justify">{p}</p>
              ))}
            </section>
          ))}
        </div>
      </article>
    </>
  );
}
