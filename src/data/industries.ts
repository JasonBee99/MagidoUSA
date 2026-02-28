export interface IndustryPage {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  sections: { heading: string; content: string }[];
  cta: string;
}

export const industryPages: IndustryPage[] = [
  {
    slug: 'automotive',
    name: 'Automotive Manufacturing',
    metaTitle: 'Parts Washers for Automotive Manufacturing',
    metaDescription: 'Magido aqueous parts washers for automotive manufacturing — engine blocks, cylinder heads, transmissions, brake components. Stainless steel spray cabinet, immersion, and conveyor systems.',
    intro: 'Automotive manufacturing demands cleaning systems that can keep pace with production schedules while meeting strict cleanliness specifications. From raw castings coming off the foundry line to precision-machined engine components heading into assembly, every part needs to be clean — and the cleaning step can\'t be the bottleneck.',
    sections: [
      { heading: 'Engine Components', content: 'Cylinder heads, blocks, intake manifolds, exhaust manifolds, valve covers, and oil pans carry oils, metal chips, casting sand, and carbon deposits. Magido X51 and X53 series spray cabinet washers handle these parts efficiently, with turntables sized for the largest common engine components.' },
      { heading: 'Transmission & Drivetrain', content: 'Housings, gear cases, clutch housings, and differential cases require thorough cleaning before assembly. The X53/2 dual-stage wash-and-rinse system ensures parts are free of both machining contamination and detergent residue.' },
      { heading: 'Brake Systems', content: 'Calipers, rotors, drums, and brake hardware need degreasing before installation. The compact X81 series handles these parts at the work-cell level, eliminating transport to a centralized wash station.' },
      { heading: 'Small Parts in Volume', content: 'Fasteners, clips, springs, valve train components, and other small parts benefit from continuous bulk cleaning. Magido\'s Jolly and Spira rotary drum washers clean thousands of small parts per shift.' },
    ],
    cta: 'Contact us at 844-4MA-GIDO (844-462-4436) for automotive parts cleaning solutions.',
  },
  {
    slug: 'aerospace-defense',
    name: 'Aerospace & Defense',
    metaTitle: 'Parts Washers for Aerospace & Defense | Precision Cleaning',
    metaDescription: 'Magido aqueous parts washers for aerospace and defense. Precision cleaning of turbine components, hydraulic assemblies, and structural parts in AISI 304 stainless steel.',
    intro: 'Aerospace and defense manufacturing operates under some of the most demanding cleanliness specifications in any industry. Residual contamination on a turbine blade, a hydraulic valve body, or a structural fitting isn\'t just a quality issue — it\'s a safety issue.',
    sections: [
      { heading: 'Turbine & Engine Components', content: 'Blades, vanes, housings, and combustor parts carry machining oils, coolants, and particulate that must be removed before inspection, coating, or assembly. The Platinum series rotary immersion washers reach internal cooling passages and complex airfoil geometries.' },
      { heading: 'Hydraulic & Pneumatic Components', content: 'Valve bodies, actuator housings, and manifolds with intersecting internal bores require immersion cleaning. The Agita series provides controlled immersion with pneumatic agitation for thorough internal cleaning.' },
      { heading: 'Structural Components', content: 'Brackets, fittings, frames, and panels need surface preparation before coating. X51 and X53 spray cabinet washers remove oils, and dual-stage X51/2 and X53/2 systems provide clean rinse for coating adhesion.' },
      { heading: 'Fasteners & Hardware', content: 'Rivets, bolts, nuts, and specialty fasteners consumed in high volumes benefit from continuous cleaning in Spira series rotary drum washers.' },
    ],
    cta: 'Contact us at 844-4MA-GIDO (844-462-4436) for aerospace cleaning applications.',
  },
  {
    slug: 'machining-metal-fabrication',
    name: 'Machining & Metal Fabrication',
    metaTitle: 'Parts Washers for Machine Shops & Metal Fabrication',
    metaDescription: 'Magido aqueous parts washers for CNC machining, metal fabrication, and job shops. Clean machined parts, remove cutting fluids and chips. Stainless steel construction.',
    intro: 'Machine shops and metal fabrication operations generate contamination with every cut — cutting oils, coolant residue, metal chips, grinding swarf, and handling soils all need to be removed before parts move to the next operation, go to inspection, or ship to customers.',
    sections: [
      { heading: 'CNC Machined Parts', content: 'Parts leave the spindle coated in cutting fluid with embedded chips. X81 and X51 series spray cabinets remove these contaminants efficiently. For high-volume CNC cells, Silver and Gold series belt conveyor washers integrate directly into the production flow.' },
      { heading: 'Stamped & Formed Parts', content: 'Brackets, housings, shields, and panels carry drawing compound and stamping lubricant. Spray cabinet washers handle these well, and rotary drum washers clean small stampings in bulk.' },
      { heading: 'Welded Fabrications', content: 'Grinding dust, weld spatter, and handling oils need removal before painting or powder coating. X53 front-load washers accommodate large fabricated assemblies.' },
      { heading: 'Job Shops', content: 'The X51 series clamshell spray cabinet with adjustable cycle time and temperature handles the widest range of parts and contamination types — ideal for shops cleaning a different part every day.' },
    ],
    cta: 'Contact us at 844-4MA-GIDO (844-462-4436) for machine shop and fabrication cleaning solutions.',
  },
  {
    slug: 'heavy-equipment-mro',
    name: 'Heavy Equipment & MRO',
    metaTitle: 'Parts Washers for Heavy Equipment & MRO Operations',
    metaDescription: 'Magido aqueous parts washers for heavy equipment maintenance, repair, and overhaul. Clean hydraulic components, engine parts, and drivetrain assemblies in stainless steel.',
    intro: 'Maintenance, repair, and overhaul operations deal with parts that come in dirty — often seriously dirty. Heavy equipment components arrive caked in grease, hydraulic fluid, carbon buildup, road grime, and years of accumulated contamination. The cleaning needs to be thorough enough to allow proper inspection, measurement, and reassembly.',
    sections: [
      { heading: 'Hydraulic Components', content: 'Cylinders, pumps, and valve assemblies require immersion cleaning to flush old fluid, debris, and wear particles from internal passages. The Agita series and Platinum rotary immersion systems are ideal.' },
      { heading: 'Engine & Drivetrain', content: 'Cylinder heads, blocks, crankshafts, gear housings, and differential cases require thorough degreasing before inspection and reconditioning. Eco series and X53 front-load washers handle the weight and size.' },
      { heading: 'Brake & Steering', content: 'Discs, calipers, steering gears, and tie rod assemblies need cleaning to remove old grease, brake dust, and road contamination. X51 series spray cabinets handle these parts efficiently.' },
      { heading: 'Small Parts & Hardware', content: 'Bolts, nuts, bearings, bushings, seals, and gasket surfaces cleaned in batch or continuous mode using X81 spray cabinets or Spira rotary drum washers.' },
    ],
    cta: 'Contact us at 844-4MA-GIDO (844-462-4436) for MRO parts cleaning solutions.',
  },
  {
    slug: 'medical-devices',
    name: 'Medical Device Manufacturing',
    metaTitle: 'Parts Washers for Medical Device Manufacturing',
    metaDescription: 'Magido aqueous parts washers for medical device production. Precision cleaning with stainless steel construction for implants, instruments, and components.',
    intro: 'Medical device manufacturing requires cleaning processes that are precise, consistent, and free of cross-contamination. Parts destined for implantation, surgical use, or diagnostic equipment must meet cleanliness standards that leave zero tolerance for residual oils, particulate, or chemical contamination.',
    sections: [
      { heading: 'Surgical Instruments & Implants', content: 'Precision cleaning to remove machining oils, polishing compounds, and particulate before passivation, sterilization, or packaging. Immersion cleaning with the Agita series reaches internal lumens and complex geometries. The Platinum system provides multi-action cleaning for the most demanding specifications.' },
      { heading: 'Orthopedic Implant Components', content: 'Hip, knee, and spinal implant parts require surface cleanliness before coating or polishing operations. Spray cabinet washers handle external surfaces while immersion systems address internal features.' },
      { heading: 'Small Precision Components', content: 'Screws, pins, plates, and other small implant hardware produced in volume benefit from bulk cleaning in Spira rotary drum washers.' },
    ],
    cta: 'Contact us at 844-4MA-GIDO for medical device cleaning applications.',
  },
  {
    slug: 'food-processing',
    name: 'Food Processing Equipment',
    metaTitle: 'Parts Washers for Food Processing Equipment',
    metaDescription: 'Clean food processing equipment parts with Magido aqueous washers. AISI 304 stainless steel construction meets food industry hygiene standards.',
    intro: 'Food processing and packaging equipment requires regular cleaning to maintain hygiene standards, prevent contamination, and comply with food safety regulations. Magido aqueous parts washers are constructed from AISI 304 stainless steel — the same grade used in food processing equipment itself.',
    sections: [
      { heading: 'Grinder Plates, Blades & Dies', content: 'Meat processing and extrusion equipment components that carry fat, protein, and product residues. Manual HP series washers provide targeted high-pressure cleaning, while X81 spray cabinets automate changeover cleaning.' },
      { heading: 'Mixing & Blending Components', content: 'Paddles, impellers, and housing parts from bakery, dairy, and beverage equipment. X51 spray cabinet washers accommodate a range of sizes.' },
      { heading: 'Conveyor & Packaging Parts', content: 'Rollers, guides, chains, and fittings from packaging lines. Belt conveyor washers in the Silver and Gold series clean these components in continuous flow.' },
      { heading: 'Fittings, Valves & Sanitary Hardware', content: 'Tri-clamp fittings, gaskets, and sanitary valve components cleaned in batches using X81 compact spray cabinets or in bulk using Jolly series rotary drum washers.' },
    ],
    cta: 'Contact us at 844-4MA-GIDO for food processing equipment cleaning solutions.',
  },
];

export function getIndustryPage(slug: string): IndustryPage | undefined {
  return industryPages.find((p) => p.slug === slug);
}

export function getAllIndustrySlugs(): string[] {
  return industryPages.map((p) => p.slug);
}
