'use client';

// src/components/BlogList.tsx
// Client component — handles sort state for the blog index.
// The parent page.tsx stays a server component.

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
      <div className="space-y-6">
        {sorted.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-6 transition-all hover:border-magido-orange/30 hover:shadow-lg"
          >
            <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
              <span>&bull;</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> {post.readTime}
              </span>
            </div>
            <h2 className="mt-2 font-display text-xl font-bold text-[var(--color-text)] transition-colors group-hover:text-magido-orange">
              {post.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
              {post.excerpt}
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-magido-orange">
              Read More <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
