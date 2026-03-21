'use client';

import { usePathname } from 'next/navigation';

// ─── Route → tagline map ──────────────────────────────────────────────────────
// Taglines pack the top 5 high-volume search terms into natural language:
//   1. "aqueous parts washer"
//   2. "industrial parts washer"
//   3. "stainless steel parts washer"
//   4. "water-based parts washer"
//   5. "parts cleaning system"

const TAGLINES: { match: string; tagline: string }[] = [
  {
    match: '/products',
    tagline: 'Stainless Steel Aqueous Parts Washing Systems — 84 Models · 7 Categories · Made in Italy',
  },
  {
    match: '/solutions',
    tagline: 'Aqueous Parts Washer Selection Guides — Spray Cabinet, Immersion, Conveyor, Rotary & Manual',
  },
  {
    match: '/how-to-choose',
    tagline: 'How to Choose an Industrial Aqueous Parts Washer — Free Water-Based Parts Cleaning Evaluation',
  },
  {
    match: '/blog',
    tagline: 'Industrial Parts Washing Guides — Aqueous, Water-Based & Stainless Steel Cleaning Systems',
  },
  {
    match: '/resources',
    tagline: 'Aqueous Parts Washer Documentation & Catalog — Industrial Stainless Steel Cleaning Systems',
  },
  {
    match: '/industries',
    tagline: 'Industrial Aqueous Parts Washers for Automotive, Aerospace, Machining & Heavy Equipment',
  },
  {
    match: '/contact',
    tagline: 'Request a Quote — Free Industrial Parts Cleaning Process Evaluation · Same-Day Response',
  },
  {
    match: '/faq',
    tagline: 'Aqueous Parts Washer FAQ — Stainless Steel, Water-Based Industrial Parts Cleaning Systems',
  },
  {
    match: '/about',
    tagline: 'Leaders in Industrial Aqueous Parts Washing — 100% Stainless Steel, Made in Italy Since 1980',
  },
  {
    match: '/aqueous-parts-washers',
    tagline: 'Industrial Aqueous Parts Washers — 100% AISI 304 Stainless Steel, Made in Italy',
  },
  {
    // Default / home
    match: '/',
    tagline: 'Industrial Aqueous Parts Washers — 100% AISI 304 Stainless Steel, Made in Italy',
  },
];

export function SiteTagline() {
  const pathname = usePathname();

  // Find the most specific matching route (longest match wins)
  const match = TAGLINES
    .filter((t) => pathname.startsWith(t.match))
    .sort((a, b) => b.match.length - a.match.length)[0];

  const tagline = match?.tagline ?? TAGLINES[TAGLINES.length - 1].tagline;

  return (
    <div className="border-b border-[var(--color-border)] bg-magido-blue px-4 py-1.5 text-center">
      <p className="text-[11px] font-medium uppercase tracking-widest text-white/80">
        {tagline}
      </p>
    </div>
  );
}
