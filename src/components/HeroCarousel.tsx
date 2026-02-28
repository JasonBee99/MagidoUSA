'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, FlaskConical } from 'lucide-react';

interface Slide {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  image?: { src: string; alt: string };
}

const SLIDES: Slide[] = [
  {
    id: 'fls',
    badge: 'New Product',
    title: 'FLS Series',
    subtitle: 'Front Load Spray Cabinet Washers',
    description:
      'The newest addition to the Magido lineup. Heavy-duty front-loading design for large, heavy components — built entirely from AISI 304 stainless steel with automated wash cycles.',
    primaryCta: { label: 'Explore FLS Series', href: '/products/front-load-washers' },
    secondaryCta: { label: 'Request a Quote', href: '/contact?model=FLS-35' },
    image: { src: '/images/products/fls/fls35-open.webp', alt: 'FLS-35 Front Load Washer' },
  },
  {
    id: 'topload',
    badge: 'Best Sellers',
    title: 'Top Load Washers',
    subtitle: '17 Models Across 5 Series',
    description:
      'Our most popular product line. Versatile spray cabinet washers handling everything from small precision parts to 770 lb loads. The proven workhorse for shops of every size.',
    primaryCta: { label: 'Browse Top Load Washers', href: '/products/top-load-washers' },
    secondaryCta: { label: 'Help Me Choose', href: '/how-to-choose' },
    image: { src: '/images/products/x51/l102-1.webp', alt: 'L102 Top Load Spray Cabinet Washer' },
  },
  {
    id: 'evaluation',
    badge: 'Free Service',
    title: 'Process Evaluation',
    subtitle: "Not Sure Which System You Need?",
    description:
      "Tell us about your parts, contaminants, and throughput requirements. Our engineering team will evaluate your process and recommend the ideal cleaning solution — no obligation.",
    primaryCta: { label: 'Start Your Evaluation', href: '/contact#evaluation' },
    secondaryCta: { label: 'Call 844-4MA-GIDO', href: 'tel:8444624436' },
  },
];

const AUTO_ADVANCE_MS = 7000;

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const pausedRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Robust auto-advance using refs to avoid stale closures
  useEffect(() => {
    function tick() {
      if (!pausedRef.current) {
        setCurrent((prev) => (prev + 1) % SLIDES.length);
      }
    }

    timerRef.current = setInterval(tick, AUTO_ADVANCE_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Reset timer when user manually navigates
  function resetTimer() {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!pausedRef.current) {
        setCurrent((prev) => (prev + 1) % SLIDES.length);
      }
    }, AUTO_ADVANCE_MS);
  }

  function goTo(index: number) {
    setCurrent(index);
    resetTimer();
  }

  function goNext() {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
    resetTimer();
  }

  function goPrev() {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    resetTimer();
  }

  const slide = SLIDES[current];

  return (
    <section
      className="hero-bg relative px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-12">
          {/* ─── Left: Text content ─── */}
          <div className="max-w-2xl lg:w-1/2 lg:max-w-none" key={slide.id}>
            {/* Badge */}
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                slide.id === 'fls'
                  ? 'bg-magido-orange/20 text-magido-orange'
                  : slide.id === 'topload'
                    ? 'bg-magido-blue/20 text-magido-blue-light'
                    : 'bg-white/10 text-gray-300'
              }`}
            >
              {slide.id === 'evaluation' && <FlaskConical className="h-3 w-3" />}
              {slide.badge}
            </span>

            {/* Title */}
            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {slide.title}
            </h1>
            <p className="mt-2 font-display text-lg font-medium text-magido-orange sm:text-xl">
              {slide.subtitle}
            </p>

            {/* Description */}
            <p className="mt-4 text-base leading-relaxed text-gray-300 sm:text-lg">
              {slide.description}
            </p>

            {/* CTAs */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={slide.primaryCta.href}
                className="inline-flex items-center gap-2 rounded-lg bg-magido-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-magido-orange-dark"
              >
                {slide.primaryCta.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
              {slide.secondaryCta && (
                <Link
                  href={slide.secondaryCta.href}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  {slide.secondaryCta.label}
                </Link>
              )}
            </div>
          </div>

          {/* ─── Right: Product image / icon — CENTERED ─── */}
          <div className="flex lg:w-1/2 items-center justify-center">
            {slide.image ? (
              <div className="product-halo relative h-60 w-60 sm:h-72 sm:w-72 lg:h-96 lg:w-96">
                <Image
                  src={slide.image.src}
                  alt={slide.image.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 240px, (max-width: 1024px) 288px, 384px"
                  priority={current === 0}
                />
              </div>
            ) : (
              <div className="flex h-60 w-60 items-center justify-center sm:h-72 sm:w-72 lg:h-80 lg:w-80">
                <div className="flex flex-col items-center gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                    <FlaskConical className="h-20 w-20 text-magido-orange opacity-80" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-white">Free Expert Analysis</p>
                    <p className="mt-1 text-xs text-gray-400">
                      1–2 business day response
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ─── Carousel controls ─── */}
        <div className="mt-10 flex items-center justify-between">
          {/* Dots */}
          <div className="flex items-center gap-2">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all ${
                  i === current
                    ? 'w-8 bg-magido-orange'
                    : 'w-2 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${i + 1}: ${s.badge}`}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={goPrev}
              className="rounded-lg border border-white/20 p-2 text-white/60 transition-colors hover:border-white/40 hover:text-white"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={goNext}
              className="rounded-lg border border-white/20 p-2 text-white/60 transition-colors hover:border-white/40 hover:text-white"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
