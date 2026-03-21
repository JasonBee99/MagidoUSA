// src/data/industries.ts
// Data-driven industries pages — add new industries here, no code changes needed.

export interface IndustryChallenge {
  title: string;
  description: string;
}

export interface IndustryRecommendedSystem {
  categorySlug: string;
  categoryName: string;
  seriesSlugs: string[];         // highlight these series
  reason: string;
}

export interface Industry {
  slug: string;
  name: string;
  icon: string;
  tagline: string;
  description: string;
  heroStat: { value: string; label: string };
  challenges: IndustryChallenge[];
  recommendedSystems: IndustryRecommendedSystem[];
  relatedSolutionSlugs: string[];
  metaDescription: string;
}

export const INDUSTRIES: Industry[] = [
  {
    slug: 'automotive',
    name: 'Automotive',
    icon: '🚗',
    tagline: 'High-throughput cleaning for production and MRO',
    description:
      'Automotive manufacturing and maintenance demand parts washers that keep pace with high-volume production while delivering consistent, validated cleanliness. From engine blocks and transmission housings to stamped brackets and fuel-system components, Magido aqueous systems handle the full range of automotive cleaning challenges — without solvents.',
    heroStat: { value: '74', label: 'Models Available' },
    challenges: [
      {
        title: 'Mixed Contaminants',
        description:
          'Coolants, stamping oils, forming lubricants, carbon deposits, and metallic fines all present on the same production floor.',
      },
      {
        title: 'High Throughput',
        description:
          'Production-line cleaning must keep pace with machining cells and assembly — downtime is not an option.',
      },
      {
        title: 'Component Size Variation',
        description:
          'From small fasteners and valvetrain parts to full engine blocks and axle housings — one facility may need several machine types.',
      },
      {
        title: 'Cleanliness Verification',
        description:
          'OEM and Tier 1 specifications often require documented cleanliness levels per VDA 19 or ISO 16232.',
      },
    ],
    recommendedSystems: [
      {
        categorySlug: 'in-line-belt-conveyor-washers',
        categoryName: 'In-Line Belt Conveyor Washers',
        seriesSlugs: ['gold-1b', 'gold-2b', 'silver'],
        reason:
          'Continuous-flow conveyor washers integrate directly into production lines for uninterrupted part flow.',
      },
      {
        categorySlug: 'rotary-drum-washers',
        categoryName: 'Rotary Drum Washers',
        seriesSlugs: ['spira-1b', 'spira-2b'],
        reason:
          'Bulk-clean fasteners, stampings, and small components at high volume with minimal handling.',
      },
      {
        categorySlug: 'front-load-washers',
        categoryName: 'Front Load Washers',
        seriesSlugs: ['x53', 'x53-2', 'fls'],
        reason:
          'Heavy engine blocks, housings, and large castings load easily through the front door.',
      },
    ],
    relatedSolutionSlugs: [
      'cleaning-automotive-transmission-parts',
      'removing-stamping-and-forming-lubricants',
      'cleaning-brake-components',
      'aqueous-vs-solvent-parts-washers',
    ],
    metaDescription:
      'Aqueous parts washers for automotive manufacturing and MRO — belt conveyor, rotary drum, and front load systems for engine, transmission, and stamped component cleaning.',
  },
  {
    slug: 'aerospace',
    name: 'Aerospace',
    icon: '✈️',
    tagline: 'Precision cleaning where contamination is measured in microns',
    description:
      'Aerospace components operate in extreme conditions where even microscopic contamination can cause catastrophic failure. Magido stainless steel aqueous washers deliver the repeatable, validated cleaning performance required by AS9100, NADCAP, and customer-specific cleaning specifications — with full audit trail capability.',
    heroStat: { value: '100%', label: 'Stainless Steel Construction' },
    challenges: [
      {
        title: 'Cleanliness Specifications',
        description:
          'Component cleanliness is defined in milligrams of residue or particle count — manual cleaning cannot achieve or document these levels.',
      },
      {
        title: 'Exotic Materials',
        description:
          'Titanium, Inconel, aluminum alloys, and composite substrates require chemistry-compatible, non-damaging cleaning processes.',
      },
      {
        title: 'Complex Geometries',
        description:
          'Turbine blades, hydraulic manifolds, and structural castings have blind holes and internal passages that spray systems alone cannot reach.',
      },
      {
        title: 'Process Validation',
        description:
          'Cleaning processes must be validated, documented, and repeatable to satisfy quality audits and customer flow-downs.',
      },
    ],
    recommendedSystems: [
      {
        categorySlug: 'immersion-washers',
        categoryName: 'Immersion Washers',
        seriesSlugs: ['agita'],
        reason:
          'Full submersion with pneumatic agitation cleans complex internal geometries and blind passages that spray alone cannot reach.',
      },
      {
        categorySlug: 'rotary-immersion-washers',
        categoryName: 'Rotary Immersion Washers',
        seriesSlugs: ['platinum'],
        reason:
          'Multi-action rotation plus immersion delivers aerospace-grade cleanliness for demanding specifications.',
      },
      {
        categorySlug: 'top-load-washers',
        categoryName: 'Top Load Washers',
        seriesSlugs: ['x51-2', 'x51hp'],
        reason:
          'Dual-stage wash and rinse systems minimize cross-contamination and support validated cleaning sequences.',
      },
    ],
    relatedSolutionSlugs: [
      'cleaning-aerospace-components',
      'cleaning-hydraulic-components',
      'spray-cabinet-vs-immersion-parts-washers',
    ],
    metaDescription:
      'Aerospace parts cleaning systems — aqueous immersion and spray washers for AS9100 and NADCAP-compliant cleaning of turbine, hydraulic, and structural components.',
  },
  {
    slug: 'machining',
    name: 'Machining & Manufacturing',
    icon: '⚙️',
    tagline: 'Versatile aqueous systems for every production scale',
    description:
      'CNC machining centers, grinding operations, and fabrication shops generate parts coated in coolant, cutting oil, and metallic chips. Magido offers the widest range of aqueous wash systems in the industry — from a compact manual cabinet on the shop floor to a fully automated conveyor washer integrated into a lights-out cell.',
    heroStat: { value: '19', label: 'Series to Choose From' },
    challenges: [
      {
        title: 'Coolant & Cutting Oil Removal',
        description:
          'Water-soluble and straight-oil coolants require different chemistry — your washer must be compatible with your chosen detergent.',
      },
      {
        title: 'Chip & Swarf Management',
        description:
          'Metallic fines and chips contaminate wash solution and deposit on cleaned parts if filtration is not properly sized.',
      },
      {
        title: 'Part Variety',
        description:
          'Job shops and contract manufacturers clean parts ranging from small turned parts to large weldments — often in the same shift.',
      },
      {
        title: 'Floor Space',
        description:
          'Machine shops are often space-constrained. The washer must fit the available footprint without compromising cleaning performance.',
      },
    ],
    recommendedSystems: [
      {
        categorySlug: 'top-load-washers',
        categoryName: 'Top Load Washers',
        seriesSlugs: ['x51', 'x51hp', 'x51-2', 'eco'],
        reason:
          'The most versatile category — compact footprint, easy basket loading, suitable for most machined part sizes.',
      },
      {
        categorySlug: 'manual-washers',
        categoryName: 'Manual Washers',
        seriesSlugs: ['dg', 'l', 'hp'],
        reason:
          'Ideal for small shops or secondary cleaning stations where operator handling is acceptable.',
      },
      {
        categorySlug: 'front-load-washers',
        categoryName: 'Front Load Washers',
        seriesSlugs: ['x53', 'fls'],
        reason:
          'When parts are too large or heavy for top loading — fork-friendly baskets and high weight capacities.',
      },
    ],
    relatedSolutionSlugs: [
      'removing-stamping-and-forming-lubricants',
      'removing-cutting-oil-and-coolant',
      'cleaning-hydraulic-components',
      'aqueous-vs-solvent-parts-washers',
      'spray-cabinet-vs-immersion-parts-washers',
    ],
    metaDescription:
      'Parts washers for CNC machining and manufacturing — top load, front load, and manual aqueous systems for coolant, cutting oil, and chip removal.',
  },
  {
    slug: 'heavy-equipment',
    name: 'Heavy Equipment',
    icon: '🏗️',
    tagline: 'Industrial-grade washers for oversized, heavy components',
    description:
      'Construction, mining, and agricultural equipment components are among the most challenging to clean — large, heavy, coated in grit, grease, and heavy oils. Magido front load washers are engineered with high weight capacities, large chamber openings, and robust stainless steel construction that holds up in the harshest maintenance environments.',
    heroStat: { value: 'AISI 304', label: 'Stainless Steel Throughout' },
    challenges: [
      {
        title: 'Heavy Contamination',
        description:
          'Gear oil, hydraulic fluid, grease, and baked-on grime require aggressive spray pressures and elevated wash temperatures.',
      },
      {
        title: 'Component Weight',
        description:
          'Axle housings, gear cases, and hydraulic cylinders can weigh hundreds of pounds — the washer basket and frame must be engineered for it.',
      },
      {
        title: 'Large Part Envelopes',
        description:
          'Heavy equipment components often exceed the capacity of standard spray cabinets — chamber size is a critical specification.',
      },
      {
        title: 'MRO vs. Production',
        description:
          'Heavy equipment cleaning is often MRO-driven — lower volume but high variability in part type and contamination level.',
      },
    ],
    recommendedSystems: [
      {
        categorySlug: 'front-load-washers',
        categoryName: 'Front Load Washers',
        seriesSlugs: ['fls', 'x53', 'x53-2'],
        reason:
          'Large front-opening chambers, high weight capacity baskets, and fork-truck compatible design for the heaviest components.',
      },
      {
        categorySlug: 'top-load-washers',
        categoryName: 'Top Load Washers',
        seriesSlugs: ['x51', 'x51hp'],
        reason:
          'For mid-size components — turntable rotation ensures all surfaces are reached by spray nozzles.',
      },
    ],
    relatedSolutionSlugs: [
      'cleaning-hydraulic-components',
      'industrial-parts-washing-for-mro',
      'aqueous-vs-solvent-parts-washers',
    ],
    metaDescription:
      'Heavy equipment parts washers — large-capacity front load spray cabinets for construction, mining, and agricultural component cleaning.',
  },
  {
    slug: 'medical',
    name: 'Medical',
    icon: '🩺',
    tagline: 'Validated cleaning for medical device components',
    description:
      'Medical device manufacturing demands cleaning processes that are not only effective but validated, documented, and repeatable. Magido stainless steel aqueous systems are compatible with FDA-regulated cleaning validation protocols — providing the foundation for IQ/OQ/PQ qualification of your cleaning process.',
    heroStat: { value: '100%', label: 'Stainless Steel — No Hidden Plastics' },
    challenges: [
      {
        title: 'Process Validation',
        description:
          'FDA 21 CFR and ISO 13485 require cleaning processes to be validated. The washer must deliver repeatable parameters: time, temperature, pressure, chemistry.',
      },
      {
        title: 'Residue-Free Rinsing',
        description:
          'Detergent residues on medical components are unacceptable. Multi-stage rinse with DI or purified water is often required.',
      },
      {
        title: 'Material Compatibility',
        description:
          'Implant-grade alloys, titanium, and PEEK must not be damaged by the cleaning process — chemistry and temperature selection are critical.',
      },
      {
        title: 'Documentation & Traceability',
        description:
          'Lot traceability and process parameter logging are required for device history records.',
      },
    ],
    recommendedSystems: [
      {
        categorySlug: 'top-load-washers',
        categoryName: 'Top Load Washers',
        seriesSlugs: ['x51-2', 'x51'],
        reason:
          'Dual-stage models provide separate wash and rinse tanks — essential for residue-free cleaning of medical components.',
      },
      {
        categorySlug: 'immersion-washers',
        categoryName: 'Immersion Washers',
        seriesSlugs: ['agita'],
        reason:
          'Full submersion with agitation cleans complex implant and instrument geometries including blind holes and threaded features.',
      },
      {
        categorySlug: 'rotary-immersion-washers',
        categoryName: 'Rotary Immersion Washers',
        seriesSlugs: ['platinum'],
        reason:
          'Highest cleanliness level — multi-action cleaning for the most demanding medical device specifications.',
      },
    ],
    relatedSolutionSlugs: [
      'cleaning-medical-device-components',
      'spray-cabinet-vs-immersion-parts-washers',
    ],
    metaDescription:
      'Medical device parts washers — validated aqueous cleaning systems for implant, instrument, and device component manufacturing per FDA and ISO 13485.',
  },
  {
    slug: 'food-processing',
    name: 'Food Processing',
    icon: '🍽️',
    tagline: 'NSF-compatible aqueous cleaning for food-grade equipment',
    description:
      'Food processing facilities require cleaning equipment that meets food-grade material standards, handles food residues and sanitation chemicals, and supports HACCP-compliant cleaning programs. Magido <a href="/solutions/aisi-304-stainless-steel-parts-washers" style="color:#eb6c1c;font-weight:500;text-decoration:none;" onmouseover="this.style.color=&apos;#315687&apos;" onmouseout="this.style.color=&apos;#eb6c1c&apos;" >AISI 304 stainless steel</a> construction is inherently food-grade — with no painted surfaces, no hidden carbon steel, and no areas that trap contamination.',
    heroStat: { value: 'AISI 304', label: 'Food-Grade Stainless Steel' },
    challenges: [
      {
        title: 'Food Residue & Biofilm',
        description:
          'Fats, proteins, sugars, and biofilm require elevated wash temperatures and compatible sanitation chemistry.',
      },
      {
        title: 'Food-Grade Materials',
        description:
          'All surfaces in contact with food-contact equipment must be food-grade — painted carbon steel is not acceptable.',
      },
      {
        title: 'Sanitation Chemistry Compatibility',
        description:
          'Food processors use aggressive alkaline and acid CIP chemicals — the washer must be compatible with their existing sanitation program.',
      },
      {
        title: 'HACCP & Audit Compliance',
        description:
          'Cleaning equipment and procedures are subject to third-party food safety audits — the cleaning process must be documented and consistent.',
      },
    ],
    recommendedSystems: [
      {
        categorySlug: 'top-load-washers',
        categoryName: 'Top Load Washers',
        seriesSlugs: ['x51', 'eco', 'x51-2'],
        reason:
          'Stainless steel construction throughout — turntable basket cleaning for molds, dies, fillers, and processing components.',
      },
      {
        categorySlug: 'front-load-washers',
        categoryName: 'Front Load Washers',
        seriesSlugs: ['x53', 'fls'],
        reason:
          'Large-format food processing equipment — conveyor components, mixing attachments, and large tool sets.',
      },
      {
        categorySlug: 'manual-washers',
        categoryName: 'Manual Washers',
        seriesSlugs: ['dg', 'l'],
        reason:
          'Hand-cleaning station for small tooling, blades, and components between production runs.',
      },
    ],
    relatedSolutionSlugs: [
      'food-and-beverage-equipment-cleaning',
      'aqueous-vs-solvent-parts-washers',
    ],
    metaDescription:
      'Food-grade parts washers — <a href="/solutions/aisi-304-stainless-steel-parts-washers" style="color:#eb6c1c;font-weight:500;text-decoration:none;" onmouseover="this.style.color=&apos;#315687&apos;" onmouseout="this.style.color=&apos;#eb6c1c&apos;" >AISI 304 stainless steel</a> aqueous cleaning systems for food processing equipment, tooling, and components.',
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.slug === slug);
}
