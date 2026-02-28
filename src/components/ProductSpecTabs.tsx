'use client';

import { useState } from 'react';
import type { Product } from '@/lib/products';

interface ProductSpecTabsProps {
  product: Product;
}

// Organize specs into logical groups
function categorizeSpecs(specs: Product['specs']) {
  const performance: { key: string; value: string; unit: string }[] = [];
  const dimensions: { key: string; value: string; unit: string }[] = [];
  const electrical: { key: string; value: string; unit: string }[] = [];
  const features: { key: string; value: string; unit: string }[] = [];

  const performanceKeys = [
    'Turntable Basket Diameter', 'Basket Diameter', 'Drum Diameter',
    'Belt Width', 'Working Dimensions', 'Max Part Size',
    'Load Weight', 'Load Height', 'Tank Capacity',
    'Flow Rate', 'Spray Pressure', 'Spray Bars (304 Stainless)',
    'V-Jet Spray Nozzles (optimized)', 'Pump(s)',
    'Timer', 'Max Operating Temperature',
  ];

  const dimensionKeys = [
    'Length (lid open)', 'Length', 'Width', 'Height (lid open)', 'Height',
    'Depth', 'Overall Dimensions', 'Shipping Dimensions',
    'Net Weight', 'Gross Weight',
  ];

  const electricalKeys = [
    'Heater', 'Amperage', 'Voltage', 'Phase', 'Power',
    'Total Power', 'Motor',
  ];

  for (const [key, spec] of Object.entries(specs)) {
    if (!spec.value || spec.value === '–' || spec.value === '-') continue;

    const item = { key, value: spec.value, unit: spec.unit };

    if (performanceKeys.includes(key)) {
      performance.push(item);
    } else if (dimensionKeys.includes(key)) {
      dimensions.push(item);
    } else if (electricalKeys.includes(key)) {
      electrical.push(item);
    } else {
      features.push(item);
    }
  }

  return { performance, dimensions, electrical, features };
}

type TabId = 'specs' | 'dimensions' | 'electrical' | 'features';

export function ProductSpecTabs({ product }: ProductSpecTabsProps) {
  const { performance, dimensions, electrical, features } = categorizeSpecs(product.specs);
  
  // Build tabs dynamically based on available data
  const tabs: { id: TabId; label: string; data: { key: string; value: string; unit: string }[] }[] = [];
  if (performance.length > 0) tabs.push({ id: 'specs', label: 'Specifications', data: performance });
  if (dimensions.length > 0) tabs.push({ id: 'dimensions', label: 'Dimensions', data: dimensions });
  if (electrical.length > 0) tabs.push({ id: 'electrical', label: 'Electrical', data: electrical });
  if (features.length > 0) tabs.push({ id: 'features', label: 'Features', data: features });

  const [activeTab, setActiveTab] = useState<TabId>(tabs[0]?.id || 'specs');
  const activeData = tabs.find((t) => t.id === activeTab)?.data || [];

  if (tabs.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)]">
      {/* Tab headers */}
      <div className="flex overflow-x-auto border-b border-[var(--color-border)] scrollbar-thin">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-shrink-0 px-5 py-3.5 text-sm font-semibold transition-colors ${
              activeTab === tab.id
                ? 'border-b-2 border-magido-orange bg-[var(--color-bg-secondary)] text-magido-orange'
                : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text)]'
            }`}
          >
            {tab.label}
            <span className="ml-1.5 text-2xs font-normal text-[var(--color-text-muted)]">
              ({tab.data.length})
            </span>
          </button>
        ))}
      </div>

      {/* Tab content — specs table */}
      <div className="p-1">
        <table className="w-full">
          <tbody>
            {activeData.map((item, i) => (
              <tr
                key={item.key}
                className={`${
                  i % 2 === 0 ? 'bg-transparent' : 'bg-[var(--color-bg-secondary)]/50'
                }`}
              >
                <td className="px-4 py-2.5 text-sm font-medium text-[var(--color-text-secondary)]">
                  {item.key}
                </td>
                <td className="px-4 py-2.5 text-right text-sm font-semibold text-[var(--color-text)]">
                  {item.value}
                  {item.unit && item.value !== item.unit && !item.value.toLowerCase().includes(item.unit.toLowerCase()) && (
                    <span className="ml-1 text-[var(--color-text-muted)]">
                      {item.unit}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
