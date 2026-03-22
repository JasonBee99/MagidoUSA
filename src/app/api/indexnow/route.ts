// src/app/api/indexnow/route.ts
// POST /api/indexnow — submits all canonical URLs to Bing/IndexNow
// Protect with a secret token: POST /api/indexnow?secret=INDEXNOW_SECRET
// Usage: curl -X POST "https://magidousa.com/api/indexnow?secret=YOUR_SECRET"

import { NextResponse } from 'next/server';

const INDEXNOW_KEY = '789825D2AD4DFA38B9CAA16B7C9FEC3B';
const BASE = 'https://magidousa.com';
const SECRET = process.env.INDEXNOW_SECRET ?? 'magido-indexnow-2026';

// All canonical URLs — keep in sync with sitemap.ts
const ALL_URLS = [
  // Core pages
  `${BASE}`,
  `${BASE}/products`,
  `${BASE}/solutions`,
  `${BASE}/resources`,
  `${BASE}/contact`,
  `${BASE}/about`,
  `${BASE}/how-to-choose`,
  `${BASE}/compare`,
  `${BASE}/blog`,
  `${BASE}/industries`,
  `${BASE}/faq`,
  `${BASE}/aqueous-parts-washers`,
  `${BASE}/resources/catalog`,
  `${BASE}/privacy-policy`,
  `${BASE}/terms-of-use`,
  // Product categories
  `${BASE}/products/manual-washers`,
  `${BASE}/products/top-load-washers`,
  `${BASE}/products/front-load-washers`,
  `${BASE}/products/immersion-washers`,
  `${BASE}/products/in-line-belt-conveyor-washers`,
  `${BASE}/products/rotary-drum-washers`,
  `${BASE}/products/rotary-immersion-washers`,
  // Manual washers
  `${BASE}/products/manual-washers/dg-8`,
  `${BASE}/products/manual-washers/dg-9`,
  `${BASE}/products/manual-washers/l-7`,
  `${BASE}/products/manual-washers/l-10`,
  `${BASE}/products/manual-washers/hp-25`,
  `${BASE}/products/manual-washers/hp-30`,
  // Top load washers
  `${BASE}/products/top-load-washers/l101`,
  `${BASE}/products/top-load-washers/l102`,
  `${BASE}/products/top-load-washers/l122`,
  `${BASE}/products/top-load-washers/l152`,
  `${BASE}/products/top-load-washers/l-35`,
  `${BASE}/products/top-load-washers/l-55`,
  `${BASE}/products/top-load-washers/l-90`,
  `${BASE}/products/top-load-washers/l800fp`,
  `${BASE}/products/top-load-washers/l901fp`,
  `${BASE}/products/top-load-washers/l902fp`,
  `${BASE}/products/top-load-washers/l922fp`,
  `${BASE}/products/top-load-washers/l101hp`,
  `${BASE}/products/top-load-washers/l102hp`,
  `${BASE}/products/top-load-washers/l122hp`,
  `${BASE}/products/top-load-washers/l103`,
  `${BASE}/products/top-load-washers/l123`,
  `${BASE}/products/top-load-washers/l153`,
  `${BASE}/products/top-load-washers/tr450`,
  // Front load washers
  `${BASE}/products/front-load-washers/l160`,
  `${BASE}/products/front-load-washers/l190`,
  `${BASE}/products/front-load-washers/l210`,
  `${BASE}/products/front-load-washers/l240`,
  `${BASE}/products/front-load-washers/l162`,
  `${BASE}/products/front-load-washers/l192`,
  `${BASE}/products/front-load-washers/l212`,
  `${BASE}/products/front-load-washers/l242`,
  `${BASE}/products/front-load-washers/fls-30`,
  `${BASE}/products/front-load-washers/fls-35`,
  `${BASE}/products/front-load-washers/fls-45`,
  // Immersion washers
  `${BASE}/products/immersion-washers/a700`,
  `${BASE}/products/immersion-washers/a900`,
  `${BASE}/products/immersion-washers/a1100`,
  `${BASE}/products/immersion-washers/a1300`,
  // Belt conveyor washers
  `${BASE}/products/in-line-belt-conveyor-washers/g200`,
  `${BASE}/products/in-line-belt-conveyor-washers/g300`,
  `${BASE}/products/in-line-belt-conveyor-washers/g400`,
  `${BASE}/products/in-line-belt-conveyor-washers/g500`,
  `${BASE}/products/in-line-belt-conveyor-washers/g600`,
  `${BASE}/products/in-line-belt-conveyor-washers/g700`,
  `${BASE}/products/in-line-belt-conveyor-washers/g800`,
  `${BASE}/products/in-line-belt-conveyor-washers/g900`,
  `${BASE}/products/in-line-belt-conveyor-washers/g1000`,
  `${BASE}/products/in-line-belt-conveyor-washers/g200-2`,
  `${BASE}/products/in-line-belt-conveyor-washers/g300-2`,
  `${BASE}/products/in-line-belt-conveyor-washers/g400-2`,
  `${BASE}/products/in-line-belt-conveyor-washers/g500-2`,
  `${BASE}/products/in-line-belt-conveyor-washers/g600-2`,
  `${BASE}/products/in-line-belt-conveyor-washers/g700-2`,
  `${BASE}/products/in-line-belt-conveyor-washers/g800-2`,
  `${BASE}/products/in-line-belt-conveyor-washers/g900-2`,
  `${BASE}/products/in-line-belt-conveyor-washers/g1000-2`,
  `${BASE}/products/in-line-belt-conveyor-washers/s200`,
  `${BASE}/products/in-line-belt-conveyor-washers/s300`,
  `${BASE}/products/in-line-belt-conveyor-washers/s400`,
  // Rotary drum washers
  `${BASE}/products/rotary-drum-washers/j320`,
  `${BASE}/products/rotary-drum-washers/j320-2`,
  `${BASE}/products/rotary-drum-washers/sp320`,
  `${BASE}/products/rotary-drum-washers/sp480`,
  `${BASE}/products/rotary-drum-washers/sp640`,
  `${BASE}/products/rotary-drum-washers/sp950`,
  `${BASE}/products/rotary-drum-washers/sp320-2`,
  `${BASE}/products/rotary-drum-washers/sp480-2`,
  `${BASE}/products/rotary-drum-washers/sp640-2`,
  `${BASE}/products/rotary-drum-washers/sp950-2`,
  // Rotary immersion washers
  `${BASE}/products/rotary-immersion-washers/pm400`,
  `${BASE}/products/rotary-immersion-washers/p600-2`,
  `${BASE}/products/rotary-immersion-washers/p900-2`,
  `${BASE}/products/rotary-immersion-washers/p1200-2`,
  `${BASE}/products/rotary-immersion-washers/p1500-2`,
  // Industries
  `${BASE}/industries/automotive`,
  `${BASE}/industries/aerospace`,
  `${BASE}/industries/machining`,
  `${BASE}/industries/heavy-equipment`,
  `${BASE}/industries/medical`,
  `${BASE}/industries/food-processing`,
  // Solutions
  `${BASE}/solutions/aqueous-vs-solvent-parts-washers`,
  `${BASE}/solutions/spray-cabinet-vs-immersion-parts-washers`,
  `${BASE}/solutions/cleaning-brake-components`,
  `${BASE}/solutions/removing-cutting-oil-and-coolant`,
  `${BASE}/solutions/industrial-parts-washing-for-mro`,
  `${BASE}/solutions/cleaning-hydraulic-components`,
  `${BASE}/solutions/cleaning-automotive-transmission-parts`,
  `${BASE}/solutions/removing-stamping-and-forming-lubricants`,
  `${BASE}/solutions/food-and-beverage-equipment-cleaning`,
  `${BASE}/solutions/cleaning-electrical-and-electronic-components`,
  `${BASE}/solutions/cleaning-aerospace-components`,
  `${BASE}/solutions/cleaning-medical-device-components`,
  `${BASE}/solutions/aisi-304-stainless-steel-parts-washers`,
  // Resources
  `${BASE}/resources/top-load-washers`,
  `${BASE}/resources/front-load-washers`,
  `${BASE}/resources/manual-washers`,
  `${BASE}/resources/hp-service-instructions`,
  `${BASE}/resources/belt-conveyor-washers`,
  `${BASE}/resources/immersion-washers`,
  `${BASE}/resources/rotary-immersion-washers`,
  `${BASE}/resources/rotary-drum-washers`,
  // Blog
  `${BASE}/blog/aqueous-vs-solvent-parts-cleaning`,
  `${BASE}/blog/stainless-steel-parts-washers-outlast-competition`,
  `${BASE}/blog/spray-washing-vs-immersion-cleaning`,
  `${BASE}/blog/aqueous-parts-washer-maintenance-guide`,
  `${BASE}/blog/choosing-right-parts-washer-size`,
  `${BASE}/blog/how-often-change-parts-washer-solution`,
  `${BASE}/blog/5-signs-parts-washer-needs-servicing`,
  `${BASE}/blog/parts-washing-medical-device-manufacturing`,
  `${BASE}/blog/water-based-parts-washing-complete-guide`,
  `${BASE}/blog/how-to-size-a-parts-washer`,
  `${BASE}/blog/aqueous-parts-washers-automotive-manufacturing`,
];

export async function POST(request: Request) {
  // Simple secret check to prevent abuse
  const { searchParams } = new URL(request.url);
  if (searchParams.get('secret') !== SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: 'magidousa.com',
        key: INDEXNOW_KEY,
        keyLocation: `${BASE}/${INDEXNOW_KEY}.txt`,
        urlList: ALL_URLS,
      }),
    });

    if (res.ok || res.status === 202) {
      return NextResponse.json({
        success: true,
        submitted: ALL_URLS.length,
        status: res.status,
      });
    }

    const text = await res.text();
    return NextResponse.json({ success: false, status: res.status, body: text }, { status: 500 });

  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
