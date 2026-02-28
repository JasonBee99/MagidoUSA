import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How to Choose a Parts Washer — Sizing & Selection Guide',
  description: 'Find the right aqueous parts washer. Compare spray cabinet, immersion, conveyor, and rotary systems by part size, throughput, and cleaning method.',
};

const METHODS = [
  { title: 'Spray Cabinet Washers', subtitle: 'Top Load & Front Load', description: 'Parts placed on a rotating basket inside an enclosed stainless steel cabinet, blasted with hot aqueous solution from strategically positioned spray nozzles.', best: 'External surfaces, heavy contamination, oils, greases, carbon deposits', series: 'Eco, X81, X51, X51/2, X53, X53/2, FLS', link: '/products/top-load-washers' },
  { title: 'Immersion Washers', subtitle: 'Agita Series', description: 'Parts fully submerged in heated aqueous solution with pneumatic platform oscillation to force cleaning solution into every internal cavity.', best: 'Blind holes, internal channels, threaded bores, complex geometries', series: 'Agita (A700, A900, A1100)', link: '/products/immersion-washers' },
  { title: 'Belt Conveyor Washers', subtitle: 'Silver & Gold Series', description: 'Parts travel on a stainless steel mesh conveyor belt through enclosed wash, rinse, and drying stages. Integrates directly into production lines.', best: 'High-volume production, continuous flow, CNC cell integration', series: 'Silver, Gold 1b, Gold 2b', link: '/products/in-line-belt-conveyor-washers' },
  { title: 'Rotary Drum Washers', subtitle: 'Jolly & Spira Series', description: 'A helical screw-type rotating drum continuously tumbles and advances small parts through spray and immersion cleaning stages.', best: 'Small loose parts in high volumes — fasteners, stampings, springs', series: 'Jolly, Spira 1b, Spira 2b', link: '/products/rotary-drum-washers' },
  { title: 'Rotary Immersion Washers', subtitle: 'Platinum Series', description: 'Combines direct spray impingement with full immersion and rotational basket agitation through separate wash and rinse stages.', best: 'Complex geometries, tight tolerances, critical cleanliness specs', series: 'Platinum (P800/2, P1200/2)', link: '/products/rotary-immersion-washers' },
  { title: 'Manual Washers', subtitle: 'DG, L & HP Series', description: 'Heated stainless steel work tanks with flow-through brush, flexible spigot, and integrated filtration. HP series adds 870 PSI spray wand.', best: 'Hands-on inspection, one-off parts, maintenance bays', series: 'DG, L, HP', link: '/products/manual-washers' },
];

export default function HowToChoosePage() {
  return (
    <>
      <nav className="border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-3 sm:px-6 lg:px-8" aria-label="Breadcrumb">
        <div className="mx-auto flex max-w-7xl items-center gap-2 text-sm">
          <Link href="/" className="text-[var(--color-text-muted)] transition-colors hover:text-magido-orange">Home</Link>
          <ChevronRight className="h-3.5 w-3.5 text-[var(--color-text-muted)]" />
          <span className="font-medium text-[var(--color-text)]">How to Choose</span>
        </div>
      </nav>

      <section className="hero-bg px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="font-display text-sm font-semibold uppercase tracking-widest text-magido-orange">Selection Guide</p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">How to Choose a Parts Washer</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">Match the right cleaning method, capacity, and automation level to your parts, contamination type, and production requirements.</p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-[var(--color-text)] sm:text-3xl">Start with Your Parts</h2>
          <div className="mt-6 space-y-4 text-[var(--color-text-secondary)]">
            <p>The most basic sizing question is: what&rsquo;s the biggest part you need to clean? Measure the length, width, and height of your largest typical component. That part needs to fit inside the wash cabinet with clearance on all sides.</p>
            <p>Next, consider weight. Magido spray cabinet washers range from 330 lbs on compact X81 models to 1,500 lbs on the largest Eco series machines.</p>
            <p>Finally, think about throughput. If you&rsquo;re cleaning 50 parts per shift, a spray cabinet works. If you&rsquo;re cleaning 500, you need a continuous-feed system like a belt conveyor or rotary drum washer.</p>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-2xl font-bold text-[var(--color-text)] sm:text-3xl">Cleaning Methods Compared</h2>
          <p className="mt-3 max-w-2xl text-[var(--color-text-secondary)]">Each method has distinct strengths. Choosing the right one depends on your parts, contamination, and cleanliness requirements.</p>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {METHODS.map((method) => (
              <div key={method.title} className="rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-6">
                <h3 className="font-display text-lg font-bold text-[var(--color-text)]">{method.title}</h3>
                <p className="mt-0.5 text-sm font-medium text-magido-orange">{method.subtitle}</p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">{method.description}</p>
                <div className="mt-4 space-y-2">
                  <div><span className="text-2xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">Best for: </span><span className="text-xs text-[var(--color-text-secondary)]">{method.best}</span></div>
                  <div><span className="text-2xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">Series: </span><span className="text-xs text-[var(--color-text-secondary)]">{method.series}</span></div>
                </div>
                <Link href={method.link} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-magido-orange hover:text-magido-orange-dark">View Products <ArrowRight className="h-3.5 w-3.5" /></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold text-[var(--color-text)]">Still Not Sure?</h2>
          <p className="mt-3 text-[var(--color-text-secondary)]">Magido offers free parts cleaning process evaluations. Send us your part dimensions, weights, contamination type, and throughput requirements.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/contact#evaluation" className="inline-flex items-center gap-2 rounded-lg bg-magido-orange px-6 py-3 text-sm font-semibold text-white hover:bg-magido-orange-dark">Free Process Evaluation <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/products" className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-6 py-3 text-sm font-semibold text-[var(--color-text)] hover:bg-[var(--color-bg-secondary)]">Browse All Products</Link>
          </div>
        </div>
      </section>
    </>
  );
}
