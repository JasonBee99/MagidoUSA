'use client';

/**
 * SpecTable — Series Specification Comparison Table
 *
 * Features:
 *   - Freeze/Free toggle: sticky first column or full free scroll
 *   - Auto-compress: when frozen & scrolled right, label column shrinks
 *     to show only the unit abbreviation (e.g. "lbs", "gal", "°F")
 *   - Scroll hint shadows on left/right edges
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { Series } from '@/lib/products';
import { linkAisi } from '@/lib/linkAisi';

// ─── TYPES ───────────────────────────────────────────────────────────────────

interface SpecTableProps {
  series: Series;
  highlightModel?: string;
  showQuoteButtons?: boolean;
  quotePath?: string;
  showFeatures?: boolean;
  className?: string;
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

const BINARY_ROW_KEYWORDS = [
  'pneumatic lid', 'automatic turntable', 'hmi', 'plc',
  'steam aspirat', 'electric drying', 'manual lid',
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
    return positive
      ? <span className="spec-table__check" aria-label="Included">✓</span>
      : <span className="spec-table__dash" aria-label="Not available">—</span>;
  }
  return value;
}

/** Derive a short unit abbreviation from the raw unit string */
function abbreviateUnit(unit: string): string {
  if (!unit) return '';
  const u = unit.toLowerCase().trim();
  const MAP: Record<string, string> = {
    'inches': '"', 'inch': '"', 'in': '"', 'in.': '"',
    'lbs': 'lbs', 'lb': 'lbs', 'pounds': 'lbs',
    'gal us': 'gal', 'gal': 'gal', 'gallons': 'gal',
    'kw': 'kW', 'hp': 'HP',
    'gpm': 'GPM', 'gph': 'GPH',
    'psi': 'PSI', 'rpm': 'RPM',
    '°f': '°F', '°c': '°C', 'degrees f': '°F', 'degrees c': '°C',
    'mm': 'mm', 'cm': 'cm', 'm': 'm',
    'kg': 'kg',
    'minutes': 'min', 'minute': 'min',
    'v': 'V', 'amps': 'A', 'a': 'A',
  };
  return MAP[u] ?? unit;
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
  const [frozen, setFrozen] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      setIsScrolled(scrollRef.current.scrollLeft > 8);
    }
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const { specTable, standardFeatures = [], availableOptions = [] } = series;
  const { models, rows } = specTable;

  if (!models?.length || !rows?.length) return null;

  // Compressed = frozen AND user has scrolled right
  const compressed = frozen && isScrolled;

  const wrapperClass = [
    'spec-table',
    !frozen ? 'spec-table--free' : '',
    compressed ? 'spec-table--compressed' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClass}>

      {/* ── Series header ── */}
      <div className="spec-table__header">
        <div className="spec-table__header-top">
          <div className="spec-table__header-titles">
            <span className="spec-table__series-type">{series.type}</span>
            <h3 className="spec-table__series-name">{series.name}</h3>
            {series.isNew && <span className="spec-table__badge spec-table__badge--new">New</span>}
          </div>
          {/* Freeze toggle button */}
          <button
            className={`spec-table__freeze-btn${frozen ? ' spec-table__freeze-btn--active' : ''}`}
            onClick={() => {
              setFrozen(f => !f);
              // Reset scroll hint when switching to free mode
              if (frozen && scrollRef.current) scrollRef.current.scrollLeft = 0;
            }}
            aria-pressed={frozen}
            title={frozen ? 'Switch to free scroll (all columns scroll)' : 'Freeze first column while scrolling'}
          >
            {frozen ? '🔒 Frozen' : '↔ Free Scroll'}
          </button>
        </div>
        {series.description && (
          <p
            className="spec-table__series-desc"
            dangerouslySetInnerHTML={{ __html: linkAisi(series.description) }}
          />
        )}
      </div>

      {/* ── Scrollable table wrapper ── */}
      <div
        ref={scrollRef}
        className="spec-table__scroll-wrapper"
        role="region"
        aria-label={`${series.name} specifications`}
      >
        <table className="spec-table__table">
          <thead>
            <tr>
              <th className="spec-table__th spec-table__th--label" scope="col">
                <span className="spec-table__label-full">Specification</span>
                <span className="spec-table__label-short">Spec</span>
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
              const unitAbbr = row.unit ? abbreviateUnit(row.unit) : '';

              return (
                <tr
                  key={row.name}
                  className={`spec-table__row${rowIndex % 2 === 0 ? ' spec-table__row--even' : ''}`}
                >
                  <td className="spec-table__td spec-table__td--label">
                    {/* Full label — shown when not compressed */}
                    <span className="spec-table__label-full">
                      {row.name}
                      {row.unit && <span className="spec-table__unit">{unit}</span>}
                    </span>
                    {/* Short label — shown when compressed (scrolled right) */}
                    <span className="spec-table__label-short" aria-hidden="true">
                      {unitAbbr || row.name.slice(0, 4)}
                    </span>
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
                  <span className="spec-table__label-full">Ready to order?</span>
                  <span className="spec-table__label-short" aria-hidden="true">→</span>
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

