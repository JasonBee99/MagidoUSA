import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

// Skip static generation — page is too large to pre-render at build time
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Product Catalog — Full Specifications',
  description:
    'Complete MAGIDO USA aqueous parts washing systems product catalog. Full specifications, standard features, options, and technical data for every series.',
  alternates: {
    canonical: 'https://www.magidousa.com/resources/catalog',
  },
};

// ─── Accordion (pure HTML details/summary — zero JS) ───────────────────────
function SpecAccordion({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <details className="group mt-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] overflow-hidden">
      <summary className="flex cursor-pointer select-none items-center justify-between gap-3 px-5 py-4 text-sm font-semibold text-[var(--color-text)] hover:bg-[var(--color-bg-tertiary)] transition-colors list-none [&::-webkit-details-marker]:hidden">
        <span className="flex items-center gap-2">
          <span className="text-magido-orange text-xs font-bold uppercase tracking-widest">Specs</span>
          <span className="text-[var(--color-text)]">{title}</span>
        </span>
        <svg
          className="h-4 w-4 flex-shrink-0 text-magido-orange transition-transform duration-200 group-open:rotate-180"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <div className="overflow-x-auto border-t border-[var(--color-border)]">
        {children}
      </div>
    </details>
  );
}

// ─── Shared table styles ────────────────────────────────────────────────────
function SpecTable({ children }: { children: React.ReactNode }) {
  return (
    <table className="w-full min-w-[520px] text-xs">
      <tbody className="divide-y divide-[var(--color-border)]">{children}</tbody>
    </table>
  );
}
function SpecRow({ label, unit, values }: { label: string; unit?: string; values: (string | number)[] }) {
  return (
    <tr className="even:bg-[var(--color-bg-tertiary)]">
      <td style={{textAlign:'center'}} className="px-4 py-2.5 font-medium text-[var(--color-text)] w-44 align-top">{label}</td>
      {unit && <td style={{textAlign:'center'}} className="px-3 py-2.5 text-[var(--color-text-secondary)] w-16 align-top">{unit}</td>}
      {values.map((v, i) => (
        <td key={i} style={{textAlign:'center'}} className="px-4 py-2.5 text-[var(--color-text-secondary)] align-top">
          {v}
        </td>
      ))}
    </tr>
  );
}
function SpecHead({ cols }: { cols: string[] }) {
  return (
    <thead>
      <tr className="border-b border-[var(--color-border)] bg-[var(--color-bg-tertiary)]">
        {cols.map((c, i) => (
          <th
            key={i}
            style={{textAlign:'center'}}
            className="px-4 py-3 text-xs font-bold text-[var(--color-text)] uppercase tracking-wide"
          >
            {c}
          </th>
        ))}
      </tr>
    </thead>
  );
}

// ─── Feature / Option list ──────────────────────────────────────────────────
function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-1.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
          <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-magido-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          {item}
        </li>
      ))}
    </ul>
  );
}

// ─── Section wrapper ────────────────────────────────────────────────────────
function CatalogSection({
  id,
  badge,
  title,
  description,
  images,
  features,
  options,
  safety,
  specs,
}: {
  id: string;
  badge: string;
  title: string;
  description: string | React.ReactNode;
  images?: { src: string; alt: string; model?: string; series?: string }[];
  features: string[];
  options: string[];
  safety?: string[];
  specs: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-20 border-t border-[var(--color-border)] py-14 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <p className="font-display text-xs font-semibold uppercase tracking-widest text-magido-orange">
            {badge}
          </p>
          <h2 className="mt-1 font-display text-2xl font-bold text-[var(--color-text)] sm:text-3xl">
            {title}
          </h2>
        </div>

        {/* Description + Images */}
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <div className="text-sm leading-relaxed text-[var(--color-text-secondary)] space-y-3 text-justify">
              {typeof description === 'string' ? <p>{description}</p> : description}
            </div>

            {/* Features / Options / Safety */}
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--color-text)] mb-1">
                  Standard Features
                </h3>
                <FeatureList items={features} />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--color-text)] mb-1">
                  Available Options
                </h3>
                <FeatureList items={options} />
              </div>
              {safety && safety.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--color-text)] mb-1">
                    Safety Features
                  </h3>
                  <FeatureList items={safety} />
                </div>
              )}
            </div>
          </div>

          {/* Images */}
          {images && images.length > 0 && (
            <div className="lg:self-start lg:sticky lg:top-20 flex flex-row flex-wrap lg:flex-col gap-3 items-center">
              {images.map((img) => (
                <div
                  key={img.src}
                  className="product-card-image-bg relative rounded-xl overflow-hidden border border-[var(--color-border)] w-36 h-36 lg:w-full lg:h-44 flex-shrink-0"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-contain p-3"
                    sizes="(max-width: 1024px) 144px, 25vw"
                  />
                  {/* Model badge — top-left, orange, rounded bottom-right only */}
                  {img.model && (
                    <span className="absolute top-0 left-0 z-10 rounded-br-md bg-magido-orange px-2 py-1 text-[10px] font-bold tracking-wide text-white leading-none">
                      {img.model}
                    </span>
                  )}
                  {/* Series badge — top-right, blue, rounded bottom-left only */}
                  {img.series && (
                    <span className="absolute top-0 right-0 z-10 rounded-bl-md bg-[var(--color-brand-blue)] px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white leading-none">
                      {img.series}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Specs accordion */}
        {specs}
      </div>
    </section>
  );
}

// ─── PAGE ───────────────────────────────────────────────────────────────────
export default function CatalogPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* ── Hero ── */}
      <section className="hero-bg px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-widest text-magido-orange">
            All Products
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
            MAGIDO USA Aqueous Parts Washing Systems Product Catalog
          </h1>
          <p className="mt-5 text-base leading-relaxed text-gray-300 sm:text-lg max-w-2xl mx-auto">
            Full specifications, standard features, options, and images for every Magido USA
            aqueous parts washing system — all in one document.
          </p>
          <div className="mt-6">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-lg bg-magido-orange px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-magido-orange-dark"
            >
              View All Products →
            </Link>
          </div>
        </div>
      </section>

      {/* ── TOC ── */}
      <nav
        aria-label="Catalog sections"
        className="sticky top-0 z-10 border-b border-[var(--color-border)] bg-[var(--color-bg)]/95 backdrop-blur-sm px-4 py-3 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium">
            {[
              ['#overview', 'Overview'],
              ['#dg-series', 'DG Series'],
              ['#l-series', 'L Series'],
              ['#hp-series', 'HP Series'],
              ['#x81-series', 'X81 Series'],
              ['#x51-series', 'X51 Series'],
              ['#x51hp-series', 'X51 HP'],
              ['#x51-2-series', 'X51/2 Series'],
              ['#fls-series', 'FLS Series'],
              ['#x53-series', 'X53 Series'],
              ['#x53-2-series', 'X53/2 Series'],
              ['#agita-series', 'Agita Series'],
              ['#rotary-drum', 'Rotary Drum'],
              ['#conveyor', 'Belt Conveyor'],
              ['#rotary-immersion', 'Rotary Immersion'],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="text-[var(--color-text-secondary)] transition-colors hover:text-magido-orange"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Overview ── */}
      <section id="overview" className="scroll-mt-20 py-14 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-2xl font-bold text-[var(--color-text)] sm:text-3xl">
            Stainless Steel Industrial Cleaning Technology
          </h2>
          <div className="mt-4 max-w-3xl space-y-3 text-sm leading-relaxed text-[var(--color-text-secondary)] text-justify">
            <p>
              MAGIDO is recognized as one of the industry&apos;s leading manufacturers of aqueous parts
              washing systems. Every machine is constructed entirely from AISI 304 stainless steel —
              the same material used in food-grade and pharmaceutical environments — ensuring
              corrosion resistance, longevity, and easy maintenance in even the harshest industrial settings.
            </p>
            <p>
              Our product range covers every parts cleaning application from small-shop manual
              washers to fully automated high-volume production lines. Whether you need a compact
              sink-style unit for a single technician or a customized conveyor system processing
              thousands of parts per hour, Magido has a purpose-built solution.
            </p>
            <p>
              All Magido systems use environmentally friendly aqueous (water-based) cleaning
              solutions, eliminating the hazardous waste disposal costs and worker safety risks
              associated with solvent-based cleaners. Our team provides comprehensive support before
              and after the sale to ensure the right system is matched to your exact application.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          MANUAL WASHERS
      ═══════════════════════════════════════════════════════ */}

      {/* DG Series */}
      <CatalogSection
        id="dg-series"
        badge="Manual Washers"
        title="DG Series — Sink-Style Manual Parts Washers"
        description={
          <>
            <p>
              Magido DG Series manual sink-style aqueous parts washers are engineered to handle the
              most rigorous challenges found in industrial and automotive maintenance parts cleaning
              applications. Built entirely from AISI 304 stainless steel, the DG8 and DG9 feature a
              foot-pedal-regulated, hand-held flow-through cleaning brush that delivers heated aqueous
              solution directly to the part surface.
            </p>
            <p>
              The DG Series is the ideal entry-level professional solution for shops that need a
              reliable, heated, pump-driven washer with a small footprint. The external magnetic drive
              pump eliminates shaft seals for maintenance-free operation, while the built-in liquid
              level shut-off protects the heater from running dry. Both models operate on standard
              115V single-phase power — no special electrical service required.
            </p>
            <p>
              Designed to use environmentally friendly aqueous (water-based) cleaning solutions,
              the DG Series eliminates the hazardous waste costs associated with solvent-based
              sink washers while delivering superior cleaning performance at controlled temperatures
              up to 113°F.
            </p>
          </>
        }
        images={[
          { src: '/images/products/dg/dg8-1.webp', alt: 'DG8 Sink-Style Manual Parts Washer', series: 'DG', model: 'DG-8' },
          { src: '/images/products/dg/dg9-1.webp', alt: 'DG9 Sink-Style Manual Parts Washer', series: 'DG', model: 'DG-9' },
        ]}
        features={[
          'AISI 304 Stainless Steel Construction',
          'External Magnetic Drive Pump (seal-free)',
          'Foot-Pedal Regulated Flo-Thru Brush',
          'Electrical Heater with Thermostat Control',
          'Automatic Liquid Level Shut-Off',
          'Tank Drain Valve',
          'Low-Profile Ergonomic Design',
        ]}
        options={[
          'Cartridge Filtration',
          'Casters for Mobility',
        ]}
        safety={[
          'Liquid Level Shut-Off Protects Heater',
          'Low-Voltage Foot Pedal Operation',
          'Magnetic Drive Pump — No Shaft Seal Leaks',
        ]}
        specs={
          <SpecAccordion title="DG Series — Full Specifications">
            <table className="w-full min-w-[480px] text-xs">
              <SpecHead cols={['Specification', 'Unit', 'DG-8', 'DG-9']} />
              <tbody className="divide-y divide-[var(--color-border)]">
                {[
                  ['Working Area', 'Inches', '33.5" × 19.5"', '33.5" × 19.5"'],
                  ['Load Weight', 'Lbs', '300 lbs', '300 lbs'],
                  ['Fluid Capacity', 'Gal (US)', '26.5 gal', '34.5 gal'],
                  ['Pump', 'GPH', '238 GPH', '238 GPH'],
                  ['Heater', 'kW', '2 kW', '2 kW'],
                  ['Operating Temperature', '°F', '113°F', '113°F'],
                  ['Voltage / Amperage', 'V / A', '115 / 19', '115 / 19'],
                  ['Length', 'Inches', '37.5"', '37.5"'],
                  ['Width', 'Inches', '19.5"', '19.5"'],
                  ['Height', 'Inches', '43.5"', '43.5"'],
                  ['Shipping Dimensions', 'Inches', '34" × 38" × 43"', '34" × 38" × 43"'],
                  ['Net Weight', 'Lbs', '121 lbs', '132 lbs'],
                ].map(([label, unit, ...vals]) => (
                  <SpecRow key={label} label={label} unit={unit} values={vals} />
                ))}
              </tbody>
            </table>
          </SpecAccordion>
        }
      />

      {/* L Series */}
      <CatalogSection
        id="l-series"
        badge="Manual Washers"
        title="L Series — Vat-Style Manual Parts Washers"
        description={
          <>
            <p>
              The Magido L Series manual vat-style aqueous parts washers are designed for
              industrial and automotive shops that need to clean medium to large components
              that don&apos;t fit in a standard sink-style washer. The open vat design accommodates
              bulky assemblies, engine components, transmission cases, and other large parts
              that benefit from heated soak-and-scrub cleaning.
            </p>
            <p>
              Available in two models — the L-7 (19" × 27.5" work area) and the larger
              L-10 (29.5" × 34" work area) — both units feature removable work shelves that
              allow parts to be partially or fully submerged in the heated solution. A
              flo-thru brush with flexible spigot lets technicians direct heated cleaning
              solution precisely where it&apos;s needed while scrubbing.
            </p>
            <p>
              Like all Magido products, the L Series is built entirely from AISI 304 stainless
              steel and operates on standard 115V power. The magnetic drive pump and liquid
              level shut-off provide reliable, maintenance-light operation in demanding shop
              environments.
            </p>
          </>
        }
        images={[
          { src: '/images/products/l-series/l7-1.webp', alt: 'L7 Vat-Style Manual Parts Washer', series: 'L Series', model: 'L-7' },
          { src: '/images/products/l-series/l10-1.webp', alt: 'L10 Vat-Style Manual Parts Washer', series: 'L Series', model: 'L-10' },
        ]}
        features={[
          'AISI 304 Stainless Steel Construction',
          'External Magnetic Drive Pump',
          'Flo-Thru Brush with Flexible Spigot',
          'Removable Work Shelves',
          'Electrical Heater with Thermostat Control',
          'Automatic Liquid Level Shut-Off',
          'Tank Drain Valve',
        ]}
        options={[
          'Cartridge or Bag Filtration',
          'Additional Heater Capacity',
          'Casters for Mobility',
        ]}
        safety={[
          'Automatic Liquid Level Shut-Off',
          'Thermostat Overheat Protection',
          'Magnetic Drive Pump — No Seal Leaks',
        ]}
        specs={
          <SpecAccordion title="L Series — Full Specifications">
            <table className="w-full min-w-[480px] text-xs">
              <SpecHead cols={['Specification', 'Unit', 'L-7', 'L-10']} />
              <tbody className="divide-y divide-[var(--color-border)]">
                {[
                  ['Working Area', 'Inches', 'L19" × W27.5"', 'L29.5" × W34"'],
                  ['Load Weight', 'Lbs', '300 lbs', '300 lbs'],
                  ['Fluid Capacity', 'Gal (US)', '24 gal', '40 gal'],
                  ['Pump', 'GPM', '3.5 GPM', '3.5 GPM'],
                  ['Heater', 'kW', '2 kW', '3 kW'],
                  ['Operating Temperature', '°F', '113°F', '113°F'],
                  ['Voltage', 'Volts', '115', '115'],
                  ['Amperage', 'Amps', '19', '19'],
                  ['Length', 'Inches', '27"', '35"'],
                  ['Width', 'Inches', '48.5"', '55"'],
                  ['Height', 'Inches', '43"', '43"'],
                  ['Shipping Dimensions', 'Inches', 'L26" × W48" × H30"', 'L35" × W54" × H30"'],
                  ['Net Weight', 'Lbs', '155 lbs', '210 lbs'],
                ].map(([label, unit, ...vals]) => (
                  <SpecRow key={label} label={label} unit={unit} values={vals} />
                ))}
              </tbody>
            </table>
          </SpecAccordion>
        }
      />

      {/* HP Series */}
      <CatalogSection
        id="hp-series"
        badge="Manual Washers"
        title="HP Series — High-Pressure Blast Cabinet Washers"
        description={
          <>
            <p>
              The Magido HP25 and HP30 are heated water blasting cabinets built entirely from
              AISI 304 stainless steel. Developed for technicians who need to dramatically reduce
              cleaning time, the HP Series uses a high-pressure piston-drive pump to deliver a
              heated aqueous cleaning solution at up to 870 PSI through an easy-to-handle spray
              wand — blasting away grease, carbon deposits, and industrial soils that would
              require extended soaking or scrubbing in a conventional washer.
            </p>
            <p>
              The enclosed cabinet design keeps the operator and work area clean while the
              large LED-illuminated window and clearing blower provide excellent visibility
              throughout the cleaning cycle. The hinged front door with glove access port allows
              hands-on control of the spray wand while maintaining containment. A removable work
              tray and screened basket filter make cleanup quick and straightforward.
            </p>
            <p>
              The HP Series is ideally suited for automotive shops, heavy equipment maintenance,
              machine shops, and any application where thorough, rapid cleaning of heavily
              contaminated parts is a priority. Both models support single and three-phase power
              and can be operated with foot pedal control for hands-free solution delivery.
            </p>
          </>
        }
        images={[
          { src: '/images/products/hp/hp25-1.webp', alt: 'HP25 High-Pressure Manual Parts Washer', series: 'HP', model: 'HP-25' },
          { src: '/images/products/hp/hp30.webp', alt: 'HP30 High-Pressure Manual Parts Washer', series: 'HP', model: 'HP-30' },
        ]}
        features={[
          'AISI 304 Stainless Steel Construction',
          'Piston-Drive Pump — Up to 870 PSI',
          'Ergonomic High-Pressure Spray Wand',
          'Foot Pedal Operation',
          'LED-Illuminated Cabinet Interior',
          'Large Window with Clearing Blower',
          'Hinged Front Door with Glove Access Port',
          'Thermostat-Controlled Electrical Heater',
          'Automatic Liquid Level Shut-Off',
          'Removable Work Tray & Screened Filter Basket',
          'Tank Drain Valve',
        ]}
        options={[
          'Oil Skimmer',
          'External Filtration System',
          'Auto-Fill',
          '24/7 Timer',
          'Steam Exhaust Fan',
          'Manual Parts Washer Pump/Brush Attachment',
          'Manual Blow-Off Wand',
        ]}
        safety={[
          'Enclosed Cabinet Containment',
          'Automatic Liquid Level Shut-Off',
          'Glove-Access Door — Operator Never Contacts Solution',
          'Low-Voltage Foot Pedal',
          'Safety Interlock on Door',
        ]}
        specs={
          <SpecAccordion title="HP Series — Full Specifications">
            <table className="w-full min-w-[520px] text-xs">
              <SpecHead cols={['Specification', 'Unit', 'HP-25', 'HP-30']} />
              <tbody className="divide-y divide-[var(--color-border)]">
                {[
                  ['Working Area', 'Inches', 'L23" × W31.5" × H19.5"', 'L27.5" × W47.5" × H19.5"'],
                  ['Load Height (from floor)', 'Inches', '38.5"', '38.5"'],
                  ['Load Weight', 'Lbs', '350 lbs', '350 lbs'],
                  ['Fluid Capacity', 'Gal (US)', '40 gal', '45 gal'],
                  ['Flow Rate', 'GPM', '3.7 GPM', '3.7 GPM'],
                  ['Spray Pressure', 'PSI', '430–870 PSI', '430–870 PSI'],
                  ['Heater', 'kW', '3 kW', '4 kW'],
                  ['Operating Temperature', '°F', '113°F', '113°F'],
                  ['Voltage / Amperage', 'V / A', '26.5 / 14', '31 / 15.5'],
                  ['Phase', '', '1/3+N', '1/3+N'],
                  ['Length (lid open)', 'Inches', '37"', '39"'],
                  ['Width', 'Inches', '45"', '60"'],
                  ['Height (lid open)', 'Inches', '79.5"', '82"'],
                  ['Shipping Dimensions', 'Inches', 'L47.5" × W31.5" × H83"', 'L47.5" × W31.5" × H83"'],
                  ['Net Weight', 'Lbs', '319 lbs', '400 lbs'],
                ].map(([label, unit, ...vals]) => (
                  <SpecRow key={label} label={label} unit={unit} values={vals} />
                ))}
              </tbody>
            </table>
          </SpecAccordion>
        }
      />

      {/* ═══════════════════════════════════════════════════════
          TOP LOAD WASHERS
      ═══════════════════════════════════════════════════════ */}

      {/* X81 Series */}
      <CatalogSection
        id="x81-series"
        badge="Top Load Washers"
        title="X81 Series — Compact Top Load Spray Cabinet Washers"
        description={
          <>
            <p>
              The X81 Series parts washers are automatic spray jet wash systems constructed using
              AISI 304 stainless steel, available in three models (L-35, L-55, L-90) with turntable
              diameters ranging from 15" to 31". Each system features a motorized rotating turntable
              and swing-away spray manifold fitted with optimized V-Jet nozzles that use water pressure
              to thoroughly clean small to medium-sized parts without manual intervention.
            </p>
            <p>
              X81 washers are specifically engineered to reduce labor cost without sacrificing wash
              performance. They are ideal for work-cell cleaning applications where the operator loads
              parts, starts the 60-minute programmable timer, and returns to their task while the
              machine works. The compact footprint makes X81 systems well-suited to machine shops,
              assembly lines, and automotive service facilities where floor space is at a premium.
            </p>
            <p>
              All X81 models feature swing-away spray manifolds that allow easy loading and unloading
              without reaching over hot nozzles. Low noise operation and a thermostat-controlled heater
              (up to 140°F) make these machines a productive and operator-friendly solution for
              day-to-day parts cleaning.
            </p>
          </>
        }
        images={[
          { src: '/images/products/x81/l35-1.webp', alt: 'X81 Series L35 Top Load Parts Washer', series: 'X81', model: 'L35' },
          { src: '/images/products/x81/l55-1.webp', alt: 'X81 Series L55 Top Load Parts Washer', series: 'X81', model: 'L55' },
          { src: '/images/products/x81/l90-1.webp', alt: 'X81 Series L90 Top Load Parts Washer', series: 'X81', model: 'L90' },
        ]}
        features={[
          'AISI 304 Stainless Steel Construction',
          'Automatic Rotary Turntable with Sprocket Drive',
          'Swing-Away V-Jet Spray Manifolds',
          'Calibrated V-Jet Spray Nozzle System',
          '60-Minute Programmable Timer',
          'Adjustable Solution Heater with Thermostat',
          'Automatic Fluid Level Sensor & Shut-Off',
          'Removable Mesh Filter Basket',
          'Tank Drain Valve',
          'Manual Lid Shock Supports',
          'Low Noise Operation',
        ]}
        options={[
          'Drying Cycle with Heated Blower',
          'Cartridge or Bag Filtration',
          'Oil Skimmer',
          'Tank Insulation',
          'Auto-Fill',
          'Stainless Steel Lid Lifter',
        ]}
        safety={[
          'Automatic Fluid Level Shut-Off',
          'Lid Shock Supports — Lid Stays Open During Loading',
          'Low Noise Enclosure',
          'Thermostat Overheat Protection',
        ]}
        specs={
          <SpecAccordion title="X81 Series — Full Specifications">
            <table className="w-full min-w-[580px] text-xs">
              <SpecHead cols={['Specification', 'Unit', 'L-35', 'L-55', 'L-90']} />
              <tbody className="divide-y divide-[var(--color-border)]">
                {[
                  ['Turntable Basket Diameter', 'Inches', '15"', '23"', '31"'],
                  ['Load Height', 'Inches', '13.5"', '13.5"', '19.5"'],
                  ['Load Weight', 'Lbs', '155 lbs', '220 lbs', '330 lbs'],
                  ['Fluid / Tank Capacity', 'Gal (US)', '15 gal', '25 gal', '30 gal'],
                  ['Pump', 'Hp', '0.75 hp', '0.75 hp', '1 hp'],
                  ['Flow Rate', 'GPM', '17 GPM', '20 GPM', '24 GPM'],
                  ['Spray Pressure', 'PSI', '37 PSI', '35 PSI', '35 PSI'],
                  ['Spray Bar (304 SS)', '', '1', '1', '1'],
                  ['V-Jet Spray Nozzles', '', '15', '15', '20'],
                  ['Heater', 'kW', '2 kW', '3 kW', '4 kW'],
                  ['Max Operating Temp', '°F', '140°F', '140°F', '140°F'],
                  ['Timer', 'Min', '0–60 min', '0–60 min', '0–60 min'],
                  ['Voltage', 'Volts', '230', '230/460', '230/460'],
                  ['Amperage', 'Amps', '13.6', '18/6.3', '20/8.5'],
                  ['Phase', '', '1', '1/3', '1/3'],
                  ['Length (lid open)', 'Inches', '26.75"', '34.75"', '46.75"'],
                  ['Width', 'Inches', '29.5"', '34.75"', '42.25"'],
                  ['Height (lid open)', 'Inches', '53.5"', '64.5"', '68.5"'],
                  ['Shipping Dimensions', 'Inches', 'L30"×W22"×H41"', 'L36"×W28"×H40"', 'L45"×W36"×H49"'],
                  ['Net Weight', 'Lbs', '110 lbs', '130 lbs', '175 lbs'],
                ].map(([label, unit, ...vals]) => (
                  <SpecRow key={label} label={label} unit={unit} values={vals} />
                ))}
              </tbody>
            </table>
          </SpecAccordion>
        }
      />

      {/* X51 Series */}
      <CatalogSection
        id="x51-series"
        badge="Top Load Washers"
        title="X51 Series — Top Load Spray Cabinet Washers"
        description={
          <>
            <p>
              The X51 Series is Magido&apos;s workhorse top-load spray cabinet washer for medium to
              large parts. Available in four models (L101, L102, L122, L152) with turntable diameters
              from 35" to 51", the X51 features a unique clamshell lid design that brings the jet-spray
              cleaning power closer to the parts for maximum wash performance. Up to two independent
              spray bars with 44–58 optimized V-Jet nozzles ensure complete coverage of complex
              geometries.
            </p>
            <p>
              The X51 is ergonomically designed to reduce shop labor cost. The operator simply loads
              parts onto the automatic turntable, starts the programmable cycle, and returns to
              other work. The turntable&apos;s rotation continuously presents all surfaces to the
              spray manifolds, eliminating the need to reposition parts mid-cycle. The L152 model
              includes a pneumatic lid lifter as standard to safely raise the heavy lid on larger
              machines.
            </p>
            <p>
              X51 machines are well suited for mid-to-high volume production cleaning of engine
              components, transmission parts, machined castings, and fabricated assemblies. Dual
              pump configurations on the L102, L122, and L152 deliver high flow rates at optimized
              spray pressures for thorough, efficient cleaning cycles.
            </p>
          </>
        }
        images={[
          { src: '/images/products/x51/l101-1.webp', alt: 'X51 Series L101 Top Load Washer', series: 'X51', model: 'L101' },
          { src: '/images/products/x51/l122-1.webp', alt: 'X51 Series L122 Top Load Washer', series: 'X51', model: 'L122' },
          { src: '/images/products/x51/l152-1.webp', alt: 'X51 Series L152 Top Load Washer', series: 'X51', model: 'L152' },
        ]}
        features={[
          'AISI 304 Stainless Steel Construction',
          'Automatic Rotary Turntable with Sprocket Drive',
          'Clamshell Lid Design — Spray Bars Close to Parts',
          'Up to 2 Spray Bars with 58 V-Jet Nozzles',
          'Programmable Wash Cycle Timer',
          'Thermostat-Controlled Heater',
          'Automatic Fluid Level Sensor & Shut-Off',
          'Removable Filter Basket',
          'Tank Drain Valve',
          'Low Noise Operation',
          'Pneumatic Lid Lifter (L152 Standard)',
        ]}
        options={[
          'Drying Cycle with Heated Blower',
          'Fresh Water or Heated Rinse Stage',
          'Cartridge or Bag Filtration',
          'Oil Skimmer',
          'Tank Insulation',
          'Auto-Fill',
          'PLC Touch Screen Control',
          'Removable Turntable with Rolling Cart',
          'Pneumatic or Electric Lid Lifter',
        ]}
        safety={[
          'Automatic Fluid Level Shut-Off',
          'Lid Safety Interlock',
          'Pneumatic Lid Lifter on Larger Models',
          'Thermostat Overheat Protection',
        ]}
        specs={
          <SpecAccordion title="X51 Series — Full Specifications">
            <table className="w-full min-w-[640px] text-xs">
              <SpecHead cols={['Specification', 'Unit', 'L101', 'L102', 'L122', 'L152']} />
              <tbody className="divide-y divide-[var(--color-border)]">
                {[
                  ['Turntable Basket Diameter', 'Inches', '35"', '35"', '45"', '51"'],
                  ['Spray Bars (304 SS)', '', '1', '2', '2', '2'],
                  ['V-Jet Spray Nozzles', '', '—', '44', '58', '—'],
                  ['Load Weight', 'Lbs', '440 lbs', '440 lbs', '770 lbs', '770 lbs'],
                  ['Load Height', 'Inches', '19.5" (16.5")', '19.5" (16.5")', '27.5" (24.5")', '31.5" (28.5")'],
                  ['Tank Capacity', 'Gal (US)', '46 gal', '46 gal', '74 gal', '80 gal'],
                  ['Pump(s)', 'Hp', '1 × 2 hp', '2 × 1.2 hp', '2 × 2 hp', '2 × 2 hp'],
                  ['Flow Rate', 'GPM', '(1) 45', '(2) 29', '(2) 47.5', '(2) 30.5'],
                  ['Spray Pressure', 'PSI', '(1) 34', '(2) 37', '(2) 34', '(2) 35'],
                  ['Heater', 'kW', '6 kW', '6 kW', '10 kW', '12 kW'],
                  ['Max Operating Temp', '°F', '140°F', '140°F', '140°F', '140°F'],
                  ['Timer', 'Min', '0–60', '0–60', '0–60', '0–60'],
                  ['Voltage', 'Volts', '230/460', '230/460', '230/460', '230/460'],
                  ['Amperage', 'Amps', '37/13', '38/14', '45/23', '52/27'],
                  ['Phase', '', '1/3', '1/3', '3', '3'],
                  ['Length (lid open)', 'Inches', '51"', '51"', '69"', '85"'],
                  ['Width', 'Inches', '48.5"', '48.5"', '58.75"', '70.75"'],
                  ['Height (lid open)', 'Inches', '78.25"', '78.25"', '89"', '94"'],
                  ['Shipping Dimensions', 'Inches', 'L49×W49×H55', 'L49×W49×H55', 'L63×W59×H71', 'L79×W79×H67'],
                  ['Net Weight', 'Lbs', '310 lbs', '330 lbs', '550 lbs', '830 lbs'],
                  ['Pneumatic Lid', '', '—', '—', '—', 'Standard'],
                ].map(([label, unit, ...vals]) => (
                  <SpecRow key={label} label={label} unit={unit} values={vals} />
                ))}
              </tbody>
            </table>
          </SpecAccordion>
        }
      />

      {/* X51 HP Series */}
      <CatalogSection
        id="x51hp-series"
        badge="Top Load Washers"
        title="X51 HP Series — High-Pressure Top Load Washers"
        description={
          <>
            <p>
              The X51 HP Series combines the proven rotary turntable spray-cabinet design of the X51
              with an integrated high-pressure spray wand capable of delivering 870 PSI — giving
              operators both automated batch-cleaning and on-demand blast cleaning in a single
              machine. Available in three models (L101HP, L102HP, L122HP) with turntables from 35" to
              45", the X51 HP is ideal for applications that encounter heavily baked-on deposits,
              carbon, or tenacious industrial soils.
            </p>
            <p>
              The standard spray manifold handles the automated rotary wash cycle, while the
              integrated high-pressure wand lets the operator target specific areas that need extra
              attention — all within the same enclosed stainless cabinet. Both the spray manifold and
              the high-pressure wand use the same heated aqueous solution, maintaining consistent
              cleaning temperature throughout.
            </p>
          </>
        }
        images={[
          { src: '/images/products/x51hp/l101hp.webp', alt: 'X51 HP Series L101HP Top Load Washer', series: 'X51 HP', model: 'L101HP' },
          { src: '/images/products/x51hp/l102hp.webp', alt: 'X51 HP Series L102HP Top Load Washer', series: 'X51 HP', model: 'L102HP' },
          { src: '/images/products/x51hp/l122hp.webp', alt: 'X51 HP Series L122HP Top Load Washer', series: 'X51 HP', model: 'L122HP' },
        ]}
        features={[
          'AISI 304 Stainless Steel Construction',
          'Automatic Rotary Turntable with Containment Ring',
          'V-Jet Spray Manifold System',
          'Integrated High-Pressure Spray Wand (870 PSI / 3.7 GPM)',
          'Thermostat-Controlled Heater',
          'Automatic Fluid Level Sensor & Shut-Off',
          '60-Minute Programmable Timer',
          'Tank Drain Valve',
        ]}
        options={[
          'Oil Skimmer',
          'Cartridge or Bag Filtration',
          'Tank Insulation',
          'Auto-Fill',
          'Drying Cycle',
        ]}
        safety={[
          'Enclosed Cabinet Contains High-Pressure Spray',
          'Automatic Fluid Level Shut-Off',
          'Thermostat Overheat Protection',
          'Lid Safety Interlock',
        ]}
        specs={
          <SpecAccordion title="X51 HP Series — Full Specifications">
            <table className="w-full min-w-[560px] text-xs">
              <SpecHead cols={['Specification', 'Unit', 'L101HP', 'L102HP', 'L122HP']} />
              <tbody className="divide-y divide-[var(--color-border)]">
                {[
                  ['Turntable with Containment Ring', 'Inches', '35"', '35"', '45"'],
                  ['Working Height', 'Inches', '19.5"', '19.5"', '27.5"'],
                  ['Load Weight', 'Lbs', '440 lbs', '440 lbs', '770 lbs'],
                  ['Fluid / Tank Capacity', 'Gal (US)', '46 gal', '46 gal', '74 gal'],
                  ['Flow Rate', 'GPM', '(1) 45 GPM', '(2) 29 GPM', '(2) 47.5 GPM'],
                  ['Spray Pressure', 'PSI', '(1) 34', '(2) 37', '(2) 34'],
                  ['High-Pressure Wand', 'GPM / PSI', '3.7 / 870', '3.7 / 870', '3.7 / 870'],
                  ['Jet-Spray Manifold (304 SS)', '', '1', '2', '2'],
                  ['V-Jet Wash Nozzles', '', '22', '44', '58'],
                  ['Heater', 'kW', '6 kW', '6 kW', '10 kW'],
                  ['Max Operating Temp', '°F', '160°F', '160°F', '160°F'],
                  ['Timer', 'Min', '0–60 min', '0–60 min', '0–60 min'],
                  ['Voltage', 'Volts', '230/460', '230/460', '230/460'],
                  ['Amperage', 'Amps', '37/13', '38/14', '45/23'],
                  ['Phase', '', '1/3', '1/3', '3'],
                  ['Length (lid open)', 'Inches', '53"', '53"', '73"'],
                  ['Width', 'Inches', '51"', '51"', '73"'],
                  ['Height (lid open)', 'Inches', '78.75"', '78.75"', '85.5"'],
                  ['Net Weight', 'Lbs', '419 lbs', '441 lbs', '739 lbs'],
                ].map(([label, unit, ...vals]) => (
                  <SpecRow key={label} label={label} unit={unit} values={vals} />
                ))}
              </tbody>
            </table>
          </SpecAccordion>
        }
      />

      {/* X51/2 Series */}
      <CatalogSection
        id="x51-2-series"
        badge="Top Load Washers"
        title="X51/2 Series — Dual-Stage Top Load Washers"
        description={
          <>
            <p>
              The X51/2 Series adds a dedicated heated rinse stage to the X51 platform, providing a
              two-stage wash-then-rinse process controlled by Siemens PLC with Weintek HMI. Available
              in three models (L103, L123, L153) with turntable diameters from 35" to 50", the
              dual-tank design prevents cross-contamination between wash and rinse solutions —
              critical for applications requiring a residue-free finish.
            </p>
            <p>
              The independent wash and rinse tanks each have their own dedicated pump, heater, and
              spray manifold. PLC control sequences the wash and rinse cycles automatically,
              while the programmable timer allows operators to fine-tune cycle times to the application.
              Tank insulation and auto-fill are included as standard on all X51/2 models,
              reducing heat loss and operator monitoring requirements.
            </p>
            <p>
              The X51/2 is the preferred choice for precision-machined parts, medical components,
              electronics assemblies, and any application where cleanliness verification is
              required and residual detergent is not acceptable.
            </p>
          </>
        }
        images={[
          { src: '/images/products/x51-2/l103-1.webp', alt: 'X51/2 Series L103 Dual-Stage Top Load Washer', series: 'X51/2', model: 'L103' },
          { src: '/images/products/x51-2/l123-1.webp', alt: 'X51/2 Series L123 Dual-Stage Top Load Washer', series: 'X51/2', model: 'L123' },
          { src: '/images/products/x51-2/l153.webp', alt: 'X51/2 Series L153 Dual-Stage Top Load Washer', series: 'X51/2', model: 'L153' },
        ]}
        features={[
          'AISI 304 Stainless Steel Construction',
          'Dual Tanks — Independent Wash & Rinse Stages',
          'Siemens PLC with Weintek HMI Touch Screen',
          'Automatic Rotary Turntable',
          '2 × V-Jet Spray Manifolds with 44–58 Nozzles',
          'Independent Heaters for Each Tank',
          'Fluid Level Sensors — Both Tanks',
          'Tank Insulation (Standard)',
          'Auto-Fill (Standard)',
          'Tank Drain Valves',
          'Low Noise Operation',
        ]}
        options={[
          'Oil Skimmer',
          'Air Blow-Off Drying Cycle',
          'Cartridge or Bag Filtration',
          'Removable Turntable with Rolling Cart',
          'Drain Pump',
          'Pneumatic or Electric Lid Lifter',
        ]}
        safety={[
          'PLC Prevents Cross-Contamination Between Tanks',
          'Fluid Level Shut-Off — Both Tanks',
          'Lid Safety Interlock',
          'Independent Thermostat Protection Per Tank',
        ]}
        specs={
          <SpecAccordion title="X51/2 Series — Full Specifications">
            <table className="w-full min-w-[560px] text-xs">
              <SpecHead cols={['Specification', 'Unit', 'L103', 'L123', 'L153']} />
              <tbody className="divide-y divide-[var(--color-border)]">
                {[
                  ['Turntable Basket Diameter', 'Inches', '35"', '45"', '50"'],
                  ['Load Height', 'Inches', '19.5"', '27.5"', '31.5"'],
                  ['Load Height (Removable TT)', 'Inches', '16.5"', '24.5"', '28.5"'],
                  ['Load Weight', 'Lbs', '440 lbs', '770 lbs', '1,102 lbs'],
                  ['Wash Tank Capacity', 'Gal (US)', '35 gal', '55 gal', '79 gal'],
                  ['Rinse Tank Capacity', 'Gal (US)', '23 gal', '25 gal', '65 gal'],
                  ['Wash Pump Power', 'Hp', '1 hp', '1.5 hp', '2 hp'],
                  ['Wash Spray Pressure', 'PSI', '37 PSI', '34 PSI', '35 PSI'],
                  ['Wash Flow Rate', 'GPM', '23 GPM', '45 GPM', '30.5 GPM'],
                  ['Rinse Pump Power', 'Hp', '1 hp', '1.5 hp', '2 hp'],
                  ['Rinse Spray Pressure', 'PSI', '35 PSI', '35 PSI', '35 PSI'],
                  ['Rinse Flow Rate', 'GPM', '21 GPM', '23 GPM', '30.5 GPM'],
                  ['Turntable Motor', 'Hp', '0.35 hp', '0.5 hp', '0.5 hp'],
                  ['Turntable Speed', 'RPM', '7 RPM', '7 RPM', '7 RPM'],
                  ['Wash Tank Heater', 'kW', '6 kW', '10 kW', '12 kW'],
                  ['Rinse Tank Heater', 'kW', '4 kW', '4 kW', '8 kW'],
                  ['Spray Bars (304 SS)', '', '2', '2', '2'],
                  ['V-Jet Spray Nozzles', '', '44', '58', '58'],
                  ['Max Operating Temp', '°F', '140°F', '140°F', '140°F'],
                  ['PLC', '', 'Siemens', 'Siemens', 'Siemens'],
                  ['HMI', '', 'Weintek', 'Weintek', 'Weintek'],
                  ['Voltage', 'Volts', '230/460', '230/460', '230/460'],
                  ['Phase', '', '3', '3', '3'],
                  ['Length (lid open)', 'Inches', '51"', '72"', '80.5"'],
                  ['Width', 'Inches', '81"', '90.5"', '118"'],
                  ['Height (lid open)', 'Inches', '78.75"', '86"', '95.5"'],
                  ['Shipping Dimensions', 'Inches', 'L87"×W63"×H45"', 'L70"×W92"×H75"', 'L86"×W123"×H65"'],
                  ['Net Weight', 'Lbs', '915 lbs', '1,234 lbs', '1,358 lbs'],
                ].map(([label, unit, ...vals]) => (
                  <SpecRow key={label} label={label} unit={unit} values={vals} />
                ))}
              </tbody>
            </table>
          </SpecAccordion>
        }
      />

      {/* FLS Series */}
      <CatalogSection
        id="fls-series"
        badge="Top Load Washers"
        title="FLS Series — Heavy-Duty Top Load Washers"
        description={
          <>
            <p>
              The FLS Series represents Magido&apos;s heavy-duty top-load platform, designed for
              high-capacity cleaning of large, heavy parts up to 1,500 lbs. Available in three
              models (FLS-30, FLS-35, FLS-45) with turntable diameters from 30" to 45", the FLS
              Series delivers high flow rates (up to 75 GPM) and spray pressures up to 60 PSI
              for demanding industrial cleaning applications.
            </p>
            <p>
              The FLS platform is commonly specified for heavy equipment component cleaning,
              large casting and forging operations, agricultural equipment maintenance, and
              any application requiring the cleaning of very heavy or oversized components
              that exceed the capacity of standard top-load systems. The robust drive system
              handles the full rated load at a steady 7 RPM turntable speed.
            </p>
          </>
        }
        images={[
          { src: '/images/products/fls/fls35-closed.webp', alt: 'FLS35 Heavy-Duty Top Load Washer', series: 'FLS', model: 'FLS-35' },
          { src: '/images/products/fls/fls35-open.webp', alt: 'FLS35 Heavy-Duty Top Load Washer Open', series: 'FLS', model: 'FLS-35' },
        ]}
        features={[
          'AISI 304 Stainless Steel Construction',
          'Heavy-Duty Rotary Turntable — Up to 1,500 lbs',
          'High-Flow Pump System (up to 75 GPM)',
          'High Spray Pressure (up to 60 PSI)',
          'Thermostat-Controlled Heater',
          'Programmable 0–60 Minute Timer',
          'Fluid Level Sensor & Shut-Off',
          'Tank Drain Valve',
        ]}
        options={[
          'Drying Cycle',
          'Rinse Stage',
          'Filtration System',
          'Oil Skimmer',
          'Auto-Fill',
          'PLC Control',
          'Electric Lid Lifter',
        ]}
        safety={[
          'Heavy-Duty Lid Support System',
          'Fluid Level Shut-Off',
          'Thermostat Overheat Protection',
          'Lid Safety Interlock',
        ]}
        specs={
          <SpecAccordion title="FLS Series — Full Specifications">
            <table className="w-full min-w-[560px] text-xs">
              <SpecHead cols={['Specification', 'Unit', 'FLS-30', 'FLS-35', 'FLS-45']} />
              <tbody className="divide-y divide-[var(--color-border)]">
                {[
                  ['Turntable Diameter', 'Inches', '30"', '35"', '45"'],
                  ['Working Height', 'Inches', '40"', '40"', '52"'],
                  ['Weight Capacity', 'Lbs', '1,200 lbs', '1,200 lbs', '1,500 lbs'],
                  ['Fluid / Tank Capacity', 'Gal (US)', '60 gal', '70 gal', '130 gal'],
                  ['Pump Power', 'Hp', '2', '3', '5.5'],
                  ['Pump Output', 'GPM', '40 GPM', '50 GPM', '75 GPM'],
                  ['Pump Pressure', 'PSI', '45 PSI', '50 PSI', '60 PSI'],
                  ['Timer', 'Min', '0–60', '0–60', '0–60'],
                  ['Turntable Speed', 'RPM', '7', '7', '7'],
                  ['Tank Heater', 'kW', '10 kW', '10 kW', '16 kW'],
                  ['Operating Temperature', '°F', '140°F', '140°F', '140°F'],
                  ['Voltage', 'Volts', '230', '230/480', '230/480'],
                  ['Total Full Load Amps', 'Amps', '25/10', '37/13', '38/14'],
                  ['Phase', '', '1', '3', '3'],
                  ['Overall Dimensions', 'Inches', '50"×60"×72"', '55"×65"×72"', '64"×90"×83"'],
                  ['Net Weight', 'Lbs', '1,500 lbs', '1,700 lbs', '2,200 lbs'],
                ].map(([label, unit, ...vals]) => (
                  <SpecRow key={label} label={label} unit={unit} values={vals} />
                ))}
              </tbody>
            </table>
          </SpecAccordion>
        }
      />

      {/* ═══════════════════════════════════════════════════════
          FRONT LOAD WASHERS
      ═══════════════════════════════════════════════════════ */}

      {/* X53 Series */}
      <CatalogSection
        id="x53-series"
        badge="Front Load Washers"
        title="X53 Series — Front Load Spray Cabinet Washers"
        description={
          <>
            <p>
              The Magido X53 Series parts washers are engineered for automatic spray parts washing
              applications utilizing aqueous detergents at temperatures up to 160°F. The front-loading
              design provides easy access for loading and unloading of heavy or awkward parts without
              requiring the operator to lift over the machine — a significant ergonomic advantage
              for large components.
            </p>
            <p>
              The X53 uses a fixed platform on which parts are placed, with a series of angled
              V-Jet nozzles configured on a spray ramp to optimally wash all surfaces. The
              motorized turntable continuously rotates parts through the spray pattern for complete
              coverage. The turntable removes easily from the wash system onto a mobile cart for
              convenient loading and unloading away from the machine.
            </p>
            <p>
              Available in four models (L160 through L240) with turntable capacities from 43"×43"
              to 71"×71" and 1,500 lb load capacity on all models, the X53 is designed for heavy
              industrial production cleaning. All models feature Siemens PLC control with Weintek
              HMI touch screen, tank insulation, auto-fill, and exhaust fan as standard.
              Three-phase 460V power is required.
            </p>
          </>
        }
        images={[
          { src: '/images/products/x53/l160.webp', alt: 'X53 Series L160 Front Load Parts Washer', series: 'X53', model: 'L160' },
          { src: '/images/products/x53/l190-1.webp', alt: 'X53 Series L190 Front Load Parts Washer', series: 'X53', model: 'L190' },
          { src: '/images/products/x53/l210.webp', alt: 'X53 Series L210 Front Load Parts Washer', series: 'X53', model: 'L210' },
        ]}
        features={[
          'AISI 304 Stainless Steel Construction',
          'Front-Loading Door for Easy Part Access',
          'Fixed Platform with Angled V-Jet Spray Ramp',
          'Automatic Rotary Turntable',
          'Siemens PLC with Weintek HMI Touch Screen',
          '60-Minute Programmable Timer',
          'Thermostat-Controlled Heater (up to 160°F)',
          'Fluid Level Sensor & Auto Shut-Off',
          'Tank Insulation (Standard)',
          'Auto-Fill (Standard)',
          'Exhaust Fan (Standard)',
          'Removable Turntable with Rolling Loading Cart',
          'Low Noise Operation',
        ]}
        options={[
          'Oil Skimmer',
          'Air Blow-Off Drying Cycle',
          'Heated or Fresh Water Rinse Stage',
          'Cartridge, Bag, or Coalescent Filtration',
          'Increased Weight Capacity',
        ]}
        safety={[
          'Front Door Safety Interlock — Cycle Stops if Door Opens',
          'Fluid Level Shut-Off',
          'Exhaust Fan — Steam Removal During Cycle',
          'PLC Fault Detection and Alarm',
          'Thermostat Overheat Protection',
        ]}
        specs={
          <SpecAccordion title="X53 Series — Full Specifications">
            <table className="w-full min-w-[640px] text-xs">
              <SpecHead cols={['Specification', 'Unit', 'L160', 'L190', 'L210', 'L240']} />
              <tbody className="divide-y divide-[var(--color-border)]">
                {[
                  ['Turntable Basket', 'Inches', '43"×43"', '51"×51"', '59"×59"', '71"×71"'],
                  ['Load Height', 'Inches', '31.5"', '35.5"', '39"', '39"'],
                  ['Load Weight', 'Lbs', '1,500 lbs', '1,500 lbs', '1,500 lbs', '1,500 lbs'],
                  ['Fluid / Tank Capacity', 'Gal (US)', '77 gal', '103 gal', '132 gal', '185 gal'],
                  ['Pump(s)', 'Hp', '7.5', '10', '10', '10'],
                  ['Flow Rate', 'GPM', '132 GPM', '145 GPM', '145 GPM', '145 GPM'],
                  ['Spray Pressure', 'PSI', '58 PSI', '65 PSI', '65 PSI', '65 PSI'],
                  ['Heater', 'kW', '20 kW', '30 kW', '30 kW', '36 kW'],
                  ['Max Operating Temp', '°F', '160°F', '160°F', '160°F', '160°F'],
                  ['Voltage', 'Volts', '460V 60Hz', '460V 60Hz', '460V 60Hz', '460V 60Hz'],
                  ['Phase', '', '3', '3', '3', '3'],
                  ['PLC', '', 'Siemens', 'Siemens', 'Siemens', 'Siemens'],
                  ['HMI', '', 'Weintek', 'Weintek', 'Weintek', 'Weintek'],
                  ['Overall Dims (closed)', 'Inches', 'L82"×W63"×H91.5"', 'L90.5"×W72"×H91.5"', 'L98.5"×W80"×H99.5"', 'L111"×W92"×H99.5"'],
                  ['Overall Dims (open)', 'Inches', 'L82"×W63"×H116"', 'L90.5"×W72"×H116"', 'L98.5"×W80"×H132"', 'L111"×W92"×H132"'],
                  ['Net Weight', 'Lbs', '2,048', '2,481', '2,590', '2,866'],
                ].map(([label, unit, ...vals]) => (
                  <SpecRow key={label} label={label} unit={unit} values={vals} />
                ))}
              </tbody>
            </table>
          </SpecAccordion>
        }
      />

      {/* X53/2 Series */}
      <CatalogSection
        id="x53-2-series"
        badge="Front Load Washers"
        title="X53/2 Series — Dual-Stage Front Load Washers"
        description={
          <>
            <p>
              The X53/2 Series adds a full-capacity dedicated rinse stage to the X53 platform.
              Both the wash and rinse tanks have equal capacity and independent pump, heater, and
              spray systems — providing true two-stage aqueous cleaning with complete solution
              separation and no cross-contamination.
            </p>
            <p>
              As with the X53, operation is based on a fixed platform with angled jet nozzles on
              a spray ramp, combined with an automatic motorized turntable. The turntable removes
              easily onto a mobile cart for convenient loading of heavy assemblies. Turntable
              capacity goes up to 71"×71" with an optional upgrade to 5,000 lb weight capacity.
            </p>
            <p>
              All X53/2 models include a motor-driven exhaust fan as standard to remove steam
              and maintain a comfortable work environment. The Siemens PLC and Weintek HMI provide
              full process control, cycle logging, and fault diagnostics. This series is the
              premium choice for high-production environments requiring the highest levels of
              cleanliness and process repeatability.
            </p>
          </>
        }
        images={[
          { src: '/images/products/x53-2/l162.webp', alt: 'X53/2 Series L162 Dual-Stage Front Load Washer', series: 'X53/2', model: 'L162' },
          { src: '/images/products/x53-2/l192.webp', alt: 'X53/2 Series L192 Dual-Stage Front Load Washer', series: 'X53/2', model: 'L192' },
          { src: '/images/products/x53-2/l212.webp', alt: 'X53/2 Series L212 Dual-Stage Front Load Washer', series: 'X53/2', model: 'L212' },
        ]}
        features={[
          'AISI 304 Stainless Steel Construction',
          'Dual Equal-Capacity Wash & Rinse Tanks',
          'Siemens PLC with Weintek HMI Touch Screen',
          'Front-Loading Door — Easy Heavy Part Access',
          'Automatic Rotary Turntable with Motor Drive',
          'Fixed Platform with Angled V-Jet Spray Ramp',
          'Independent Pumps, Heaters & Manifolds Per Tank',
          'Motorized Exhaust Fan (Standard)',
          'Removable Turntable with Rolling Loading Cart',
          'Tank Insulation (Standard)',
          'Auto-Fill (Standard)',
        ]}
        options={[
          'Oil Skimmer',
          'Air Blow-Off Drying Cycle',
          'Filtration Upgrades',
          'Increase Weight Capacity to 5,000 lbs',
        ]}
        safety={[
          'Front Door Safety Interlock',
          'Fluid Level Shut-Off — Both Tanks',
          'Motorized Steam Exhaust Fan',
          'PLC Fault Detection and Alarm',
          'Independent Thermostat Protection Per Tank',
        ]}
        specs={
          <SpecAccordion title="X53/2 Series — Full Specifications">
            <table className="w-full min-w-[640px] text-xs">
              <SpecHead cols={['Specification', 'Unit', 'L162', 'L192', 'L212', 'L242']} />
              <tbody className="divide-y divide-[var(--color-border)]">
                {[
                  ['Turntable Basket', 'Inches', '43"×43"', '51"×51"', '59"×59"', '71"×71"'],
                  ['Load Height', 'Inches', '31.5"', '35.5"', '39"', '39"'],
                  ['Load Weight', 'Lbs', '1,500 lbs', '1,500 lbs', '1,500 lbs', '1,500 lbs'],
                  ['Wash Tank Capacity', 'Gal (US)', '77 gal', '103 gal', '132 gal', '185 gal'],
                  ['Rinse Tank Capacity', 'Gal (US)', '77 gal', '103 gal', '132 gal', '185 gal'],
                  ['Wash Pump', 'Hp', '7.5 hp', '10 hp', '10 hp', '10 hp'],
                  ['Wash Flow Rate', 'GPM', '132 GPM', '132 GPM', '132 GPM', '132 GPM'],
                  ['Wash Spray Pressure', 'PSI', '65 PSI', '68 PSI', '68 PSI', '68 PSI'],
                  ['Rinse Pump', 'Hp', '5.5 hp', '5.5 hp', '5.5 hp', '5.5 hp'],
                  ['Rinse Flow Rate', 'GPM', '106 GPM', '106 GPM', '106 GPM', '106 GPM'],
                  ['Rinse Spray Pressure', 'PSI', '58 PSI', '58 PSI', '58 PSI', '58 PSI'],
                  ['Wash Tank Heater', 'kW', '20 kW', '28 kW', '30 kW', '30 kW'],
                  ['Rinse Tank Heater', 'kW', '10 kW', '12 kW', '20 kW', '20 kW'],
                  ['Max Operating Temp', '°F', '160°F', '160°F', '160°F', '160°F'],
                  ['Turntable Motor', 'Hp', '0.5 hp', '0.5 hp', '0.5 hp', '0.5 hp'],
                  ['Turntable Speed', 'RPM', '7 RPM', '7 RPM', '7 RPM', '7 RPM'],
                  ['Exhaust Fan', 'Hp / CFM', '0.5 hp / 382 cfm', '0.5 hp / 382 cfm', '0.5 hp / 382 cfm', '0.5 hp / 382 cfm'],
                  ['Voltage', 'Volts', '460V', '460V', '460V', '460V'],
                  ['Phase', '', '3', '3', '3', '3'],
                  ['PLC', '', 'Siemens', 'Siemens', 'Siemens', 'Siemens'],
                  ['HMI', '', 'Weintek', 'Weintek', 'Weintek', 'Weintek'],
                  ['Overall Dims (closed)', 'Inches', 'L84"×W100"×H93"', 'L92"×W112"×H97"', 'L100"×W116"×H100"', 'L148"×W95"×H101"'],
                  ['Overall Dims (open)', 'Inches', 'L84"×W100"×H118"', 'L92"×W112"×H116"', 'L100"×W116"×H134"', 'L148"×W95"×H134"'],
                  ['Net Weight', 'Lbs', '2,645', '2,976', '3,127', '3,640'],
                ].map(([label, unit, ...vals]) => (
                  <SpecRow key={label} label={label} unit={unit} values={vals} />
                ))}
              </tbody>
            </table>
          </SpecAccordion>
        }
      />

      {/* ═══════════════════════════════════════════════════════
          IMMERSION WASHERS
      ═══════════════════════════════════════════════════════ */}

      {/* Agita Series */}
      <CatalogSection
        id="agita-series"
        badge="Immersion Washers"
        title="Agita Series — Ultrasonic-Agitation Immersion Parts Washers"
        description={
          <>
            <p>
              The Magido Agita Series immersion parts washers use a combination of heated aqueous
              immersion and mechanical agitation to achieve thorough cleaning of complex parts with
              internal passages, blind holes, and intricate geometries that spray-based systems
              cannot fully reach. Parts are placed on a platform that is lowered into the heated
              bath, where turbulent agitation drives cleaning solution into every crevice.
            </p>
            <p>
              Available in four models (A700 through A1300) with platform sizes from
              27.6"×15.7" to 51.2"×23.6" and solution temperatures up to 170°F, the Agita Series
              is designed for precision cleaning of hydraulic components, fuel system parts,
              bearing housings, intricate machined parts, and other components that demand
              internal cleanliness verification.
            </p>
            <p>
              All Agita models are controlled by Siemens PLC for programmable cycle control and
              process repeatability. The large fluid capacity (70–180 gallons) ensures consistent
              bath chemistry over extended production runs. Three-phase power is required for A900
              through A1300 models.
            </p>
          </>
        }
        images={[
          { src: '/images/products/agita/a700.webp', alt: 'Agita A700 Immersion Parts Washer', series: 'Agita', model: 'A700' },
          { src: '/images/products/agita/a900.webp', alt: 'Agita A900 Immersion Parts Washer', series: 'Agita', model: 'A900' },
          { src: '/images/products/agita/a1100.webp', alt: 'Agita A1100 Immersion Parts Washer', series: 'Agita', model: 'A1100' },
        ]}
        features={[
          'AISI 304 Stainless Steel Construction',
          'Heated Immersion Bath with Mechanical Agitation',
          'Large-Capacity Insulated Tank (70–180 gal)',
          'Temperature Range: Ambient to 170°F',
          'Siemens PLC Programmable Control',
          'Fluid Level Sensor & Shut-Off',
          'Tank Drain Valve',
        ]}
        options={[
          'Rinse Stage',
          'Heated Drying Stage',
          'Oil Skimmer',
          'Filtration Systems',
          'Auto-Fill',
          'Ultrasonic Transducers',
        ]}
        safety={[
          'Fluid Level Shut-Off',
          'High-Temperature Limit Protection',
          'PLC Fault Detection',
          'Thermostat Overheat Protection',
        ]}
        specs={
          <SpecAccordion title="Agita Series — Full Specifications">
            <table className="w-full min-w-[640px] text-xs">
              <SpecHead cols={['Specification', 'Unit', 'A700', 'A900', 'A1100', 'A1300']} />
              <tbody className="divide-y divide-[var(--color-border)]">
                {[
                  ['Platform', 'Inches', 'W27.6"×D15.7"', 'W35.4"×D15.7"', 'W43.4"×D15.7"', 'W51.2"×D23.6"'],
                  ['Working Height', 'Inches', '13.8"', '15.7"', '15.7"', '15.7"'],
                  ['Load Weight', 'Lbs', '180 lbs', '550 lbs', '550 lbs', '550 lbs'],
                  ['Fluid / Tank Capacity', 'Gal (US)', '70 gal', '100 gal', '140 gal', '180 gal'],
                  ['Heater', 'kW', '6 kW', '8 kW', '10 kW', '12 kW'],
                  ['Operating Temperature', '°F', 'Ambient–170°F', 'Ambient–170°F', 'Ambient–170°F', 'Ambient–170°F'],
                  ['PLC', '', 'Siemens', 'Siemens', 'Siemens', 'Siemens'],
                  ['Voltage / Amperage', 'V / A', '230/460', '230/460', '230/460', '230/460'],
                  ['Phase', '', '1–3', '3', '3', '3'],
                  ['Length', 'Inches', '38"', '38"', '42"', '47"'],
                  ['Width', 'Inches', '60"', '68"', '76"', '84"'],
                  ['Height', 'Inches', '59"', '67"', '67"', '70"'],
                ].map(([label, unit, ...vals]) => (
                  <SpecRow key={label} label={label} unit={unit} values={vals} />
                ))}
              </tbody>
            </table>
          </SpecAccordion>
        }
      />

      {/* ═══════════════════════════════════════════════════════
          ROTARY DRUM WASHERS
      ═══════════════════════════════════════════════════════ */}

      <CatalogSection
        id="rotary-drum"
        badge="Rotary Drum Washers"
        title="Rotary Drum Aqueous Parts Washing Systems"
        description={
          <>
            <p>
              Magido industrial rotary-auger drum wash systems are the right choice for continuous,
              high-volume parts cleaning operations. Parts are loaded into the hopper and augured
              through the machine&apos;s helical-drum processing chamber, where they are cleaned by
              a dual-action process: submersion flushes the inside of hollow parts while spray
              cleaning action cleans all exterior surfaces simultaneously.
            </p>
            <p>
              The Jolly Series (J320, J320/2) is the compact entry-level rotary drum, ideal for
              small shops processing moderate volumes of small parts. The Spira 1b Series (SP320
              through SP950) provides single-stage wash with integral drying for production
              environments. The Spira 2b Series (SP320/2 through SP950/2) adds a full rinse
              stage for applications requiring residue-free parts.
            </p>
            <p>
              Every rotary drum system is customized to the customer&apos;s exact specifications
              with process zones that can include prewash, wash, rinse, rust prevention,
              blow-off, and heated drying. Drum diameters range from 8" (Jolly J210) to 37"
              (Spira SP950), and drum lengths from 47" to 208". All models are controlled by
              Siemens PLC and operate on 460V three-phase power.
            </p>
          </>
        }
        images={[
          { src: '/images/products/jolly/j320-1.webp', alt: 'Jolly J320 Rotary Drum Washer', series: 'Jolly', model: 'J320' },
          { src: '/images/products/spira-1b/sp480.webp', alt: 'Spira 1b Series SP480 Rotary Drum Washer', series: 'Spira 1b', model: 'SP480' },
          { src: '/images/products/spira-1b/sp950.webp', alt: 'Spira SP950 Rotary Drum Washer', series: 'Spira 1b', model: 'SP950' },
        ]}
        features={[
          'AISI 304 Stainless Steel Construction',
          'Helical Auger Drum — Continuous Parts Flow',
          'Dual-Action Cleaning: Submersion + Spray',
          'Heated Insulated Wash Tank',
          'Adjustable Drum Speed',
          'Siemens PLC Control',
          'Electric Drying Stage (Spira Series)',
          'Steam Aspirator',
          'Customizable Process Zones',
        ]}
        options={[
          'Oil Skimmer',
          'Automatic Water Fill',
          'Automatic Drain Pump',
          'Bag Filtration',
          'Oil Coalescing System',
          'Rinse Stage (Spira 2b / Jolly /2)',
          'Rust Prevention Stage',
          'Custom Drum Diameter & Length',
          'Loading Hopper with Vibrating Feeder',
        ]}
        safety={[
          'Enclosed Drum — No Operator Contact with Parts During Cycle',
          'Fluid Level Shut-Off',
          'Steam Aspirator Removes Vapor',
          'PLC Fault Detection and Alarm',
          'Emergency Stop',
        ]}
        specs={
          <>
            <SpecAccordion title="Jolly Series — Full Specifications">
              <table className="w-full min-w-[560px] text-xs">
                <SpecHead cols={['Specification', 'Unit', 'J320', 'J320/2']} />
                <tbody className="divide-y divide-[var(--color-border)]">
                  {[
                    ['Production', 'CFH', '1.4', '1.4'],
                    ['Drum Diameter', 'Inches', '12"', '12"'],
                    ['Drum Length', 'Inches', '47"', '71"'],
                    ['Thread Pitch', 'Inches', '5"', '5"'],
                    ['Thread Depth', 'Inches', '2"', '2"'],
                    ['Loading Height', 'Inches', '35"', '35"'],
                    ['Unloading Height', 'Inches', '21"', '21"'],
                    ['Wash Tank', 'Gal (US)', '27', '27'],
                    ['Rinse Tank', 'Gal (US)', '—', '27'],
                    ['Wash Pump', 'Hp', '0.75', '0.75'],
                    ['Wash Flow / Pressure', 'GPM / PSI', '21 / 30', '21 / 30'],
                    ['Wash Heater', 'kW', '8', '8'],
                    ['Solution Temperature', '°F', '100–140°F', '100–140°F'],
                    ['Steam Aspirator', 'Hp / CFM', '0.12 / 60', '0.12 / 60'],
                    ['Overall Width', 'Inches', '32"', '42"'],
                    ['Overall Height', 'Inches', '54"', '65"'],
                    ['Overall Depth', 'Inches', '65"', '90"'],
                    ['Power Supply', 'Volts', '460V 3Ph 60Hz', '460V 3Ph 60Hz'],
                    ['PLC', '', 'Siemens', 'Siemens'],
                  ].map(([label, unit, ...vals]) => (
                    <SpecRow key={label} label={label} unit={unit} values={vals} />
                  ))}
                </tbody>
              </table>
            </SpecAccordion>

            <SpecAccordion title="Spira 1b Series — Full Specifications">
              <table className="w-full min-w-[680px] text-xs">
                <SpecHead cols={['Specification', 'Unit', 'SP320', 'SP480', 'SP640', 'SP950']} />
                <tbody className="divide-y divide-[var(--color-border)]">
                  {[
                    ['Production', 'CFH', '3.2', '6.4', '12.7', '25'],
                    ['Drum Diameter', 'Inches', '12"', '19"', '25"', '37"'],
                    ['Drum Length', 'Inches', '67"', '98"', '98"', '150"'],
                    ['Thread Pitch', 'Inches', '5"', '6"', '8"', '12"'],
                    ['Thread Depth', 'Inches', '2"', '3"', '5"', '10"'],
                    ['Loading Height', 'Inches', '50"', '58"', '58"', '76"'],
                    ['Unloading Height', 'Inches', '28"', '32"', '32"', '32"'],
                    ['Wash Tank', 'Gal (US)', '90', '130', '130', '210'],
                    ['Wash Pump', 'Hp', '3', '4', '4', '5.5'],
                    ['Wash Flow / Pressure', 'GPM / PSI', '65 / 43', '90 / 43', '90 / 43', '105 / 50'],
                    ['Wash Heater', 'kW', '16', '24', '24', '32'],
                    ['Solution Temperature', '°F', '100–160°F', '100–160°F', '100–160°F', '100–160°F'],
                    ['Steam Aspirator', 'Hp / CFM', '0.25 / 180', '0.25 / 180', '0.25 / 180', '0.75 / 470'],
                    ['Electric Drying', 'kW', '9', '15', '15', '24'],
                    ['Overall Width', 'Inches', '55"', '65"', '65"', '80"'],
                    ['Overall Height', 'Inches', '75"', '90"', '90"', '105"'],
                    ['Overall Depth', 'Inches', '100"', '140"', '140"', '200"'],
                    ['Power Supply', 'Volts', '460V 3Ph 60Hz', '460V 3Ph 60Hz', '460V 3Ph 60Hz', '460V 3Ph 60Hz'],
                    ['PLC', '', 'Siemens', 'Siemens', 'Siemens', 'Siemens'],
                  ].map(([label, unit, ...vals]) => (
                    <SpecRow key={label} label={label} unit={unit} values={vals} />
                  ))}
                </tbody>
              </table>
            </SpecAccordion>

            <SpecAccordion title="Spira 2b Series — Full Specifications">
              <table className="w-full min-w-[680px] text-xs">
                <SpecHead cols={['Specification', 'Unit', 'SP320/2', 'SP480/2', 'SP640/2', 'SP950/2']} />
                <tbody className="divide-y divide-[var(--color-border)]">
                  {[
                    ['Production', 'CFH', '3.2', '6.4', '12.7', '25'],
                    ['Drum Diameter', 'Inches', '12"', '19"', '25"', '37"'],
                    ['Drum Length', 'Inches', '106"', '138"', '138"', '208"'],
                    ['Loading Height', 'Inches', '50"', '58"', '58"', '76"'],
                    ['Unloading Height', 'Inches', '28"', '32"', '32"', '32"'],
                    ['Wash Tank', 'Gal (US)', '90', '130', '130', '210'],
                    ['Rinse Tank', 'Gal (US)', '90', '130', '130', '210'],
                    ['Wash Pump', 'Hp', '3', '4', '4', '5.5'],
                    ['Wash Flow / Pressure', 'GPM / PSI', '65 / 43', '90 / 43', '90 / 43', '105 / 50'],
                    ['Rinse Pump', 'Hp', '3', '4', '4', '5.5'],
                    ['Rinse Flow / Pressure', 'GPM / PSI', '65 / 43', '65 / 43', '90 / 43', '105 / 50'],
                    ['Wash Heater', 'kW', '16', '24', '24', '32'],
                    ['Rinse Heater', 'kW', '12', '18', '18', '24'],
                    ['Solution Temperature', '°F', '100–160°F', '100–160°F', '100–160°F', '100–160°F'],
                    ['Steam Aspirator', 'Hp / CFM', '0.25 / 180', '0.25 / 180', '0.25 / 180', '0.75 / 470'],
                    ['Electric Drying', 'kW', '9', '15', '15', '24'],
                    ['Overall Width', 'Inches', '55"', '70"', '70"', '80"'],
                    ['Overall Height', 'Inches', '75"', '90"', '90"', '105"'],
                    ['Overall Depth', 'Inches', '140"', '175"', '175"', '255"'],
                    ['Power Supply', 'Volts', '460V 3Ph 60Hz', '460V 3Ph 60Hz', '460V 3Ph 60Hz', '460V 3Ph 60Hz'],
                    ['PLC', '', 'Siemens', 'Siemens', 'Siemens', 'Siemens'],
                  ].map(([label, unit, ...vals]) => (
                    <SpecRow key={label} label={label} unit={unit} values={vals} />
                  ))}
                </tbody>
              </table>
            </SpecAccordion>
          </>
        }
      />

      {/* ═══════════════════════════════════════════════════════
          IN-LINE BELT CONVEYOR
      ═══════════════════════════════════════════════════════ */}

      <CatalogSection
        id="conveyor"
        badge="In-Line Belt Conveyor Washers"
        title="In-Line Belt Conveyor Aqueous Parts Washing Systems"
        description={
          <>
            <p>
              Magido industrial in-line belt conveyor wash systems are the right choice for
              flow-through production cleaning processes. Parts are loaded onto the stainless steel
              conveyor belt and continuously transported through the machine&apos;s processing zones —
              pre-wash, wash, rinse, rust prevention, blow-off, and drying — emerging clean and
              dry at the discharge end, ready for the next production step.
            </p>
            <p>
              The Silver Series (S200–S400) is the compact entry-level conveyor washer with belt
              widths from 8" to 16", designed for small to medium parts at moderate throughput.
              The Gold 1b Series (G200–G1000) provides single-stage wash with drying for
              production volumes, available in nine belt widths from 8" to 39". The Gold 2b
              Series (G200/2–G1000/2) adds a full rinse stage for applications requiring a
              contaminant-free finish.
            </p>
            <p>
              Conveyor belt speeds are adjustable (0.7–5 fpm) to dial in the optimal dwell
              time for each cleaning application. All systems use environmentally safe aqueous
              cleaning solutions and are controlled by Siemens PLC. Each system is built to
              order and can be configured with any combination of process zones to match the
              exact requirements of the application.
            </p>
          </>
        }
        images={[
          { src: '/images/products/silver/s200.webp', alt: 'Silver Series S200 In-Line Belt Conveyor Washer', series: 'Silver', model: 'S200' },
          { src: '/images/products/gold-1b/g400.webp', alt: 'Gold 1b Series G400 In-Line Belt Conveyor Washer', series: 'Gold 1b', model: 'G400' },
          { src: '/images/products/gold-2b/g1000.webp', alt: 'Gold 2b Series G1000 In-Line Belt Conveyor Washer', series: 'Gold 2b', model: 'G1000' },
        ]}
        features={[
          'AISI 304 Stainless Steel Construction',
          'Continuous Stainless Steel Conveyor Belt',
          'Adjustable Belt Speed (0.7–5 fpm)',
          'V-Jet Spray Nozzle Arrays (Wash & Rinse)',
          'Heated Insulated Wash Tank',
          'Electric Drying Stage',
          'Steam Aspirator',
          'Siemens PLC Control',
          'Customizable Process Zones',
        ]}
        options={[
          'Pre-Wash Stage',
          'Rinse Stage (Gold 2b)',
          'Rust Prevention Stage',
          'Blow-Off Stage',
          'Oil Skimmer',
          'Bag Filtration',
          'Oil Coalescing System',
          'Automatic Water Fill',
          'Automatic Drain Pumps',
          'Loading and Unloading Conveyors',
        ]}
        safety={[
          'Enclosed Spray Zones',
          'Steam Aspirator — Vapor Removal',
          'Fluid Level Shut-Off',
          'PLC Fault Detection and Alarm',
          'Emergency Stop',
          'Belt Overload Protection',
        ]}
        specs={
          <>
            <SpecAccordion title="Silver Series — Full Specifications">
              <table className="w-full min-w-[560px] text-xs">
                <SpecHead cols={['Specification', 'Unit', 'S200', 'S300', 'S400']} />
                <tbody className="divide-y divide-[var(--color-border)]">
                  {[
                    ['Belt Width', 'Inches', '8"', '12"', '16"'],
                    ['Usable Washing Height', 'Inches', '12"', '12"', '12"'],
                    ['Real Load', 'lb/yd', '100', '100', '100'],
                    ['Belt Speed', 'fpm', '0.7–3.3', '0.7–3.3', '0.7–3.3'],
                    ['Loading Height', 'Inches', '32"', '32"', '32"'],
                    ['Wash Tank', 'Gal (US)', '40', '40', '40'],
                    ['Wash Pump', 'Hp', '1.2', '1.2', '1.2'],
                    ['Wash Flow / Pressure', 'GPM / PSI', '32 / 36', '32 / 36', '32 / 36'],
                    ['Wash Heater', 'kW', '12', '12', '12'],
                    ['Solution Temperature', '°F', '100–140°F', '100–140°F', '100–140°F'],
                    ['Steam Aspirator', 'Hp / CFM', '0.25 / 180', '0.25 / 180', '0.25 / 180'],
                    ['Electric Drying', 'kW', '9', '9', '9'],
                    ['Overall Width', 'Inches', '47"', '47"', '47"'],
                    ['Overall Height', 'Inches', '70"', '70"', '70"'],
                    ['Overall Depth', 'Inches', '106"', '106"', '106"'],
                    ['Power Supply', '', '460V / 3Ph+N / 60Hz', '460V / 3Ph+N / 60Hz', '460V / 3Ph+N / 60Hz'],
                    ['PLC', '', 'Siemens', 'Siemens', 'Siemens'],
                  ].map(([label, unit, ...vals]) => (
                    <SpecRow key={label} label={label} unit={unit} values={vals} />
                  ))}
                </tbody>
              </table>
            </SpecAccordion>

            <SpecAccordion title="Gold 1b Series — Full Specifications">
              <table className="w-full min-w-[900px] text-xs">
                <SpecHead cols={['Specification', 'Unit', 'G200', 'G300', 'G400', 'G500', 'G600', 'G700', 'G800', 'G900', 'G1000']} />
                <tbody className="divide-y divide-[var(--color-border)]">
                  {[
                    ['Belt Width', 'Inches', '8"', '12"', '16"', '20"', '23"', '27"', '31"', '35"', '39"'],
                    ['Usable Wash Height', 'Inches', '10"', '10"', '10"', '14"', '14"', '14"', '14"', '14"', '14"'],
                    ['Real Load', 'lb/yd', '100', '100', '100', '100', '100', '100', '100', '100', '100'],
                    ['Belt Speed', 'fpm', '1–5', '1–5', '1–5', '1–5', '1–5', '1–5', '1–5', '1–5', '1–5'],
                    ['Loading Height', 'Inches', '40"', '40"', '40"', '40"', '40"', '40"', '40"', '40"', '40"'],
                    ['Wash Tank', 'Gal', '90', '90', '90', '120', '120', '120', '140', '140', '140'],
                    ['Wash Pump', 'Hp', '3', '3', '3', '4', '4', '4', '5.5', '5.5', '5.5'],
                    ['Wash Flow / Pressure', 'GPM/PSI', '50/43', '50/43', '50/43', '80/50', '80/50', '80/50', '90/60', '90/60', '90/60'],
                    ['Wash Heater', 'kW', '18', '18', '18', '24', '24', '24', '30', '30', '30'],
                    ['Temp', '°F', '100–160', '100–160', '100–160', '100–160', '100–160', '100–160', '100–160', '100–160', '100–160'],
                    ['Steam Aspirator', 'Hp/CFM', '0.25/180', '0.25/180', '0.25/180', '0.75/470', '0.75/470', '0.75/470', '0.75/470', '0.75/470', '0.75/470'],
                    ['Electric Drying', 'kW', '12', '12', '12', '15', '15', '15', '18', '18', '18'],
                    ['Overall Width', 'Inches', '70"', '70"', '70"', '85"', '85"', '85"', '95"', '95"', '95"'],
                    ['Overall Height', 'Inches', '70"', '70"', '70"', '80"', '80"', '80"', '85"', '85"', '85"'],
                    ['Overall Depth', 'Inches', '120"', '120"', '120"', '120"', '120"', '120"', '120"', '120"', '120"'],
                    ['Power Supply', 'V', '460V/3Ph/60Hz', '460V/3Ph/60Hz', '460V/3Ph/60Hz', '460V/3Ph/60Hz', '460V/3Ph/60Hz', '460V/3Ph/60Hz', '460V/3Ph/60Hz', '460V/3Ph/60Hz', '460V/3Ph/60Hz'],
                    ['PLC', '', 'Siemens', 'Siemens', 'Siemens', 'Siemens', 'Siemens', 'Siemens', 'Siemens', 'Siemens', 'Siemens'],
                  ].map(([label, unit, ...vals]) => (
                    <SpecRow key={label} label={label} unit={unit} values={vals} />
                  ))}
                </tbody>
              </table>
            </SpecAccordion>

            <SpecAccordion title="Gold 2b Series — Full Specifications">
              <table className="w-full min-w-[900px] text-xs">
                <SpecHead cols={['Specification', 'Unit', 'G200/2', 'G300/2', 'G400/2', 'G500/2', 'G600/2', 'G700/2', 'G800/2', 'G900/2', 'G1000/2']} />
                <tbody className="divide-y divide-[var(--color-border)]">
                  {[
                    ['Belt Width', 'Inches', '8"', '12"', '16"', '20"', '23"', '27"', '31"', '35"', '39"'],
                    ['Usable Wash Height', 'Inches', '10"', '10"', '10"', '14"', '14"', '14"', '14"', '14"', '14"'],
                    ['Real Load', 'lb/yd', '100', '100', '100', '100', '100', '100', '100', '100', '100'],
                    ['Belt Speed', 'fpm', '1–5', '1–5', '1–5', '1–5', '1–5', '1–5', '1–5', '1–5', '1–5'],
                    ['Loading Height', 'Inches', '40"', '40"', '40"', '40"', '40"', '40"', '40"', '40"', '40"'],
                    ['Wash Tank', 'Gal', '90', '90', '90', '120', '120', '120', '140', '140', '140'],
                    ['Rinse Tank', 'Gal', '90', '90', '90', '120', '120', '120', '140', '140', '140'],
                    ['Wash Pump', 'Hp', '3', '3', '3', '4', '4', '4', '5.5', '5.5', '5.5'],
                    ['Wash Flow / Pressure', 'GPM/PSI', '50/43', '50/43', '50/43', '80/50', '80/50', '80/50', '90/60', '90/60', '90/60'],
                    ['Rinse Pump', 'Hp', '3', '3', '3', '4', '4', '4', '5.5', '5.5', '5.5'],
                    ['Rinse Flow / Pressure', 'GPM/PSI', '50/43', '50/43', '50/43', '80/50', '80/50', '80/50', '90/60', '90/60', '90/60'],
                    ['Wash Heater', 'kW', '18', '18', '18', '24', '24', '24', '30', '30', '30'],
                    ['Rinse Heater', 'kW', '12', '12', '12', '16', '16', '16', '18', '18', '18'],
                    ['Temp', '°F', '100–160', '100–160', '100–160', '100–160', '100–160', '100–160', '100–160', '100–160', '100–160'],
                    ['Steam Aspirator', 'Hp/CFM', '0.25/180', '0.25/180', '0.25/180', '0.75/470', '0.75/470', '0.75/470', '0.75/470', '0.75/470', '0.75/470'],
                    ['Electric Drying', 'kW', '12', '12', '12', '15', '15', '15', '18', '18', '18'],
                    ['Overall Width', 'Inches', '70"', '70"', '70"', '85"', '85"', '85"', '95"', '95"', '95"'],
                    ['Overall Height', 'Inches', '70"', '70"', '70"', '80"', '80"', '80"', '85"', '85"', '85"'],
                    ['Overall Depth', 'Inches', '180"', '180"', '180"', '180"', '180"', '180"', '180"', '180"', '180"'],
                    ['Power Supply', 'V', '460V/3Ph/60Hz', '460V/3Ph/60Hz', '460V/3Ph/60Hz', '460V/3Ph/60Hz', '460V/3Ph/60Hz', '460V/3Ph/60Hz', '460V/3Ph/60Hz', '460V/3Ph/60Hz', '460V/3Ph/60Hz'],
                    ['PLC', '', 'Siemens', 'Siemens', 'Siemens', 'Siemens', 'Siemens', 'Siemens', 'Siemens', 'Siemens', 'Siemens'],
                  ].map(([label, unit, ...vals]) => (
                    <SpecRow key={label} label={label} unit={unit} values={vals} />
                  ))}
                </tbody>
              </table>
            </SpecAccordion>
          </>
        }
      />

      {/* ═══════════════════════════════════════════════════════
          ROTARY IMMERSION
      ═══════════════════════════════════════════════════════ */}

      <CatalogSection
        id="rotary-immersion"
        badge="Rotary Immersion Washers"
        title="Platinum Series — Rotary Immersion Aqueous Parts Washing Systems"
        description={
          <>
            <p>
              Magido&apos;s Platinum Series industrial rotary-immersion wash systems clean parts
              in baskets or fixtures by rotating them through a turbulent immersion bath combined
              with a simultaneous spray cleaning cycle. This dual-action process — immersion
              turbulence driving solution into complex internal geometries while spray jets clean
              all exterior surfaces — makes the Platinum Series ideal for high-precision components
              with tight tolerances, blind holes, internal channels, and complex surface profiles.
            </p>
            <p>
              The cleaning cycle is followed by a combination of spray and immersion rinsing,
              with an optional heated drying stage. Available in four models (P600/2 through
              P1500/2) with basket sizes from L24"×W12"×H12" to L59"×W31"×H34" and load capacities
              from 440 lbs to 1,500 lbs, the Platinum Series covers a broad range of production
              cleaning requirements.
            </p>
            <p>
              All Platinum Series machines feature Siemens PLC with Weintek HMI for full process
              control, adjustable drum rotation speed (0.5–3 RPM), and a front-loading design
              with external loading table for safe, ergonomic loading and unloading of heavy baskets
              and fixtures. Three-phase 460V power is required. Each system is customized
              to exact specifications.
            </p>
          </>
        }
        images={[
          { src: '/images/products/platinum/p600.webp', alt: 'Platinum Series P600/2 Rotary Immersion Parts Washer', series: 'Platinum', model: 'P600/2' },
          { src: '/images/products/platinum/p1200.webp', alt: 'Platinum Series P1200/2 Rotary Immersion Parts Washer', series: 'Platinum', model: 'P1200/2' },
          { src: '/images/products/platinum/p1500.webp', alt: 'Platinum Series P1500/2 Rotary Immersion Parts Washer', series: 'Platinum', model: 'P1500/2' },
        ]}
        features={[
          'AISI 304 Stainless Steel Construction',
          'Rotary Basket/Fixture Drum System',
          'Turbulent Immersion Bath + Simultaneous Spray',
          'Adjustable Drum Rotation Speed (0.5–3 RPM)',
          'Dedicated Wash & Rinse Tanks with Independent Systems',
          'Siemens PLC with Weintek HMI Touch Screen',
          'Front-Loading Design with External Loading Table',
          'Steam Exhaust Fan',
          'Fluid Level Sensors — Both Tanks',
        ]}
        options={[
          'Heated Drying Stage',
          'Oil Skimmer',
          'Filtration Systems',
          'Auto-Fill',
          'Bag or Coalescent Filtration',
          'Custom Basket or Fixture Design',
        ]}
        safety={[
          'Front Door Safety Interlock',
          'Fluid Level Shut-Off — Both Tanks',
          'Steam Exhaust Fan',
          'PLC Fault Detection and Alarm',
          'Drum Rotation Overload Protection',
          'Emergency Stop',
        ]}
        specs={
          <SpecAccordion title="Platinum Series — Full Specifications">
            <table className="w-full min-w-[680px] text-xs">
              <SpecHead cols={['Specification', 'Unit', 'P600/2', 'P900/2', 'P1200/2', 'P1500/2']} />
              <tbody className="divide-y divide-[var(--color-border)]">
                {[
                  ['Basket Dimensions', 'Inches', 'L24"×W12"×H12"', 'L35"×W15"×H15"', 'L47"×W19"×H19"', 'L59"×W31"×H34"'],
                  ['Load Weight', 'Lbs', '440 lbs', '770 lbs', '1,100 lbs', '1,500 lbs'],
                  ['Wash Fluid Capacity', 'Gal (US)', '130 gal', '210 gal', '320 gal', '660 gal'],
                  ['Wash Pump', 'Hp / PSI / GPM', '4 / 60 / 65', '4 / 60 / 65', '5.5 / 60 / 90', '5.5 / 60 / 90'],
                  ['Wash Heater', 'kW', '18 kW', '24 kW', '30 kW', '60 kW'],
                  ['Rinse Fluid Capacity', 'Gal (US)', '65 gal', '105 gal', '130 gal', '210 gal'],
                  ['Rinse Pump', 'Hp / PSI / GPM', '5.5 / 60 / 90', '5.5 / 60 / 90', '5.5 / 60 / 90', '7.5 / 60 / 130'],
                  ['Rinse Heater', 'kW', '12 kW', '16 kW', '18 kW', '24 kW'],
                  ['Steam Exhaust', 'Hp / CFM', '¼ / 60', '½ / 180', '½ / 180', '¾ / 470'],
                  ['Drum Rotation Motor', 'Hp', '¼', '¾', '1', '1'],
                  ['Rotation Speed', 'RPM', '1–3', '0.6–2.2', '0.6–2.2', '0.5–1.8'],
                  ['Load Height', 'Inches', '36"', '40"', '40"', '44"'],
                  ['PLC', '', 'Siemens', 'Siemens', 'Siemens', 'Siemens'],
                  ['HMI', '', 'Weintek', 'Weintek', 'Weintek', 'Weintek'],
                  ['Machine Dimensions', 'Inches', 'L110"×W67"×H95"', 'L140"×W70"×H110"', 'L165"×W75"×H120"', 'L235"×W100"×H165"'],
                  ['Voltage', '', '460V / 3PH / 60Hz', '460V / 3PH / 60Hz', '460V / 3PH / 60Hz', '460V / 3PH / 60Hz'],
                ].map(([label, unit, ...vals]) => (
                  <SpecRow key={label} label={label} unit={unit} values={vals} />
                ))}
              </tbody>
            </table>
          </SpecAccordion>
        }
      />

      {/* ── Industries Served ── */}
      <section className="border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="font-display text-xs font-semibold uppercase tracking-widest text-magido-orange">
            Industries Served
          </p>
          <h2 className="mt-1 font-display text-2xl font-bold text-[var(--color-text)] sm:text-3xl">
            Built for Every Industrial Application
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-text-secondary)]">
            MAGIDO parts washers are designed to solve the particular washing needs of small,
            medium, and large parts across industries where cleanliness is a critical process
            requirement.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {[
              'Aerospace & Defense',
              'Automotive & Transportation',
              'Machining & Metal Fabrication',
              'Heavy Equipment & MRO',
              'Medical Devices',
              'Food Processing',
              'Rail & Marine',
              'General Manufacturing',
            ].map((industry) => (
              <div
                key={industry}
                className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card-bg)] px-4 py-3 text-sm font-medium text-[var(--color-text)]"
              >
                {industry}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="border-t border-[var(--color-border)] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl font-bold text-[var(--color-text)]">
            Ready to Find the Right System?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
            Not sure which series fits your application? Our team will evaluate your parts,
            cleaning requirements, and production volume and recommend the ideal solution —
            at no cost.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex rounded-lg bg-magido-orange px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-magido-orange-dark"
            >
              Request a Quote
            </Link>
            <Link
              href="/contact#evaluation"
              className="inline-flex rounded-lg border border-magido-blue px-7 py-3 text-sm font-semibold text-magido-blue transition-colors hover:bg-magido-blue hover:text-white dark:border-[var(--color-border)] dark:text-[var(--color-text-secondary)] dark:hover:bg-[var(--color-bg-tertiary)]"
            >
              Free Process Evaluation
            </Link>
          </div>
          <p className="mt-4 text-xs text-[var(--color-text-secondary)]">
            <Link href="/resources" className="underline hover:text-magido-orange">
              ← Back to Resources
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
