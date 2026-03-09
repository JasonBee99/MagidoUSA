import Link from 'next/link';
import Image from 'next/image';
import { getAllCategories, getCategoryRepresentativeImage } from '@/lib/products';
import { ArrowRight } from 'lucide-react';
import { HeroCarousel } from '@/components/HeroCarousel';

export default function HomePage() {
  const categories = getAllCategories();

  return (
    <>
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Product Categories Grid */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Our Product Lines
            </h2>
            <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
              Seven categories of aqueous parts washing systems for every cleaning application
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((cat) => {
              const image = getCategoryRepresentativeImage(cat.slug);
              return (
                <Link
                  key={cat.slug}
                  href={`/products/${cat.slug}`}
                  className="group overflow-hidden rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] transition-all hover:border-magido-orange/30 hover:shadow-lg"
                >
                  {/* Category image */}
                  <div className="product-card-image-bg relative flex aspect-[4/3] items-center justify-center overflow-hidden">
                    {image ? (
                      <Image
                        src={image}
                        alt={cat.name}
                        fill
                        className="object-contain p-5 transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="text-[var(--color-text-muted)] opacity-30">
                        <svg className="h-16 w-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <path d="m21 15-5-5L5 21" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold text-[var(--color-text)] group-hover:text-magido-orange">
                      {cat.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                      {cat.shortDescription}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs font-medium text-[var(--color-text-muted)]">
                        {cat.totalProducts} models • {cat.series.length} series
                      </span>
                      <ArrowRight className="h-4 w-4 text-[var(--color-text-muted)] transition-transform group-hover:translate-x-1 group-hover:text-magido-orange" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust / Value Props */}
      <section className="border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <ValueProp
              title="100% Stainless Steel"
              description="Every machine built entirely from AISI 304 stainless steel for maximum durability and corrosion resistance."
            />
            <ValueProp
              title="Engineered in Italy"
              description="Decades of European engineering excellence. Precision-manufactured components with exacting quality standards."
            />
            <ValueProp
              title="76 Models Available"
              description="From compact manual stations to fully automated conveyor systems — a solution for every application."
            />
            <ValueProp
              title="US Sales & Support"
              description="Sturtevant, WI-based team providing sales, installation guidance, and ongoing technical support."
            />
          </div>
        </div>
      </section>
    </>
  );
}

function ValueProp({ title, description }: { title: string; description: string }) {
  return (
    <div className="text-center">
      <h3 className="font-display text-base font-bold text-[var(--color-text)]">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
        {description}
      </p>
    </div>
  );
}
