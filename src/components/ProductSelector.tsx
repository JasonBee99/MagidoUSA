'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Option {
  label: string;
  sub: string;
  val: string;
}

interface Question {
  id: string;
  text: string;
  options: Option[];
}

interface AlsoItem {
  name: string;
  url: string;
}

import type { ReactNode } from 'react';

interface Result {
  name: string;
  series: string;
  tagline: ReactNode;
  features: { label: string; val: string }[];
  url: string;
  cta: string;
  also: AlsoItem[];
}

type Answers = Record<string, string>;

// ─── Data ────────────────────────────────────────────────────────────────────

const QUESTIONS: Question[] = [
  {
    id: 'operation',
    text: 'How will parts be loaded?',
    options: [
      { label: 'By hand',                   sub: 'Operator places parts directly',        val: 'manual' },
      { label: 'Top-opening lid',            sub: 'Basket lowered into chamber',           val: 'top'    },
      { label: 'Front door',                 sub: 'Cart or rack rolled in',                val: 'front'  },
      { label: 'Continuous belt / conveyor', sub: 'Parts flow through automatically',      val: 'inline' },
    ],
  },
  {
    id: 'volume',
    text: "What's your production volume?",
    options: [
      { label: 'Low — shop floor',          sub: 'Occasional batches, maintenance use',   val: 'low'  },
      { label: 'Medium — regular batches',  sub: 'Daily production, job shop',            val: 'med'  },
      { label: 'High — continuous flow',    sub: 'Production line integration',           val: 'high' },
    ],
  },
  {
    id: 'geometry',
    text: 'Describe your parts.',
    options: [
      { label: 'Small, bulk loose parts',   sub: 'Fasteners, stampings, chips',           val: 'small'   },
      { label: 'Medium precision parts',    sub: 'Machined, cast, stamped',               val: 'med'     },
      { label: 'Large / heavy components',  sub: 'Housings, blocks, assemblies',          val: 'large'   },
      { label: 'Complex internal passages', sub: 'Hydraulics, fuel systems, bores',       val: 'complex' },
    ],
  },
];

const RESULTS: Record<string, Result> = {
  manual: {
    name: 'Manual Cabinet Washers',
    series: 'DG / L / HP Series',
    tagline: <>Heated sink-style cleaning stations for hands-on shop-floor degreasing. Simple, durable, and built entirely from <a href="/solutions/aisi-304-stainless-steel-parts-washers" className="text-magido-orange hover:text-magido-blue font-medium">AISI 304 stainless steel</a>.</>,
    features: [
      { label: 'Operation',  val: 'Manual'           },
      { label: 'Models',     val: '6 available'      },
      { label: 'Best for',   val: 'Maintenance bays' },
      { label: 'Automation', val: 'None'             },
    ],
    url: '/products/manual-washers',
    cta: 'View DG / L / HP Series',
    also: [
      { name: 'Top Load Washers',   url: '/products/top-load-washers'   },
      { name: 'Front Load Washers', url: '/products/front-load-washers' },
    ],
  },
  top_low_med: {
    name: 'Top Load Spray Cabinets',
    series: 'X51 / Eco / X81 Series',
    tagline:
      'Versatile automated spray cabinet washers for small to mid-sized parts. Enclosed wash chamber with rotating spray arms and programmable cycles.',
    features: [
      { label: 'Operation',  val: 'Automated spray' },
      { label: 'Models',     val: '18 available'    },
      { label: 'Best for',   val: 'Job shops, CNC'  },
      { label: 'Automation', val: 'Semi / full'     },
    ],
    url: '/products/top-load-washers',
    cta: 'View Top Load Washers',
    also: [
      { name: 'Front Load Washers', url: '/products/front-load-washers'  },
      { name: 'Immersion Washers',  url: '/products/immersion-washers'   },
    ],
  },
  top_complex: {
    name: 'Immersion Washers',
    series: 'Agita Series',
    tagline:
      "Full-submersion cleaning with pneumatic oscillation. Forces solution into blind holes, threaded bores, and internal passages that spray alone can't reach.",
    features: [
      { label: 'Operation',  val: 'Full immersion'   },
      { label: 'Models',     val: '10 available'     },
      { label: 'Best for',   val: 'Hydraulic & fuel' },
      { label: 'Automation', val: 'Automated'        },
    ],
    url: '/products/immersion-washers',
    cta: 'View Agita Series',
    also: [
      { name: 'Top Load Washers',        url: '/products/top-load-washers'          },
      { name: 'Rotary Immersion Washers', url: '/products/rotary-immersion-washers' },
    ],
  },
  front_large: {
    name: 'Front Load Spray Cabinets',
    series: 'FLS / X53 Series',
    tagline:
      'Heavy-duty front-loading spray cabinets for large, heavy components. Roll-in racks handle oversized parts that top-load washers cannot accommodate.',
    features: [
      { label: 'Operation',  val: 'Automated spray'  },
      { label: 'Models',     val: '11 available'     },
      { label: 'Best for',   val: 'Engine blocks'    },
      { label: 'Load',       val: 'Up to 1,500 lbs' },
    ],
    url: '/products/front-load-washers',
    cta: 'View Front Load Washers',
    also: [
      { name: 'Immersion Washers',        url: '/products/immersion-washers'         },
      { name: 'Rotary Immersion Washers', url: '/products/rotary-immersion-washers'  },
    ],
  },
  inline_small: {
    name: 'Rotary Drum Washers',
    series: 'Jolly / Spira Series',
    tagline:
      'Helical drum conveyor systems for high-volume bulk cleaning of small loose parts. Parts tumble through wash, rinse, and dry zones continuously.',
    features: [
      { label: 'Operation',  val: 'Rotary drum'        },
      { label: 'Models',     val: '14 available'       },
      { label: 'Best for',   val: 'Fasteners, springs' },
      { label: 'Feed',       val: 'Continuous'         },
    ],
    url: '/products/rotary-drum-washers',
    cta: 'View Rotary Drum Washers',
    also: [
      { name: 'In-Line Belt Conveyor Washers', url: '/products/in-line-belt-conveyor-washers' },
      { name: 'Rotary Immersion Washers',      url: '/products/rotary-immersion-washers'      },
    ],
  },
  inline_high: {
    name: 'In-Line Belt Conveyor Washers',
    series: 'Silver / Gold Series',
    tagline:
      'Continuous through-feed systems that integrate directly into production lines. Parts travel on a mesh belt through wash, rinse, and blow-off stages.',
    features: [
      { label: 'Operation',  val: 'Belt conveyor'        },
      { label: 'Models',     val: '21 available'         },
      { label: 'Best for',   val: 'High-vol. production' },
      { label: 'Feed',       val: 'Continuous'           },
    ],
    url: '/products/in-line-belt-conveyor-washers',
    cta: 'View In-Line Washers',
    also: [
      { name: 'Rotary Drum Washers',      url: '/products/rotary-drum-washers'      },
      { name: 'Rotary Immersion Washers', url: '/products/rotary-immersion-washers' },
    ],
  },
  rotary_immersion: {
    name: 'Rotary Immersion Washers',
    series: 'Platinum Series',
    tagline:
      'The most advanced cleaning technology in the Magido lineup. Multi-action spray + immersion + basket rotation for the most demanding cleanliness specs.',
    features: [
      { label: 'Operation',  val: 'Spray + immersion' },
      { label: 'Models',     val: '5 available'       },
      { label: 'Best for',   val: 'Tight tolerances'  },
      { label: 'Automation', val: 'Fully automated'   },
    ],
    url: '/products/rotary-immersion-washers',
    cta: 'View Platinum Series',
    also: [
      { name: 'In-Line Belt Conveyor Washers', url: '/products/in-line-belt-conveyor-washers' },
      { name: 'Immersion Washers',             url: '/products/immersion-washers'             },
    ],
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function resolveResult(answers: Answers): Result {
  const { operation, volume, geometry } = answers;
  if (operation === 'manual') return RESULTS.manual;
  if (operation === 'inline') return volume === 'high' ? RESULTS.inline_high : RESULTS.inline_small;
  if (operation === 'front')  return RESULTS.front_large;
  if (geometry === 'complex') return RESULTS.top_complex;
  if (volume === 'high' && geometry === 'small') return RESULTS.rotary_immersion;
  return RESULTS.top_low_med;
}

function getActiveQuestions(answers: Answers): Question[] {
  const qs = [QUESTIONS[0]];
  if (!answers.operation || answers.operation === 'manual') return qs;
  if (answers.operation === 'inline') { qs.push(QUESTIONS[1]); return qs; }
  qs.push(QUESTIONS[1], QUESTIONS[2]);
  return qs;
}

function getTotalSteps(answers: Answers): number {
  if (!answers.operation)                return 3;
  if (answers.operation === 'manual')    return 1;
  if (answers.operation === 'inline')    return 2;
  return 3;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function ProgressDots({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex gap-1 mb-4">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`h-0.5 w-5 rounded-full transition-colors duration-300 ${
            i < current
              ? 'bg-[var(--color-border)]'
              : i === current
              ? 'bg-magido-orange'
              : 'bg-[var(--color-border-light)]'
          }`}
        />
      ))}
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function ProductSelector() {
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep]       = useState(0);
  const [done, setDone]       = useState(false);

  const activeQuestions = getActiveQuestions(answers);
  const totalSteps      = getTotalSteps(answers);
  const currentQuestion = activeQuestions[step];

  function choose(qid: string, val: string) {
    const next = { ...answers, [qid]: val };
    setAnswers(next);
    const qs = getActiveQuestions(next);
    if (step + 1 >= qs.length) {
      setDone(true);
    } else {
      setStep((s) => s + 1);
    }
  }

  function restart() {
    setAnswers({});
    setStep(0);
    setDone(false);
  }

  const result = done ? resolveResult(answers) : null;
  const twoCol = !done && currentQuestion.options.length === 4;

  return (
    <div className="mx-auto max-w-xl">
      {/* Outer card — matches site card style with blue hover border */}
      <div className="relative overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-card-bg)] p-3 sm:p-7 transition-colors duration-300 hover:border-magido-blue/40">

        {/* Subtle dot-grid texture at ~12% opacity using brand blue */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #315687 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Content sits above texture */}
        <div className="relative">

          {/* Header — logo left, label right */}
          <div className="flex items-center justify-between mb-3 sm:mb-6">
            <Image
              src="/images/magido-usa-logo.webp"
              alt="Magido USA"
              width={130}
              height={29}
              className="h-7 w-auto"
            />
            <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[var(--color-text-muted)]">
              Product Selector
            </span>
          </div>

      {/* ── Question state ── */}
      {!done && (
        <div>
          <ProgressDots total={totalSteps} current={step} />
          <p className="text-xs font-semibold tracking-widest uppercase text-magido-orange mb-1">
            Question {step + 1} of {totalSteps}
          </p>
          <h3 className="text-xl font-bold text-[var(--color-text)] mb-3 sm:mb-5 leading-tight sm:text-2xl">
            {currentQuestion.text}
          </h3>
          <div className={`grid gap-2 ${twoCol ? 'grid-cols-2' : 'grid-cols-1'}`}>
            {currentQuestion.options.map((opt) => (
              <button
                key={opt.val}
                onClick={() => choose(currentQuestion.id, opt.val)}
                className="text-left bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:border-magido-orange hover:bg-[var(--color-bg-secondary)] transition-colors duration-150 p-2 sm:p-3 rounded-lg"
              >
                <span className="block font-semibold text-[15px] text-[var(--color-text)] mb-0.5">
                  {opt.label}
                </span>
                <span className="block text-xs text-[var(--color-text-secondary)] leading-snug">{opt.sub}</span>
              </button>
            ))}
          </div>
          {step > 0 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="mt-4 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors flex items-center gap-1"
            >
              ← Back
            </button>
          )}
        </div>
      )}

      {/* ── Result state ── */}
      {done && result && (
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-magido-orange mb-2">
            Recommended System
          </p>
          <h3 className="text-3xl font-bold text-[var(--color-text)] leading-tight mb-0.5">
            {result.name}
          </h3>
          <p className="text-sm text-magido-orange font-medium mb-3">{result.series}</p>
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-3 sm:mb-5">{result.tagline}</p>

          <div className="grid grid-cols-2 gap-2 mb-3 sm:mb-5">
            {result.features.map((f) => (
              <div key={f.label} className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-2 sm:p-3 rounded-lg">
                <p className="text-[10px] font-semibold tracking-widest uppercase text-[var(--color-text-muted)] mb-1">
                  {f.label}
                </p>
                <p className="font-semibold text-[15px] text-[var(--color-text)]">{f.val}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Link
              href={result.url}
              className="flex-1 bg-magido-orange hover:bg-magido-orange-dark text-white font-bold text-xs tracking-widest uppercase px-4 py-3 text-center transition-colors duration-150 rounded-lg"
            >
              {result.cta} →
            </Link>
            <button
              onClick={restart}
              className="border border-[var(--color-border)] hover:border-magido-orange text-[var(--color-text-muted)] hover:text-[var(--color-text)] font-semibold text-xs tracking-widest uppercase px-4 py-3 transition-colors duration-150 rounded-lg"
            >
              Start Over
            </button>
          </div>

          {result.also.length > 0 && (
            <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
              <p className="text-[10px] font-semibold tracking-widest uppercase text-[var(--color-text-muted)] mb-2">
                Also consider
              </p>
              <div className="flex flex-wrap gap-2">
                {result.also.map((item) => (
                  <Link
                    key={item.url}
                    href={item.url}
                    className="border border-[var(--color-border)] hover:border-magido-orange text-[var(--color-text-secondary)] hover:text-magido-orange text-xs px-3 py-1 rounded-lg transition-colors duration-150"
                  >
                    {item.name} →
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

        </div>{/* end relative content wrapper */}
      </div>{/* end outer card */}
    </div>
  );
}
