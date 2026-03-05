'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import type { Product, Series } from '@/lib/products';

type TabId = 'features' | 'options' | 'specs';

interface ProductSpecTabsProps {
  product: Product;
  series: Series | null;
}

export function ProductSpecTabs({ product, series }: ProductSpecTabsProps) {
  const features = series?.standardFeatures || [];
  const options = series?.availableOptions || [];

  // Build all specs as flat key/value list
  const allSpecs = Object.entries(product.specs)
    .filter(([, spec]) => spec.value && spec.value !== '–' && spec.value !== '-')
    .map(([key, spec]) => ({
      key,
      value: spec.unit && spec.value !== spec.unit && !spec.value.toLowerCase().includes(spec.unit.toLowerCase())
        ? `${spec.value} ${spec.unit}`
        : spec.value,
    }));

  // Build tabs
  const tabs: { id: TabId; label: string }[] = [];
  if (features.length > 0) tabs.push({ id: 'features', label: 'Features' });
  if (options.length > 0) tabs.push({ id: 'options', label: 'Options' });
  if (allSpecs.length > 0) tabs.push({ id: 'specs', label: 'Full Specifications' });

  const [activeTab, setActiveTab] = useState<TabId>(tabs[0]?.id || 'features');

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
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-5">
        {activeTab === 'features' && (
          <ul className="grid gap-2 sm:grid-cols-2">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                <span className="text-sm text-[var(--color-text)]">{feature}</span>
              </li>
            ))}
          </ul>
        )}

        {activeTab === 'options' && (
          <ul className="grid gap-2 sm:grid-cols-2">
            {options.map((option) => (
              <li key={option} className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-magido-blue" />
                <span className="text-sm text-[var(--color-text)]">{option}</span>
              </li>
            ))}
          </ul>
        )}

        {activeTab === 'specs' && (
          <table className="w-full">
            <tbody>
              {allSpecs.map((item, i) => (
                <tr
                  key={item.key}
                  className={i % 2 === 0 ? 'bg-transparent' : 'bg-[var(--color-bg-secondary)]/50'}
                >
                  <td className="px-3 py-2.5 text-sm font-medium text-[var(--color-text-secondary)]">
                    {item.key}
                  </td>
                  <td className="px-3 py-2.5 text-right text-sm font-semibold text-[var(--color-text)]">
                    {item.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
