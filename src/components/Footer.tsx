import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock, ExternalLink } from 'lucide-react';
import { getAllCategories } from '@/lib/products';

const categories = getAllCategories();

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand + Contact */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block">
              <Image
                src="/images/magido-usa-logo.png"
                alt="Magido USA"
                width={192}
                height={43}
                className="h-10 w-auto"
              />
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
              Leaders in Aqueous Cleaning Solutions. Every machine built from AISI 304 stainless steel.
            </p>
            <div className="mt-4 space-y-2">
              <a href="tel:8444624436" className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-magido-orange">
                <Phone className="h-4 w-4 flex-shrink-0" /> 844-4MA-GIDO (844-462-4436)
              </a>
              <a href="mailto:Sales@MagidoUSA.com" className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-magido-orange">
                <Mail className="h-4 w-4 flex-shrink-0" /> Sales@MagidoUSA.com
              </a>
              <div className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>1500 S Sylvania Ave<br />Sturtevant, WI 53177</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                <Clock className="h-4 w-4 flex-shrink-0" /> M–F 8:00 am – 5:00 pm (CST)
              </div>
            </div>
          </div>

          {/* Product Categories */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-[var(--color-text)]">
              Products
            </h3>
            <ul className="mt-3 space-y-2">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/products/${cat.slug}`}
                    className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-magido-orange"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-[var(--color-text)]">
              Resources
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/how-to-choose" className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-magido-orange">
                  How to Choose a Parts Washer
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-magido-orange">
                  Blog & Guides
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-magido-orange">
                  About Magido
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-magido-orange">
                  Contact Us
                </Link>
              </li>
              <li>
                <a
                  href="https://magido.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-[var(--color-text-secondary)] transition-colors hover:text-magido-orange"
                >
                  Magido Italy <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-[var(--color-text)]">
              Get Started
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
              Not sure which system is right for your application? We&apos;ll evaluate your parts and recommend the ideal solution.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-magido-orange px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-magido-orange-dark"
              >
                Request a Quote
              </Link>
              <Link
                href="/contact#evaluation"
                className="inline-flex items-center justify-center rounded-lg border border-magido-blue px-4 py-2.5 text-sm font-medium text-magido-blue transition-colors hover:bg-magido-blue hover:text-white dark:border-[var(--color-border)] dark:text-[var(--color-text-secondary)] dark:hover:bg-[var(--color-bg-tertiary)]"
              >
                Free Process Evaluation
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--color-border)] pt-8 sm:flex-row">
          <p className="text-xs text-[var(--color-text-muted)]">
            © {new Date().getFullYear()} Magido USA. All rights reserved.
          </p>
          <p className="text-xs text-[var(--color-text-muted)]">
            Manufactured with pride in Italy. Distributed across the United States.
          </p>
        </div>
      </div>
    </footer>
  );
}
