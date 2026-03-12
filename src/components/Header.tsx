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
  { href: '/solutions', label: 'Solutions' },
  { href: '/about', label: 'About' },
  { href: '/resources', label: 'Resources' },
  { href: '/blog', label: 'Blog' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

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
  }, [pathname]);

  function isActive(href: string) {
    return pathname.startsWith(href);
  }

  const isProductsActive = pathname.startsWith('/products');

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
            className="flex items-center gap-1 text-xs text-[var(--color-text-secondary)] transition-colors hover:text-magido-orange"
          >
            Magido Italy
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      {/* ─── Main Header ─── */}
      <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:h-[4.5rem]">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/magido-usa-logo.webp"
                alt="Magido USA"
                width={216}
                height={48}
                className="h-10 w-auto lg:h-12"
                sizes="216px"
                priority
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
            <div className="flex items-center gap-2">
              {/* Phone (desktop) */}
              <a
                href="tel:8444624436"
                className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-[var(--color-text)] transition-colors hover:text-magido-orange lg:flex"
                aria-label="Call Magido USA"
              >
                <Phone className="h-4 w-4" />
                <span className="hidden xl:inline">844-462-4436</span>
              </a>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="rounded-lg p-2 text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text)]"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </button>

              {/* Request a Quote CTA (desktop) */}
              <Link
                href="/contact"
                className="hidden rounded-lg bg-magido-orange px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-magido-orange-dark lg:inline-flex"
              >
                Request a Quote
              </Link>

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
              className="fixed inset-0 top-16 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Panel */}
            <div className="fixed inset-x-0 top-16 z-50 max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-[var(--color-border)] bg-[var(--color-bg)] pb-6 shadow-xl lg:hidden">
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
                    className="flex items-center justify-center rounded-lg bg-magido-orange px-4 py-2.5 text-sm font-medium text-white"
                  >
                    Request a Quote
                  </Link>
                </div>

                {/* Mobile Magido Italy link */}
                <div className="mt-3 flex justify-center">
                  <a
                    href="https://magido.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-[var(--color-text-muted)] transition-colors hover:text-magido-orange"
                  >
                    Magido Italy
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
}
