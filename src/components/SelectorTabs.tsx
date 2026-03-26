'use client';

import { useState } from 'react';
import ProductSelector from '@/components/ProductSelector';
import CapacityCalculator from '@/components/CapacityCalculator';

const TABS = [
  { id: 'selector',    label: 'Product Selector' },
  { id: 'calculator', label: 'Capacity Calculator' },
] as const;

type TabId = typeof TABS[number]['id'];

export default function SelectorTabs() {
  const [active, setActive] = useState<TabId>('selector');

  return (
    <div>
      {/* Tab bar */}
      <div className="flex border-b border-[var(--color-border)] mb-0">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`px-5 py-2.5 text-sm font-semibold transition-colors border-b-2 -mb-px ${
              active === tab.id
                ? 'border-magido-orange text-magido-orange'
                : 'border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Panel — consistent background container for both tabs, grid matches hero-bg */}
      <div
        className="rounded-b-xl rounded-tr-xl border border-t-0 border-[var(--color-border)] p-0 sm:p-4 lg:p-6"
        style={{
          backgroundColor: 'color-mix(in srgb, var(--color-bg-secondary) 20%, var(--color-bg))',
          backgroundImage: `
            linear-gradient(rgba(49,86,135,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(49,86,135,0.07) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      >
        {active === 'selector'    && <ProductSelector />}
        {active === 'calculator'  && <CapacityCalculator />}
      </div>
    </div>
  );
}
