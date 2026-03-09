/**
 * MAGIDO USA — Resources & Documentation Data
 *
 * All content is self-contained — no external links.
 * Each document is a full page at /resources/[slug].
 * The catalog is a comprehensive page at /resources/catalog.
 *
 * Content is pulled from the WP site and products.json spec tables.
 * To add a new document: add an entry to the `resourceDocuments` array.
 */

export interface ResourceSection {
  heading: string;
  body: string; // HTML-safe string (rendered with dangerouslySetInnerHTML)
}

export interface ResourceDocument {
  slug: string;
  title: string;
  metaDescription: string;
  summary: string;
  icon: 'catalog' | 'doc' | 'service';
  categorySlug: string; // matches product category slug for linking
  categoryName: string;
  productLink: string;
  sections: ResourceSection[];
  /** Series slugs — the page will auto-pull spec tables from products.json */
  relatedSeries: string[];
}

// ─── The Product Catalog (comprehensive all-in-one page) ───
export const productCatalog: ResourceDocument = {
  slug: 'catalog',
  title: 'MAGIDO USA Aqueous Parts Washing Systems Product Catalog',
  metaDescription:
    'Complete product catalog for all Magido USA aqueous parts washing systems. Full specifications, standard features, options, and images for every washer model.',
  summary:
    'Full specifications, standard features, options, and images for every Magido USA aqueous parts washing system — all in one document.',
  icon: 'catalog',
  categorySlug: '',
  categoryName: 'All Products',
  productLink: '/products',
  sections: [
    {
      heading: 'Stainless Steel Industrial Cleaning Technology',
      body: `<p>MAGIDO is recognized as one of the industry's leading manufacturers of aqueous parts washing systems.</p>
<p>We've done so by distinguishing our company with the quality of the products we manufacture. This is due to the strategic planning and a careful choice of the quality materials we use during the manufacturing process along with the experience gained over time and the constant search for innovative solutions and technologies that add value to our finished product.</p>
<p>Our team is always attentive and willing to help our customers before and after the sales process to ensure total flexibility in creating a tailor-made wash system for their maintenance or production parts washing operation.</p>`,
    },
    {
      heading: 'DG Series — Sink-Style Manual Parts Washers',
      body: `<p>Magido Manual Sink-style Aqueous Parts Washers are engineered to handle the most rigorous challenges commonly found in industrial-automotive maintenance parts cleaning applications. Designed to use environmentally friendly aqueous (water-based) cleaning solutions for safe and effective parts cleaning results.</p>
<h4>Standard Features</h4>
<ul><li>AISI 304 Stainless Steel Construction</li><li>External Magnetic Drive Pump</li><li>Flo-Thru Brush</li><li>Electrical Heater Controlled by a Thermostat</li><li>Liquid Level Shut Off</li></ul>
<h4>Available Options</h4>
<ul><li>Cartridge filter</li><li>Casters</li></ul>`,
    },
    {
      heading: 'L Series — Vat-Style Manual Parts Washers',
      body: `<p>Magido Manual Vat-style Aqueous Parts Washers are engineered to handle rigorous industrial-automotive maintenance parts cleaning applications. These systems use environmentally friendly aqueous cleaning solutions for effective degreasing of medium to large components.</p>
<h4>Standard Features</h4>
<ul><li>AISI 304 Stainless Steel Construction</li><li>Electrical Heater with Thermostat Control</li><li>Liquid Level Sensor</li><li>Drain Valve</li><li>Removable Parts Basket</li></ul>
<h4>Available Options</h4>
<ul><li>Cartridge or bag filtration</li><li>Additional heater capacity</li></ul>`,
    },
    {
      heading: 'HP Series — High-Pressure Manual Parts Washers',
      body: `<p>The HP25 &amp; HP30 parts washers are heated water blasting cabinets made entirely of AISI 304 stainless steel. Developed for technicians that need to reduce cleaning time by blasting parts clean with a heated aqueous solution. The high-pressure spray wand delivers up to 870 PSI.</p>
<h4>Standard Features</h4>
<ul><li>Powerful (870 PSI) Piston-Drive Pump</li><li>LED Illuminated Cabinet</li><li>Ergonomic Spray Wand</li><li>Window-Clearing Blower</li><li>Thermostat Controlled Heater</li><li>Liquid Level Sensor &amp; Low Water Shut Off</li><li>Removable Work Tray &amp; Screened Filter Basket</li></ul>
<h4>Available Options</h4>
<ul><li>Oil skimmer</li><li>External filtration</li></ul>`,
    },
    {
      heading: 'X81 Series — Compact Top Load Spray Cabinet Washers',
      body: `<p>X81 Series parts washers are automatic spray jet wash systems constructed using AISI 304 stainless steel, available in 3 models with turntable sizes ranging from 14" to 30". Each wash system is equipped with a rotating turntable and spray bar that uses water pressure for washing small to medium-sized parts.</p>
<h4>Standard Features</h4>
<ul><li>AISI 304 Stainless Steel Construction</li><li>Automatic Rotary Turntable with Sprocket Drive</li><li>Calibrated V-Jet Spray Nozzle System</li><li>Adjustable Solution Heater with Thermostat</li><li>Fluid Level Sensor</li><li>Removable Mesh Filter Basket</li><li>Tank Drain</li></ul>
<h4>Available Options</h4>
<ul><li>Drying cycle with heated blower</li><li>Cartridge or bag filtration</li><li>Oil skimmer</li><li>Stainless steel lid lifter</li></ul>`,
    },
    {
      heading: 'X51 Series — Top Load Spray Cabinet Washers',
      body: `<p>The X51 Series is designed with a unique clamshell design that brings the jet-spray cleaning power closer to your parts for maximum performance. Automatic spray jet wash systems constructed using AISI 304 stainless steel with turntable sizes ranging from 35" to 51". Equipped with rotating turntable and spray bars using water pressure for washing medium to large-sized parts.</p>
<h4>Standard Features</h4>
<ul><li>AISI 304 Stainless Steel Construction</li><li>Automatic Rotary Turntable with Sprocket Drive</li><li>V-Jet Spray Nozzle System (up to 58 nozzles)</li><li>Adjustable Solution Heater &amp; Wash Cycle Timer</li><li>Fluid Level Sensor</li><li>Removable Filter Basket</li><li>Tank Drain</li></ul>
<h4>Available Options</h4>
<ul><li>Drying cycle with heated blower</li><li>Rinse stage</li><li>Cartridge or bag filtration</li><li>Oil skimmer</li><li>Stainless steel lid lifter (pneumatic or electric)</li></ul>`,
    },
    {
      heading: 'X51/2 Series — Dual-Stage Top Load Washers',
      body: `<p>X51/2 series parts washers are automatic spray jet wash systems with dual tanks for wash and rinse stages that ensure a residue-free finish. Constructed using AISI 304 stainless steel with turntable sizes ranging from 35" to 55". The wash and rinse stages are controlled by PLC operation that prevents cross contamination between tanks.</p>
<h4>Standard Features</h4>
<ul><li>AISI 304 Stainless Steel Construction</li><li>Dual Tanks — Wash &amp; Rinse with PLC Control</li><li>Automatic Rotary Turntable</li><li>V-Jet Spray Nozzle System</li><li>Independent Heaters for Each Tank</li><li>Fluid Level Sensors</li></ul>
<h4>Available Options</h4>
<ul><li>Drying cycle with heated blower</li><li>Cartridge or bag filtration</li><li>Oil skimmer</li><li>Pneumatic or electric lid lifter</li></ul>`,
    },
    {
      heading: 'X53 Series — Front Load Spray Cabinet Washers',
      body: `<p>Magido X53 Series parts washers are engineered for automatic spray parts washing applications utilizing aqueous detergents at temperatures of 160°F. The front-loading design allows easy access for loading and unloading heavy or awkward parts. The turntable removes easily from the wash system onto a mobile cart.</p>
<h4>Standard Features</h4>
<ul><li>AISI 304 Stainless Steel Construction</li><li>Front-Loading Door with Safety Interlock</li><li>Fixed Platform with Spray Ramp</li><li>V-Jet Nozzle Configuration</li><li>Adjustable Solution Heater</li><li>Fluid Level Sensor</li><li>Removable Filter Basket</li></ul>
<h4>Available Options</h4>
<ul><li>Mobile loading cart</li><li>Drying cycle</li><li>Rinse stage</li><li>Oil skimmer</li><li>Filtration upgrades</li></ul>`,
    },
    {
      heading: 'X53/2 Series — Dual-Stage Front Load Washers',
      body: `<p>Magido X53/2 Series parts washers are engineered for automatic spray parts washing applications with dual tanks for wash and rinse stages at temperatures of 160°F. The operation principle is based on a fixed platform with angled water jet nozzles configured on a spray ramp. Turntable capacity up to 59"x59".</p>
<h4>Standard Features</h4>
<ul><li>AISI 304 Stainless Steel Construction</li><li>Dual Tanks — Wash &amp; Rinse with PLC Control</li><li>Front-Loading Door with Safety Interlock</li><li>Fixed Platform with Spray Ramp</li><li>Independent Heaters for Each Tank</li></ul>
<h4>Available Options</h4>
<ul><li>Mobile loading cart</li><li>Drying cycle</li><li>Oil skimmer</li><li>Filtration upgrades</li></ul>`,
    },
    {
      heading: 'Rotary Drum Aqueous Parts Washing Systems',
      body: `<p>Magido industrial rotary-auger drum wash systems are the right choice for continuous parts cleaning. Parts are augured through the machine's processing drum and cleaned by a dual action process combining submersion (flushing inside hollow parts) and spray cleaning (exterior surfaces). Each wash system is customized to exact specifications with process zones including prewash, wash, rinse, rust prevention, blow-off, and drying stages.</p>
<h4>Standard Features</h4>
<ul><li>AISI 304 Stainless Steel Construction</li><li>Helical Auger Drum Design</li><li>Combined Submersion &amp; Spray Cleaning</li><li>Adjustable Drum Speed</li><li>Solution Heating System</li><li>Customizable Process Zones</li></ul>
<h4>Available Options</h4>
<ul><li>Rinse stage</li><li>Rust prevention stage</li><li>Blow-off and drying stages</li><li>Filtration systems</li><li>Oil skimmer</li></ul>`,
    },
    {
      heading: 'In-Line Belt Conveyor Aqueous Parts Washing Systems',
      body: `<p>Magido industrial in-line belt conveyor wash systems are the right choice for flow-through cleaning processes. Each system is customized to exact specifications with process zones including pre-wash, wash, rinse, rust prevention, blow-off, and drying stages. Designed to use environmentally safe aqueous cleaning solutions for parts cleaning applications.</p>
<h4>Standard Features</h4>
<ul><li>AISI 304 Stainless Steel Construction</li><li>Continuous Belt Conveyor System</li><li>Adjustable Belt Speed</li><li>V-Jet Spray Nozzle Arrays</li><li>Solution Heating System</li><li>Customizable Process Zones</li></ul>
<h4>Available Options</h4>
<ul><li>Pre-wash stage</li><li>Rinse stage</li><li>Rust prevention stage</li><li>Blow-off and drying stages</li><li>Filtration systems</li><li>Oil skimmer</li></ul>`,
    },
    {
      heading: 'Rotary Immersion Aqueous Parts Washing Systems',
      body: `<p>Magido's industrial rotary-immersion style wash systems clean parts in baskets or fixtures by rotating them in a turbulent immersion parts washing bath combined with a spray cleaning cycle. The cleaning cycle is followed by a combination of spray and immersion rinsing with an available stage for drying. Each system is customized to exact specifications.</p>
<h4>Standard Features</h4>
<ul><li>AISI 304 Stainless Steel Construction</li><li>Rotary Basket/Fixture Immersion System</li><li>Turbulent Immersion Bath</li><li>Combined Immersion &amp; Spray Cycles</li><li>PLC Control Operation</li><li>Solution Heating System</li></ul>
<h4>Available Options</h4>
<ul><li>Rinse stage (spray and/or immersion)</li><li>Heated drying stage</li><li>Filtration systems</li><li>Oil skimmer</li></ul>`,
    },
    {
      heading: 'Industries Served',
      body: `<p>MAGIDO parts washers are designed to solve particular washing needs of small, medium, and large parts across the following industries:</p>
<ul><li>Aerospace &amp; Defense</li><li>Automotive &amp; Transportation</li><li>Machining &amp; Metal Fabrication</li><li>Heavy Equipment &amp; MRO</li><li>Medical Devices</li><li>Food Processing</li><li>General Manufacturing</li></ul>`,
    },
  ],
  relatedSeries: [
    'dg', 'l', 'hp', 'x81', 'eco', 'x51', 'x51hp', 'x51-2',
    'fls', 'x53', 'x53-2', 'agita', 'ultra',
    'jolly', 'spira-1b', 'spira-2b',
    'silver', 'gold-1b', 'gold-2b',
    'platinum',
  ],
};

// ─── Individual Technical Documents ───
export const resourceDocuments: ResourceDocument[] = [
  {
    slug: 'top-load-washers',
    title: 'Top Load Aqueous Parts Washing Systems',
    metaDescription:
      'Technical documentation for Magido X81, Eco, X51, X51 HP, and X51/2 series top load spray cabinet parts washers. Full specs, features, and options.',
    summary:
      'Technical documentation for the full range of X81, Eco, X51, X51 HP, and X51/2 series top load spray cabinet parts washers.',
    icon: 'doc',
    categorySlug: 'top-load-washers',
    categoryName: 'Top Load Washers',
    productLink: '/products/top-load-washers',
    sections: [
      {
        heading: 'Overview',
        body: `<p>Magido X-51 and X-81 Series parts washers are engineered for automatic spray parts washing applications utilizing aqueous detergents at temperatures of 150°F. The operation principle is based on a rotating platform on which the parts are placed, and a series of angled water jet nozzles which optimally wash all areas of the parts needed to be cleaned.</p>
<p>X-Series wash systems are mainly categorized by the size and capacity of the turntable with sizes ranging from 14" to 55" in diameter. All machines are constructed in AISI 304 stainless steel and additional options are available for filtration, rinsing, and drying stages.</p>`,
      },
      {
        heading: 'Eco Series',
        body: `<p>The Eco parts washer series are designed with a small footprint, making them the ideal solution for small workspaces. Each parts washer is manufactured in 304 stainless steel with an automatic sprocket turntable drive, liquid level sensor, calibrated jet-spray nozzles, and tank drain.</p>`,
      },
      {
        heading: 'X81 Series',
        body: `<p>X81 Series parts washers are automatic spray jet wash systems constructed using AISI 304 stainless steel, available in 3 models with turntable sizes ranging from 14" to 30". Each wash system is equipped with a rotating turntable and a spray bar that uses water pressure for washing small to medium-sized parts.</p>
<h4>Standard Features</h4>
<ul><li>AISI 304 Stainless Steel Construction</li><li>Automatic Rotary Turntable with Sprocket Drive</li><li>Calibrated V-Jet Spray Nozzle System</li><li>Adjustable Solution Heater with Thermostat</li><li>Fluid Level Sensor</li><li>Removable Mesh Filter Basket</li><li>Tank Drain</li></ul>`,
      },
      {
        heading: 'X51 Series',
        body: `<p>The X-51 Series is designed with a unique clamshell design that brings the jet-spray cleaning power closer to your parts for maximum performance. Each of four models features an automatic rotary turntable, jet-spray cleaning manifolds, adjustable solution heater, complete stainless steel construction, fluid level sensor, removable filter basket, and tank drain.</p>
<p>X-51 series parts washers are automatic spray jet wash systems constructed using AISI 304 stainless steel with turntable sizes ranging from 35" to 51". They are ergonomic and engineered to reduce shop labor cost without sacrificing wash performance.</p>
<h4>Standard Features</h4>
<ul><li>AISI 304 Stainless Steel Construction</li><li>Automatic Rotary Turntable with Sprocket Drive</li><li>V-Jet Spray Nozzle System</li><li>Adjustable Solution Heater &amp; Wash Cycle Timer</li><li>Fluid Level Sensor</li><li>Removable Filter Basket</li><li>Tank Drain</li></ul>
<h4>Available Options</h4>
<ul><li>Drying cycle with heated blower</li><li>Rinse stage</li><li>Cartridge or bag filtration</li><li>Oil skimmer</li><li>Stainless steel lid lifter (pneumatic or electric)</li></ul>`,
      },
      {
        heading: 'X51/2 Series (Dual Stage)',
        body: `<p>X51/2 series parts washers are automatic spray jet wash systems with dual tanks for wash and rinse stages that ensure a residue-free finish. Constructed using AISI 304 stainless steel with turntable sizes ranging from 35" to 55". The wash and rinse stages are controlled by PLC operation that prevents cross contamination in the tanks.</p>
<p>They are ideal for medium workloads with bulky parts and offer ease of operation. Simply by loading parts on the turntable, the operator starts the automatic cycle and can return to their task.</p>
<h4>Standard Features</h4>
<ul><li>Dual Tanks — Wash &amp; Rinse with PLC Control</li><li>AISI 304 Stainless Steel Construction</li><li>Automatic Rotary Turntable</li><li>V-Jet Spray Nozzle System</li><li>Independent Heaters for Each Tank</li><li>Fluid Level Sensors</li></ul>`,
      },
    ],
    relatedSeries: ['x81', 'eco', 'x51', 'x51hp', 'x51-2'],
  },
  {
    slug: 'front-load-washers',
    title: 'Front Loading Aqueous Parts Washing Systems',
    metaDescription:
      'Technical documentation for Magido X53 and X53/2 series front load spray cabinet parts washers with specs, features, and options.',
    summary:
      'Technical documentation for X53 and X53/2 series front load spray cabinet parts washers.',
    icon: 'doc',
    categorySlug: 'front-load-washers',
    categoryName: 'Front Load Washers',
    productLink: '/products/front-load-washers',
    sections: [
      {
        heading: 'Overview',
        body: `<p>A front load aqueous parts washer uses a combination of hot water, detergents, and mechanical energy to clean parts. The front-load design means parts are loaded through a front door, making it easier to load and unload heavy or awkward parts. These washers automate the cleaning process, reducing the need for manual labor and improving safety and efficiency.</p>`,
      },
      {
        heading: 'X53 Series',
        body: `<p>Magido X53 Series parts washers are engineered for automatic spray parts washing applications utilizing aqueous detergents at temperatures of 160°F. The turntable removes easily from the wash system onto a mobile cart for easy loading and unloading.</p>
<h4>Standard Features</h4>
<ul><li>AISI 304 Stainless Steel Construction</li><li>Front-Loading Door with Safety Interlock</li><li>Fixed Platform with Spray Ramp</li><li>V-Jet Nozzle Configuration</li><li>Adjustable Solution Heater</li><li>Fluid Level Sensor</li></ul>`,
      },
      {
        heading: 'X53/2 Series (Dual Stage)',
        body: `<p>Magido X53/2 Series parts washers provide dual tanks for wash and rinse stages at temperatures of 160°F. The operation principle is based on a fixed platform with angled water jet nozzles configured on a spray ramp. Turntable capacity up to 59"x59".</p>
<h4>Standard Features</h4>
<ul><li>Dual Tanks — Wash &amp; Rinse with PLC Control</li><li>AISI 304 Stainless Steel Construction</li><li>Front-Loading Door with Safety Interlock</li><li>Independent Heaters for Each Tank</li></ul>`,
      },
    ],
    relatedSeries: ['fls', 'x53', 'x53-2'],
  },
  {
    slug: 'manual-washers',
    title: 'MAGIDO Manual Aqueous Parts Washers',
    metaDescription:
      'Technical documentation for Magido DG series sink-style, L series vat-style, and HP series high-pressure manual aqueous parts washers.',
    summary:
      'Technical documentation for DG series sink-style, L series vat-style, and HP high-pressure manual aqueous parts washers.',
    icon: 'doc',
    categorySlug: 'manual-washers',
    categoryName: 'Manual Washers',
    productLink: '/products/manual-washers',
    sections: [
      {
        heading: 'Overview',
        body: `<p>Magido manual parts washers are engineered to handle the most rigorous challenges commonly found in industrial-automotive maintenance cleaning applications. Designed to use environmentally safe aqueous (water-based) cleaning solutions for safe and effective parts cleaning applications.</p>`,
      },
      {
        heading: 'DG Series — Sink-Style Washers',
        body: `<p>The DG8 and DG9 are sink-style manual parts washers with a foot-pedal regulated hand-held flow-through cleaning brush. Constructed entirely of AISI 304 stainless steel.</p>
<h4>Standard Features</h4>
<ul><li>Stainless Steel Construction</li><li>External Magnetic Drive Pump</li><li>Flo-Thru Brush</li><li>Electrical Heater Controlled by a Thermostat</li><li>Liquid Level Shut Off</li></ul>`,
      },
      {
        heading: 'L Series — Vat-Style Washers',
        body: `<p>The L7 and L10 vat-style manual washers are designed for soaking and manual cleaning of medium to large components using heated aqueous solutions.</p>
<h4>Standard Features</h4>
<ul><li>AISI 304 Stainless Steel Construction</li><li>Electrical Heater with Thermostat Control</li><li>Liquid Level Sensor</li><li>Drain Valve</li><li>Removable Parts Basket</li></ul>`,
      },
      {
        heading: 'HP Series — High-Pressure Washers',
        body: `<p>The HP25 &amp; HP30 are heated water blasting cabinets made entirely of AISI 304 stainless steel. The high-pressure spray wand delivers up to 870 PSI for fast, thorough cleaning of complex parts like wheel bearings, valve bodies, small dies, and cylinder heads.</p>
<h4>Standard Features</h4>
<ul><li>870 PSI Piston-Drive Pump</li><li>LED Illuminated Cabinet</li><li>Ergonomic Spray Wand</li><li>Window-Clearing Blower</li><li>Thermostat Controlled Heater</li><li>Liquid Level Sensor &amp; Low Water Shut Off</li><li>Removable Work Tray &amp; Screened Filter Basket</li></ul>`,
      },
    ],
    relatedSeries: ['dg', 'l', 'hp'],
  },
  {
    slug: 'hp-service-instructions',
    title: 'HP Start Up and Service Instructions',
    metaDescription:
      'Startup and service instructions for Magido HP25 and HP30 high-pressure manual parts washers.',
    summary:
      'Startup and service instructions for HP25 and HP30 high-pressure manual parts washers.',
    icon: 'service',
    categorySlug: 'manual-washers',
    categoryName: 'Manual Washers',
    productLink: '/products/manual-washers',
    sections: [
      {
        heading: 'Initial Setup',
        body: `<p>Before operating your HP25 or HP30 for the first time, ensure the following steps are completed:</p>
<ul><li>Verify all shipping brackets and restraints have been removed</li><li>Position the unit on a level surface near appropriate power and drain connections</li><li>Fill the solution tank with water to the indicated level before adding detergent</li><li>Add the recommended aqueous cleaning detergent per manufacturer specifications</li><li>Connect to the appropriate electrical supply (verify voltage rating on nameplate)</li></ul>`,
      },
      {
        heading: 'Operating Procedures',
        body: `<p>Follow these steps for standard operation:</p>
<ul><li>Ensure the solution level is at or above the minimum fill line</li><li>Power on the unit and allow the heater to bring the solution to operating temperature (approximately 30–45 minutes for initial startup)</li><li>Place parts on the removable work tray inside the cabinet</li><li>Close the cabinet door securely</li><li>Use the ergonomic spray wand to direct high-pressure solution onto the parts</li><li>After cleaning, allow parts to drain before removing</li></ul>`,
      },
      {
        heading: 'Routine Maintenance',
        body: `<p>Regular maintenance ensures optimal performance and longevity:</p>
<ul><li><strong>Daily:</strong> Check solution level; top off as needed. Remove debris from the screened filter basket.</li><li><strong>Weekly:</strong> Inspect the spray wand nozzle for blockage. Clean the window-clearing blower intake.</li><li><strong>Monthly:</strong> Drain and clean the solution tank. Inspect the heater element for scale buildup. Check pump pressure output.</li><li><strong>As Needed:</strong> Replace solution when cleaning performance diminishes. Replace filter basket screens if damaged.</li></ul>`,
      },
      {
        heading: 'Troubleshooting',
        body: `<p>Common issues and solutions:</p>
<ul><li><strong>Low pressure:</strong> Check solution level, inspect nozzle for blockage, verify pump operation</li><li><strong>Solution not heating:</strong> Check thermostat setting, verify heater element, check electrical connections</li><li><strong>Pump not running:</strong> Verify power connection, check low-water shutoff sensor, inspect pump for debris</li><li><strong>Poor cleaning results:</strong> Check solution concentration, verify temperature is at operating level, inspect nozzle spray pattern</li></ul>`,
      },
    ],
    relatedSeries: ['hp'],
  },
  {
    slug: 'belt-conveyor-washers',
    title: 'In-Line Belt Conveyor Aqueous Parts Washing Systems',
    metaDescription:
      'Technical documentation for Magido Silver, Gold 1b, and Gold 2b series in-line belt conveyor parts washing systems.',
    summary:
      'Technical documentation for Silver, Gold 1b, and Gold 2b series in-line belt conveyor parts washing systems.',
    icon: 'doc',
    categorySlug: 'in-line-belt-conveyor-washers',
    categoryName: 'Belt Conveyor Washers',
    productLink: '/products/in-line-belt-conveyor-washers',
    sections: [
      {
        heading: 'Overview',
        body: `<p>Magido industrial in-line belt conveyor wash systems are the right choice for flow-through cleaning processes. Each system is customized to exact specifications with process zones including pre-wash, wash, rinse, rust prevention, blow-off, and drying stages. Designed to use environmentally safe aqueous cleaning solutions.</p>`,
      },
      {
        heading: 'Silver Series',
        body: `<p>The Silver series offers an economical entry point for continuous belt conveyor washing. Ideal for medium-volume production environments requiring automated wash and rinse cycles.</p>
<h4>Standard Features</h4>
<ul><li>AISI 304 Stainless Steel Construction</li><li>Continuous Belt Conveyor</li><li>Adjustable Belt Speed</li><li>V-Jet Spray Nozzle Arrays</li><li>Solution Heating System</li></ul>`,
      },
      {
        heading: 'Gold 1b Series',
        body: `<p>The Gold 1b series provides enhanced cleaning capability for high-volume production with single-belt configuration and extended processing zones.</p>`,
      },
      {
        heading: 'Gold 2b Series',
        body: `<p>The Gold 2b series is the premium belt conveyor offering with dual-belt configuration for maximum throughput and the most comprehensive range of processing zones.</p>`,
      },
    ],
    relatedSeries: ['silver', 'gold-1b', 'gold-2b'],
  },
  {
    slug: 'immersion-washers',
    title: 'Immersion Parts Washing Systems — Agita Series',
    metaDescription:
      'Technical documentation for the Magido Agita Series top-load immersion parts washers. Full specifications, standard features, options, and safety systems for A700, A900, A1100, and A1300 models.',
    summary:
      'Technical documentation for the Agita Series top-load immersion parts washers — pneumatic oscillating platform, optional ultrasonic cleaning, and full specs for all four models.',
    icon: 'doc',
    categorySlug: 'immersion-washers',
    categoryName: 'Immersion Washers',
    productLink: '/products/immersion-washers',
    sections: [
      {
        heading: 'Overview',
        body: `<p>The Magido Agita Series immersion parts washers are engineered for aqueous immersion cleaning using water-based detergent solutions at temperatures up to 170°F (75°C). Unlike spray-cabinet washers, immersion cleaning fully submerges parts — ensuring detergent penetrates complex geometries, blind bores, and recessed cavities that spray alone cannot reach.</p>
<p>The core cleaning action is delivered by a pneumatic oscillating platform that agitates parts within the solution, driving fresh fluid into every surface and displacing loosened contamination. An optional ultrasonic stage, operating at the bottom of the tank, further enhances cleaning performance for the most demanding contamination levels.</p>
<p>All Agita Series machines are fabricated from AISI 304 stainless steel, providing long-term corrosion resistance in aqueous detergent environments. The Siemens PLC control system delivers repeatable, programmable cleaning cycles, while the oil sparger and weir system continuously removes surface contamination from the solution — extending fluid life and reducing operating costs.</p>`,
      },
      {
        heading: 'Standard Features',
        body: `<ul>
<li>AISI 304 Stainless Steel Construction throughout</li>
<li>Pneumatic Oscillating Immersion Platform — agitates parts during wash cycle</li>
<li>Oil Sparger &amp; Weir System — continuously skims surface oils to extend fluid life</li>
<li>Stainless Steel / Incoloy Heating Elements</li>
<li>Low Water Heating Element Shutoff</li>
<li>Thermally Insulated Tank — reduces energy consumption and heat loss</li>
<li>Strut-Assisted Lid for safe and easy access</li>
<li>Siemens PLC Control System</li>
<li>Operating Temperature: Ambient to 170°F (75°C)</li>
</ul>`,
      },
      {
        heading: 'Available Options',
        body: `<ul>
<li>Ultrasonic Cleaning Stage — enhanced removal of fine particulate and oils</li>
<li>Filtration System</li>
<li>Automatic Lid Operation</li>
<li>24/7 Heat Controller — maintains solution temperature continuously</li>
<li>Automatic Water Fill with Fluid Level Sensor</li>
<li>Steam Exhaust Fan</li>
<li>Spray-Under-Immersion — adds spray impingement during immersion cycle</li>
</ul>`,
      },
      {
        heading: 'Safety Features',
        body: `<ul>
<li>24V Low-Voltage Control Circuit</li>
<li>NEMA 4 Electrical Enclosure — splash and dust resistant</li>
<li>Push-Button Emergency Stop</li>
<li>Main Power Disconnect Switch</li>
<li>Counter-Balanced Lid — prevents uncontrolled closure</li>
<li>Liquid Level Shutoff — protects heating elements from dry-fire</li>
<li>No Exposed Sharp Metal Edges</li>
<li>Low Noise Operation — under 70 dBA</li>
<li>CE Certified</li>
</ul>`,
      },
      {
        heading: 'Applications',
        body: `<p>The Agita Series is ideally suited for parts that require thorough cleaning of internal passages, complex castings, and surfaces where spray impingement alone is insufficient. Common applications include:</p>
<ul>
<li>Automotive transmission cases, valve bodies, and engine components</li>
<li>Hydraulic manifolds and cylinders with blind bores</li>
<li>Machined aluminum and ferrous castings</li>
<li>Aerospace structural components requiring contamination-free surfaces</li>
<li>Medical device components requiring high-purity cleaning</li>
</ul>`,
      },
    ],
    relatedSeries: ['agita'],
  },
  {
    slug: 'rotary-immersion-washers',
    title: 'Rotary Immersion Parts Washing Systems — Platinum Series',
    metaDescription:
      'Technical documentation for the Magido Platinum Series front-load rotary immersion parts washers. Full specifications, standard features, options, and safety systems for PM400, P600/2, P900/2, P1200/2, and P1500/2 models.',
    summary:
      'Technical documentation for the Platinum Series front-load rotary immersion washers — triple-action cleaning with spray impingement, immersion, and basket rotation, plus full specs for all five models.',
    icon: 'doc',
    categorySlug: 'rotary-immersion-washers',
    categoryName: 'Rotary Immersion Washers',
    productLink: '/products/rotary-immersion-washers',
    sections: [
      {
        heading: 'Overview',
        body: `<p>The Magido Platinum Series rotary immersion parts washers are designed to clean critical components with complex geometry — particularly parts featuring internal bores, deep channels, and blind passages where chips, swarf, and oils become trapped and cannot be removed by spray-only systems.</p>
<p>Cleaning performance is achieved through the combination of three complementary mechanisms working simultaneously: direct spray impingement from internal manifolds, hydraulic purging through full-part immersion, and continuous rotational agitation of the wash basket. This triple-action process drives fresh cleaning solution through internal passages throughout the entire cycle.</p>
<p>Each process stage (wash and rinse) is completely isolated, with its own dedicated fluid tank, high-speed drain actuator, circulation pump, and spray manifold. This separation prevents cross-contamination between stages and allows independent temperature and chemical control for each phase. The Siemens PLC with Weintek HMI touch screen provides straightforward operator control and fully automated cycle management.</p>
<p>All Platinum Series machines are fabricated from AISI 304 stainless steel. The rotating wash basket accepts parts loaded on a front-loading table, with pneumatic door closure sealing the chamber before each cycle begins.</p>`,
      },
      {
        heading: 'Standard Features',
        body: `<ul>
<li>AISI 304 Stainless Steel Construction throughout</li>
<li>Front-Loading Table with Operator Controls</li>
<li>Siemens PLC with Weintek HMI Operator Touch Screen</li>
<li>Fully Automated Cycle Control</li>
<li>Separate Wash &amp; Rinse Stages with Independent Tanks, Pumps &amp; Manifolds</li>
<li>Stainless Steel High-Pressure Circulation Pumps</li>
<li>Digital Temperature Controls with Stainless Steel Heating Elements</li>
<li>Variable-Speed Rotational Drum Drive — basket rotation during wash and rinse</li>
<li>Liquid Level Control &amp; Automatic Water Fill</li>
<li>Stainless Steel Exhaust Fan</li>
<li>Marine-Style Cleanout Door for easy tank maintenance</li>
<li>Removable Tank Access Panels</li>
<li>Lift-Out Chip Baskets</li>
<li>Pneumatic Door Closure</li>
</ul>`,
      },
      {
        heading: 'Available Options',
        body: `<ul>
<li>Electric Dryer / Air Blower</li>
<li>Filtration System</li>
<li>Oil / Water Separator</li>
<li>Oil Skimmer</li>
<li>Steam / Mist Condenser</li>
<li>Pallet Loader</li>
<li>Automatic Chemical Proportioning System</li>
<li>Automatic Load / Unload System</li>
<li>Process Light Tower (Stack Light)</li>
<li>Additional Fluid Capacity</li>
<li>Pump Upgrades</li>
<li>Chemical Injector</li>
<li>Air Knife Blow-Off</li>
</ul>`,
      },
      {
        heading: 'Safety Features',
        body: `<ul>
<li>24V Low-Voltage Control Circuit</li>
<li>NEMA 4 Electrical Panel — splash and dust resistant</li>
<li>Push-Button Emergency Stop</li>
<li>Main Power Disconnect Switch with Lock-Out / Tag-Out provision</li>
<li>Overload Protection on Pumps, Rotational Drive &amp; Heaters</li>
<li>Two-Hand Door Operation — prevents door closure during loading</li>
<li>Door Interlock Safety Switch — cycle cannot start with door open</li>
<li>Fluid Level Controls — protects pumps and heating elements</li>
<li>No Exposed Sharp Metal Edges</li>
<li>Low Noise Operation — under 70 dBA</li>
<li>CE Certified</li>
</ul>`,
      },
      {
        heading: 'Applications',
        body: `<p>The Platinum Series excels where conventional spray washers fall short — components with complex internal geometry that traps chips, oils, and particulate. Typical applications include:</p>
<ul>
<li>CNC-machined parts with deep blind bores, cross-drilled passages, and threaded features</li>
<li>Automotive engine blocks, cylinder heads, crankshafts, and transmission housings</li>
<li>Aerospace structural components and hydraulic actuator bodies</li>
<li>Heavy equipment hydraulic valves, manifolds, and pump bodies</li>
<li>Medical implants and surgical instruments requiring validated cleaning processes</li>
<li>Remanufactured components requiring removal of embedded contamination</li>
</ul>`,
      },
    ],
    relatedSeries: ['platinum'],
  },
  {
    slug: 'rotary-drum-washers',
    title: 'Rotary Drum Aqueous Parts Washing Systems',
    metaDescription:
      'Technical documentation for Magido Jolly and Spira series helical rotary drum aqueous parts washing systems.',
    summary:
      'Technical documentation for Jolly and Spira series helical rotary drum aqueous parts washing systems.',
    icon: 'doc',
    categorySlug: 'rotary-drum-washers',
    categoryName: 'Rotary Drum Washers',
    productLink: '/products/rotary-drum-washers',
    sections: [
      {
        heading: 'Overview',
        body: `<p>MAGIDO helical rotary drum aqueous parts washing systems are perfect for continuous cleaning and drying of high volume, small parts when part-on-part contact is acceptable. As parts auger through the machine's processing drum, they are first submerged in cleaning solution, spray-washed, then sprayed in an optional rinse followed by optional heated drying stage.</p>
<p>These units are a complete feed-through operation, allowing parts to be automatically fed directly from wash to rinse and drying stages.</p>`,
      },
      {
        heading: 'Jolly Series',
        body: `<p>The Jolly series is a compact rotary drum washer ideal for smaller parts volumes and facilities with limited floor space.</p>
<h4>Standard Features</h4>
<ul><li>AISI 304 Stainless Steel Construction</li><li>Helical Auger Drum</li><li>Combined Submersion &amp; Spray Cleaning</li><li>Adjustable Drum Speed</li><li>Solution Heating System</li></ul>`,
      },
      {
        heading: 'Spira 1b &amp; Spira 2b Series',
        body: `<p>The Spira series offers larger capacity rotary drum washing for industrial-scale continuous parts cleaning. Available in single-band (1b) and dual-band (2b) configurations for varying throughput requirements.</p>`,
      },
    ],
    relatedSeries: ['jolly', 'spira-1b', 'spira-2b'],
  },
];

// ─── Helpers ───
export function getAllResourceDocuments(): ResourceDocument[] {
  return resourceDocuments;
}

export function getResourceBySlug(slug: string): ResourceDocument | undefined {
  if (slug === 'catalog') return productCatalog;
  return resourceDocuments.find((d) => d.slug === slug);
}

export function getAllResourceSlugs(): string[] {
  return ['catalog', ...resourceDocuments.map((d) => d.slug)];
}

/**
 * Get documents grouped by their product category for the index page
 */
export function getResourcesByCategory(): {
  categoryName: string;
  productLink: string;
  docs: ResourceDocument[];
}[] {
  const groups: Record<
    string,
    { categoryName: string; productLink: string; docs: ResourceDocument[] }
  > = {};

  for (const doc of resourceDocuments) {
    if (!groups[doc.categorySlug]) {
      groups[doc.categorySlug] = {
        categoryName: doc.categoryName,
        productLink: doc.productLink,
        docs: [],
      };
    }
    groups[doc.categorySlug].docs.push(doc);
  }

  return Object.values(groups);
}
