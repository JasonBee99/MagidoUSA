'use client';

// src/components/ResourceSeriesCard.tsx
// Renders a rich per-series card on resource detail pages.
// Shows: series image, description, brochure link, tabbed features/options/safety,
// and the spec table — all in one cohesive card matching the site's design language.

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { linkAisi } from '@/lib/linkAisi';

interface SpecRow {
  name: string;
  unit: string;
  values: Record<string, string>;
}

export interface SeriesCardData {
  slug: string;
  name: string;
  displayName: string;
  type: string;
  description: string;
  isNew?: boolean;
  standardFeatures: string[];
  availableOptions: string[];
  safetyFeatures: string[];
  categorySlug: string;
  representativeImage: string | null;
  brochureFile: string | null;
  specTable: {
    models: string[];
    rows: SpecRow[];
  } | null;
}

type FeatureTab = 'features' | 'options' | 'safety';

const CHECK_COLOR: Record<FeatureTab, string> = {
  features: 'text-green-500',
  options:  'text-magido-blue',
  safety:   'text-amber-500',
};

function SeriesFeaturePanel({
  standardFeatures,
  availableOptions,
  safetyFeatures,
}: {
  standardFeatures: string[];
  availableOptions: string[];
  safetyFeatures: string[];
}) {
  const tabs: { id: FeatureTab; label: string; count: number }[] = [];
  if (standardFeatures.length > 0) tabs.push({ id: 'features', label: 'Standard Features', count: standardFeatures.length });
  if (availableOptions.length > 0)  tabs.push({ id: 'options',  label: 'Available Options',  count: availableOptions.length });
  if (safetyFeatures.length > 0)    tabs.push({ id: 'safety',   label: 'Safety Features',    count: safetyFeatures.length });

  const [active, setActive] = useState<FeatureTab>(tabs[0]?.id ?? 'features');

  if (tabs.length === 0) return null;

  const items: Record<FeatureTab, string[]> = {
    features: standardFeatures,
    options:  availableOptions,
    safety:   safetyFeatures,
  };

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-card-bg)]">
      <div className="flex overflow-x-auto border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)] scrollbar-thin">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`flex flex-shrink-0 items-center gap-1.5 px-5 py-3 text-sm font-semibold transition-colors ${
              active === tab.id
                ? 'border-b-2 border-magido-orange bg-[var(--color-card-bg)] text-magido-orange'
                : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text)]'
            }`}
          >
            {tab.label}
            <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
              active === tab.id
                ? 'bg-magido-orange/10 text-magido-orange'
                : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)]'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>
      <div className="p-5">
        <ul className="grid gap-2 sm:grid-cols-2">
          {items[active].map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <Check className={`mt-0.5 h-4 w-4 flex-shrink-0 ${CHECK_COLOR[active]}`} />
              <span className="text-sm text-[var(--color-text)]">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SpecTable({ specTable }: { specTable: NonNullable<SeriesCardData['specTable']> }) {
  const [expanded, setExpanded] = useState(false);
  const PREVIEW = 6;
  const rows = expanded ? specTable.rows : specTable.rows.slice(0, PREVIEW);
  const hasMore = specTable.rows.length > PREVIEW;

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--color-border)]">
      <div className="scrollbar-thin overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
              <th className="sticky left-0 z-20 bg-[var(--color-bg-secondary)] px-4 py-3 text-left font-semibold text-[var(--color-text)] after:absolute after:right-0 after:top-0 after:h-full after:w-px after:bg-[var(--color-border)]">
                Specification
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold text-[var(--color-text-muted)]">
                Unit
              </th>
              {specTable.models.map((model) => (
                <th key={model} className="px-3 py-3 text-center font-semibold text-magido-blue">
                  {model}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => {
              const isEven = ri % 2 === 0;
              const bg = isEven ? 'bg-[var(--color-card-bg)]' : 'bg-[var(--color-bg-secondary)]';
              return (
                <tr key={ri} className={bg}>
                  <td className={`sticky left-0 z-10 px-4 py-2.5 font-medium text-[var(--color-text)] after:absolute after:right-0 after:top-0 after:h-full after:w-px after:bg-[var(--color-border)] ${bg}`}>
                    {row.name}
                  </td>
                  <td className="px-3 py-2.5 text-xs text-[var(--color-text-muted)]">
                    {row.unit}
                  </td>
                  {specTable.models.map((model) => (
                    <td key={model} className="px-3 py-2.5 text-center text-[var(--color-text-secondary)]">
                      {row.values[model] || '—'}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {hasMore && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex w-full items-center justify-center gap-1.5 border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)] py-2.5 text-xs font-semibold text-magido-orange transition-colors hover:bg-[var(--color-bg-tertiary)]"
        >
          {expanded ? (
            <><ChevronUp className="h-3.5 w-3.5" /> Show fewer specs</>
          ) : (
            <><ChevronDown className="h-3.5 w-3.5" /> Show all {specTable.rows.length} specifications</>
          )}
        </button>
      )}
    </div>
  );
}

export function ResourceSeriesCard({ series }: { series: SeriesCardData }) {
  const hasTabs = series.standardFeatures.length > 0 || series.availableOptions.length > 0 || series.safetyFeatures.length > 0;
  const hasSpec = series.specTable && series.specTable.rows.length > 0;

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-card-bg)] shadow-sm transition-shadow hover:shadow-md">
      {/* Card header — brand blue strip */}
      <div className="flex items-center justify-between bg-magido-blue/5 px-5 py-4 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-magido-blue text-white">
            <span className="text-xs font-bold">{series.displayName.slice(0, 2)}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display text-lg font-bold text-[var(--color-text)]">
                {series.name}
              </h3>
              {series.isNew && (
                <span className="rounded-full bg-magido-orange px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  New
                </span>
              )}
            </div>
            <p className="text-xs text-[var(--color-text-muted)]">{series.type}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {series.brochureFile && (
            <a
              href={`/brochures/${series.brochureFile}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-[var(--color-border)] px-3 py-1.5 text-xs font-semibold text-[var(--color-text-secondary)] transition-colors hover:border-magido-orange hover:text-magido-orange"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
                <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
                <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
              </svg>
              Brochure
            </a>
          )}
          <Link
            href={`/products/${series.categorySlug}?series=${series.slug}-series`}
            className="flex items-center gap-1.5 rounded-lg bg-magido-orange/10 px-3 py-1.5 text-xs font-semibold text-magido-orange transition-colors hover:bg-magido-orange hover:text-white"
          >
            View Products <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5 sm:p-6">
        <div className="flex flex-col gap-6 sm:flex-row">
          {/* Image */}
          {series.representativeImage && (
            <div className="flex-shrink-0 sm:w-48">
              <div className="product-card-image-bg relative h-40 w-full overflow-hidden rounded-xl sm:h-48">
                <Image
                  src={series.representativeImage}
                  alt={series.name}
                  fill
                  className="object-contain p-3"
                  sizes="(max-width: 640px) 100vw, 192px"
                />
              </div>
            </div>
          )}

          {/* Description + features */}
          <div className="min-w-0 flex-1">
            <p
              className="text-justify text-sm leading-relaxed text-[var(--color-text-secondary)]"
              dangerouslySetInnerHTML={{ __html: linkAisi(series.description) }}
            />

            {hasTabs && (
              <div className="mt-4">
                <SeriesFeaturePanel
                  standardFeatures={series.standardFeatures}
                  availableOptions={series.availableOptions}
                  safetyFeatures={series.safetyFeatures}
                />
              </div>
            )}
          </div>
        </div>

        {/* Spec table */}
        {hasSpec && (
          <div className="mt-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              Full Specifications
            </p>
            <SpecTable specTable={series.specTable!} />
          </div>
        )}
      </div>
    </div>
  );
}
