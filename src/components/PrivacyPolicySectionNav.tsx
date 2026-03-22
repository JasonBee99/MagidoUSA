'use client';

import { useEffect, useState } from 'react';

interface SectionNavProps {
  sections: { id: string; heading: string }[];
}

export function PrivacyPolicySectionNav({ sections }: SectionNavProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const headings = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    function onScroll() {
      // Find the last heading that has scrolled past the top (with offset for sticky nav)
      const scrollY = window.scrollY + 120;
      let current = '';
      for (const el of headings) {
        if (el.offsetTop <= scrollY) current = el.id;
      }
      setActiveId(current);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on mount
    return () => window.removeEventListener('scroll', onScroll);
  }, [sections]);

  return (
    <div className="sticky top-[4.5rem] z-40 border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]/95 px-4 py-3 backdrop-blur-sm sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <nav className="flex flex-wrap gap-x-5 gap-y-1.5" aria-label="Privacy policy sections">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`whitespace-nowrap text-sm transition-colors ${
                activeId === s.id
                  ? 'font-semibold text-magido-orange'
                  : 'text-[var(--color-text-secondary)] hover:text-magido-orange'
              }`}
            >
              {s.heading}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
