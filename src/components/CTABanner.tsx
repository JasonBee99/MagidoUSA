import Link from 'next/link';
import { ArrowRight, FlaskConical, FileText } from 'lucide-react';

interface CTABannerProps {
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  className?: string;
}

/**
 * CTABanner — reusable call-to-action block.
 * Uses the same border-sweep hover pattern as .solution-card (globals.css).
 * Drop it anywhere: blog posts, product pages, landing pages, etc.
 */
export default function CTABanner({
  title = 'Need Help Choosing the Right System?',
  subtitle = 'Magido offers free parts cleaning process evaluations.',
  primaryLabel = 'Request a Quote',
  primaryHref = '/contact#contact-forms',
  secondaryLabel = 'Free Process Evaluation',
  secondaryHref = '/contact?form=evaluation#contact-forms',
  className = '',
}: CTABannerProps) {
  return (
    <div className={`cta-banner-grid solution-card group rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-8 sm:p-10 text-center ${className}`}>
      {/* Orange accent bar */}
      <div className="mb-6 h-1 w-12 rounded-full bg-magido-orange mx-auto" />

      <h2 className="font-display text-xl font-bold sm:text-2xl">
        <Link
          href="/how-to-choose"
          className="text-[var(--color-text)] transition-colors hover:text-magido-orange"
        >
          {title}
        </Link>
      </h2>

      <p className="mt-2 text-base text-[var(--color-text-secondary)]">
        {subtitle}
      </p>

      <div className="mt-7 flex flex-wrap justify-center gap-4">
        <Link href={primaryHref} className="btn-primary">
          <FileText className="h-4 w-4" />
          {primaryLabel}
          <span className="btn-arrow">→</span>
        </Link>

        <Link href={secondaryHref} className="btn-secondary">
          <FlaskConical className="h-4 w-4" />
          {secondaryLabel}
          <span className="btn-arrow">
            <ArrowRight className="h-4 w-4" />
          </span>
        </Link>
      </div>
    </div>
  );
}
