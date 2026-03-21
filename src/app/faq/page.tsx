import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Droplets } from 'lucide-react';
import { faqCategories, getAllFaqItems } from '@/data/faq';

export const metadata: Metadata = {
  title: 'Aqueous Parts Washer FAQ | Magido USA — Common Questions Answered',
  description:
    'Aqueous parts washer FAQ: spray cabinet, immersion, belt conveyor, rotary drum, and manual. Cutting oil and coolant removal, detergents, operation, lead times.',
  alternates: {
    canonical: 'https://magidousa.com/faq',
  },
  openGraph: {
    title: 'Aqueous Parts Washer FAQ | Magido USA',
    description:
      'Common questions about Magido USA aqueous parts washers — product selection, operation, construction, detergents, lead times, and more.',
    url: 'https://magidousa.com/faq',
    images: [{ url: 'https://magidousa.com/images/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aqueous Parts Washer FAQ | Magido USA',
    description:
      'Common questions about aqueous parts washers — product selection, operation, construction, detergents, and more.',
  },
};

export default function FaqPage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="hero-bg py-16 text-white lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-6 flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="transition-colors hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-gray-300">FAQ</span>
          </nav>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
            {/* Text */}
            <div className="flex-1 min-w-0">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-magido-orange/30 bg-magido-orange/10 px-4 py-1.5 text-sm font-medium text-magido-orange">
                <Droplets className="h-3.5 w-3.5" aria-hidden="true" />
                Aqueous Parts Washer FAQ
              </div>
              <h1 className="font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl lg:text-5xl">
                Frequently Asked Questions
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">
                Common questions about Magido USA industrial aqueous parts washers — stainless steel spray cabinet, immersion, belt conveyor, rotary drum, and manual parts washers. Water-based parts washer selection, operation, detergents, removing cutting oil and coolant from machined parts, <a href="/solutions/aisi-304-stainless-steel-parts-washers" className="text-magido-orange hover:text-magido-blue font-medium">AISI 304 stainless steel</a> construction, made in Italy.
              </p>
            </div>
            {/* Image */}
            <div className="w-full flex-shrink-0 lg:w-80 xl:w-96">
              <div className="product-halo relative h-52 w-full lg:h-60">
                <Image
                  src="/images/about/magido-parts-washer.webp"
                  alt="Magido stainless steel industrial aqueous parts washers"
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

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">

        {/* ─── Category nav ─── */}
        <nav className="mb-12 flex flex-wrap gap-2" aria-label="FAQ categories">
          {faqCategories.map((cat) => (
            <a
              key={cat.slug}
              href={`#${cat.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-1.5 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:border-magido-orange hover:text-magido-orange"
            >
              <span>{cat.icon}</span>
              {cat.heading}
            </a>
          ))}
        </nav>

        {/* ─── FAQ Categories ─── */}
        <div className="space-y-16">
          {faqCategories.map((cat) => (
            <section key={cat.slug} id={cat.slug} className="scroll-mt-24">
              <div className="mb-6 flex items-center gap-3">
                <span className="text-2xl">{cat.icon}</span>
                <h2 className="font-display text-xl font-bold text-[var(--color-text)] sm:text-2xl">
                  {cat.heading}
                </h2>
              </div>

              <dl className="space-y-3">
                {cat.items.map((item) => (
                  <details
                    key={item.id}
                    id={item.id}
                    className="group scroll-mt-24 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-card-bg)] transition-shadow hover:shadow-md"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 sm:px-6">
                      <dt className="text-sm font-semibold text-[var(--color-text)] sm:text-base">
                        {item.question}
                      </dt>
                      {/* Chevron icon — rotates when open */}
                      <span className="flex-shrink-0 text-magido-orange transition-transform duration-200 group-open:rotate-180">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-5 w-5"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </summary>
                    <dd
                      className="prose prose-sm dark:prose-invert max-w-none border-t border-[var(--color-border)] px-5 pb-5 pt-4 sm:px-6"
                      dangerouslySetInnerHTML={{ __html: item.answer }}
                    />
                  </details>
                ))}
              </dl>
            </section>
          ))}
        </div>

        {/* ─── Bottom CTA ─── */}
        <div className="mt-16 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-8 text-center">
          <h2 className="font-display text-xl font-bold text-[var(--color-text)]">
            Still have questions?
          </h2>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Talk to Scott Morin — free consultation, prompt response.
          </p>
          <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex rounded-lg bg-magido-orange px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-magido-orange-dark"
            >
              Contact Us
            </Link>
            <a
              href="tel:8444624436"
              className="inline-flex rounded-lg border border-magido-blue px-6 py-2.5 text-sm font-semibold text-magido-blue transition-colors hover:bg-magido-blue hover:text-white dark:border-[var(--color-border)] dark:text-[var(--color-text-secondary)] dark:hover:bg-[var(--color-bg-tertiary)]"
            >
              <span aria-hidden="true">📞</span> 844-462-4436
            </a>
          </div>
        </div>
      </div>

      {/* ─── FAQ JSON-LD schema ─── */}
      <FaqJsonLd />
    </>
  );
}

function FaqJsonLd() {
  const items = getAllFaqItems();
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        // Strip HTML tags for schema text
        text: item.answer.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(),
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
