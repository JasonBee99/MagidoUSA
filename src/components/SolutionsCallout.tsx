import Link from 'next/link';

interface SolutionLink {
  slug: string;
  title: string;
  description: string;
}

// Maps each category slug to 2–3 relevant solution pages
const CATEGORY_SOLUTIONS: Record<string, SolutionLink[]> = {
  'manual-washers': [
    {
      slug: 'industrial-parts-washing-for-mro',
      title: 'Parts Washing for MRO',
      description: 'How manual washers fit into maintenance and repair operations.',
    },
    {
      slug: 'cleaning-hydraulic-components',
      title: 'Cleaning Hydraulic Components',
      description: 'Removing varnish, lacquer, and oil from hydraulic parts.',
    },
    {
      slug: 'cleaning-automotive-transmission-parts',
      title: 'Cleaning Transmission Parts',
      description: 'Valve bodies, clutch packs, and housings cleaned to rebuild spec.',
    },
  ],
  'top-load-washers': [
    {
      slug: 'removing-stamping-and-forming-lubricants',
      title: 'Removing Stamping & Forming Lubricants',
      description: 'Batch cleaning stamped and formed parts before coating or welding.',
    },
    {
      slug: 'cleaning-automotive-transmission-parts',
      title: 'Cleaning Transmission Parts',
      description: 'Basket-loading mixed transmission components in a single cycle.',
    },
    {
      slug: 'industrial-parts-washing-for-mro',
      title: 'Parts Washing for MRO',
      description: 'Versatile spray cabinet cleaning for the full variety of MRO tasks.',
    },
  ],
  'front-load-washers': [
    {
      slug: 'cleaning-aerospace-components',
      title: 'Cleaning Aerospace Components',
      description: 'Repeatable, documentable cleaning for large aerospace assemblies.',
    },
    {
      slug: 'cleaning-automotive-transmission-parts',
      title: 'Cleaning Transmission Parts',
      description: 'Full transmission cases and bell housings up to 1,760 lbs.',
    },
    {
      slug: 'food-and-beverage-equipment-cleaning',
      title: 'Food & Beverage Equipment Cleaning',
      description: 'Sanitary stainless construction for food plant maintenance.',
    },
  ],
  'immersion-washers': [
    {
      slug: 'cleaning-hydraulic-components',
      title: 'Cleaning Hydraulic Components',
      description: 'Reaching internal passages and blind bores solvent can\'t touch.',
    },
    {
      slug: 'cleaning-medical-device-components',
      title: 'Cleaning Medical Device Components',
      description: 'Validated immersion cleaning for precision medical components.',
    },
    {
      slug: 'cleaning-aerospace-components',
      title: 'Cleaning Aerospace Components',
      description: 'Gentle agitation for airfoil geometries and cooling passages.',
    },
  ],
  'in-line-belt-conveyor-washers': [
    {
      slug: 'removing-stamping-and-forming-lubricants',
      title: 'Removing Stamping & Forming Lubricants',
      description: 'Inline conveyor cleaning integrated directly into stamping lines.',
    },
    {
      slug: 'food-and-beverage-equipment-cleaning',
      title: 'Food & Beverage Equipment Cleaning',
      description: 'Continuous cleaning of food plant components at production volume.',
    },
    {
      slug: 'industrial-parts-washing-for-mro',
      title: 'Parts Washing for MRO',
      description: 'Automated throughput for high-volume maintenance operations.',
    },
  ],
  'rotary-drum-washers': [
    {
      slug: 'removing-stamping-and-forming-lubricants',
      title: 'Removing Stamping & Forming Lubricants',
      description: 'Bulk cleaning of small stamped parts continuously without batching.',
    },
    {
      slug: 'cleaning-automotive-transmission-parts',
      title: 'Cleaning Transmission Parts',
      description: 'Clutch pistons, snap rings, and small parts cleaned in bulk.',
    },
    {
      slug: 'food-and-beverage-equipment-cleaning',
      title: 'Food & Beverage Equipment Cleaning',
      description: 'Fasteners, sprockets, and small components cleaned at volume.',
    },
  ],
  'rotary-immersion-washers': [
    {
      slug: 'cleaning-aerospace-components',
      title: 'Cleaning Aerospace Components',
      description: 'Multi-action immersion and spray for critical aerospace components.',
    },
    {
      slug: 'cleaning-medical-device-components',
      title: 'Cleaning Medical Device Components',
      description: 'Precision cleaning with process control for medical manufacturing.',
    },
    {
      slug: 'cleaning-hydraulic-components',
      title: 'Cleaning Hydraulic Components',
      description: 'Superior particulate removal for hydraulic rebuild operations.',
    },
  ],
};

export function SolutionsCallout({ categorySlug }: { categorySlug: string }) {
  const solutions = CATEGORY_SOLUTIONS[categorySlug];
  if (!solutions || solutions.length === 0) return null;

  return (
    <section className="border-t border-[var(--color-border)] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="font-display text-xs font-semibold uppercase tracking-wider text-magido-orange">
          Application Guides
        </p>
        <h2 className="mt-1 font-display text-2xl font-bold text-[var(--color-text)]">
          Solutions &amp; Use Cases
        </h2>
        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
          See how these systems are used in real-world cleaning applications.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution) => (
            <Link
              key={solution.slug}
              href={`/solutions/${solution.slug}`}
              className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-card-bg)] p-6 transition-shadow hover:shadow-md"
            >
              <h3 className="font-display text-base font-semibold text-[var(--color-text)] transition-colors group-hover:text-magido-orange">
                {solution.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {solution.description}
              </p>
              <p className="mt-4 text-xs font-medium text-magido-orange">
                Read the guide →
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-4">
          <Link
            href="/solutions"
            className="text-sm font-medium text-magido-orange transition-colors hover:text-magido-orange-dark"
          >
            View all solutions →
          </Link>
        </div>
      </div>
    </section>
  );
}
