import type { Metadata } from 'next';
import Link from 'next/link';
import SelectorTabs from '@/components/SelectorTabs';
import AqueousProcessDiagram from '@/components/AqueousProcessDiagram';

export const metadata: Metadata = {
  title: 'How to Choose a Parts Washer — Sizing & Selection Guide | Magido USA',
  description:
    'Choose the right aqueous parts washer: spray cabinet, immersion, belt conveyor, rotary drum, or manual. Match to parts size, cutting oil, and production volume.',
  alternates: {
    canonical: 'https://magidousa.com/how-to-choose',
  },
  openGraph: {
    title: 'How to Choose a Parts Washer — Sizing & Selection Guide | Magido USA',
    description:
      'Interactive selector and complete guide to matching the right aqueous wash system to your application.',
    url: 'https://magidousa.com/how-to-choose',
    images: [{ url: 'https://magidousa.com/images/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Choose a Parts Washer | Magido USA',
    description:
      'Interactive selector and sizing guide — match the right aqueous wash system to your application.',
  },
};

export default function HowToChoosePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* ── Breadcrumb ── */}
      <nav className="text-sm text-[var(--color-muted)] mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2">
          <li><Link href="/" className="hover:text-magido-orange transition-colors">Home</Link></li>
          <li aria-hidden="true" className="opacity-40">/</li>
          <li><Link href="/solutions" className="hover:text-magido-orange transition-colors">Solutions</Link></li>
          <li aria-hidden="true" className="opacity-40">/</li>
          <li className="text-[var(--color-text)]" aria-current="page">How to Choose</li>
        </ol>
      </nav>

      {/* ── Page heading ── */}
      <div className="mb-10">
        <p className="text-xs font-semibold tracking-widest uppercase text-magido-orange mb-2">
          Selection Guide
        </p>
        <h1 className="text-4xl font-bold text-[var(--color-text)] mb-4 leading-tight">
          How to Choose a Parts Washer
        </h1>
        <p className="text-lg text-[var(--color-muted)] max-w-2xl leading-relaxed">
          Match the right industrial aqueous parts washer — stainless steel spray cabinet, immersion, belt conveyor, rotary drum, or manual parts washer — to your parts size, contamination type (cutting oil, coolant, metallic fines), and production requirements.
        </p>
      </div>

      {/* ── Aqueous process diagram ── */}
      <div className="-mt-5 mb-6 -mx-4 sm:-mx-6 lg:-mx-8">
        <AqueousProcessDiagram />
      </div>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 1 — Start with Your Parts
      ══════════════════════════════════════════════════════════════ */}
      <section className="mb-4">
        <h2 className="text-2xl font-bold text-[var(--color-text)] mb-4">
          Start with Your Parts
        </h2>
        <div className="prose dark:prose-invert max-w-none text-[var(--color-muted)] mb-6">
          <p>
            The most basic sizing question is: what&apos;s the biggest part you need to clean?
            Measure the length, width, and height of your largest typical component. That part
            needs to fit inside the wash cabinet with clearance on all sides.
          </p>
          <p className="mt-3">
            Next, consider weight. Magido spray cabinet washers range from 330&nbsp;lbs on
            compact X81 models to 1,500&nbsp;lbs on the largest Eco series machines.
          </p>
          <p className="mt-3">
            Finally, think about throughput. If you&apos;re cleaning 50 parts per shift, a spray
            cabinet works. If you&apos;re cleaning 500, you need a continuous-feed system like a
            belt conveyor or rotary drum washer.
          </p>
          <p className="mt-3">
            Not sure where to start? Use the selector to find the right product family, or switch
            to the Capacity Calculator to see exactly how many parts each machine can handle per
            shift.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          PRODUCT SELECTOR + CAPACITY CALCULATOR — tabbed
      ══════════════════════════════════════════════════════════════ */}
      <section className="mb-14" aria-label="Interactive tools">
        <SelectorTabs />
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 2 — Cleaning Methods Compared
      ══════════════════════════════════════════════════════════════ */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-[var(--color-text)] mb-2">
          Cleaning Methods Compared
        </h2>
        <p className="text-[var(--color-muted)] mb-8">
          Each method has distinct strengths. Choosing the right one depends on your parts,
          contamination, and cleanliness requirements.
        </p>

        <div className="space-y-6">
          {CLEANING_METHODS.map((method) => (
            <div
              key={method.title}
              className="border border-[var(--color-border)] rounded-lg p-6 hover:border-magido-orange/40 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                <div>
                  <h3 className="text-lg font-bold text-[var(--color-text)]">{method.title}</h3>
                  <p className="text-sm text-magido-orange font-medium">{method.subtitle}</p>
                </div>
                <Link
                  href={method.url}
                  className="text-sm font-semibold text-magido-orange hover:underline whitespace-nowrap"
                >
                  View Products →
                </Link>
              </div>
              <p className="text-[var(--color-muted)] text-sm mb-3">{method.description}</p>
              <div className="flex flex-col sm:flex-row gap-4 text-sm">
                <div>
                  <span className="font-semibold text-[var(--color-text)]">Best for: </span>
                  <span className="text-[var(--color-muted)]">{method.bestFor}</span>
                </div>
                <div>
                  <span className="font-semibold text-[var(--color-text)]">Series: </span>
                  <span className="text-[var(--color-muted)]">{method.series}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 3 — Still Not Sure CTA
      ══════════════════════════════════════════════════════════════ */}
      <section className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-8 text-center">
        <h2 className="text-xl font-bold text-[var(--color-text)] mb-2">Still Not Sure?</h2>
        <p className="text-[var(--color-muted)] mb-6 max-w-lg mx-auto">
          Magido offers free parts cleaning process evaluations. Send us your part dimensions,
          weights, contamination type, and throughput requirements.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/contact#evaluation"
            className="bg-magido-orange hover:bg-magido-orange-dark text-white font-semibold px-6 py-3 rounded transition-colors"
          >
            Free Process Evaluation
          </Link>
          <Link
            href="/products"
            className="border border-[var(--color-border)] hover:border-magido-orange text-[var(--color-text)] font-semibold px-6 py-3 rounded transition-colors"
          >
            Browse All Products
          </Link>
        </div>
      </section>

    </main>
  );
}

// ─── Static data ──────────────────────────────────────────────────────────────

const CLEANING_METHODS = [
  {
    title: 'Top Load Spray Cabinet Washers',
    subtitle: 'Eco, X81, X51 & X51/2 Series',
    description:
      'Parts loaded onto a motorized rotating turntable inside an enclosed stainless steel cabinet and blasted with heated aqueous solution from strategically positioned spray nozzles. Available in single-stage wash and dual-stage wash/rinse configurations. AISI 304 stainless steel throughout, made in Italy.',
    bestFor: 'Cutting oil, coolant, metallic fines, and machining residue on machined parts — automotive components, castings, stamped parts',
    series: 'Eco, X81, X51, X51/2',
    url: '/products/top-load-washers',
  },
  {
    title: 'Front Load Spray Cabinet Washers',
    subtitle: 'X53, X53/2 & FLS Series',
    description:
      'Parts placed on a fixed platform that rolls out on a mobile cart for loading, then closes inside an enclosed cabinet where angled spray nozzles on a spray ramp wash all surfaces. Designed for heavy, bulky parts up to 1,500 lbs that cannot be lifted into a top-load machine.',
    bestFor: 'Large engine blocks, gear cases, heavy castings, automotive and aerospace structural components, heavy equipment parts',
    series: 'X53, X53/2, FLS',
    url: '/products/front-load-washers',
  },
  {
    title: 'Immersion Washers',
    subtitle: 'Agita Series',
    description:
      'Parts fully submerged in heated aqueous solution with pneumatic platform oscillation to force cleaning solution into every internal cavity. Removes cutting oil, coolant, and packed-in machining residue from complex machined parts.',
    bestFor: 'Blind holes, internal channels, threaded bores, hydraulic components, complex geometries — aerospace and precision machining',
    series: 'Agita (A700, A900, A1100, A1300)',
    url: '/products/immersion-washers',
  },
  {
    title: 'Belt Conveyor Washers',
    subtitle: 'Silver & Gold Series',
    description:
      'Parts travel on a stainless steel mesh conveyor belt through enclosed wash, rinse, and drying stages. Integrates directly into automotive and machining production lines for continuous high-volume parts cleaning.',
    bestFor: 'High-volume production — automotive fasteners, machined components, stampings, continuous flow CNC cell integration',
    series: 'Silver, Gold 1b, Gold 2b',
    url: '/products/in-line-belt-conveyor-washers',
  },
  {
    title: 'Rotary Drum Washers',
    subtitle: 'Jolly & Spira Series',
    description:
      'A helical screw-type rotating drum continuously tumbles and advances small parts through spray and immersion cleaning stages. Removes cutting oil, coolant, and chips from small machined components in bulk.',
    bestFor: 'Small loose machined parts in high volumes — fasteners, stampings, springs, turned components — automotive and machining production',
    series: 'Jolly, Spira 1b, Spira 2b',
    url: '/products/rotary-drum-washers',
  },
  {
    title: 'Rotary Immersion Washers',
    subtitle: 'Platinum Series',
    description:
      'Combines direct spray impingement with full immersion and rotational basket agitation through separate wash and rinse stages. AISI 304 stainless steel, made in Italy. Specified for aerospace, automotive, and precision machining applications requiring validated cleanliness.',
    bestFor: 'Complex geometries, tight tolerances, critical cleanliness specs — aerospace components, hydraulic manifolds, precision machined parts',
    series: 'Platinum (PM400, P600/2, P900/2, P1200/2, P1500/2)',
    url: '/products/rotary-immersion-washers',
  },
  {
    title: 'Manual Washers',
    subtitle: 'DG, L & HP Series',
    description:
      'Heated stainless steel work tanks with flow-through brush, flexible spigot, and integrated filtration for removing cutting oil, coolant, and grease. HP series adds 870 PSI spray wand for heavy soils.',
    bestFor: 'Shop-floor degreasing, hands-on inspection, one-off parts, maintenance bays — MRO and automotive service',
    series: 'DG, L, HP',
    url: '/products/manual-washers',
  },
];
