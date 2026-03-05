'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, FileText, Wrench } from 'lucide-react';
import type { ResourceDocument } from '@/data/resources';

const iconMap = {
  doc: FileText,
  service: Wrench,
  catalog: FileText,
};

export function ResourceAccordion({ doc }: { doc: ResourceDocument }) {
  const [open, setOpen] = useState(false);
  const Icon = iconMap[doc.icon] || FileText;

  // Use first section as the preview content
  const previewSection = doc.sections[0];

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-card-bg)] transition-shadow hover:shadow-md">
      {/* Collapsed header */}
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-[var(--color-bg-secondary)]"
        aria-expanded={open}
      >
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-magido-blue/10 text-magido-blue">
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-[var(--color-text)]">
            {doc.title}
          </p>
          <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
            {doc.summary}
          </p>
        </div>
        <ChevronDown
          className={`h-5 w-5 flex-shrink-0 text-[var(--color-text-muted)] transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Expanded content */}
      {open && (
        <div className="border-t border-[var(--color-border-light)] px-5 py-5">
          {/* Render the first section as a preview */}
          {previewSection && (
            <div className="mb-4">
              <h4 className="mb-2 text-sm font-semibold text-[var(--color-text)]">
                {previewSection.heading}
              </h4>
              <div
                className="resource-content text-sm leading-relaxed text-[var(--color-text-secondary)]"
                dangerouslySetInnerHTML={{ __html: previewSection.body }}
              />
            </div>
          )}

          {/* If there are more sections, show a "read more" link */}
          {doc.sections.length > 1 && (
            <p className="mb-4 text-xs text-[var(--color-text-muted)]">
              + {doc.sections.length - 1} more section
              {doc.sections.length - 1 > 1 ? 's' : ''} with full specifications
            </p>
          )}

          <Link
            href={`/resources/${doc.slug}`}
            className="inline-flex items-center gap-2 rounded-lg bg-magido-blue px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-magido-blue-dark"
          >
            View Full Documentation →
          </Link>
        </div>
      )}
    </div>
  );
}
