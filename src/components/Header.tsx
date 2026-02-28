'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Moon, ChevronDown, Phone } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { getAllCategories } from '@/lib/products';

const categories = getAllCategories();

const NAV_LINKS = [
  { href: '/', label: 'Home', exact: true },
  { href: '/how-to-choose', label: 'How to Choose' },
  { href: '/industries', label: 'Industries' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

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
  }, [pathname]);

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  }

  const isProductsActive = pathname.startsWith('/products');

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/magido-usa-logo.png"
              alt="Magido USA"
              width={216}
              height={48}
              className="h-10 w-auto lg:h-12"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {/* Home link */}
            <Link
              href="/"
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive('/', true)
                  ? 'bg-[var(--color-bg-secondary)] text-magido-orange'
                  : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text)]'
              }`}
            >
              Home
            </Link>

            {/* Products Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <button
                className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isProductsActive
                    ? 'bg-[var(--color-bg-secondary)] text-magido-orange'
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text)]'
                }`}
              >
                Products
                <ChevronDown className={`h-4 w-4 transition-transform ${productsOpen ? 'rotate-180' : ''}`} />
              </button>

              {productsOpen && (
                <div className="absolute left-0 top-full mt-1 w-72 rounded-xl border border-[var(--color-border)] bg-[var(--color-card-bg)] p-2 shadow-xl">
                  {/* All Products link */}
                  <Link
                    href="/products"
                    className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-[var(--color-bg-secondary)] ${
                      pathname === '/products' ? 'text-magido-orange' : ''
                    }`}
                    onClick={() => setProductsOpen(false)}
                  >
                    <span className="font-semibold text-[var(--color-text)]">All Products</span>
                    <span className="text-2xs text-[var(--color-text-muted)]">84 models</span>
                  </Link>
                  <div className="my-1 border-t border-[var(--color-border-light)]" />
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/products/${cat.slug}`}
                      className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-[var(--color-bg-secondary)] ${
                        pathname.startsWith(`/products/${cat.slug}`) ? 'text-magido-orange' : ''
                      }`}
                      onClick={() => setProductsOpen(false)}
                    >
                      <span className="font-medium text-[var(--color-text)]">{cat.name}</span>
                      <span className="text-2xs text-[var(--color-text-muted)]">
                        {cat.totalProducts} models
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Other nav links */}
            {NAV_LINKS.filter((l) => l.href !== '/').map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'bg-[var(--color-bg-secondary)] text-magido-orange'
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text)]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="rounded-lg p-2 text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text)]"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>

            {/* Phone (desktop) */}
            <a
              href="tel:8444624436"
              className="hidden items-center gap-2 rounded-lg bg-magido-blue px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-magido-blue-dark lg:flex"
            >
              <Phone className="h-4 w-4" />
              844-4MA-GIDO
            </a>

            {/* Contact CTA (desktop) */}
            <Link
              href="/contact"
              className="hidden rounded-lg bg-magido-orange px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-magido-orange-dark lg:inline-flex"
            >
              Get a Quote
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

      {/* Mobile Nav — slide overlay */}
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
              <Link
                href="/"
                className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive('/', true) ? 'text-magido-orange' : 'text-[var(--color-text)]'
                }`}
              >
                Home
              </Link>

              {/* Products accordion */}
              <div className="px-3 py-2">
                <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                  Products
                </p>
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

              {NAV_LINKS.filter((l) => l.href !== '/').map((link) => (
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
                  844-4MA-GIDO
                </a>
                <Link
                  href="/contact"
                  className="flex items-center justify-center rounded-lg bg-magido-orange px-4 py-2.5 text-sm font-medium text-white"
                >
                  Get a Quote
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
