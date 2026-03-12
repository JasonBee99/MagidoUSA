'use client';

/**
 * SpecTable — Series Specification Comparison Table
 *
 * Renders the specTable data from a Series object as a styled,
 * responsive comparison table. Designed to work on:
 *   - Category pages   → pass the full series object
 *   - Product pages    → same, the current model column is highlighted
 *   - How-to-choose    → one series at a time, or compose multiple
 *
 * Usage:
 *   import SpecTable from '@/components/products/SpecTable';
 *   import { getSeriesBySlug } from '@/lib/products';
 *
 *   const series = getSeriesBySlug('x51');
 *   <SpecTable series={series} highlightModel="L102" />
 */

import React, { useState } from 'react';
import type { Series } from '@/lib/products';

// ─── TYPES ───────────────────────────────────────────────────────────────────

interface SpecTableProps {
  /** The series object from lib/products (contains specTable, standardFeatures, etc.) */
  series: Series;
  /**
   * Optional: model name to highlight (e.g. "L102").
   * Use on product detail pages to indicate the current model.
   */
  highlightModel?: string;
  /**
   * Optional: show the "Request a Quote" button row at the bottom.
   * Defaults to true.
   */
  showQuoteButtons?: boolean;
  /**
   * Optional: base path for quote links. Defaults to '/contact'.
   * Links are built as `${quotePath}?model=${model}`.
   */
  quotePath?: string;
  /**
   * Optional: show standard features and available options sections.
   * Defaults to true.
   */
  showFeatures?: boolean;
  /**
   * Optional CSS class applied to the outermost wrapper div.
   */
  className?: string;
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

/**
 * Rows that are mostly decorative / binary (Standard / –) get a checkmark
 * treatment instead of a raw text cell.
 */
const BINARY_ROW_KEYWORDS = [
  'pneumatic lid',
  'automatic turntable',
  'hmi',
  'plc',
  'steam aspirat',
  'electric drying',
  'manual lid',
];

function isBinaryRow(rowName: string): boolean {
  const lower = rowName.toLowerCase();
  return BINARY_ROW_KEYWORDS.some(kw => lower.includes(kw));
}

function renderCellValue(value: string, isBinary: boolean): React.ReactNode {
  if (!value || value === '–' || value === '-') {
    return <span className="spec-table__dash" aria-label="Not available">—</span>;
  }
  if (isBinary) {
    const positive = value.toLowerCase() === 'standard' || value.toLowerCase() === 'yes';
    return positive ? (
      <span className="spec-table__check" aria-label="Included">✓</span>
    ) : (
      <span className="spec-table__dash" aria-label="Not available">—</span>
    );
  }
  return value;
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function SpecTable({
  series,
  highlightModel,
  showQuoteButtons = true,
  quotePath = '/contact',
  showFeatures = true,
  className = '',
}: SpecTableProps) {
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(false);

  const { specTable, standardFeatures = [], availableOptions = [] } = series;
  const { models, rows } = specTable;

  if (!models?.length || !rows?.length) return null;

  return (
    <div className={`spec-table ${className}`}>

      {/* ── Series header ── */}
      <div className="spec-table__header">
        <span className="spec-table__series-type">{series.type}</span>
        <h3 className="spec-table__series-name">{series.name}</h3>
        {series.isNew && <span className="spec-table__badge spec-table__badge--new">New</span>}
        {series.description && (
          <p className="spec-table__series-desc">{series.description}</p>
        )}
      </div>

      {/* ── Scrollable table wrapper (mobile) ── */}
      <div className="spec-table__scroll-wrapper" role="region" aria-label={`${series.name} specifications`}>
        <table className="spec-table__table">
          <thead>
            <tr>
              {/* Spec label column */}
              <th className="spec-table__th spec-table__th--label" scope="col">
                Specification
              </th>
              {models.map(model => (
                <th
                  key={model}
                  className={`spec-table__th spec-table__th--model${highlightModel === model ? ' spec-table__th--highlight' : ''}`}
                  scope="col"
                >
                  {model}
                  {highlightModel === model && (
                    <span className="spec-table__current-badge">Current</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row, rowIndex) => {
              const binary = isBinaryRow(row.name);
              const unit = row.unit ? ` (${row.unit})` : '';

              return (
                <tr
                  key={row.name}
                  className={`spec-table__row${rowIndex % 2 === 0 ? ' spec-table__row--even' : ''}`}
                >
                  <td className="spec-table__td spec-table__td--label">
                    {row.name}
                    {row.unit && (
                      <span className="spec-table__unit">{unit}</span>
                    )}
                  </td>

                  {models.map(model => {
                    const raw = row.values[model] ?? '';
                    return (
                      <td
                        key={model}
                        className={`spec-table__td spec-table__td--value${highlightModel === model ? ' spec-table__td--highlight' : ''}`}
                      >
                        {renderCellValue(raw, binary)}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>

          {/* ── Quote button row ── */}
          {showQuoteButtons && (
            <tfoot>
              <tr className="spec-table__row spec-table__row--quote">
                <td className="spec-table__td spec-table__td--label spec-table__td--quote-label">
                  Ready to order?
                </td>
                {models.map(model => (
                  <td
                    key={model}
                    className={`spec-table__td spec-table__td--value spec-table__td--quote${highlightModel === model ? ' spec-table__td--highlight' : ''}`}
                  >
                    <a
                      href={`${quotePath}?model=${encodeURIComponent(model)}`}
                      className="spec-table__quote-btn"
                    >
                      Request Quote
                    </a>
                  </td>
                ))}
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      {/* ── Standard Features & Available Options ── */}
      {showFeatures && (standardFeatures.length > 0 || availableOptions.length > 0) && (
        <div className="spec-table__features-wrap">

          {standardFeatures.length > 0 && (
            <div className="spec-table__accordion">
              <button
                className="spec-table__accordion-toggle"
                onClick={() => setFeaturesOpen(o => !o)}
                aria-expanded={featuresOpen}
              >
                <span>Standard Features</span>
                <span className="spec-table__accordion-icon" aria-hidden="true">
                  {featuresOpen ? '−' : '+'}
                </span>
              </button>
              {featuresOpen && (
                <ul className="spec-table__feature-list">
                  {standardFeatures.map(f => (
                    <li key={f} className="spec-table__feature-item">
                      <span className="spec-table__feature-check" aria-hidden="true">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {availableOptions.length > 0 && (
            <div className="spec-table__accordion">
              <button
                className="spec-table__accordion-toggle"
                onClick={() => setOptionsOpen(o => !o)}
                aria-expanded={optionsOpen}
              >
                <span>Available Options / Upgrades</span>
                <span className="spec-table__accordion-icon" aria-hidden="true">
                  {optionsOpen ? '−' : '+'}
                </span>
              </button>
              {optionsOpen && (
                <ul className="spec-table__feature-list spec-table__feature-list--options">
                  {availableOptions.map(o => (
                    <li key={o} className="spec-table__feature-item">
                      <span className="spec-table__feature-plus" aria-hidden="true">+</span>
                      {o}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

        </div>
      )}
    </div>
  );
}
