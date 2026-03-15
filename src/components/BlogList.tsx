'use client';

// src/components/BlogList.tsx
// Client component — handles sort state for the blog index.

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, ChevronDown } from 'lucide-react';
import type { BlogPost } from '@/data/blog';

type SortKey = 'newest' | 'alpha' | 'readtime';

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'newest',   label: 'Newest First' },
  { key: 'alpha',    label: 'A – Z' },
  { key: 'readtime', label: 'Shortest Read' },
];

function sortPosts(posts: BlogPost[], key: SortKey): BlogPost[] {
  const copy = [...posts];
  switch (key) {
    case 'newest':
      return copy.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    case 'alpha':
      return copy.sort((a, b) => a.title.localeCompare(b.title));
    case 'readtime':
      return copy.sort((a, b) => parseInt(a.readTime) - parseInt(b.readTime));
  }
}

// ─── Topic-matched SVG illustrations ──────────────────────────────────────

function IllustrationAqueousVsSolvent() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      <rect width="80" height="80" rx="12" fill="#eb6c1c" fillOpacity="0.08"/>
      <path d="M18 20h14v4l8 20H10L18 24V20z" stroke="#315687" strokeWidth="2" strokeLinejoin="round" fill="#315687" fillOpacity="0.15"/>
      <path d="M14 42c2-2 4-2 6 0s4 2 6 0s4-2 6 0" stroke="#315687" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M48 20h14v4l8 20H40L48 24V20z" stroke="#eb6c1c" strokeWidth="2" strokeLinejoin="round" fill="#eb6c1c" fillOpacity="0.15"/>
      <path d="M52 18c0-2 3-3 3-5M57 17c0-2 3-3 3-5" stroke="#eb6c1c" strokeWidth="1.5" strokeLinecap="round"/>
      <text x="40" y="52" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#315687" opacity="0.6">VS</text>
      <circle cx="25" cy="62" r="5" fill="#315687" fillOpacity="0.15" stroke="#315687" strokeWidth="1.5"/>
      <path d="M22 62l2 2 4-4" stroke="#315687" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IllustrationStainlessSteel() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      <rect width="80" height="80" rx="12" fill="#315687" fillOpacity="0.08"/>
      <path d="M40 12L20 20v18c0 12 9 22 20 26 11-4 20-14 20-26V20L40 12z" fill="#315687" fillOpacity="0.15" stroke="#315687" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M28 34h24M28 40h24M28 46h16" stroke="#315687" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      <path d="M32 40l5 5 11-10" stroke="#eb6c1c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="58" cy="22" r="10" fill="#eb6c1c"/>
      <text x="58" y="25" textAnchor="middle" fontSize="7" fontWeight="bold" fill="white">10yr</text>
    </svg>
  );
}

function IllustrationSprayVsImmersion() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      <rect width="80" height="80" rx="12" fill="#eb6c1c" fillOpacity="0.08"/>
      <rect x="8" y="30" width="8" height="20" rx="2" fill="#315687" fillOpacity="0.3" stroke="#315687" strokeWidth="1.5"/>
      <path d="M16 40l6-8M16 40l8-2M16 40l8 4M16 40l6 8" stroke="#315687" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="25" cy="32" r="1.5" fill="#315687" opacity="0.6"/>
      <circle cx="27" cy="38" r="1.5" fill="#315687" opacity="0.6"/>
      <circle cx="25" cy="44" r="1.5" fill="#315687" opacity="0.6"/>
      <line x1="40" y1="20" x2="40" y2="65" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="3 2"/>
      <text x="40" y="16" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#315687" opacity="0.5">VS</text>
      <rect x="48" y="30" width="24" height="28" rx="3" fill="#315687" fillOpacity="0.1" stroke="#315687" strokeWidth="1.5"/>
      <rect x="48" y="42" width="24" height="16" rx="0" fill="#315687" fillOpacity="0.2"/>
      <path d="M50 42c2-1.5 4-1.5 6 0s4 1.5 6 0s4-1.5 6 0" stroke="#315687" strokeWidth="1" strokeLinecap="round"/>
      <rect x="56" y="46" width="8" height="8" rx="2" fill="#eb6c1c" fillOpacity="0.4" stroke="#eb6c1c" strokeWidth="1.5"/>
    </svg>
  );
}

function IllustrationMaintenance() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      <rect width="80" height="80" rx="12" fill="#315687" fillOpacity="0.08"/>
      <path d="M22 58L42 38c-1-4 0-9 4-12 4-3 10-3 13 1l-6 6 4 4 6-6c4 3 4 9 1 13-3 4-8 5-12 4L32 68c-3 3-7 3-10 0-3-2-3-7 0-10z" fill="#315687" fillOpacity="0.15" stroke="#315687" strokeWidth="2" strokeLinejoin="round"/>
      <rect x="44" y="12" width="26" height="30" rx="3" fill="white" stroke="#e2e8f0" strokeWidth="1.5"/>
      <path d="M49 20l2 2 4-4" stroke="#eb6c1c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="56" y1="20" x2="66" y2="20" stroke="#315687" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      <path d="M49 28l2 2 4-4" stroke="#eb6c1c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="56" y1="28" x2="66" y2="28" stroke="#315687" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      <circle cx="51" cy="36" r="2" stroke="#315687" strokeWidth="1.5" opacity="0.4"/>
      <line x1="56" y1="36" x2="66" y2="36" stroke="#315687" strokeWidth="1.5" strokeLinecap="round" opacity="0.3"/>
    </svg>
  );
}

function IllustrationSizing() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      <rect width="80" height="80" rx="12" fill="#eb6c1c" fillOpacity="0.08"/>
      <rect x="8" y="52" width="14" height="16" rx="2" fill="#315687" fillOpacity="0.2" stroke="#315687" strokeWidth="1.5"/>
      <circle cx="15" cy="57" r="3" stroke="#315687" strokeWidth="1.5" fill="none"/>
      <rect x="28" y="40" width="20" height="28" rx="2" fill="#315687" fillOpacity="0.3" stroke="#315687" strokeWidth="1.5"/>
      <circle cx="38" cy="52" r="5" stroke="#315687" strokeWidth="1.5" fill="none"/>
      <rect x="54" y="24" width="18" height="44" rx="2" fill="#eb6c1c" fillOpacity="0.2" stroke="#eb6c1c" strokeWidth="1.5"/>
      <circle cx="63" cy="42" r="7" stroke="#eb6c1c" strokeWidth="1.5" fill="none"/>
      <path d="M8 72h66" stroke="#315687" strokeWidth="1.5" strokeLinecap="round"/>
      <text x="15" y="76" textAnchor="middle" fontSize="5" fill="#315687" opacity="0.6">S</text>
      <text x="38" y="76" textAnchor="middle" fontSize="5" fill="#315687" opacity="0.6">M</text>
      <text x="63" y="76" textAnchor="middle" fontSize="5" fill="#eb6c1c" opacity="0.8">L</text>
    </svg>
  );
}

function IllustrationSolution() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      <rect width="80" height="80" rx="12" fill="#315687" fillOpacity="0.08"/>
      <path d="M28 16h24v16l14 28H14L28 32V16z" fill="#315687" fillOpacity="0.08" stroke="#315687" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M20 52l8-8h24l8 8v8H14v-8z" fill="#22c55e" fillOpacity="0.25"/>
      <path d="M18 52c3-2 5-2 8 0s5 2 8 0 5-2 8 0 5-2 8 0" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
      <rect x="58" y="32" width="6" height="28" rx="3" fill="#e2e8f0" stroke="#315687" strokeWidth="1"/>
      <rect x="58" y="46" width="6" height="14" rx="0" fill="#22c55e" fillOpacity="0.6"/>
      <rect x="52" y="10" width="14" height="12" rx="2" fill="white" stroke="#eb6c1c" strokeWidth="1.5"/>
      <line x1="52" y1="14" x2="66" y2="14" stroke="#eb6c1c" strokeWidth="1"/>
      <circle cx="57" cy="18" r="1.5" fill="#eb6c1c" opacity="0.6"/>
      <circle cx="61" cy="18" r="1.5" fill="#eb6c1c" opacity="0.6"/>
    </svg>
  );
}

function IllustrationServicing() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      <rect width="80" height="80" rx="12" fill="#eb6c1c" fillOpacity="0.08"/>
      <circle cx="38" cy="46" r="12" fill="#315687" fillOpacity="0.12" stroke="#315687" strokeWidth="2"/>
      <circle cx="38" cy="46" r="4" fill="#315687" fillOpacity="0.3" stroke="#315687" strokeWidth="1.5"/>
      <rect x="36" y="30" width="4" height="7" rx="1" fill="#315687" fillOpacity="0.5"/>
      <rect x="36" y="55" width="4" height="7" rx="1" fill="#315687" fillOpacity="0.5"/>
      <rect x="22" y="44" width="7" height="4" rx="1" fill="#315687" fillOpacity="0.5"/>
      <rect x="47" y="44" width="7" height="4" rx="1" fill="#315687" fillOpacity="0.5"/>
      <path d="M52 12l12 20H40L52 12z" fill="#eb6c1c" fillOpacity="0.2" stroke="#eb6c1c" strokeWidth="2" strokeLinejoin="round"/>
      <line x1="52" y1="18" x2="52" y2="25" stroke="#eb6c1c" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="52" cy="29" r="1.5" fill="#eb6c1c"/>
    </svg>
  );
}

function IllustrationMedical() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      <rect width="80" height="80" rx="12" fill="#315687" fillOpacity="0.08"/>
      <rect x="34" y="10" width="12" height="36" rx="3" fill="#315687" fillOpacity="0.15" stroke="#315687" strokeWidth="2"/>
      <rect x="22" y="22" width="36" height="12" rx="3" fill="#315687" fillOpacity="0.15" stroke="#315687" strokeWidth="2"/>
      <circle cx="40" cy="28" r="6" fill="white" stroke="#22c55e" strokeWidth="1.5"/>
      <path d="M37 28l2 2 4-4" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <ellipse cx="56" cy="66" rx="10" ry="3" fill="#315687" fillOpacity="0.2" stroke="#315687" strokeWidth="1.5"/>
      <line x1="56" y1="63" x2="56" y2="50" stroke="#315687" strokeWidth="2" strokeLinecap="round"/>
      <ellipse cx="56" cy="50" rx="6" ry="3" fill="#315687" fillOpacity="0.2" stroke="#315687" strokeWidth="1.5"/>
      <line x1="52" y1="56" x2="44" y2="53" stroke="#315687" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="20" cy="62" r="10" fill="#22c55e" fillOpacity="0.15" stroke="#22c55e" strokeWidth="1.5"/>
      <path d="M16 62l3 3 6-6" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function DefaultIllustration() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      <rect width="80" height="80" rx="12" fill="#315687" fillOpacity="0.08"/>
      <circle cx="40" cy="36" r="18" fill="#315687" fillOpacity="0.1" stroke="#315687" strokeWidth="2"/>
      <path d="M32 36l5 5 11-10" stroke="#eb6c1c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

const POST_ILLUSTRATION_MAP: Record<string, React.ReactNode> = {
  'aqueous-vs-solvent-parts-cleaning':          <IllustrationAqueousVsSolvent />,
  'stainless-steel-parts-washers-outlast-competition': <IllustrationStainlessSteel />,
  'spray-washing-vs-immersion-cleaning':         <IllustrationSprayVsImmersion />,
  'aqueous-parts-washer-maintenance-guide':      <IllustrationMaintenance />,
  'choosing-right-parts-washer-size':            <IllustrationSizing />,
  'how-often-change-parts-washer-solution':      <IllustrationSolution />,
  '5-signs-parts-washer-needs-servicing':        <IllustrationServicing />,
  'parts-washing-medical-device-manufacturing':  <IllustrationMedical />,
};

export function BlogList({ posts }: { posts: BlogPost[] }) {
  const [activeSort, setActiveSort] = useState<SortKey>('newest');
  const sorted = sortPosts(posts, activeSort);

  return (
    <>
      {/* Sort bar */}
      <div className="mb-8 flex items-center gap-2">
        <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
          <ChevronDown className="h-3.5 w-3.5" /> Sort
        </span>
        <div className="flex flex-wrap gap-2">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setActiveSort(opt.key)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
                activeSort === opt.key
                  ? 'border-magido-orange bg-magido-orange text-white'
                  : 'border-[var(--color-border)] bg-[var(--color-card-bg)] text-[var(--color-text-secondary)] hover:border-magido-orange/40 hover:text-magido-orange'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Post list */}
      <div className="space-y-5">
        {sorted.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex gap-5 rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-5 transition-all hover:border-magido-orange/30 hover:shadow-lg"
          >
            {/* Illustration — hidden on mobile, visible sm+ */}
            <div className="hidden h-20 w-20 flex-shrink-0 sm:block">
              {POST_ILLUSTRATION_MAP[post.slug] ?? <DefaultIllustration />}
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
                <span>&bull;</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {post.readTime}
                </span>
              </div>
              <h2 className="mt-1.5 font-display text-lg font-bold leading-snug text-[var(--color-text)] transition-colors group-hover:text-magido-orange sm:text-xl">
                {post.title}
              </h2>
              <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {post.excerpt}
              </p>
              <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-magido-orange">
                Read More <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
