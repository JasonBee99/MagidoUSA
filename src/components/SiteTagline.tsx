'use client';

import { usePathname } from 'next/navigation';
import siteConfig from '@/data/site.json';

// Route-matched SEO taglines — sourced from src/data/site.json
const TAGLINES = siteConfig.taglines;

export function SiteTagline() {
  const pathname = usePathname();

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
