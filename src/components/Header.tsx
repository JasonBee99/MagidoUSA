'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Moon, ChevronDown, Phone, Mail, ExternalLink } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { getAllCategories, getSeriesByCategory } from '@/lib/products';

const categories = getAllCategories();

const NAV_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/resources', label: 'Resources' },
  { href: '/blog', label: 'Blog' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

// ─── Route-matched SEO taglines ───────────────────────────────────────────────
// Packs the 5 highest-volume search terms into natural language per page.
const TAGLINES: { match: string; tagline: string }[] = [
  { match: '/products',           tagline: 'Stainless Steel Aqueous Parts Washing Systems — 84 Models · 7 Categories · Made in Italy' },
  { match: '/solutions',          tagline: 'Aqueous Parts Washer Selection Guides — Spray Cabinet, Immersion, Conveyor, Rotary & Manual' },
  { match: '/how-to-choose',      tagline: 'How to Choose an Industrial Aqueous Parts Washer — Free Water-Based Parts Cleaning Evaluation' },
  { match: '/blog',               tagline: 'Industrial Parts Washing Guides — Aqueous, Water-Based & Stainless Steel Cleaning Systems' },
  { match: '/resources',          tagline: 'Aqueous Parts Washer Documentation & Catalog — Industrial Stainless Steel Cleaning Systems' },
  { match: '/industries',         tagline: 'Industrial Aqueous Parts Washers for Automotive, Aerospace, Machining & Heavy Equipment' },
  { match: '/contact',            tagline: 'Request a Quote — Free Industrial Parts Cleaning Process Evaluation · Same-Day Response' },
  { match: '/faq',                tagline: 'Aqueous Parts Washer FAQ — Stainless Steel, Water-Based Industrial Parts Cleaning Systems' },
  { match: '/about',              tagline: 'Leaders in Industrial Aqueous Parts Washing — 100% Stainless Steel, Made in Italy Since 1980' },
  { match: '/privacy-policy',    tagline: 'Magido USA Privacy Policy — magidousa.com' },
  { match: '/terms-of-use',      tagline: 'Magido USA Terms of Use — magidousa.com' },
  { match: '/aqueous-parts-washers', tagline: 'Industrial Aqueous Parts Washers — 100% AISI 304 Stainless Steel, Made in Italy' },
  { match: '/',                   tagline: 'Industrial Aqueous Parts Washers — 100% AISI 304 Stainless Steel, Made in Italy' },
];

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const solutionsTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { setMounted(true); }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setProductsOpen(false);
    setSolutionsOpen(false);
  }, [pathname]);

  function isActive(href: string) {
    return pathname.startsWith(href);
  }

  const isProductsActive = pathname.startsWith('/products');
  const isSolutionsActive = pathname.startsWith('/solutions') || pathname.startsWith('/how-to-choose');

  // Pick the most specific matching tagline (longest match wins)
  const tagline = TAGLINES
    .filter((t) => pathname.startsWith(t.match))
    .sort((a, b) => b.match.length - a.match.length)[0]?.tagline
    ?? TAGLINES[TAGLINES.length - 1].tagline;

  // Hover handlers with small delay to prevent flicker
  function handleDropdownEnter() {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setProductsOpen(true);
  }

  function handleDropdownLeave() {
    dropdownTimeout.current = setTimeout(() => {
      setProductsOpen(false);
    }, 150);
  }

  function handleSolutionsEnter() {
    if (solutionsTimeout.current) clearTimeout(solutionsTimeout.current);
    setSolutionsOpen(true);
  }

  function handleSolutionsLeave() {
    solutionsTimeout.current = setTimeout(() => {
      setSolutionsOpen(false);
    }, 150);
  }

  return (
    <>
      {/* ─── Top Info Bar ─── */}
      <div className="hidden border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)] lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <a
              href="mailto:Sales@MagidoUSA.com"
              className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)] transition-colors hover:text-magido-orange"
            >
              <Mail className="h-3 w-3" />
              Sales@MagidoUSA.com
            </a>
            <a
              href="tel:8444624436"
              className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)] transition-colors hover:text-magido-orange"
            >
              <Phone className="h-3 w-3" />
              844-462-4436 | M–F 8am–5pm CST
            </a>
          </div>
          <a
            href="https://magido.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)] transition-colors hover:text-magido-orange"
          >
            <Image
              src="/images/italian-flag.svg"
              alt="Italy"
              width={14}
              height={10}
              className="flex-shrink-0"
            />
            Magido Italy
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      {/* ─── Main Header ─── */}
      <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="flex h-14 w-full items-center justify-between lg:h-[4.5rem]">
            {/* Logo — w-auto preserves aspect ratio, never stretches */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/magido-usa-logo.webp"
                alt="Magido USA"
                width={216}
                height={48}
                className="h-12 w-auto lg:h-12"
                sizes="216px"
                priority
                fetchPriority="high"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden items-center gap-0.5 lg:flex">
              {/* Products Dropdown */}
              <div
                className="relative"
                onMouseEnter={handleDropdownEnter}
                onMouseLeave={handleDropdownLeave}
              >
                <Link
                  href="/products"
                  className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isProductsActive
                      ? 'text-magido-orange'
                      : 'text-[var(--color-text)] hover:text-magido-orange'
                  }`}
                >
                  Products
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${
                      productsOpen ? 'rotate-180' : ''
                    }`}
                  />
                </Link>

                {/* Mega Dropdown */}
                {productsOpen && (
                  <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2">
                    <div className="w-[680px] rounded-xl border border-[var(--color-border)] bg-[var(--color-card-bg)] p-5 shadow-2xl">
                      {/* Header row */}
                      <div className="mb-3 flex items-center justify-between border-b border-[var(--color-border-light)] pb-3">
                        <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                          Product Categories
                        </h3>
                        <Link
                          href="/products"
                          className="text-xs font-medium text-magido-orange transition-colors hover:text-magido-orange-dark"
                          onClick={() => setProductsOpen(false)}
                        >
                          View All Products →
                        </Link>
                      </div>

                      {/* Category grid — 2 columns */}
                      <div className="grid grid-cols-2 gap-1">
                        {categories.map((cat) => {
                          const seriesList = getSeriesByCategory(cat.slug);
                          return (
                            <Link
                              key={cat.slug}
                              href={`/products/${cat.slug}`}
                              className={`group rounded-lg px-3 py-2.5 transition-colors hover:bg-[var(--color-bg-secondary)] ${
                                pathname.startsWith(`/products/${cat.slug}`)
                                  ? 'bg-[var(--color-bg-secondary)]'
                                  : ''
                              }`}
                              onClick={() => setProductsOpen(false)}
                            >
                              <div className="flex items-center justify-between">
                                <span
                                  className={`text-sm font-medium transition-colors group-hover:text-magido-orange ${
                                    pathname.startsWith(`/products/${cat.slug}`)
                                      ? 'text-magido-orange'
                                      : 'text-[var(--color-text)]'
                                  }`}
                                >
                                  {cat.name}
                                </span>
                                <span className="text-2xs tabular-nums text-[var(--color-text-muted)]">
                                  {cat.totalProducts} models
                                </span>
                              </div>
                              <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                                {seriesList.map((s) => s.displayName).join(', ')} Series
                              </p>
                            </Link>
                          );
                        })}
                      </div>

                      {/* Bottom CTA row */}
                      <div className="mt-3 flex items-center justify-between border-t border-[var(--color-border-light)] pt-3">
                        <Link
                          href="/how-to-choose"
                          className="text-xs text-[var(--color-text-secondary)] transition-colors hover:text-magido-orange"
                          onClick={() => setProductsOpen(false)}
                        >
                          Not sure? → How to Choose a Washer
                        </Link>
                        <Link
                          href="/compare"
                          className="text-xs text-[var(--color-text-secondary)] transition-colors hover:text-magido-orange"
                          onClick={() => setProductsOpen(false)}
                        >
                          Compare Products
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Solutions Dropdown */}
              <div
                className="relative"
                onMouseEnter={handleSolutionsEnter}
                onMouseLeave={handleSolutionsLeave}
              >
                <Link
                  href="/solutions"
                  className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isSolutionsActive
                      ? 'text-magido-orange'
                      : 'text-[var(--color-text)] hover:text-magido-orange'
                  }`}
                >
                  Solutions
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${
                      solutionsOpen ? 'rotate-180' : ''
                    }`}
                  />
                </Link>

                {solutionsOpen && (
                  <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2">
                    <div className="w-56 rounded-xl border border-[var(--color-border)] bg-[var(--color-card-bg)] py-1.5 shadow-2xl">
                      <Link
                        href="/solutions"
                        className={`block px-4 py-2 text-sm font-medium transition-colors hover:text-magido-orange ${
                          pathname === '/solutions'
                            ? 'text-magido-orange'
                            : 'text-[var(--color-text)]'
                        }`}
                        onClick={() => setSolutionsOpen(false)}
                      >
                        Solutions Overview
                      </Link>
                      <div className="mx-4 my-1 border-t border-[var(--color-border-light)]" />
                      <Link
                        href="/how-to-choose"
                        className={`block px-4 py-2 text-sm transition-colors hover:text-magido-orange ${
                          pathname.startsWith('/how-to-choose')
                            ? 'font-medium text-magido-orange'
                            : 'text-[var(--color-text-secondary)]'
                        }`}
                        onClick={() => setSolutionsOpen(false)}
                      >
                        How to Choose a Washer
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Other nav links */}
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? 'text-magido-orange'
                      : 'text-[var(--color-text)] hover:text-magido-orange'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-1 lg:gap-2">
              {/* Phone (desktop) */}
              <a
                href="tel:8444624436"
                className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-[var(--color-text)] transition-colors hover:text-magido-orange lg:flex"
                aria-label="Call Magido USA"
              >
                <Phone className="h-4 w-4" />
                <span className="hidden xl:inline">844-462-4436</span>
              </a>

              {/* Theme toggle — desktop only */}
              <button
                onClick={toggleTheme}
                className="hidden rounded-lg p-2 text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text)] lg:block"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="rounded-lg p-2 text-[var(--color-text-secondary)] lg:hidden"
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* ─── Mobile Nav ─── */}
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 top-14 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Panel */}
            <div className="fixed inset-x-0 top-14 z-50 max-h-[calc(100vh-3.5rem)] overflow-y-auto border-t border-[var(--color-border)] bg-[var(--color-bg)] pb-6 shadow-xl lg:hidden">
              <div className="mx-auto max-w-7xl px-4 pt-3 sm:px-6">
                {/* Mobile info bar */}
                <div className="mb-3 flex flex-col gap-1.5 rounded-lg bg-[var(--color-bg-secondary)] p-3">
                  <a
                    href="mailto:Sales@MagidoUSA.com"
                    className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]"
                  >
                    <Mail className="h-3 w-3" />
                    Sales@MagidoUSA.com
                  </a>
                  <a
                    href="tel:8444624436"
                    className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]"
                  >
                    <Phone className="h-3 w-3" />
                    844-462-4436 | M–F 8am–5pm CST
                  </a>
                </div>

                {/* Products accordion */}
                <button
                  onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isProductsActive ? 'text-magido-orange' : 'text-[var(--color-text)]'
                  }`}
                >
                  Products
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      mobileProductsOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {mobileProductsOpen && (
                  <div className="mb-1 ml-3 border-l-2 border-[var(--color-border-light)] pl-3">
                    <Link
                      href="/products"
                      className={`block rounded-lg px-2 py-1.5 text-sm font-medium transition-colors ${
                        pathname === '/products' ? 'text-magido-orange' : 'text-[var(--color-text)]'
                      }`}
                    >
                      All Products
                    </Link>
                    {categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/products/${cat.slug}`}
                        className={`block rounded-lg px-2 py-1.5 text-sm transition-colors ${
                          pathname.startsWith(`/products/${cat.slug}`)
                            ? 'font-medium text-magido-orange'
                            : 'text-[var(--color-text-secondary)]'
                        }`}
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Solutions accordion */}
                <button
                  onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isSolutionsActive ? 'text-magido-orange' : 'text-[var(--color-text)]'
                  }`}
                >
                  Solutions
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      mobileSolutionsOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {mobileSolutionsOpen && (
                  <div className="mb-1 ml-3 border-l-2 border-[var(--color-border-light)] pl-3">
                    <Link
                      href="/solutions"
                      className={`block rounded-lg px-2 py-1.5 text-sm font-medium transition-colors ${
                        pathname === '/solutions' ? 'text-magido-orange' : 'text-[var(--color-text)]'
                      }`}
                    >
                      Solutions Overview
                    </Link>
                    <Link
                      href="/how-to-choose"
                      className={`block rounded-lg px-2 py-1.5 text-sm transition-colors ${
                        pathname.startsWith('/how-to-choose')
                          ? 'font-medium text-magido-orange'
                          : 'text-[var(--color-text-secondary)]'
                      }`}
                    >
                      How to Choose a Washer
                    </Link>
                  </div>
                )}

                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive(link.href) ? 'text-magido-orange' : 'text-[var(--color-text)]'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="mt-4 flex flex-col gap-2 px-3">
                  <a
                    href="tel:8444624436"
                    className="flex items-center justify-center gap-2 rounded-lg bg-magido-blue px-4 py-2.5 text-sm font-medium text-white"
                  >
                    <Phone className="h-4 w-4" />
                    844-462-4436
                  </a>
                  <Link
                    href="/contact"
                    className="btn-quote w-full text-center"
                  >
                    Request a Quote
                  </Link>
                  {/* Theme toggle — mobile */}
                  <button
                    onClick={toggleTheme}
                    className="flex items-center justify-center gap-2 rounded-lg border border-[var(--color-border)] px-4 py-2.5 text-sm font-medium text-[var(--color-text-secondary)]"
                  >
                    {theme === 'light' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                  </button>
                </div>

                {/* Mobile Magido Italy link */}
                <div className="mt-3 flex justify-center">
                  <a
                    href="https://magido.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] transition-colors hover:text-magido-orange"
                  >
                    <Image
                      src="/images/italian-flag.svg"
                      alt="Italy"
                      width={14}
                      height={10}
                      className="h-[10px] w-[14px] flex-shrink-0"
                    />
                    Magido Italy
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
      {/* ─── SEO Tagline Bar ─── */}
      <div className="overflow-hidden border-b border-magido-blue/40 bg-magido-blue px-4 py-1.5 text-center">
        <p className="truncate text-[11px] font-medium uppercase tracking-widest text-white/80">
          {mounted ? tagline : ''}
        </p>
      </div>
    </header>
    </>
  );
}
