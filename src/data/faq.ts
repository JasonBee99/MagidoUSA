/**
 * MAGIDO USA — FAQ Data
 *
 * Organized into categories. Each item has a question, answer (HTML-safe),
 * and an optional anchor id for deep-linking.
 *
 * To add a new FAQ: add an entry to the relevant category's `items` array.
 * To add a new category: add a new object to the `faqCategories` array.
 *
 * Product links use the pattern: /products/{category-slug}/{series-slug}
 * Always verify slugs against src/data/products.json before adding new links.
 */

export interface FaqItem {
  id: string;
  question: string;
  answer: string; // HTML string — rendered with dangerouslySetInnerHTML
}

export interface FaqCategory {
  slug: string;
  heading: string;
  icon: string; // emoji
  items: FaqItem[];
}

export const faqCategories: FaqCategory[] = [
  {
    slug: 'general',
    heading: 'General & Company',
    icon: '🏭',
    items: [
      {
        id: 'what-is-magido',
        question: 'What is Magido USA?',
        answer: `<p>Magido USA is the exclusive North American distributor of Magido industrial aqueous parts washing systems. Magido is an Italian manufacturer with over 40 years of experience producing stainless steel parts washers for industrial, automotive, aerospace, and manufacturing applications. Every machine is built from <a href="/solutions/aisi-304-stainless-steel-parts-washers" class="text-[#eb6c1c] hover:text-[#315687] font-medium">AISI 304 stainless steel</a> and uses water-based cleaning solutions — no solvents, no hazardous chemicals.</p>`,
      },
      {
        id: 'where-are-machines-made',
        question: 'Where are Magido machines manufactured?',
        answer: `<p>All Magido parts washers are designed and manufactured in Italy. Magido is headquartered near Milan and exports to distributors and end-users across Europe, North America, and the rest of the world. Magido USA handles all sales, support, and service for customers in the United States and Canada.</p>`,
      },
      {
        id: 'why-aqueous',
        question: 'Why use aqueous (water-based) cleaning instead of solvent-based?',
        answer: `<p>Aqueous parts washers use water-based detergent solutions heated to 140–170°F to dissolve oils, grease, metal chips, and contaminants. Compared to solvent-based systems, aqueous cleaning offers several advantages:</p>
<ul>
  <li>No hazardous solvents — safer for operators and the environment</li>
  <li>Lower disposal and regulatory compliance costs</li>
  <li><a href="/solutions/aisi-304-stainless-steel-parts-washers" class="text-[#eb6c1c] hover:text-[#315687] font-medium">AISI 304 stainless steel</a> construction resists corrosion and is easy to clean</li>
  <li>Effective on a wide range of contaminants including coolants, cutting oils, and carbon deposits</li>
  <li>Suitable for most metals including steel, aluminum, cast iron, and brass</li>
</ul>`,
      },
      {
        id: 'industries-served',
        question: 'What industries use Magido parts washers?',
        answer: `<p>Magido parts washers are used across a wide range of industries, including:</p>
<ul>
  <li>Automotive repair and rebuild shops</li>
  <li>Aerospace and defense manufacturing</li>
  <li>CNC machining and metal fabrication</li>
  <li>Heavy equipment and diesel service</li>
  <li>Medical device manufacturing</li>
  <li>Food processing equipment maintenance</li>
  <li>General industrial MRO (maintenance, repair, and operations)</li>
</ul>`,
      },
      {
        id: 'how-to-contact',
        question: 'How do I contact Magido USA?',
        answer: `<p>You can reach our team by phone at <a href="tel:8444624436">844-462-4436</a> or through the <a href="/contact">contact form on our website</a>. We typically respond the same business day. For technical questions or process evaluations, ask to speak with Scott Morin directly.</p>`,
      },
    ],
  },
  {
    slug: 'products',
    heading: 'Products & Selection',
    icon: '🔧',
    items: [
      {
        id: 'which-washer-right-for-me',
        question: 'How do I choose the right parts washer for my application?',
        answer: `<p>The right machine depends on several factors:</p>
<ul>
  <li><strong>Part size and weight</strong> — the largest and heaviest part you'll regularly clean determines the minimum basket or turntable size needed</li>
  <li><strong>Volume</strong> — are you cleaning parts one at a time (batch) or continuously? High-volume shops often benefit from <a href="/products/in-line-belt-conveyor-washers">belt conveyor</a> or <a href="/products/rotary-drum-washers">rotary drum</a> systems</li>
  <li><strong>Geometry</strong> — parts with blind holes, internal passages, or complex geometry may require <a href="/products/immersion-washers">immersion</a> or <a href="/products/rotary-immersion-washers">rotary immersion</a> cleaning</li>
  <li><strong>Contamination type</strong> — heavy carbon deposits, cutting oils, coolants, and forming compounds each respond differently to wash temperatures and chemistry</li>
  <li><strong>Floor space</strong> — compact manual washers (<a href="/products/manual-washers/dg">DG</a>, <a href="/products/manual-washers/l">L</a>, <a href="/products/manual-washers/hp">HP</a>) and the <a href="/products/top-load-washers/eco">Eco</a> series are ideal for smaller shops; automated systems require more space</li>
</ul>
<p>Not sure where to start? Our <a href="/how-to-choose">How to Choose a Parts Washer</a> guide walks through each of these factors in detail and includes an interactive <strong>Product Selector</strong> to match your application to the right machine family, plus a <strong>Capacity Calculator</strong> to estimate how many parts each model can handle per shift.</p>
<p>We also offer free process evaluations — <a href="/contact?form=evaluation#contact-forms">contact us</a> and we'll recommend the best fit for your specific operation.</p>`,
      },
      {
        id: 'difference-top-front-load',
        question: 'What is the difference between top-load and front-load washers?',
        answer: `<p><strong>Top-load washers</strong> (<a href="/products/top-load-washers/x81">X81</a>, <a href="/products/top-load-washers/eco">Eco</a>, <a href="/products/top-load-washers/x51">X51</a>, <a href="/products/top-load-washers/x51-2">X51/2</a> series) open from the top. Parts are placed on a rotating turntable inside the cabinet. They are well-suited for small to medium parts and are generally more compact and lower cost.</p>
<p><strong>Front-load washers</strong> (<a href="/products/front-load-washers/x53">X53</a>, <a href="/products/front-load-washers/x53-2">X53/2</a> series) have a door at the front and use a fixed platform with a spray ramp. The turntable can be rolled out on a cart for loading heavy or awkward parts — making them ideal for large, bulky components that are difficult to lift into a top-load machine.</p>`,
      },
      {
        id: 'what-is-dual-stage',
        question: 'What does "dual-stage" mean on the X51/2 and X53/2 series?',
        answer: `<p>Dual-stage washers have two separate tanks — one for washing and one for rinsing. The <a href="/products/top-load-washers/x51-2">X51/2</a> and <a href="/products/front-load-washers/x53-2">X53/2</a> automatically transition from the wash cycle to a rinse stage using clean solution from the second tank. This prevents cross-contamination between tanks and ensures a residue-free finish on your parts. The process is PLC-controlled for consistent, repeatable results.</p>`,
      },
      {
        id: 'rotary-drum-vs-belt-conveyor',
        question: 'When should I use a rotary drum washer vs. a belt conveyor washer?',
        answer: `<p><strong><a href="/products/rotary-drum-washers">Rotary drum washers</a></strong> (<a href="/products/rotary-drum-washers/jolly">Jolly</a>, <a href="/products/rotary-drum-washers/spira-1b">Spira 1b</a>, <a href="/products/rotary-drum-washers/spira-2b">Spira 2b</a>) are best for:</p>
<ul>
  <li>Small, loose parts — fasteners, stampings, machined components</li>
  <li>Applications where part-on-part contact is acceptable</li>
  <li>High-volume continuous bulk cleaning</li>
</ul>
<p><strong><a href="/products/in-line-belt-conveyor-washers">Belt conveyor washers</a></strong> (<a href="/products/in-line-belt-conveyor-washers/silver">Silver</a>, <a href="/products/in-line-belt-conveyor-washers/gold-1b">Gold 1b</a>, <a href="/products/in-line-belt-conveyor-washers/gold-2b">Gold 2b</a>) are better suited for:</p>
<ul>
  <li>Larger parts or parts that need to be oriented or fixtured during cleaning</li>
  <li>Parts that travel through on a flat conveyor belt, passing through spray zones</li>
  <li>Fully customizable processes with pre-wash, wash, rinse, rust-prevention, blow-off, and drying stages</li>
</ul>`,
      },
      {
        id: 'what-is-fls',
        question: 'What is the FLS series?',
        answer: `<p>The <a href="/products/front-load-washers/fls">FLS series</a> is Magido's front-loading spray cabinet washer designed for mid-size to large parts. It combines high-pressure spray cleaning with a front-loading door and fixed platform, making it easy to load heavy components. The FLS is particularly popular in automotive and diesel service environments.</p>`,
      },
      {
        id: 'custom-configurations',
        question: 'Can Magido washers be customized for my process?',
        answer: `<p>Yes. Many Magido systems — especially <a href="/products/in-line-belt-conveyor-washers">belt conveyor</a>, <a href="/products/rotary-drum-washers">rotary drum</a>, and <a href="/products/immersion-washers">immersion washers</a> — are built to order with custom configurations, including:</p>
<ul>
  <li>Custom process zones (pre-wash, wash, rinse, rust-prevention, blow-off, drying)</li>
  <li>Belt widths and conveyor speeds</li>
  <li>Tank capacities and heating configurations</li>
  <li>Filtration, oil skimmer, and drying options</li>
</ul>
<p><a href="/contact">Contact us</a> to discuss your specific requirements.</p>`,
      },
    ],
  },
  {
    slug: 'technical',
    heading: 'Technical & Operation',
    icon: '⚙️',
    items: [
      {
        id: 'what-detergent-to-use',
        question: 'What type of detergent should I use in a Magido washer?',
        answer: `<p>Magido washers are designed for use with water-based (aqueous) industrial detergents — not solvents. The correct detergent depends on the contamination type and the metal being cleaned. As a general guideline:</p>
<ul>
  <li>Use a low-foaming, pH-balanced industrial detergent formulated for spray-wash or immersion applications</li>
  <li>Typical concentration is 1–5% dilution in water</li>
  <li>Match the chemistry to your contamination — cutting oil, coolant, carbon, forming compound, etc.</li>
  <li>We recommend consulting with a detergent supplier familiar with aqueous parts washing</li>
</ul>`,
      },
      {
        id: 'operating-temperature',
        question: 'What temperature do Magido washers operate at?',
        answer: `<p>Most Magido spray cabinet washers operate between 140°F and 170°F (60–77°C). The solution is heated by an electric immersion heater and controlled by a thermostat. Operating at the correct temperature is important — heated aqueous solution cleans significantly more effectively than cold water. The heater capacity varies by model; refer to the product page or download the series brochure for exact specifications.</p>`,
      },
      {
        id: 'how-long-wash-cycle',
        question: 'How long does a typical wash cycle take?',
        answer: `<p>Wash cycle times vary by machine type and contamination level:</p>
<ul>
  <li><strong>Spray cabinet washers</strong> (<a href="/products/top-load-washers/x81">X81</a>, <a href="/products/top-load-washers/x51">X51</a>, <a href="/products/front-load-washers/x53">X53</a> series) — typical cycles run 5–15 minutes</li>
  <li><strong>Manual machines</strong> (<a href="/products/manual-washers/dg">DG</a>, <a href="/products/manual-washers/l">L</a>, <a href="/products/manual-washers/hp">HP</a>) — operator-controlled with no fixed cycle time</li>
  <li><strong>Continuous systems</strong> (<a href="/products/in-line-belt-conveyor-washers">belt conveyor</a>, <a href="/products/rotary-drum-washers">rotary drum</a>) — operate non-stop with throughput measured in parts-per-hour or linear feet-per-minute</li>
</ul>`,
      },
      {
        id: 'electrical-requirements',
        question: 'What are the electrical requirements?',
        answer: `<p>Magido USA machines are configured for North American electrical standards:</p>
<ul>
  <li>Most models operate on single-phase or three-phase 208–240V</li>
  <li>Larger industrial systems (<a href="/products/in-line-belt-conveyor-washers">belt conveyor</a>, <a href="/products/rotary-immersion-washers">rotary immersion</a>, <a href="/products/rotary-drum-washers">rotary drum</a>) typically require three-phase power</li>
  <li>Specific voltage and amperage requirements are listed on each product page</li>
</ul>
<p>Refer to the product page or download the series brochure for exact electrical data.</p>`,
      },
      {
        id: 'how-often-change-solution',
        question: 'How often do I need to change the wash solution?',
        answer: `<p>Solution life depends on the contamination load, parts volume, and detergent used. In a typical shop environment, solution is changed every 2–8 weeks. Signs that the solution needs changing include:</p>
<ul>
  <li>Visible darkening or heavy oil accumulation</li>
  <li>Reduced cleaning effectiveness</li>
  <li>Strong or unpleasant odor</li>
</ul>
<p>An oil skimmer option is available on most models to extend solution life by continuously removing floating oils.</p>`,
      },
      {
        id: 'rust-after-washing',
        question: 'Will parts rust after washing with an aqueous machine?',
        answer: `<p>Bare steel parts can begin to surface rust within hours of aqueous washing if not treated. Options to prevent this include:</p>
<ul>
  <li>Using a detergent with a built-in rust inhibitor</li>
  <li>Adding a rust-prevention rinse stage (available as an option on <a href="/products/in-line-belt-conveyor-washers">conveyor</a> and <a href="/products/rotary-drum-washers">rotary systems</a>)</li>
  <li>Applying a light coating of rust-preventive oil after washing</li>
</ul>
<p>Stainless steel, aluminum, and other non-ferrous metals are not affected.</p>`,
      },
      {
        id: 'maintenance-requirements',
        question: 'What routine maintenance is required?',
        answer: `<p>Routine maintenance for most Magido washers is straightforward:</p>
<ul>
  <li>Clean the filter basket regularly (frequency depends on contamination load)</li>
  <li>Check and maintain solution level — add water to compensate for evaporation</li>
  <li>Inspect spray nozzles periodically for clogging and clean as needed</li>
  <li>Change the wash solution on a regular schedule</li>
  <li>Wipe down the exterior and door seals to prevent buildup</li>
  <li>Inspect pump and heater connections annually</li>
</ul>
<p>Detailed maintenance procedures are covered in the startup instructions included with each machine.</p>`,
      },
    ],
  },
  {
    slug: 'purchasing',
    heading: 'Purchasing & Lead Times',
    icon: '📦',
    items: [
      {
        id: 'how-to-get-a-quote',
        question: 'How do I get a price quote?',
        answer: `<p>You can request a quote directly through our <a href="/contact">contact page</a> or by calling <a href="tel:8444624436">844-462-4436</a>. Pricing varies by model, configuration, and any custom options. We'll typically respond with a quote within one business day.</p>`,
      },
      {
        id: 'lead-times',
        question: 'What are typical lead times?',
        answer: `<p>Lead times vary by model and configuration:</p>
<ul>
  <li><strong>Standard in-stock models</strong> — may ship within a few weeks</li>
  <li><strong>Custom-configured systems</strong> — built to order with longer lead times</li>
  <li><strong>Large industrial machines</strong> (<a href="/products/in-line-belt-conveyor-washers">belt conveyor</a>, <a href="/products/rotary-drum-washers">rotary drum</a>, <a href="/products/rotary-immersion-washers">rotary immersion</a>) — built to order; contact us for current timelines</li>
</ul>
<p>Contact us for current availability on the specific model you're interested in.</p>`,
      },
      {
        id: 'where-ships-from',
        question: 'Where do machines ship from?',
        answer: `<p>Magido USA machines ship from our North American distribution point in Sturtevant, WI. Freight delivery is standard for most machines due to their size and weight. We coordinate freight logistics and will provide shipping details and estimated delivery timelines with your order confirmation.</p>`,
      },
      {
        id: 'warranty',
        question: 'What warranty comes with a Magido washer?',
        answer: `<p>Magido USA machines come with a manufacturer's warranty covering defects in materials and workmanship. Our team also provides post-sale support for:</p>
<ul>
  <li>Installation questions</li>
  <li>Spare parts sourcing</li>
  <li>Technical troubleshooting</li>
</ul>
<p>Contact us for specific warranty terms on the machine you're considering.</p>`,
      },
      {
        id: 'spare-parts',
        question: 'Are spare parts available in the US?',
        answer: `<p>Yes. Magido USA maintains spare parts availability for all current models. Common wear items available include:</p>
<ul>
  <li>Spray nozzles</li>
  <li>Filter baskets</li>
  <li>Door and tank seals</li>
  <li>Pump components</li>
</ul>
<p>Contact our team with your machine model and the part you need, and we'll get you a quote and availability.</p>`,
      },
    ],
  },
];

/**
 * Get all FAQ items as a flat array — useful for JSON-LD schema generation
 */
export function getAllFaqItems(): FaqItem[] {
  return faqCategories.flatMap((cat) => cat.items);
}
