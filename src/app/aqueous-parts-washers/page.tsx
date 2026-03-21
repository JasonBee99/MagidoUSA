import type { Metadata } from 'next';
import Link from 'next/link';
import {
  CheckCircle,
  Droplets,
  ShieldCheck,
  Zap,
  Leaf,
  ArrowRight,
  ChevronRight,
  Star,
  Phone,
  ClipboardList,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Aqueous Parts Washers | Water-Based Industrial Cleaning Systems | Magido USA',
  description:
    'Magido USA manufactures premium aqueous parts washers and water-based parts cleaning systems — 100% AISI 304 stainless steel construction, 75+ models, made in Italy since 1980. Spray cabinet, immersion, conveyor, and rotary drum washers for every industrial application.',
  keywords: [
    'aqueous parts washer',
    'aqueous parts washers',
    'water based parts washer',
    'water-based parts washer',
    'stainless steel parts washer',
    'industrial aqueous parts washer',
    'aqueous parts cleaning',
    'AISI 304 stainless steel parts washer',
  ],
  openGraph: {
    title: 'Aqueous Parts Washers | Magido USA',
    description:
      'Premium aqueous parts washing systems — 100% stainless steel, made in Italy. 75+ models for automotive, aerospace, machining, and heavy equipment.',
    url: 'https://magidousa.com/aqueous-parts-washers',
    images: [{ url: 'https://magidousa.com/images/og-default.png', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: 'https://magidousa.com/aqueous-parts-washers',
  },
};

// ─── Structured Data ────────────────────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ItemPage',
      name: 'Aqueous Parts Washers | Magido USA',
      url: 'https://magidousa.com/aqueous-parts-washers',
      description:
        'Industrial aqueous parts washers and water-based parts cleaning systems from Magido USA — 100% AISI 304 stainless steel, 75 models, made in Italy since 1980.',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://magidousa.com' },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Aqueous Parts Washers',
            item: 'https://magidousa.com/aqueous-parts-washers',
          },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is an aqueous parts washer?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'An aqueous parts washer is an industrial cleaning machine that uses heated water mixed with biodegradable detergent — rather than harsh solvents — to remove oils, greases, chips, and other manufacturing contaminants from metal parts and components. Aqueous parts washers are safer for workers, more environmentally friendly, and in most applications deliver superior cleanliness compared to solvent-based systems.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why choose a stainless steel parts washer over carbon steel?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Stainless steel parts washers — specifically those built from AISI 304 stainless steel — resist corrosion from hot aqueous cleaning solutions and alkaline detergents far longer than carbon steel machines. Every Magido aqueous parts washer is built entirely from AISI 304 stainless steel throughout, not just in the wash zone, which maximizes machine lifespan and reduces maintenance costs.',
          },
        },
        {
          '@type': 'Question',
          name: 'What types of aqueous parts washers does Magido offer?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Magido USA offers seven categories of aqueous parts washers: manual washers, top load spray cabinet washers, front load spray cabinet washers, immersion washers, in-line belt conveyor washers, rotary drum washers, and rotary immersion washers. With 75 models across these categories, Magido manufactures an aqueous cleaning solution for every part size, throughput requirement, and cleanliness specification.',
          },
        },
        {
          '@type': 'Question',
          name: 'Are aqueous parts washers environmentally safe?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Aqueous parts washers use water-based cleaning solutions rather than hazardous solvents, which significantly reduces VOC emissions, eliminates flammability risks, and simplifies wastewater disposal compared to solvent cleaning. Magido aqueous systems support EPA and OSHA compliance for industrial parts cleaning operations.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long has Magido been manufacturing aqueous parts washers?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Magido Group has been engineering aqueous parts washing systems since 1980 — over 45 years of continuous development and refinement. All Magido aqueous parts washers are manufactured in Italy to European precision engineering standards and distributed throughout the United States from Sturtevant, WI.',
          },
        },
      ],
    },
  ],
};

// ─── Data ────────────────────────────────────────────────────────────────────
const BENEFITS = [
  {
    icon: ShieldCheck,
    title: 'Worker & Environmental Safety',
    body: 'Water-based cleaning eliminates solvent vapors, flammability risk, and hazardous waste handling. Aqueous systems support OSHA compliance and a safer shop floor.',
  },
  {
    icon: Droplets,
    title: 'Superior Cleaning Performance',
    body: 'Heated aqueous solution with targeted spray impingement removes machining oils, coolants, chips, carbon deposits, and oxide scale from the most complex part geometries.',
  },
  {
    icon: ShieldCheck,
    title: '100% AISI 304 Stainless Steel',
    body: 'Every Magido aqueous parts washer is built entirely from AISI 304 stainless steel — cabinet, tank, internal structure, and spray manifolds — not just the wash zone.',
  },
  {
    icon: Leaf,
    title: 'Lower Operating Costs',
    body: 'Biodegradable detergents cost a fraction of industrial solvents. Extended bath life, integrated filtration, and solution recovery reduce consumable spend significantly.',
  },
  {
    icon: Zap,
    title: 'Process Repeatability',
    body: 'Automated wash cycles with programmable temperature, pressure, and timing deliver consistent cleaning results every cycle — critical for production and quality-controlled environments.',
  },
  {
    icon: ClipboardList,
    title: 'Regulatory Compliance',
    body: 'Aqueous parts washing systems simplify EPA and local environmental compliance. No hazardous waste manifests, no solvent storage permits, no air quality concerns.',
  },
];

const CATEGORIES = [
  {
    slug: 'top-load-washers',
    name: 'Top Load Spray Cabinet Washers',
    shortDesc: 'Versatile aqueous spray cabinets for small to mid-sized parts',
    models: '18 models · 6 series',
    badge: 'Most Popular',
  },
  {
    slug: 'front-load-washers',
    name: 'Front Load Spray Cabinet Washers',
    shortDesc: 'Heavy-duty water-based washers for large, heavy components',
    models: '11 models · 3 series',
    badge: '',
  },
  {
    slug: 'immersion-washers',
    name: 'Immersion Washers',
    shortDesc: 'Full-submersion aqueous cleaning for complex internal geometries',
    models: '10 models · 1 series',
    badge: '',
  },
  {
    slug: 'in-line-belt-conveyor-washers',
    name: 'In-Line Belt Conveyor Washers',
    shortDesc: 'Continuous aqueous cleaning integrated into production lines',
    models: '21 models · 3 series',
    badge: 'High Volume',
  },
  {
    slug: 'rotary-drum-washers',
    name: 'Rotary Drum Washers',
    shortDesc: 'Bulk aqueous cleaning for small loose parts at high throughput',
    models: '14 models · 3 series',
    badge: '',
  },
  {
    slug: 'rotary-immersion-washers',
    name: 'Rotary Immersion Washers',
    shortDesc: 'Multi-action aqueous cleaning for critical cleanliness specifications',
    models: '5 models · 1 series',
    badge: 'Precision',
  },
  {
    slug: 'manual-washers',
    name: 'Manual Aqueous Washers',
    shortDesc: 'Heated stainless steel stations for shop-floor degreasing',
    models: '6 models · 3 series',
    badge: '',
  },
];

const VS_TABLE = [
  { factor: 'Worker Safety', aqueous: 'No VOCs, no flammability risk', solvent: 'Vapor inhalation risk, flammable' },
  { factor: 'Environmental Impact', aqueous: 'Biodegradable, low hazardous waste', solvent: 'Hazardous waste disposal required' },
  { factor: 'Regulatory Compliance', aqueous: 'Simplified EPA/OSHA compliance', solvent: 'Air permits, storage permits' },
  { factor: 'Cleaning Performance', aqueous: 'Excellent on oils, greases, chips', solvent: 'Good on oils, limited on inorganic soils' },
  { factor: 'Operating Cost', aqueous: 'Low detergent cost, long bath life', solvent: 'Higher chemical cost, frequent changes' },
  { factor: 'Part Compatibility', aqueous: 'Most metals; verify soft metals', solvent: 'Broad material compatibility' },
];

const TESTIMONIALS = [
  {
    quote:
      'Placeholder: "We replaced three aging solvent cabinets with a single Magido X53/2. Cleanliness improved, our inspectors have zero rejections from contamination, and we eliminated all our hazardous waste pickups."',
    name: 'Plant Manager',
    company: 'Tier 1 Automotive Supplier — Midwest',
  },
  {
    quote:
      'Placeholder: "The AISI 304 construction throughout is what sold us. We\'ve had other manufacturers\' machines rust out after 5 years. The Magido has been running daily for 8 years without any corrosion issues."',
    name: 'Maintenance Director',
    company: 'Precision Machining Facility — Southeast',
  },
  {
    quote:
      'Placeholder: "Scott walked us through the entire process evaluation before we committed. The Gold 2b conveyor washer he recommended handles our production volume perfectly — we haven\'t looked back."',
    name: 'Operations Manager',
    company: 'Medical Device Manufacturer — Northeast',
  },
];

// ─── Component ───────────────────────────────────────────────────────────────
export default function AqueousPartsWashersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="hero-bg relative overflow-hidden">
        {/* Decorative glows */}
        <div className="pointer-events-none absolute -top-32 right-0 h-[520px] w-[520px] rounded-full bg-magido-orange/10 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-magido-blue/15 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm text-white/50">
            <Link href="/" className="transition hover:text-white/80">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white/70">Aqueous Parts Washers</span>
          </nav>

          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-magido-orange/30 bg-magido-orange/10 px-4 py-1.5 text-sm font-medium text-magido-orange">
              <Droplets className="h-3.5 w-3.5" />
              Water-Based Industrial Cleaning
            </div>

            <h1 className="mb-6 text-4xl font-bold leading-tight text-white lg:text-5xl xl:text-6xl">
              Aqueous Parts Washers{' '}
              <span className="text-magido-orange">Built Different</span>
            </h1>

            <p className="mb-4 text-lg leading-relaxed text-white/75 lg:text-xl">
              Magido USA manufactures industrial aqueous parts washers and water-based parts cleaning
              systems engineered entirely from{' '}
              <strong className="text-white">100% AISI 304 stainless steel</strong> — not just the
              wash zone, but every surface, weld, and component inside and out.
            </p>
            <p className="mb-10 text-lg leading-relaxed text-white/75">
              With 75 models across 7 machine types and 45+ years of precision manufacturing in
              Italy, there&apos;s a Magido stainless steel parts washer for every part size,
              throughput, and cleanliness requirement.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/products" className="btn-primary">
                Browse All Aqueous Washers <span className="btn-arrow">→</span>
              </Link>
              <Link href="/how-to-choose" className="btn-ghost-dark">
                Help Me Choose
              </Link>
            </div>
          </div>

          {/* Stats strip */}
          <div className="mt-16 grid grid-cols-2 gap-4 border-t border-white/10 pt-10 sm:grid-cols-4">
            {[
              { value: '75+', label: 'Aqueous washer models' },
              { value: '45+', label: 'Years manufacturing' },
              { value: '100%', label: 'AISI 304 stainless steel' },
              { value: '7', label: 'Machine types' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold text-magido-orange">{s.value}</div>
                <div className="mt-1 text-sm text-white/55">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT IS AN AQUEOUS PARTS WASHER ──────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 lg:text-4xl">
              What Is an Aqueous Parts Washer?
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-gray-600">
              An <strong>aqueous parts washer</strong> is an industrial cleaning machine that uses
              heated water combined with biodegradable detergent — rather than hazardous chemical
              solvents — to remove manufacturing contaminants from metal parts and components.
            </p>
            <p className="mb-6 text-lg leading-relaxed text-gray-600">
              Also called a <strong>water-based parts washer</strong>, aqueous cleaning systems
              deliver powerful degreasing performance while eliminating the worker safety hazards,
              environmental liabilities, and regulatory burdens associated with solvent-based
              cleaning.
            </p>
            <p className="text-lg leading-relaxed text-gray-600">
              Aqueous parts washers work by combining four cleaning factors — <em>chemistry</em>{' '}
              (detergent selection), <em>thermal energy</em> (heated solution), <em>mechanical
              action</em> (spray pressure or agitation), and <em>time</em> — to break down and
              remove oils, greases, chips, scale, and other process contamination from virtually any
              industrial component.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHY AQUEOUS BENEFITS ─────────────────────────────────────────── */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <div className="mb-3 text-sm font-semibold uppercase tracking-widest text-magido-orange">
              Why Aqueous Cleaning
            </div>
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
              The Case for Water-Based Parts Washing
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Industries from automotive to aerospace have largely shifted from solvent to aqueous
              parts cleaning — and for good reason.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b) => (
              <div
                key={b.title}
                className="rounded-xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-magido-orange/10">
                  <b.icon className="h-5 w-5 text-magido-orange" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">{b.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STAINLESS STEEL CALLOUT ───────────────────────────────────────── */}
      <section className="bg-magido-blue py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-2 text-sm font-semibold uppercase tracking-widest text-magido-orange">
                The Magido Standard
              </div>
              <h2 className="mb-4 text-2xl font-bold text-white lg:text-3xl">
                Every Aqueous Washer — 100% AISI 304 Stainless Steel Throughout
              </h2>
              <p className="leading-relaxed text-white/75">
                Most manufacturers use stainless steel only in the wash zone — the rest of the
                machine is carbon steel coated with paint or powder coat that eventually corrodes.
                Every Magido stainless steel parts washer is built from AISI 304 stainless steel{' '}
                <em>throughout</em>: cabinet walls, structural frame, internal spray manifolds, tank,
                conveyor components, and hardware. No rust. No repainting. No premature failures.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 text-white">
              {[
                'Cabinet & structural frame',
                'Wash tank & sump',
                'Spray manifolds & nozzles',
                'Internal conveyor components',
                'Hardware & fasteners',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <CheckCircle className="h-4 w-4 shrink-0 text-magido-orange" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCT CATEGORIES ───────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <div className="mb-3 text-sm font-semibold uppercase tracking-widest text-magido-orange">
              75 Models · 7 Machine Types
            </div>
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
              Aqueous Parts Washer Types
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Every Magido aqueous parts washer is built to order from AISI 304 stainless steel.
              Select the machine type that matches your parts, contamination, and production volume.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/products/${cat.slug}`}
                className="group relative rounded-xl border border-gray-100 bg-gray-50 p-7 transition hover:-translate-y-0.5 hover:border-magido-orange/30 hover:bg-white hover:shadow-md"
              >
                {cat.badge && (
                  <span className="absolute right-4 top-4 rounded-full bg-magido-orange/10 px-2.5 py-0.5 text-xs font-semibold text-magido-orange">
                    {cat.badge}
                  </span>
                )}
                <h3 className="mb-2 font-semibold text-gray-900 transition group-hover:text-magido-orange">
                  {cat.name}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-gray-600">{cat.shortDesc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{cat.models}</span>
                  <ArrowRight className="h-4 w-4 text-magido-orange opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/products" className="btn-primary">
              View All Aqueous Washer Models <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── AQUEOUS VS SOLVENT TABLE ──────────────────────────────────────── */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <div className="mb-3 text-sm font-semibold uppercase tracking-widest text-magido-orange">
              Comparison
            </div>
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
              Aqueous vs. Solvent Parts Washers
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              For the vast majority of industrial applications, aqueous parts washers outperform
              solvent-based systems on safety, cost, and environmental impact.
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            {/* Header */}
            <div className="grid grid-cols-3 bg-gray-900 px-6 py-4 text-sm font-semibold">
              <span className="text-gray-400">Factor</span>
              <span className="text-magido-orange">Aqueous (Water-Based)</span>
              <span className="text-gray-300">Solvent-Based</span>
            </div>
            {/* Rows */}
            {VS_TABLE.map((row, i) => (
              <div
                key={row.factor}
                className={`grid grid-cols-3 gap-4 px-6 py-4 text-sm ${
                  i % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                }`}
              >
                <span className="font-medium text-gray-700">{row.factor}</span>
                <span className="text-gray-800">
                  <CheckCircle className="mr-1.5 inline h-3.5 w-3.5 text-magido-orange" />
                  {row.aqueous}
                </span>
                <span className="text-gray-500">{row.solvent}</span>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-sm text-gray-500">
            Not sure if aqueous cleaning is right for your application?{' '}
            <Link href="/solutions/aqueous-vs-solvent-parts-washers" className="text-magido-orange hover:underline">
              Read our full aqueous vs. solvent guide →
            </Link>
          </p>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <div className="mb-3 text-sm font-semibold uppercase tracking-widest text-magido-orange">
              Customer Results
            </div>
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="rounded-xl border border-gray-100 bg-gray-50 p-7">
                <div className="mb-4 flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-magido-orange text-magido-orange" />
                  ))}
                </div>
                <p className="mb-5 text-sm italic leading-relaxed text-gray-600">{t.quote}</p>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.company}</div>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-xs text-gray-400">
            * Placeholder testimonials — replace with actual customer quotes before launch
          </p>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-12 text-center">
            <div className="mb-3 text-sm font-semibold uppercase tracking-widest text-magido-orange">
              FAQ
            </div>
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
              Aqueous Parts Washer — Common Questions
            </h2>
          </div>

          <div className="space-y-4">
            {(jsonLd['@graph'][1] as { mainEntity: { name: string; acceptedAnswer: { text: string } }[] }).mainEntity.map(
              (faq) => (
                <details
                  key={faq.name}
                  className="group rounded-xl border border-gray-200 bg-white"
                >
                  <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-base font-semibold text-gray-900 marker:content-none">
                    {faq.name}
                    <ChevronRight className="h-5 w-5 shrink-0 text-magido-orange transition group-open:rotate-90" />
                  </summary>
                  <div className="border-t border-gray-100 px-6 pb-5 pt-4 text-sm leading-relaxed text-gray-600">
                    {faq.acceptedAnswer.text}
                  </div>
                </details>
              )
            )}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="hero-bg py-20">
        <div className="pointer-events-none absolute inset-0 bg-magido-orange/5" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white lg:text-4xl">
            Find the Right Aqueous Parts Washer for Your Operation
          </h2>
          <p className="mb-10 text-lg text-white/70">
            Scott Morin, our National Sales Manager, will evaluate your parts, contamination type,
            and throughput requirements — and recommend the exact stainless steel parts washer for
            your application. Free consultation, same-day response.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              Request a Free Evaluation <span className="btn-arrow">→</span>
            </Link>
            <a href="tel:8444624436" className="btn-ghost-dark">
              <Phone className="mr-2 inline h-4 w-4" />
              844-462-4436
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
