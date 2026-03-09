import Link from 'next/link';
import Image from 'next/image';
import { getAllCategories, getCategoryRepresentativeImage } from '@/lib/products';
import { ArrowRight, Shield, Zap, Leaf, HeadphonesIcon } from 'lucide-react';
import { HeroCarousel } from '@/components/HeroCarousel';

export default function HomePage() {
  const categories = getAllCategories();

  return (
    <>
      {/* Hero Carousel */}
      <HeroCarousel />

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
                  <div className="absolute left-4 top-4 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-magido-orange/10 text-xs font-bold text-magido-orange ring-1 ring-magido-orange/30">
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

      {/* ─── Why Choose Us ─── */}
      <section className="border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
            {/* Left: heading + intro */}
            <div>
              <p className="font-display text-sm font-semibold uppercase tracking-widest text-magido-orange">
                Why Choose Us
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight text-[var(--color-text)] sm:text-4xl">
                Precision Engineered. Proven.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[var(--color-text-secondary)]">
                MAGIDO is a global innovator in the aqueous parts washing market. We design and build wash systems for the most demanding production and maintenance applications using the latest manufacturing technology.
              </p>
              <p className="mt-3 text-base leading-relaxed text-[var(--color-text-secondary)]">
                Our commitment to innovative engineering has earned us the reputation of producing the highest quality and most competitive wash systems on the market.
              </p>
              <div className="mt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-magido-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-magido-orange-dark"
                >
                  Talk to an Expert
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right: 4 value props */}
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
      <section className="border-t border-[var(--color-border)] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
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
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-magido-blue/10 text-3xl ring-1 ring-magido-blue/20 transition-colors group-hover:bg-magido-orange/10 group-hover:ring-magido-orange/30">
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

              {/* ── Top: identity row ── */}
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                {/* Left: label + name + title */}
                <div>
                  <p className="font-display text-xs font-semibold uppercase tracking-widest text-magido-orange">
                    National Sales Manager
                  </p>
                  <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-4xl">
                    Scott Morin
                  </h2>
                  <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                    Global Parts Cleaning Manufacturer at Magido USA
                  </p>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    Contact Scott today — he wants to understand your parts cleaning challenges and recommend the right solution. Free consultation, same-day response.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 rounded-lg bg-magido-orange px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-magido-orange-dark"
                    >
                      Contact Scott <ArrowRight className="h-4 w-4" />
                    </Link>
                    <a
                      href="tel:8444624436"
                      className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-5 py-2.5 text-sm font-semibold text-[var(--color-text)] transition-colors hover:border-magido-orange/40 hover:text-magido-orange"
                    >
                      📞 844-462-4436
                    </a>
                    <a
                      href="mailto:sales@magidousa.com"
                      className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-5 py-2.5 text-sm font-semibold text-[var(--color-text)] transition-colors hover:border-magido-orange/40 hover:text-magido-orange"
                    >
                      ✉️ Sales@MagidoUSA.com
                    </a>
                  </div>
                </div>

                {/* Right: headshot */}
                <div className="flex-shrink-0">
                  <div className="relative h-28 w-28 overflow-hidden rounded-2xl ring-4 ring-magido-orange/20 sm:h-32 sm:w-32">
                    <Image
                      src="/images/scott-morin.webp"
                      alt="Scott Morin — National Sales Manager, Magido USA"
                      fill
                      className="object-cover object-top"
                      sizes="128px"
                    />
                  </div>
                </div>
              </div>

              {/* ── Divider ── */}
              <div className="my-8 border-t border-[var(--color-border)]" />

              {/* ── Service pillars ── */}
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {SCOTT_PILLARS.map((p) => (
                  <div key={p.title} className="flex flex-col gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-magido-blue/10 text-xl ring-1 ring-magido-blue/20">
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
      </section>

      {/* ─── Trust bar ─── */}
      <section className="border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <ValueProp title="100% Stainless Steel"  description="Every machine built entirely from AISI 304 stainless steel for maximum durability and corrosion resistance." />
            <ValueProp title="Engineered in Italy"   description="Decades of European engineering excellence. Precision-manufactured components with exacting quality standards." />
            <ValueProp title="76 Models Available"   description="From compact manual stations to fully automated conveyor systems — a solution for every application." />
            <ValueProp title="US Sales & Support"    description="Sturtevant, WI-based team providing sales, installation guidance, and ongoing technical support." />
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
    <div className="rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-6">
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-magido-blue/10 text-magido-blue ring-1 ring-magido-blue/20">
        {icon}
      </div>
      <h3 className="mt-4 font-display text-sm font-bold text-[var(--color-text)]">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
        {description}
      </p>
    </div>
  );
}

function ValueProp({ title, description }: { title: string; description: string }) {
  return (
    <div className="text-center">
      <h3 className="font-display text-base font-bold text-[var(--color-text)]">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">{description}</p>
    </div>
  );
}

// ─── Data ──────────────────────────────────────────────────────────────────

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
