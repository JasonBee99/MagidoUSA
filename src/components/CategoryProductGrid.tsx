'use client';

import { ProductCard } from '@/components/ProductCard';
import type { Series, Product } from '@/lib/products';

interface CategoryProductGridProps {
  products: Product[];
  seriesList: Series[];
  categorySlug: string;
  /** When true all cards are forced into spec view */
  specsMode?: boolean;
}

export function CategoryProductGrid({
  products,
  seriesList,
  categorySlug,
  specsMode = false,
}: CategoryProductGridProps) {
  if (products.length === 0) {
    return (
      <p className="mt-10 text-center text-sm text-[var(--color-text-muted)]">
        No products found in this series.
      </p>
    );
  }

  return (
    <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product, index) => {
        const productSeries = seriesList.find(
          (s) => s.products?.includes(product.slug) || s.slug === product.seriesSlug
        );
        return (
          <ProductCard
            key={product.slug}
            product={product}
            categorySlug={categorySlug}
            seriesName={productSeries?.displayName}
            seriesDescription={product.cardDescription || product.description}
            defaultShowSpecs={specsMode}
            forcedSpecsMode={specsMode}
            priority={index < 4}
          />
        );
      })}
    </div>
  );
}
