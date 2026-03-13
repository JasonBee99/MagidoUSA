'use client';

import { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, AlertTriangle } from 'lucide-react';

// ─── Machine data ──────────────────────────────────────────────────────────────
// basketDia          = round basket interior diameter (inches) — top/rotary load
// basketW / basketH  = rectangular opening (inches) — front load / belt conveyor
// basketDepth        = usable basket depth / height (inches)
// loadLbs            = rated load capacity per cycle
// cycleMin/Max       = wash program time range (minutes, excluding load/unload)
// loadUnload         = typical operator load + unload time per cycle (minutes)
// throughputLbsHr    = continuous machine throughput (lbs/hr)
// seriesSlug         = matches products.json series slug exactly (for URL)

const MACHINES = [
  // ── Top Load ─────────────────────────────────────────────────────────
  {
    id: 'x81',        name: 'X81',        seriesLabel: 'Top Load',
    category: 'top-load-washers',         seriesSlug: 'x81',
    type: 'batch' as const,
    cycleMin: 5,  cycleMax: 15,  loadUnload: 3,
    basketDia: 19, basketDepth: 16, basketW: 0,
    loadLbs: 330,
    note: 'Compact benchtop — small parts, maintenance shops',
  },
  {
    id: 'x51',        name: 'X51',        seriesLabel: 'Top Load',
    category: 'top-load-washers',         seriesSlug: 'x51',
    type: 'batch' as const,
    cycleMin: 8,  cycleMax: 20,  loadUnload: 4,
    basketDia: 24, basketDepth: 20, basketW: 0,
    loadLbs: 660,
    note: 'Mid-range workhorse — most popular for job shops',
  },
  {
    id: 'x51-2',      name: 'X51/2',      seriesLabel: 'Top Load',
    category: 'top-load-washers',         seriesSlug: 'x51-2',
    type: 'batch' as const,
    cycleMin: 8,  cycleMax: 20,  loadUnload: 4,
    basketDia: 24, basketDepth: 20, basketW: 0,
    loadLbs: 660,
    note: 'Dual-stage X51 — wash + rinse in one machine',
  },
  {
    id: 'x51hp',      name: 'X51HP',      seriesLabel: 'Top Load',
    category: 'top-load-washers',         seriesSlug: 'x51hp',
    type: 'batch' as const,
    cycleMin: 8,  cycleMax: 20,  loadUnload: 4,
    basketDia: 24, basketDepth: 20, basketW: 0,
    loadLbs: 660,
    note: 'High-pressure X51 — enhanced spray impingement',
  },
  {
    id: 'tr450',      name: 'TR-450',     seriesLabel: 'Top Load',
    category: 'top-load-washers',         seriesSlug: 'tr450',
    type: 'batch' as const,
    cycleMin: 10, cycleMax: 25,  loadUnload: 5,
    basketDia: 28, basketDepth: 24, basketW: 0,
    loadLbs: 990,
    note: 'Spray + immersion combo — dual-action cleaning in one cycle',
  },
  {
    id: 'eco',        name: 'Eco Series', seriesLabel: 'Top Load',
    category: 'top-load-washers',         seriesSlug: 'eco',
    type: 'batch' as const,
    cycleMin: 10, cycleMax: 25,  loadUnload: 5,
    basketDia: 35, basketDepth: 28, basketW: 0,
    loadLbs: 1500,
    note: 'Large-capacity production cabinet',
  },
  // ── Front Load ───────────────────────────────────────────────────────
  {
    id: 'x53',        name: 'X53',        seriesLabel: 'Front Load',
    category: 'front-load-washers',       seriesSlug: 'x53',
    type: 'batch' as const,
    cycleMin: 10, cycleMax: 25,  loadUnload: 6,
    basketDia: 0,  basketW: 28,  basketDepth: 24,
    loadLbs: 880,
    note: 'Front-loading with roll-in fixture — large components',
  },
  {
    id: 'x53-2',      name: 'X53/2',      seriesLabel: 'Front Load',
    category: 'front-load-washers',       seriesSlug: 'x53-2',
    type: 'batch' as const,
    cycleMin: 10, cycleMax: 25,  loadUnload: 6,
    basketDia: 0,  basketW: 28,  basketDepth: 24,
    loadLbs: 880,
    note: 'Dual-stage front load — wash + rinse for heavy components',
  },
  {
    id: 'fls',        name: 'FLS-35',     seriesLabel: 'Front Load',
    category: 'front-load-washers',       seriesSlug: 'fls',
    type: 'batch' as const,
    cycleMin: 12, cycleMax: 30,  loadUnload: 7,
    basketDia: 0,  basketW: 35,  basketDepth: 28,
    loadLbs: 1100,
    note: 'Largest front-load — engine blocks, heavy assemblies',
  },
  // ── Rotary Immersion ─────────────────────────────────────────────────
  {
    id: 'p800',       name: 'Platinum P800/2',  seriesLabel: 'Rotary Immersion',
    category: 'rotary-immersion-washers', seriesSlug: 'platinum',
    type: 'batch' as const,
    cycleMin: 12, cycleMax: 30,  loadUnload: 5,
    basketDia: 31, basketDepth: 20, basketW: 0,
    loadLbs: 660,
    note: 'Spray + immersion + rotation — critical cleanliness specs',
  },
  {
    id: 'p1200',      name: 'Platinum P1200/2', seriesLabel: 'Rotary Immersion',
    category: 'rotary-immersion-washers', seriesSlug: 'platinum',
    type: 'batch' as const,
    cycleMin: 15, cycleMax: 35,  loadUnload: 6,
    basketDia: 47, basketDepth: 24, basketW: 0,
    loadLbs: 1100,
    note: 'Largest rotary immersion — complex geometries at high load',
  },
  // ── Belt Conveyor ────────────────────────────────────────────────────
  {
    id: 'silver',     name: 'Silver Series',    seriesLabel: 'Belt Conveyor',
    category: 'in-line-belt-conveyor-washers',  seriesSlug: 'silver',
    type: 'continuous' as const,
    cycleMin: 0, cycleMax: 0, loadUnload: 0,
    basketDia: 0, basketW: 12, basketDepth: 8,
    loadLbs: 0,  throughputLbsHr: 600,
    note: 'Entry-level inline conveyor — CNC cell integration',
  },
  {
    id: 'gold1b',     name: 'Gold 1b',           seriesLabel: 'Belt Conveyor',
    category: 'in-line-belt-conveyor-washers',  seriesSlug: 'gold-1b',
    type: 'continuous' as const,
    cycleMin: 0, cycleMax: 0, loadUnload: 0,
    basketDia: 0, basketW: 18, basketDepth: 10,
    loadLbs: 0,  throughputLbsHr: 1200,
    note: 'Mid-range inline conveyor — production line integration',
  },
  {
    id: 'gold2b',     name: 'Gold 2b',           seriesLabel: 'Belt Conveyor',
    category: 'in-line-belt-conveyor-washers',  seriesSlug: 'gold-2b',
    type: 'continuous' as const,
    cycleMin: 0, cycleMax: 0, loadUnload: 0,
    basketDia: 0, basketW: 24, basketDepth: 12,
    loadLbs: 0,  throughputLbsHr: 2000,
    note: 'High-volume production conveyor',
  },
  // ── Rotary Drum ──────────────────────────────────────────────────────
  {
    id: 'jolly',      name: 'Jolly',             seriesLabel: 'Rotary Drum',
    category: 'rotary-drum-washers',            seriesSlug: 'jolly',
    type: 'continuous' as const,
    cycleMin: 0, cycleMax: 0, loadUnload: 0,
    basketDia: 0, basketW: 0, basketDepth: 0,
    loadLbs: 0,  throughputLbsHr: 440,
    note: 'Compact drum — fasteners, stampings, small turned parts',
  },
  {
    id: 'spira1b',    name: 'Spira 1b',          seriesLabel: 'Rotary Drum',
    category: 'rotary-drum-washers',            seriesSlug: 'spira-1b',
    type: 'continuous' as const,
    cycleMin: 0, cycleMax: 0, loadUnload: 0,
    basketDia: 0, basketW: 0, basketDepth: 0,
    loadLbs: 0,  throughputLbsHr: 880,
    note: 'Mid-range drum — higher volume small part cleaning',
  },
  {
    id: 'spira2b',    name: 'Spira 2b',          seriesLabel: 'Rotary Drum',
    category: 'rotary-drum-washers',            seriesSlug: 'spira-2b',
    type: 'continuous' as const,
    cycleMin: 0, cycleMax: 0, loadUnload: 0,
    basketDia: 0, basketW: 0, basketDepth: 0,
    loadLbs: 0,  throughputLbsHr: 1760,
    note: 'High-volume drum — production-scale small parts',
  },
];

type Machine = typeof MACHINES[number];

// ─── Size fit check ────────────────────────────────────────────────────────────
// Returns 'yes' | 'borderline' | 'no'
// Borderline = part fits but uses >80% of basket capacity in any dimension.

function partFitStatus(m: Machine, partL: number, partW: number, partH: number): 'yes' | 'borderline' | 'no' {
  if (partL <= 0 && partW <= 0 && partH <= 0) return 'yes';
  const l = partL || 0;
  const w = partW || 0;
  const h = partH || 0;

  if (m.seriesLabel === 'Rotary Drum') return 'yes';

  if (m.basketDia > 0) {
    const diagonal = Math.sqrt(l * l + w * w);
    if (diagonal > m.basketDia || h > m.basketDepth) return 'no';
    if (diagonal / m.basketDia > 0.80 || h / m.basketDepth > 0.80) return 'borderline';
    return 'yes';
  }

  if (m.basketW > 0) {
    const maxPlanar = Math.max(l, w);
    const minPlanar = Math.min(l, w);
    if (maxPlanar > m.basketDepth || minPlanar > m.basketW || h > m.basketW) return 'no';
    if (maxPlanar / m.basketDepth > 0.80 || minPlanar / m.basketW > 0.80) return 'borderline';
    return 'yes';
  }

  return 'yes';
}

// ─── Throughput calculation ────────────────────────────────────────────────────

interface CalcResult {
  machine: Machine;
  partsPerShift: { min: number; max: number } | number;
  lbsPerCycle: number | null;
  partsPerCycle: number | null;
  cycleTimeDisplay: string;
  fitStatus: 'yes' | 'borderline' | 'no';
  feasible: boolean;
}

function calcResults(
  partsNeeded: number,
  avgWeightLbs: number,
  shiftHours: number,
  partL: number,
  partW: number,
  partH: number,
): CalcResult[] {
  const shiftMins = shiftHours * 60;

  return MACHINES.map((m) => {
    const fitStatus = partFitStatus(m, partL, partW, partH);
    const fits = fitStatus !== 'no';

    if (m.type === 'batch') {
      const lbsPerCycle = m.loadLbs;
      const partsPerCycle = avgWeightLbs > 0
        ? Math.max(1, Math.floor(lbsPerCycle / avgWeightLbs))
        : null;

      const ppsMin = partsPerCycle !== null
        ? partsPerCycle * Math.floor(shiftMins / (m.cycleMax + m.loadUnload))
        : Math.floor(shiftMins / (m.cycleMax + m.loadUnload));

      const ppsMax = partsPerCycle !== null
        ? partsPerCycle * Math.floor(shiftMins / (m.cycleMin + m.loadUnload))
        : Math.floor(shiftMins / (m.cycleMin + m.loadUnload));

      const feasible = fits && (partsNeeded > 0 ? ppsMax >= partsNeeded : true);

      return {
        machine: m,
        partsPerShift: { min: ppsMin, max: ppsMax },
        lbsPerCycle,
        partsPerCycle,
        cycleTimeDisplay: `${m.cycleMin}–${m.cycleMax} min + ${m.loadUnload} min load/unload`,
        fitStatus,
        feasible,
      };
    } else {
      const lbsPerHr = (m as any).throughputLbsHr as number;
      const lbsPerShift = lbsPerHr * shiftHours;
      const pps = avgWeightLbs > 0 ? Math.floor(lbsPerShift / avgWeightLbs) : null;
      const feasible = fits && (partsNeeded > 0 && pps !== null ? pps >= partsNeeded : true);

      return {
        machine: m,
        partsPerShift: pps ?? 0,
        lbsPerCycle: null,
        partsPerCycle: null,
        cycleTimeDisplay: `${lbsPerHr.toLocaleString()} lbs/hr continuous`,
        fitStatus,
        feasible,
      };
    }
  });
}

// ─── Component ─────────────────────────────────────────────────────────────────

const SERIES_ORDER = ['Top Load', 'Front Load', 'Rotary Immersion', 'Belt Conveyor', 'Rotary Drum'];

export default function CapacityCalculator() {
  const [partsNeeded, setPartsNeeded] = useState('');
  const [avgWeight,   setAvgWeight]   = useState('');
  const [shiftHours,  setShiftHours]  = useState('8');
  const [partL,       setPartL]       = useState('');
  const [partW,       setPartW]       = useState('');
  const [partH,       setPartH]       = useState('');
  const [calculated,  setCalculated]  = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const anyInput = partsNeeded || avgWeight || partL || partW || partH || shiftHours !== '8';

  function handleCalculate() {
    setCalculated(true);
    // Scroll results to just below the sticky nav (h-16 mobile / h-20 desktop)
    setTimeout(() => {
      const el = resultsRef.current;
      if (!el) return;
      const navHeight = window.innerWidth >= 1024 ? 80 : 64; // lg:h-20 / h-16
      const top = el.getBoundingClientRect().top + window.scrollY - navHeight - 8;
      window.scrollTo({ top, behavior: 'smooth' });
    }, 50);
  }

  const results = useMemo(() => {
    if (!calculated) return [];
    return calcResults(
      Number(partsNeeded) || 0,
      Number(avgWeight)   || 0,
      Number(shiftHours)  || 8,
      Number(partL)       || 0,
      Number(partW)       || 0,
      Number(partH)       || 0,
    );
  }, [calculated, partsNeeded, avgWeight, shiftHours, partL, partW, partH]);

  const grouped = useMemo(() => {
    const map = new Map<string, CalcResult[]>();
    for (const s of SERIES_ORDER) map.set(s, []);
    for (const r of results) {
      if (!map.has(r.machine.seriesLabel)) map.set(r.machine.seriesLabel, []);
      map.get(r.machine.seriesLabel)!.push(r);
    }
    return map;
  }, [results]);

  function handleReset() {
    setPartsNeeded(''); setAvgWeight(''); setShiftHours('8');
    setPartL(''); setPartW(''); setPartH('');
    setCalculated(false);
  }

  const feasibleCount    = results.filter(r => r.feasible).length;
  const sizeEntered      = Number(partL) > 0 || Number(partW) > 0 || Number(partH) > 0;
  const borderlineCount  = results.filter(r => r.fitStatus === 'borderline').length;
  const nothingFits      = sizeEntered && results.every(r => r.fitStatus === 'no');
  const noThroughput     = Number(partsNeeded) > 0 && feasibleCount === 0 && !nothingFits;
  const hasBorderline    = sizeEntered && borderlineCount > 0 && !nothingFits;

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card-bg)] overflow-hidden">

      {/* ── Inputs ── */}
      <div className="p-6 border-b border-[var(--color-border)]">
        <p className="text-xs font-semibold tracking-widest uppercase text-magido-orange mb-4">
          Capacity Calculator
        </p>

        {/* Row 1 — Part dimensions */}
        <p className="text-xs font-semibold text-[var(--color-text)] mb-2">
          Largest part dimensions <span className="font-normal text-[var(--color-text-muted)]">(inches — optional, filters machines by fit)</span>
        </p>
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: 'Length', val: partL, set: setPartL },
            { label: 'Width',  val: partW, set: setPartW },
            { label: 'Height', val: partH, set: setPartH },
          ].map(({ label, val, set }) => (
            <div key={label}>
              <label className="block text-xs text-[var(--color-text-muted)] mb-1">{label}</label>
              <input
                type="number" min="0" step="0.5"
                placeholder='e.g. 12"'
                value={val}
                onChange={e => { set(e.target.value); setCalculated(false); }}
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-magido-orange focus:outline-none focus:ring-1 focus:ring-magido-orange"
              />
            </div>
          ))}
        </div>

        {/* Row 2 — Throughput inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[var(--color-text)] mb-1.5">
              Parts needed per shift
            </label>
            <input
              type="number" min="0" placeholder="e.g. 200"
              value={partsNeeded}
              onChange={e => { setPartsNeeded(e.target.value); setCalculated(false); }}
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-magido-orange focus:outline-none focus:ring-1 focus:ring-magido-orange"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[var(--color-text)] mb-1.5">
              Average part weight (lbs)
            </label>
            <input
              type="number" min="0" step="0.1" placeholder="e.g. 2.5"
              value={avgWeight}
              onChange={e => { setAvgWeight(e.target.value); setCalculated(false); }}
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-magido-orange focus:outline-none focus:ring-1 focus:ring-magido-orange"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[var(--color-text)] mb-1.5">
              Shift length
            </label>
            <select
              value={shiftHours}
              onChange={e => { setShiftHours(e.target.value); setCalculated(false); }}
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-3 py-2 text-sm text-[var(--color-text)] focus:border-magido-orange focus:outline-none focus:ring-1 focus:ring-magido-orange"
            >
              <option value="6">6 hours</option>
              <option value="8">8 hours</option>
              <option value="10">10 hours</option>
              <option value="12">12 hours</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={handleCalculate}
            disabled={!partsNeeded && !avgWeight && !partL && !partW && !partH}
            className="inline-flex items-center gap-2 rounded-lg bg-magido-orange px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-magido-orange-dark disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Calculate capacity
          </button>
          {anyInput && (
            <button
              onClick={handleReset}
              className="rounded-lg border border-[var(--color-border)] px-4 py-2.5 text-sm font-semibold text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            >
              Reset
            </button>
          )}
        </div>

        <p className="mt-3 text-xs text-[var(--color-text-muted)]">
          Results are estimates based on typical cycle times. Actual throughput varies by part geometry, contamination level, and wash program settings.
        </p>
      </div>

      {/* ── Results ── */}
      {calculated && (
        <div ref={resultsRef} className="p-6">

          {/* ── Outcome: nothing fits by size ── */}
          {nothingFits && (
            <div className="mb-6 rounded-lg border border-magido-blue/40 bg-magido-blue/5 px-5 py-5">
              <p className="font-semibold text-sm text-[var(--color-text)] mb-1">
                No standard machine fits these part dimensions
              </p>
              <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                Your part size exceeds the basket or opening of every machine in our standard lineup.
                Magido builds custom-configured wash systems for oversized and special-application
                parts — contact us to discuss your requirements.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact#evaluation"
                  className="inline-flex items-center gap-2 rounded-lg bg-magido-orange px-4 py-2 text-sm font-semibold text-white hover:bg-magido-orange-dark transition-colors"
                >
                  Talk to a representative <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm font-semibold text-[var(--color-text)] hover:border-magido-orange transition-colors"
                >
                  Ask about custom-built systems
                </Link>
              </div>
            </div>
          )}

          {/* ── Outcome: throughput target not met ── */}
          {noThroughput && (
            <div className="mb-6 rounded-lg border border-amber-300 bg-amber-50 dark:border-amber-700 dark:bg-amber-900/15 px-5 py-4">
              <p className="font-semibold text-sm text-amber-800 dark:text-amber-300 mb-1">
                No single machine meets your throughput target
              </p>
              <p className="text-sm text-amber-700 dark:text-amber-400 mb-3">
                Options include running multiple machines in parallel, extending shift hours, or
                moving to a continuous-feed system. A Magido representative can help you find the
                most cost-effective solution.
              </p>
              <Link
                href="/contact#evaluation"
                className="inline-flex items-center gap-1 text-sm font-semibold text-magido-orange hover:underline"
              >
                Request a free process evaluation <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          )}

          {/* ── Outcome: some machines meet target ── */}
          {!nothingFits && feasibleCount > 0 && Number(partsNeeded) > 0 && (
            <div className="mb-6 rounded-lg border border-green-200 bg-green-50 dark:border-green-700 dark:bg-green-900/20 px-4 py-3 text-sm font-medium text-green-800 dark:text-green-300">
              {feasibleCount} machine{feasibleCount !== 1 ? 's' : ''} can meet your {Number(partsNeeded).toLocaleString()} parts/shift target.
            </div>
          )}

          {/* ── Borderline size advisory ── */}
          {hasBorderline && (
            <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/15 px-4 py-3 flex gap-3">
              <AlertTriangle className="h-4 w-4 flex-shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-0.5">
                  Some results are borderline fits
                </p>
                <p className="text-xs text-amber-700 dark:text-amber-400">
                  Machines marked <strong>Check fit</strong> can physically accommodate your part
                  but with limited clearance. Spray coverage and basket rotation may be affected.
                  We recommend speaking with a representative before ordering.{' '}
                  <Link href="/contact#evaluation" className="font-semibold underline hover:no-underline">
                    Contact us
                  </Link>
                  .
                </p>
              </div>
            </div>
          )}

          {/* ── Results grouped by series ── */}
          {!nothingFits && Array.from(grouped.entries()).map(([seriesName, seriesResults]) => {
            if (seriesResults.length === 0) return null;
            return (
              <div key={seriesName} className="mb-8 last:mb-0">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-3 pb-2 border-b border-[var(--color-border)]">
                  {seriesName}
                </h3>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {seriesResults.map(r => {
                    const pps = r.partsPerShift;
                    const ppsDisplay = typeof pps === 'number'
                      ? pps > 0 ? pps.toLocaleString() : '—'
                      : `${pps.min.toLocaleString()}–${pps.max.toLocaleString()}`;

                    const meetsTarget  = Number(partsNeeded) > 0 && r.feasible;
                    const doesntFit    = sizeEntered && r.fitStatus === 'no';
                    const isBorderline = sizeEntered && r.fitStatus === 'borderline';
                    const failsTarget  = Number(partsNeeded) > 0 && !r.feasible && r.fitStatus !== 'no';
                    const productUrl   = `/products/${r.machine.category}?series=${r.machine.seriesSlug}-series`;

                    return (
                      <div
                        key={r.machine.id}
                        className={`rounded-lg border p-4 transition-colors ${
                          doesntFit
                            ? 'border-[var(--color-border)] bg-[var(--color-bg-secondary)] opacity-40'
                            : isBorderline
                              ? 'border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-900/10'
                              : meetsTarget
                                ? 'border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-900/15'
                                : failsTarget
                                  ? 'border-[var(--color-border)] bg-[var(--color-bg-secondary)] opacity-60'
                                  : 'border-[var(--color-border)] bg-[var(--color-bg-secondary)]'
                        }`}
                      >
                        {/* Header */}
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <Link
                              href={productUrl}
                              className="font-bold text-sm text-[var(--color-text)] hover:text-magido-orange transition-colors"
                            >
                              {r.machine.name}
                            </Link>
                            <p className="text-xs text-magido-orange font-medium">{r.machine.seriesLabel}</p>
                          </div>
                          {doesntFit ? (
                            <span className="flex-shrink-0 flex items-center gap-1 rounded-full bg-gray-100 dark:bg-gray-800 px-2 py-0.5 text-xs font-semibold text-gray-500 dark:text-gray-400">
                              Won&apos;t fit
                            </span>
                          ) : isBorderline ? (
                            <span className="flex-shrink-0 flex items-center gap-1 rounded-full bg-amber-100 dark:bg-amber-900/40 px-2 py-0.5 text-xs font-semibold text-amber-700 dark:text-amber-400">
                              <AlertTriangle className="h-3 w-3" /> Check fit
                            </span>
                          ) : meetsTarget ? (
                            <span className="flex-shrink-0 rounded-full bg-green-100 dark:bg-green-800/40 px-2 py-0.5 text-xs font-semibold text-green-700 dark:text-green-300">
                              ✓ Meets target
                            </span>
                          ) : null}
                        </div>

                        {/* Stats */}
                        <dl className="space-y-1 text-xs mb-3">
                          <div className="flex justify-between gap-2">
                            <dt className="text-[var(--color-text-muted)]">Parts / {shiftHours}hr shift</dt>
                            <dd className="font-semibold text-[var(--color-text)]">{ppsDisplay}</dd>
                          </div>
                          {r.lbsPerCycle !== null && (
                            <div className="flex justify-between gap-2">
                              <dt className="text-[var(--color-text-muted)]">Load capacity</dt>
                              <dd className="font-semibold text-[var(--color-text)]">{r.lbsPerCycle.toLocaleString()} lbs</dd>
                            </div>
                          )}
                          {Number(avgWeight) > 0 && r.partsPerCycle !== null && (
                            <div className="flex justify-between gap-2">
                              <dt className="text-[var(--color-text-muted)]">Parts / cycle (by wt)</dt>
                              <dd className="font-semibold text-[var(--color-text)]">~{r.partsPerCycle}</dd>
                            </div>
                          )}
                          <div className="flex justify-between gap-2">
                            <dt className="text-[var(--color-text-muted)]">Cycle time</dt>
                            <dd className="font-semibold text-[var(--color-text)] text-right max-w-[55%]">{r.cycleTimeDisplay}</dd>
                          </div>
                        </dl>

                        <p className="text-xs text-[var(--color-text-muted)] mb-3 leading-relaxed">
                          {doesntFit
                            ? 'Part dimensions exceed this machine\'s basket capacity.'
                            : isBorderline
                              ? 'Part fits with limited clearance — confirm suitability with a representative.'
                              : r.machine.note}
                        </p>

                        {doesntFit ? (
                          <Link href="/contact#evaluation" className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-text-muted)] hover:text-magido-orange transition-colors">
                            Ask about larger options <ArrowRight className="h-3 w-3" />
                          </Link>
                        ) : (
                          <Link href={productUrl} className="inline-flex items-center gap-1 text-xs font-semibold text-magido-orange hover:underline">
                            View series <ArrowRight className="h-3 w-3" />
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* ── Always-present footer CTA ── */}
          <div className="mt-6 border-t border-[var(--color-border)] pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-xs text-[var(--color-text-muted)]">
              These are estimates. Actual throughput depends on part geometry, contamination level,
              and wash program settings.
            </p>
            <Link
              href="/contact#evaluation"
              className="flex-shrink-0 inline-flex items-center gap-2 rounded-lg border border-magido-orange px-4 py-2 text-xs font-semibold text-magido-orange hover:bg-magido-orange hover:text-white transition-colors"
            >
              Free process evaluation <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

