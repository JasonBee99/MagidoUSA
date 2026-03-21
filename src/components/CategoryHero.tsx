'use client';

import Image from 'next/image';
import { Droplets } from 'lucide-react';
import { linkAisi } from '@/lib/linkAisi';

interface CategoryHeroProps {
  heroTitle: string;
  heroDescription: string;
  categoryName: string;
  heroImage: string | null;
  heroBadge?: string;
}

/**
 * Pure server component — zero JS shipped for this section.
 * Renders the category/series hero with badge, image, and description.
 */
export function CategoryHero({
  heroTitle,
  heroDescription,
  categoryName,
  heroImage,
  heroBadge,
}: CategoryHeroProps) {
  const badge = heroBadge ?? categoryName;

  return (
    <section className="hero-bg px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-10">
          {/* Text */}
          <div className="lg:flex-1 text-center lg:text-left">
            {/* Badge — replaces the plain eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-magido-orange/30 bg-magido-orange/10 px-4 py-1.5 text-sm font-medium text-magido-orange">
              <Droplets className="h-3.5 w-3.5" aria-hidden="true" />
              {badge}
            </div>

            <h1 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
              {heroTitle}
            </h1>
            <p
              className="mt-4 text-base leading-relaxed text-gray-300 sm:text-lg"
              dangerouslySetInnerHTML={{ __html: linkAisi(heroDescription) }}
            />
          </div>

          {/* Image */}
          {heroImage && (
            <div className="w-full lg:flex-1">
              <div className="product-halo relative h-56 w-full sm:h-64 lg:h-80">
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
