import Image from 'next/image';
import Link from 'next/link';
import { Droplets, FlaskConical } from 'lucide-react';
import { linkAisi } from '@/lib/linkAisi';

interface CategoryHeroProps {
  heroTitle: string;
  heroDescription: string;
  categoryName: string;
  heroImage: string | null;
  heroBadge?: string;
  /** Slug of the current category — used to build the quote URL */
  categorySlug?: string;
}

/**
 * Category/series hero — canonical format matching home page hero.
 * Badge | h1 | justified desc | btn-sm CTAs | pipe-separated secondary links
 */
export function CategoryHero({
  heroTitle,
  heroDescription,
  categoryName,
  heroImage,
  heroBadge,
  categorySlug,
}: CategoryHeroProps) {
  const badge = heroBadge ?? categoryName;
  const quoteHref = categorySlug
    ? `/contact?category=${categorySlug}`
    : '/contact';

  return (
    <section className="hero-bg px-4 py-10 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-10">

          {/* Text */}
          <div className="lg:flex-1 text-center lg:text-left">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-magido-orange/30 bg-magido-orange/10 px-4 py-1.5 text-sm font-medium text-magido-orange">
              <Droplets className="h-3.5 w-3.5" aria-hidden="true" />
              {badge}
            </div>

            <h1 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
              {heroTitle}
            </h1>

            <p
              className="mt-4 text-justify text-base leading-relaxed text-gray-300 sm:text-lg"
              dangerouslySetInnerHTML={{ __html: linkAisi(heroDescription) }}
            />

            {/* CTAs — btn-sm side-by-side */}
            <div className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start">
              <Link href={quoteHref} className="btn-primary btn-sm">
                Request a Quote
                <span className="btn-arrow">→</span>
              </Link>
              <Link href="/contact#evaluation" className="btn-ghost-dark btn-sm">
                Process Evaluation
              </Link>
            </div>

            {/* Secondary links — pipe-separated */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-white/10 pt-5 lg:justify-start">
              <Link
                href="/products"
                className="whitespace-nowrap text-sm font-medium text-gray-300 transition-colors hover:text-white"
              >
                Browse All Washers →
              </Link>
              <span className="text-white/20" aria-hidden="true">|</span>
              <Link
                href="/contact#evaluation"
                className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-sm font-medium text-gray-300 transition-colors hover:text-white"
              >
                <FlaskConical className="h-3.5 w-3.5 text-magido-orange" />
                Free Evaluation
              </Link>
              <span className="text-white/20" aria-hidden="true">|</span>
              <Link
                href="/how-to-choose"
                className="whitespace-nowrap text-sm font-medium text-gray-300 transition-colors hover:text-white"
              >
                Help Me Choose →
              </Link>
            </div>
          </div>

          {/* Image */}
          {heroImage && (
            <div className="w-full lg:flex-1">
              <div className="product-halo relative mx-auto h-56 w-full max-w-xs sm:h-64 lg:mx-0 lg:h-80 lg:max-w-none">
                <Image
                  src={heroImage}
                  alt={`${heroTitle} representative product`}
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  priority
                />
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
