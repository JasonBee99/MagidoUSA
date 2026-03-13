'use client';

import { useEffect, useRef, useState } from 'react';

const STAGES = [
  {
    id: 'soiled',
    type: 'part',
    label: 'Soiled part',
    dirty: true,
  },
  {
    id: 'chemical',
    type: 'factor',
    label: 'Chemical',
    detail: ['Alkaline detergent', 'breaks contaminant', 'bond with metal'],
    spec: 'pH 9–12 typical',
    color: 'blue',
  },
  {
    id: 'thermal',
    type: 'factor',
    label: 'Thermal',
    detail: ['Heated solution', 'accelerates chemical', 'reaction rate'],
    spec: '120°F – 160°F',
    color: 'amber',
  },
  {
    id: 'mechanical',
    type: 'factor',
    label: 'Mechanical',
    detail: ['Spray jets or', 'agitation physically', 'dislodges soils'],
    spec: 'Spray, immersion, drum',
    color: 'teal',
  },
  {
    id: 'clean',
    type: 'part',
    label: 'Clean part',
    dirty: false,
  },
];

const COLOR_MAP: Record<string, { bg: string; border: string; title: string; body: string; pill: string; pillText: string }> = {
  blue: {
    bg: '#E6F1FB',
    border: '#378ADD',
    title: '#0C447C',
    body: '#185FA5',
    pill: 'rgba(55,138,221,0.15)',
    pillText: '#185FA5',
  },
  amber: {
    bg: '#FAEEDA',
    border: '#BA7517',
    title: '#633806',
    body: '#854F0B',
    pill: 'rgba(186,117,23,0.15)',
    pillText: '#854F0B',
  },
  teal: {
    bg: '#E1F5EE',
    border: '#1D9E75',
    title: '#04342C',
    body: '#0F6E56',
    pill: 'rgba(29,158,117,0.15)',
    pillText: '#0F6E56',
  },
};

export default function AqueousProcessDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(0);

  // Total animation items: 5 stages + 4 connectors + time bar + callout = 11
  const TOTAL_ITEMS = 11;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let triggered = false;

    function runAnimation() {
      if (triggered) return;
      triggered = true;
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setVisibleCount(i);
        if (i >= TOTAL_ITEMS) clearInterval(interval);
      }, 120);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          runAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);

    // Fire immediately if already in view
    if (el.getBoundingClientRect().top < window.innerHeight) {
      setTimeout(runAnimation, 200);
    }

    return () => observer.disconnect();
  }, []);

  // Map each stage/connector to a sequential index
  // Index map: soiled=0, arrow1=1, chemical=2, arrow2=3, thermal=4, arrow3=5, mechanical=6, arrow4=7, clean=8, timebar=9, callout=10
  const vis = (idx: number) => visibleCount > idx;

  const transitionStyle = (idx: number): React.CSSProperties => ({
    opacity: vis(idx) ? 1 : 0,
    transform: vis(idx) ? 'translateX(0)' : 'translateX(-16px)',
    transition: 'opacity 0.5s ease, transform 0.5s ease',
  });

  const arrowStyle = (idx: number): React.CSSProperties => ({
    opacity: vis(idx) ? 1 : 0,
    transition: 'opacity 0.35s ease',
  });

  return (
    <div ref={containerRef} className="w-full">

      {/* SVG diagram */}
      <svg
        width="100%"
        viewBox="0 0 780 310"
        aria-label="Aqueous cleaning process flow diagram showing soiled part passing through chemical, thermal, and mechanical stages to become a clean part"
        role="img"
      >
        {/* ── Soiled part ── */}
        <g style={transitionStyle(0)}>
          <rect
            x="10" y="75" width="108" height="100" rx="8"
            fill="var(--color-background-secondary, #f3f4f6)"
            stroke="var(--color-border-secondary, #d1d5db)"
            strokeWidth="0.5"
          />
          <text x="64" y="115" textAnchor="middle" dominantBaseline="central" fontSize="26" fill="var(--color-text-secondary, #9ca3af)">⚙</text>
          <rect x="20" y="83" width="22" height="7" rx="2" fill="#E24B4A" opacity="0.55" />
          <rect x="46" y="87" width="14" height="6" rx="2" fill="#E24B4A" opacity="0.4" />
          <rect x="64" y="80" width="18" height="6" rx="2" fill="#E24B4A" opacity="0.5" />
          <rect x="30" y="95" width="10" height="5" rx="2" fill="#BA7517" opacity="0.45" />
          <text
            x="64" y="152" textAnchor="middle" dominantBaseline="central"
            fontSize="12" fontFamily="inherit"
            fill="var(--color-text-secondary, #6b7280)"
          >
            Soiled part
          </text>
        </g>

        {/* ── Arrow 1 ── */}
        <g style={arrowStyle(1)}>
          <line
            x1="120" y1="125" x2="152" y2="125"
            stroke="var(--color-border-secondary, #d1d5db)"
            strokeWidth="1.5"
            markerEnd="url(#arr)"
          />
        </g>

        {/* ── Chemical ── */}
        <g style={transitionStyle(2)}>
          <rect
            x="155" y="55" width="128" height="140" rx="8"
            fill={COLOR_MAP.blue.bg}
            stroke={COLOR_MAP.blue.border}
            strokeWidth="0.5"
          />
          <text x="219" y="84" textAnchor="middle" dominantBaseline="central" fontSize="13" fontWeight="500" fontFamily="inherit" fill={COLOR_MAP.blue.title}>
            Chemical
          </text>
          <text x="219" y="103" textAnchor="middle" dominantBaseline="central" fontSize="12" fontFamily="inherit" fill={COLOR_MAP.blue.body}>Alkaline detergent</text>
          <text x="219" y="119" textAnchor="middle" dominantBaseline="central" fontSize="12" fontFamily="inherit" fill={COLOR_MAP.blue.body}>breaks contaminant</text>
          <text x="219" y="135" textAnchor="middle" dominantBaseline="central" fontSize="12" fontFamily="inherit" fill={COLOR_MAP.blue.body}>bond with metal</text>
          <rect x="168" y="153" width="102" height="18" rx="4" fill={COLOR_MAP.blue.pill} />
          <text x="219" y="163" textAnchor="middle" dominantBaseline="central" fontSize="11" fontFamily="inherit" fill={COLOR_MAP.blue.pillText}>pH 9–12 typical</text>
        </g>

        {/* ── Arrow 2 ── */}
        <g style={arrowStyle(3)}>
          <line x1="285" y1="125" x2="317" y2="125" stroke="var(--color-border-secondary, #d1d5db)" strokeWidth="1.5" markerEnd="url(#arr)" />
        </g>

        {/* ── Thermal ── */}
        <g style={transitionStyle(4)}>
          <rect
            x="320" y="55" width="128" height="140" rx="8"
            fill={COLOR_MAP.amber.bg}
            stroke={COLOR_MAP.amber.border}
            strokeWidth="0.5"
          />
          <text x="384" y="84" textAnchor="middle" dominantBaseline="central" fontSize="13" fontWeight="500" fontFamily="inherit" fill={COLOR_MAP.amber.title}>
            Thermal
          </text>
          <text x="384" y="103" textAnchor="middle" dominantBaseline="central" fontSize="12" fontFamily="inherit" fill={COLOR_MAP.amber.body}>Heated solution</text>
          <text x="384" y="119" textAnchor="middle" dominantBaseline="central" fontSize="12" fontFamily="inherit" fill={COLOR_MAP.amber.body}>accelerates chemical</text>
          <text x="384" y="135" textAnchor="middle" dominantBaseline="central" fontSize="12" fontFamily="inherit" fill={COLOR_MAP.amber.body}>reaction rate</text>
          <rect x="333" y="153" width="102" height="18" rx="4" fill={COLOR_MAP.amber.pill} />
          <text x="384" y="163" textAnchor="middle" dominantBaseline="central" fontSize="11" fontFamily="inherit" fill={COLOR_MAP.amber.pillText}>120°F – 160°F</text>
        </g>

        {/* ── Arrow 3 ── */}
        <g style={arrowStyle(5)}>
          <line x1="450" y1="125" x2="482" y2="125" stroke="var(--color-border-secondary, #d1d5db)" strokeWidth="1.5" markerEnd="url(#arr)" />
        </g>

        {/* ── Mechanical ── */}
        <g style={transitionStyle(6)}>
          <rect
            x="485" y="55" width="128" height="140" rx="8"
            fill={COLOR_MAP.teal.bg}
            stroke={COLOR_MAP.teal.border}
            strokeWidth="0.5"
          />
          <text x="549" y="84" textAnchor="middle" dominantBaseline="central" fontSize="13" fontWeight="500" fontFamily="inherit" fill={COLOR_MAP.teal.title}>
            Mechanical
          </text>
          <text x="549" y="103" textAnchor="middle" dominantBaseline="central" fontSize="12" fontFamily="inherit" fill={COLOR_MAP.teal.body}>Spray jets or</text>
          <text x="549" y="119" textAnchor="middle" dominantBaseline="central" fontSize="12" fontFamily="inherit" fill={COLOR_MAP.teal.body}>agitation physically</text>
          <text x="549" y="135" textAnchor="middle" dominantBaseline="central" fontSize="12" fontFamily="inherit" fill={COLOR_MAP.teal.body}>dislodges soils</text>
          <rect x="498" y="153" width="102" height="18" rx="4" fill={COLOR_MAP.teal.pill} />
          <text x="549" y="163" textAnchor="middle" dominantBaseline="central" fontSize="11" fontFamily="inherit" fill={COLOR_MAP.teal.pillText}>Spray · immersion · drum</text>
        </g>

        {/* ── Arrow 4 ── */}
        <g style={arrowStyle(7)}>
          <line
            x1="615" y1="125" x2="647" y2="125"
            stroke="#1D9E75"
            strokeWidth="1.5"
            markerEnd="url(#arr-green)"
          />
        </g>

        {/* ── Clean part ── */}
        <g style={transitionStyle(8)}>
          <rect x="650" y="75" width="118" height="100" rx="8" fill="var(--color-background-secondary, #f3f4f6)" stroke="#1D9E75" strokeWidth="1" />
          <text x="709" y="115" textAnchor="middle" dominantBaseline="central" fontSize="26" fill="#1D9E75">⚙</text>
          <text x="709" y="152" textAnchor="middle" dominantBaseline="central" fontSize="12" fontFamily="inherit" fill="#0F6E56">Clean part</text>
        </g>

        {/* ── Time bar ── */}
        <g style={{ opacity: vis(9) ? 1 : 0, transition: 'opacity 0.5s ease' }}>
          <line x1="155" y1="235" x2="613" y2="235" stroke="var(--color-border-tertiary, #e5e7eb)" strokeWidth="0.5" strokeDasharray="4 3" />
          <line x1="155" y1="229" x2="155" y2="241" stroke="var(--color-border-tertiary, #e5e7eb)" strokeWidth="0.5" />
          <line x1="613" y1="229" x2="613" y2="241" stroke="var(--color-border-tertiary, #e5e7eb)" strokeWidth="0.5" />
          <text x="384" y="253" textAnchor="middle" dominantBaseline="central" fontSize="12" fontFamily="inherit" fill="var(--color-text-tertiary, #9ca3af)">
            Time — adjusting any factor changes the cleaning result
          </text>
        </g>

        {/* ── Callout ── */}
        <g style={{ opacity: vis(10) ? 1 : 0, transition: 'opacity 0.5s ease' }}>
          <rect x="155" y="272" width="458" height="26" rx="6" fill="none" stroke="var(--color-border-tertiary, #e5e7eb)" strokeWidth="0.5" strokeDasharray="4 3" />
          <text x="384" y="286" textAnchor="middle" dominantBaseline="central" fontSize="11" fontFamily="inherit" fill="var(--color-text-tertiary, #9ca3af)">
            All four factors are tunable — that&apos;s the advantage over solvent cleaning
          </text>
        </g>

        {/* Arrow marker defs */}
        <defs>
          <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
          <marker id="arr-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M2 1L8 5L2 9" fill="none" stroke="#1D9E75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
