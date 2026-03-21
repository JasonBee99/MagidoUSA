import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllCategories, getCategoryRepresentativeImage } from '@/lib/products';
import { Shield, Zap, Leaf, HeadphonesIcon, Clock, LayoutGrid, Layers, MapPin } from 'lucide-react';
import { HomeHero } from '@/components/HomeHero';

export const metadata: Metadata = {
  title: 'Magido USA — Industrial Aqueous Parts Washers | Stainless Steel, Made in Italy',
  description:
    'Industrial aqueous parts washers by Magido USA. Spray cabinet, immersion, belt conveyor, rotary drum, and manual. 75+ models, AISI 304, made in Italy.',
  alternates: {
    canonical: 'https://magidousa.com',
  },
  openGraph: {
    title: 'Magido USA — Industrial Aqueous Parts Washers | Stainless Steel, Made in Italy',
    description:
      '75+ aqueous parts washers and water-based cleaning systems — 100% AISI 304 stainless steel, made in Italy since 1980. Automotive, aerospace, machining, heavy equipment.',
    url: 'https://magidousa.com',
    images: [{ url: 'https://magidousa.com/images/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Magido USA — Industrial Aqueous Parts Washers | Stainless Steel, Made in Italy',
    description:
      '75+ aqueous parts washers — 100% AISI 304 stainless steel, made in Italy since 1980.',
  },
};

export default function HomePage() {
  const categories = getAllCategories();

  return (
    <>
      {/* Hero */}
      <HomeHero />

      {/* ─── Company Intro ─── */}
      <section className="relative overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">

        {/* Decorative background accents */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-magido-orange/5 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-magido-blue/5 blur-3xl" />
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[var(--color-border)] to-transparent lg:block" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">

            {/* ── Left: brand statement ── */}
            <div>
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 font-display text-sm font-semibold uppercase tracking-widest text-magido-orange transition-opacity hover:opacity-70"
              >
                About Magido USA
                <span className="btn-arrow">→</span>
              </Link>

              <h2 className="mt-3 text-center font-display text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-4xl lg:text-left">
                Stainless Steel<br />
                <span className="text-magido-orange">Industrial Cleaning</span><br />
                Technology
              </h2>

              <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-magido-orange lg:mx-0" />

              <p className="mt-6 text-justify text-base leading-relaxed text-[var(--color-text-secondary)]">
                Magido Group is recognized as one of the world&apos;s leading manufacturers of aqueous parts washing systems — engineering stainless steel industrial cleaning technology for automotive, aerospace, machining, and heavy equipment applications since 1980.
              </p>
              <p className="mt-3 text-justify text-base leading-relaxed text-[var(--color-text-secondary)]">
                Every system is built to order from <a href="/solutions/aisi-304-stainless-steel-parts-washers" className="font-medium text-magido-orange hover:text-magido-blue">AISI 304 stainless steel</a> with the flexibility to tailor wash, rinse, and drying stages to your exact process requirements. US sales and support based in Sturtevant, WI.
              </p>
              <p className="mt-3 text-justify text-sm leading-relaxed text-[var(--color-text-muted)]">
                Industrial aqueous parts washers for removing cutting oil, coolant, metallic fines, and machining residue — spray cabinet, immersion, belt conveyor, rotary drum, and manual parts washers. Water-based parts cleaning systems, made in Italy.
              </p>

              <div className="mt-8">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-magido-orange transition-opacity hover:opacity-70"
                >
                  Learn More About Magido <span className="btn-arrow">→</span>
                </Link>
              </div>
            </div>

            {/* ── Right: stat grid ── */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {COMPANY_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className={`rounded-xl border bg-[var(--color-card-bg)] p-6 shadow-sm ${
                    stat.italian
                      ? 'border-transparent bg-gradient-to-br from-[#009246]/10 via-[var(--color-card-bg)] to-[#CE2B37]/10 ring-1 ring-[var(--color-card-border)]'
                      : 'border-[var(--color-card-border)]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className={`font-display text-2xl font-bold sm:text-3xl ${stat.italian ? '' : 'text-magido-orange'}`}>
                      {stat.italian ? (
                        <span>
                          <span className="text-[#009246]">Ma</span>
                          <span className="text-[var(--color-text)]">de </span>
                          <span className="text-[var(--color-text)]">in </span>
                          <span className="text-[#CE2B37]">Italy</span>
                        </span>
                      ) : (
                        stat.value
                      )}
                    </div>
                    <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg ring-1 ${
                      stat.italian
                        ? 'bg-[#009246]/10 text-[#009246] ring-[#009246]/20'
                        : 'bg-magido-blue/10 text-magido-blue ring-magido-blue/20'
                    }`}>
                      {stat.icon}
                    </div>
                  </div>
                  <div className="mt-2 text-sm font-semibold text-[var(--color-text)]">
                    {stat.label}
                  </div>
                  <div className="mt-1 text-xs leading-relaxed text-[var(--color-text-secondary)]">
                    {stat.description}
                  </div>
                  {stat.italian && (
                    <div className="mt-3 flex h-1.5 overflow-hidden rounded-full">
                      <div className="flex-1 bg-[#009246]" />
                      <div className="flex-1 bg-white" />
                      <div className="flex-1 bg-[#CE2B37]" />
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ─── Built for Every Application ─── */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="font-display text-sm font-semibold uppercase tracking-widest text-magido-orange">
              Our Systems
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
              Built for Every Application
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-[var(--color-text-secondary)]">
              From sink-style manual washers to fully automated rotary immersion systems — Magido manufactures the right solution for your parts cleaning challenge.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((cat, index) => {
              const image = getCategoryRepresentativeImage(cat.slug);
              return (
                <Link
                  key={cat.slug}
                  href={`/products/${cat.slug}`}
                  className="group relative overflow-hidden rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] transition-all hover:border-magido-orange/40 hover:shadow-xl"
                >
                  {/* Number badge */}
                  <div className="absolute left-4 top-4 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-magido-blue/10 text-xs font-bold text-magido-blue ring-1 ring-magido-blue/20">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  {/* Category image */}
                  <div className="product-card-image-bg relative flex aspect-[4/3] items-center justify-center overflow-hidden">
                    {image ? (
                      <Image
                        src={image}
                        alt={cat.name}
                        fill
                        className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="text-[var(--color-text-muted)] opacity-30">
                        <svg className="h-16 w-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <path d="m21 15-5-5L5 21" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-display text-base font-semibold text-[var(--color-text)] transition-colors group-hover:text-magido-orange">
                      {cat.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)] line-clamp-2">
                      {cat.shortDescription}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs font-medium text-[var(--color-text-muted)]">
                        {cat.totalProducts} models • {cat.series.length} series
                      </span>
                      <span className="text-xs font-semibold text-magido-orange opacity-0 transition-opacity group-hover:opacity-100">
                        View Series →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── The Magido Difference ─── */}
      <section className="border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">

            {/* Left: heading + intro */}
            <div>
              {/* Lines + badge + lines */}
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-magido-orange/20" />
                <span className="shrink-0 font-display text-sm font-semibold uppercase tracking-widest text-magido-orange">
                  The Magido Difference
                </span>
                <div className="h-px flex-1 bg-magido-orange/20" />
              </div>
              <h2 className="mt-2 text-center font-display text-4xl font-bold uppercase tracking-tight text-[var(--color-text)] sm:text-5xl">
                Precision Engineered. Proven.
              </h2>
              <p className="mt-4 text-justify text-base leading-relaxed text-[var(--color-text-secondary)]">
                Through strategic planning, careful selection of quality materials, and a constant search for innovative solutions, Magido has earned the reputation of producing the highest quality and most competitive wash systems on the market.
              </p>
              <p className="mt-3 text-justify text-base leading-relaxed text-[var(--color-text-secondary)]">
                Our team is always attentive and willing to help before and after the sale — ensuring total flexibility in creating a tailor-made wash system for your maintenance or production parts cleaning operation.
              </p>
              <div className="mt-8">
                <Link href="/contact" className="btn-primary">
                  Talk to an Expert
                  <span className="btn-arrow">→</span>
                </Link>
              </div>
            </div>

            {/* Right: 4 value prop cards */}
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-0">
              <WhyCard
                icon={<Shield className="h-6 w-6" />}
                title="Unmatched Expertise"
                description="Decades of hands-on experience with personalized solutions for every application."
              />
              <WhyCard
                icon={<Zap className="h-6 w-6" />}
                title="Innovative Technology"
                description="Continuously advancing wash system design with the latest engineering methods."
              />
              <WhyCard
                icon={<Leaf className="h-6 w-6" />}
                title="Sustainable Solutions"
                description="Eco-friendly aqueous systems that minimize environmental impact without sacrificing performance."
              />
              <WhyCard
                icon={<HeadphonesIcon className="h-6 w-6" />}
                title="Full Lifecycle Support"
                description="Pre-sale consultation, installation, factory-trained technicians, and fast-ship replacement parts."
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Industries Served ─── */}
      <section className="border-t border-[var(--color-border)] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="font-display text-sm font-semibold uppercase tracking-widest text-magido-orange">
              Industries Served
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight text-[var(--color-text)] sm:text-4xl">
              We Serve the Toughest Sectors
            </h2>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((ind) => (
              <Link
                key={ind.slug}
                href={`/industries/${ind.slug}`}
                className="group flex items-start gap-5 rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-6 transition-all hover:border-magido-orange/40 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-magido-blue/10 text-2xl ring-1 ring-magido-blue/20 transition-colors group-hover:bg-magido-orange/10 group-hover:ring-magido-orange/30 sm:h-14 sm:w-14 sm:text-3xl" aria-hidden="true">
                  {ind.icon}
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-base font-semibold text-[var(--color-text)] transition-colors group-hover:text-magido-orange">
                    {ind.name}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    {ind.description}
                  </p>
                  <span className="mt-3 inline-block text-xs font-semibold text-magido-orange opacity-0 transition-opacity group-hover:opacity-100">
                    Find Your Solution →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── National Sales Manager ─── */}
      <section className="border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-2xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] shadow-sm">
            <div className="p-8 lg:p-12">
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">

                {/* ── Left: Identity + contact ── */}
                <div>
                  <div className="flex items-start gap-4">
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-xs font-semibold uppercase tracking-widest text-magido-orange">
                        National Sales Manager
                      </p>
                      <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[var(--color-text)] sm:text-3xl lg:text-4xl">
                        Scott Morin
                      </h2>
                      <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                        Global Parts Cleaning Manufacturer at Magido USA
                      </p>
                    </div>
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl ring-4 ring-magido-orange/20 sm:h-28 sm:w-28">
                      <Image
                        src="/images/scott-morin.webp"
                        alt="Scott Morin — National Sales Manager, Magido USA"
                        fill
                        className="object-cover object-top"
                        sizes="112px"
                      />
                    </div>
                  </div>

                  <p className="mt-5 text-justify text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    Contact Scott today — he wants to understand your parts cleaning challenges and recommend the right solution. Free consultation, same-day response.
                  </p>
                  <div className="mt-5 flex flex-row flex-wrap justify-center gap-2 lg:justify-start">
                    <Link
                      href="/contact"
                      className="btn-primary btn-sm"
                    >
                      Contact Scott →
                    </Link>
                    <a
                      href="tel:8444624436"
                      className="btn-secondary btn-secondary--static btn-sm"
                    >
                      📞 844-462-4436
                    </a>
                    <a
                      href="mailto:sales@magidousa.com"
                      className="btn-secondary btn-secondary--static btn-sm"
                    >
                      ✉️ Email Scott
                    </a>
                    <a
                      href="https://www.linkedin.com/in/toscottmorin/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary btn-secondary--static btn-sm hover:!text-[#0A66C2] hover:!border-[#0A66C2]"
                    >
                      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      LinkedIn
                    </a>
                  </div>
                </div>

                {/* ── Right: 2×2 service pillars ── */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {SCOTT_PILLARS.map((p) => (
                    <div key={p.title} className="flex flex-col gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-magido-blue/10 text-xl ring-1 ring-magido-blue/20" aria-hidden="true">
                        {p.icon}
                      </div>
                      <h3 className="mt-1 font-display text-sm font-bold text-[var(--color-text)]">
                        {p.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                        {p.description}
                      </p>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────

function WhyCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-magido-orange/30 bg-[var(--color-card-bg)] p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-magido-orange/10 text-magido-orange ring-1 ring-magido-orange/30">
          {icon}
        </div>
        <h3 className="text-center font-display text-lg font-bold leading-tight text-[var(--color-text)]">
          {title}
        </h3>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
        {description}
      </p>
    </div>
  );
}

// ─── Data ──────────────────────────────────────────────────────────────────

const COMPANY_STATS = [
  {
    value: '45+',
    label: 'Years of Innovation',
    description: 'Engineering aqueous parts washing systems since 1980.',
    icon: <Clock className="h-4 w-4" />,
  },
  {
    value: '75',
    label: 'Models Available',
    description: 'From compact manual stations to fully automated conveyor systems.',
    icon: <LayoutGrid className="h-4 w-4" />,
  },
  {
    value: '100%',
    label: 'AISI 304 Stainless Steel',
    description: 'Every machine built from stainless steel throughout.',
    icon: <Layers className="h-4 w-4" />,
  },
  {
    value: 'Made in Italy',
    label: 'Precision Manufactured',
    description: 'Exacting European engineering standards in every component.',
    icon: <MapPin className="h-4 w-4" />,
    italian: true,
  },
];

const SCOTT_PILLARS = [
  {
    icon: '🤝',
    title: 'Pre-Sales Consultation',
    description: 'Scott works directly with you to understand your parts, contaminants, throughput, and budget before recommending a system — no pressure, no guesswork.',
  },
  {
    icon: '🔬',
    title: 'Process Development',
    description: 'Not sure if aqueous cleaning will work for your application? We evaluate your process and validate the cleaning solution before you commit.',
  },
  {
    icon: '🔧',
    title: 'Technical Support',
    description: 'Factory-trained technicians available for installation guidance, commissioning, and ongoing technical assistance throughout the life of your machine.',
  },
  {
    icon: '📦',
    title: 'Parts & Service',
    description: 'Comprehensive inventory of replacement parts for all current and retired models. Most orders ship within 24–48 hours direct from our US warehouse.',
  },
];

const INDUSTRIES = [
  {
    slug: 'automotive',
    icon: '🚗',
    name: 'Automotive',
    description: 'High-throughput cleaning for engine components, transmission parts, and precision assemblies on the production line.',
  },
  {
    slug: 'aerospace',
    icon: '✈️',
    name: 'Aerospace',
    description: 'Precision cleaning for critical aerospace components where contamination tolerances are measured in microns.',
  },
  {
    slug: 'machining',
    icon: '⚙️',
    name: 'Machining & Manufacturing',
    description: 'Versatile aqueous systems for CNC machined parts, castings, and stamped components at every production scale.',
  },
  {
    slug: 'heavy-equipment',
    icon: '🏗️',
    name: 'Heavy Equipment',
    description: 'Industrial-grade washers built for oversized, heavy components from construction, mining, and agricultural equipment.',
  },
  {
    slug: 'medical',
    icon: '🩺',
    name: 'Medical',
    description: 'Validated cleaning processes for medical device components requiring the highest standards of cleanliness and traceability.',
  },
  {
    slug: 'food-processing',
    icon: '🍽️',
    name: 'Food Processing',
    description: 'NSF-compatible aqueous cleaning systems for food-grade equipment, tooling, and processing components.',
  },
];
