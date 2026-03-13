'use client';

import { useEffect, useRef, useState } from 'react';

// ── Brand colour tokens ──────────────────────────────────────────────────────
const BRAND_ORANGE = '#EB6C1C';
const BRAND_BLUE   = '#315687';

// All text uses CSS variables from globals.css so dark mode works automatically:
//   --color-text          → #315687 light / #e2eaf4 dark  (headings / titles)
//   --color-text-secondary→ #4d6a8f light / #a0b4cc dark  (body copy)
//   --color-text-muted    → #556c90 light / #90aac7 dark  (badges / spec pills)
const BADGE_TEXT  = 'var(--color-text-muted)';
const TITLE_TEXT  = 'var(--color-text)';
const BODY_TEXT   = 'var(--color-text-secondary)';
const SPEC_TEXT   = 'var(--color-text-secondary)';

const COLOR_MAP: Record<string, {
  bg: string; border: string; title: string; body: string;
  pill: string; pillText: string; badgeText: string; icon: string;
}> = {
  // Chemical → brand blue
  blue: {
    bg:        'rgba(49,86,135,0.08)',
    border:    BRAND_BLUE,
    title:     TITLE_TEXT,
    body:      BODY_TEXT,
    pill:      'rgba(49,86,135,0.12)',
    pillText:  SPEC_TEXT,
    badgeText: BADGE_TEXT,
    icon:      BRAND_BLUE,
  },
  // Thermal → brand orange
  amber: {
    bg:        'rgba(235,108,28,0.08)',
    border:    BRAND_ORANGE,
    title:     TITLE_TEXT,
    body:      BODY_TEXT,
    pill:      'rgba(235,108,28,0.12)',
    pillText:  SPEC_TEXT,
    badgeText: BADGE_TEXT,
    icon:      BRAND_ORANGE,
  },
  // Mechanical → teal
  teal: {
    bg:        'rgba(29,158,117,0.08)',
    border:    '#1D9E75',
    title:     TITLE_TEXT,
    body:      BODY_TEXT,
    pill:      'rgba(29,158,117,0.12)',
    pillText:  SPEC_TEXT,
    badgeText: BADGE_TEXT,
    icon:      '#1D9E75',
  },
};

// ── Icon paths (SVG) for each factor ────────────────────────────────────────
// All drawn on a 24×24 canvas, centred at (0,0) before translation.
function ChemicalIcon({ color }: { color: string }) {
  return (
    <g transform="translate(219,76)">
      {/* Flask body */}
      <path
        d="M-5,-10 L-5,-2 L-12,10 L12,10 L5,-2 L5,-10 Z"
        fill={color} fillOpacity="0.18" stroke={color} strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* Flask neck */}
      <rect x="-5" y="-14" width="10" height="5" rx="2" fill={color} fillOpacity="0.35" />
      {/* Bubbles */}
      <circle cx="-4" cy="4"  r="2"   fill={color} fillOpacity="0.55" />
      <circle cx="3"  cy="0"  r="1.5" fill={color} fillOpacity="0.4"  />
      <circle cx="-1" cy="7"  r="1.5" fill={color} fillOpacity="0.45" />
    </g>
  );
}

function ThermalIcon({ color }: { color: string }) {
  return (
    <g transform="translate(384,76)">
      {/* Thermometer bulb */}
      <circle cx="0" cy="8" r="6" fill={color} fillOpacity="0.35" stroke={color} strokeWidth="1.2" />
      {/* Thermometer stem */}
      <rect x="-3" y="-14" width="6" height="22" rx="3"
        fill={color} fillOpacity="0.12" stroke={color} strokeWidth="1.2" />
      {/* Mercury fill */}
      <rect x="-2" y="-2" width="4" height="10" rx="2" fill={color} fillOpacity="0.6" />
      {/* Heat waves */}
      <path d="M10,-8 Q14,-5 10,-2" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.6" />
      <path d="M14,-9 Q19,-5 14,-1" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.4" />
    </g>
  );
}

function MechanicalIcon({ color }: { color: string }) {
  return (
    <g transform="translate(549,76)">
      {/* Nozzle body */}
      <rect x="-10" y="-5" width="12" height="10" rx="3"
        fill={color} fillOpacity="0.18" stroke={color} strokeWidth="1.2" />
      {/* Nozzle tip */}
      <path d="M2,-5 L7,0 L2,5 Z" fill={color} fillOpacity="0.45" />
      {/* Spray droplets */}
      <circle cx="12" cy="-6" r="2"   fill={color} fillOpacity="0.55" />
      <circle cx="14" cy="0"  r="2.5" fill={color} fillOpacity="0.65" />
      <circle cx="12" cy="6"  r="2"   fill={color} fillOpacity="0.55" />
      <circle cx="18" cy="-3" r="1.5" fill={color} fillOpacity="0.4"  />
      <circle cx="18" cy="3"  r="1.5" fill={color} fillOpacity="0.4"  />
    </g>
  );
}

// ── Component ────────────────────────────────────────────────────────────────
export default function AqueousProcessDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(0);

  // Index map: soiled=0, arrow1=1, chemical=2, arrow2=3, thermal=4,
  //            arrow3=5, mechanical=6, arrow4=7, clean=8, timebar=9, callout=10
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
        if (entries[0].isIntersecting) { runAnimation(); observer.disconnect(); }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);

    if (el.getBoundingClientRect().top < window.innerHeight) {
      setTimeout(runAnimation, 200);
    }

    return () => observer.disconnect();
  }, []);

  const vis = (idx: number) => visibleCount > idx;

  const slideIn = (idx: number): React.CSSProperties => ({
    opacity:   vis(idx) ? 1 : 0,
    transform: vis(idx) ? 'translateX(0)' : 'translateX(-16px)',
    transition: 'opacity 0.5s ease, transform 0.5s ease',
  });

  const fadeIn = (idx: number): React.CSSProperties => ({
    opacity:   vis(idx) ? 1 : 0,
    transition: 'opacity 0.35s ease',
  });

  return (
    <div ref={containerRef} className="w-full">
      <svg
        width="100%"
        viewBox="0 0 780 320"
        aria-label="Aqueous cleaning process flow diagram showing soiled part passing through chemical, thermal, and mechanical stages to become a clean part"
        role="img"
      >
        <defs>
          <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5"
            markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke"
              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
          <marker id="arr-green" viewBox="0 0 10 10" refX="8" refY="5"
            markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M2 1L8 5L2 9" fill="none" stroke="#1D9E75"
              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
          <marker id="arr-orange" viewBox="0 0 10 10" refX="8" refY="5"
            markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M2 1L8 5L2 9" fill="none" stroke={BRAND_ORANGE}
              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>

        {/* ── Soiled part ─────────────────────────────────────────────────── */}
        <g style={slideIn(0)}>
          <rect x="10" y="65" width="112" height="120" rx="10"
            fill="var(--color-background-secondary, #f3f4f6)"
            stroke="var(--color-border-secondary, #d1d5db)"
            strokeWidth="0.5" />
          {/* Gear icon */}
          <text x="66" y="108" textAnchor="middle" dominantBaseline="central"
            fontSize="28" fill="var(--color-text-secondary, #9ca3af)">⚙</text>
          {/* Grime patches */}
          <rect x="22" y="72"  width="24" height="8" rx="3" fill="#E24B4A" opacity="0.5" />
          <rect x="50" y="77"  width="16" height="7" rx="3" fill="#E24B4A" opacity="0.38" />
          <rect x="70" y="70"  width="20" height="7" rx="3" fill="#E24B4A" opacity="0.45" />
          <rect x="32" y="88"  width="12" height="6" rx="3" fill="#BA7517" opacity="0.42" />
          <rect x="55" y="86"  width="18" height="5" rx="3" fill="#BA7517" opacity="0.35" />
          {/* Label */}
          <text x="66" y="163" textAnchor="middle" dominantBaseline="central"
            fontSize="12" fontFamily="inherit"
            fill="var(--color-text-secondary, #6b7280)">
            Soiled part
          </text>
        </g>

        {/* ── Arrow 1 ─────────────────────────────────────────────────────── */}
        <g style={fadeIn(1)}>
          <line x1="124" y1="125" x2="156" y2="125"
            stroke="var(--color-border-secondary, #d1d5db)"
            strokeWidth="1.5" markerEnd="url(#arr)" />
        </g>

        {/* ── Chemical ────────────────────────────────────────────────────── */}
        <g style={slideIn(2)}>
          <rect x="159" y="45" width="130" height="160" rx="10"
            fill={COLOR_MAP.blue.bg}
            stroke={COLOR_MAP.blue.border}
            strokeWidth="1" />
          {/* Factor badge */}
          <rect x="169" y="52" width="62" height="16" rx="4"
            fill={COLOR_MAP.blue.pill} />
          <text x="200" y="60" textAnchor="middle" dominantBaseline="central"
            fontSize="9" fontWeight="600" fontFamily="inherit" letterSpacing="0.05em"
            fill={COLOR_MAP.blue.badgeText}>
            FACTOR 1
          </text>
          {/* Icon */}
          <ChemicalIcon color={COLOR_MAP.blue.icon} />
          {/* Title */}
          <text x="224" y="100" textAnchor="middle" dominantBaseline="central"
            fontSize="13" fontWeight="600" fontFamily="inherit"
            fill={COLOR_MAP.blue.title}>
            Chemical
          </text>
          {/* Detail lines */}
          <text x="224" y="119" textAnchor="middle" dominantBaseline="central"
            fontSize="11.5" fontFamily="inherit" fill={COLOR_MAP.blue.body}>
            Alkaline detergent
          </text>
          <text x="224" y="134" textAnchor="middle" dominantBaseline="central"
            fontSize="11.5" fontFamily="inherit" fill={COLOR_MAP.blue.body}>
            breaks contaminant
          </text>
          <text x="224" y="149" textAnchor="middle" dominantBaseline="central"
            fontSize="11.5" fontFamily="inherit" fill={COLOR_MAP.blue.body}>
            bond with metal
          </text>
          {/* Spec pill */}
          <rect x="172" y="163" width="104" height="18" rx="5"
            fill={COLOR_MAP.blue.pill} />
          <text x="224" y="173" textAnchor="middle" dominantBaseline="central"
            fontSize="10.5" fontFamily="inherit" fill={COLOR_MAP.blue.pillText}>
            pH 9–12 typical
          </text>
        </g>

        {/* ── Arrow 2 ─────────────────────────────────────────────────────── */}
        <g style={fadeIn(3)}>
          <line x1="291" y1="125" x2="323" y2="125"
            stroke={BRAND_BLUE}
            strokeWidth="1.5" strokeOpacity="0.4" markerEnd="url(#arr)" />
        </g>

        {/* ── Thermal ─────────────────────────────────────────────────────── */}
        <g style={slideIn(4)}>
          <rect x="326" y="45" width="130" height="160" rx="10"
            fill={COLOR_MAP.amber.bg}
            stroke={COLOR_MAP.amber.border}
            strokeWidth="1" />
          {/* Factor badge */}
          <rect x="336" y="52" width="62" height="16" rx="4"
            fill={COLOR_MAP.amber.pill} />
          <text x="367" y="60" textAnchor="middle" dominantBaseline="central"
            fontSize="9" fontWeight="600" fontFamily="inherit" letterSpacing="0.05em"
            fill={COLOR_MAP.amber.badgeText}>
            FACTOR 2
          </text>
          {/* Icon */}
          <ThermalIcon color={COLOR_MAP.amber.icon} />
          {/* Title */}
          <text x="391" y="100" textAnchor="middle" dominantBaseline="central"
            fontSize="13" fontWeight="600" fontFamily="inherit"
            fill={COLOR_MAP.amber.title}>
            Thermal
          </text>
          {/* Detail lines */}
          <text x="391" y="119" textAnchor="middle" dominantBaseline="central"
            fontSize="11.5" fontFamily="inherit" fill={COLOR_MAP.amber.body}>
            Heated solution
          </text>
          <text x="391" y="134" textAnchor="middle" dominantBaseline="central"
            fontSize="11.5" fontFamily="inherit" fill={COLOR_MAP.amber.body}>
            accelerates chemical
          </text>
          <text x="391" y="149" textAnchor="middle" dominantBaseline="central"
            fontSize="11.5" fontFamily="inherit" fill={COLOR_MAP.amber.body}>
            reaction rate
          </text>
          {/* Spec pill */}
          <rect x="339" y="163" width="104" height="18" rx="5"
            fill={COLOR_MAP.amber.pill} />
          <text x="391" y="173" textAnchor="middle" dominantBaseline="central"
            fontSize="10.5" fontFamily="inherit" fill={COLOR_MAP.amber.pillText}>
            120°F – 160°F
          </text>
        </g>

        {/* ── Arrow 3 ─────────────────────────────────────────────────────── */}
        <g style={fadeIn(5)}>
          <line x1="458" y1="125" x2="490" y2="125"
            stroke={BRAND_ORANGE}
            strokeWidth="1.5" strokeOpacity="0.5" markerEnd="url(#arr-orange)" />
        </g>

        {/* ── Mechanical ──────────────────────────────────────────────────── */}
        <g style={slideIn(6)}>
          <rect x="493" y="45" width="130" height="160" rx="10"
            fill={COLOR_MAP.teal.bg}
            stroke={COLOR_MAP.teal.border}
            strokeWidth="1" />
          {/* Factor badge */}
          <rect x="503" y="52" width="62" height="16" rx="4"
            fill={COLOR_MAP.teal.pill} />
          <text x="534" y="60" textAnchor="middle" dominantBaseline="central"
            fontSize="9" fontWeight="600" fontFamily="inherit" letterSpacing="0.05em"
            fill={COLOR_MAP.teal.badgeText}>
            FACTOR 3
          </text>
          {/* Icon */}
          <MechanicalIcon color={COLOR_MAP.teal.icon} />
          {/* Title */}
          <text x="558" y="100" textAnchor="middle" dominantBaseline="central"
            fontSize="13" fontWeight="600" fontFamily="inherit"
            fill={COLOR_MAP.teal.title}>
            Mechanical
          </text>
          {/* Detail lines */}
          <text x="558" y="119" textAnchor="middle" dominantBaseline="central"
            fontSize="11.5" fontFamily="inherit" fill={COLOR_MAP.teal.body}>
            Spray jets or
          </text>
          <text x="558" y="134" textAnchor="middle" dominantBaseline="central"
            fontSize="11.5" fontFamily="inherit" fill={COLOR_MAP.teal.body}>
            agitation physically
          </text>
          <text x="558" y="149" textAnchor="middle" dominantBaseline="central"
            fontSize="11.5" fontFamily="inherit" fill={COLOR_MAP.teal.body}>
            dislodges soils
          </text>
          {/* Spec pill */}
          <rect x="496" y="163" width="126" height="18" rx="5"
            fill={COLOR_MAP.teal.pill} />
          <text x="558" y="173" textAnchor="middle" dominantBaseline="central"
            fontSize="10.5" fontFamily="inherit" fill={COLOR_MAP.teal.pillText}>
            Spray · immersion · drum
          </text>
        </g>

        {/* ── Arrow 4 (green → clean) ──────────────────────────────────────── */}
        <g style={fadeIn(7)}>
          <line x1="625" y1="125" x2="657" y2="125"
            stroke="#1D9E75"
            strokeWidth="2" markerEnd="url(#arr-green)" />
        </g>

        {/* ── Clean part ──────────────────────────────────────────────────── */}
        <g style={slideIn(8)}>
          <rect x="660" y="65" width="112" height="120" rx="10"
            fill="rgba(29,158,117,0.07)"
            stroke="#1D9E75" strokeWidth="1.2" />
          {/* Clean gear — teal tint */}
          <text x="716" y="108" textAnchor="middle" dominantBaseline="central"
            fontSize="28" fill="#1D9E75">⚙</text>
          {/* Clean checkmark badge */}
          <circle cx="741" cy="76" r="9" fill="#1D9E75" />
          <path d="M736 76 L739 80 L746 72" fill="none"
            stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          {/* Label */}
          <text x="716" y="163" textAnchor="middle" dominantBaseline="central"
            fontSize="12" fontFamily="inherit" fill="var(--color-text-secondary)">
            Clean part
          </text>
        </g>

        {/* ── Time bar ────────────────────────────────────────────────────── */}
        <g style={{ opacity: vis(9) ? 1 : 0, transition: 'opacity 0.5s ease' }}>
          {/* Bracket line */}
          <line x1="159" y1="242" x2="623" y2="242"
            stroke={BRAND_ORANGE} strokeWidth="1" strokeOpacity="0.35"
            strokeDasharray="5 3" />
          <line x1="159" y1="236" x2="159" y2="248"
            stroke={BRAND_ORANGE} strokeWidth="1" strokeOpacity="0.35" />
          <line x1="623" y1="236" x2="623" y2="248"
            stroke={BRAND_ORANGE} strokeWidth="1" strokeOpacity="0.35" />
          {/* Time label pill */}
          <rect x="316" y="250" width="150" height="20" rx="6"
            fill={`rgba(235,108,28,0.09)`} />
          <text x="391" y="261" textAnchor="middle" dominantBaseline="central"
            fontSize="11" fontFamily="inherit" fontWeight="500"
            fill={BRAND_ORANGE}>
            TIME — Factor 4
          </text>
        </g>

        {/* ── Callout ─────────────────────────────────────────────────────── */}
        <g style={{ opacity: vis(10) ? 1 : 0, transition: 'opacity 0.5s ease' }}>
          <rect x="159" y="278" width="464" height="28" rx="7"
            fill="none"
            stroke="var(--color-border-tertiary, #e5e7eb)"
            strokeWidth="0.5" strokeDasharray="4 3" />
          <text x="391" y="293" textAnchor="middle" dominantBaseline="central"
            fontSize="11" fontFamily="inherit"
            fill="var(--color-text-tertiary, #9ca3af)">
            Adjusting any factor changes the cleaning result — that&apos;s the Sinner Circle principle
          </text>
        </g>
      </svg>
    </div>
  );
}
