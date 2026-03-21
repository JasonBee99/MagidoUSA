// Phase 8 update — built 2026-03-10T03:07:23Z
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import SolutionPage from '@/components/SolutionPage';
import type { Solution, SolutionsData, SolutionProduct } from '@/types/solutions';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

// Import data
import solutionsData from '@/data/solutions.json';
import productsData from '@/data/products.json';

const { solutions } = solutionsData as SolutionsData;

// ── Static params for build-time generation ──────────────────────────────────
export function generateStaticParams() {
  return solutions.map((s: Solution) => ({ slug: s.slug }));
}

// ── Metadata ──────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const solution = solutions.find((s: Solution) => s.slug === params.slug);
  if (!solution) return {};

  const url = `https://magidousa.com/solutions/${solution.slug}`;

  return {
    title: solution.metaTitle,
    description: solution.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: solution.metaTitle,
      description: solution.metaDescription,
      url,
      type: 'article',
      images: [{ url: 'https://magidousa.com/images/og-default.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: solution.metaTitle,
      description: solution.metaDescription,
    },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function SolutionRoute({ params }: { params: { slug: string } }) {
  const solution = solutions.find((s: Solution) => s.slug === params.slug);
  if (!solution) notFound();

  // Resolve related products from products.json — no cap, show all
  const allProducts = (productsData as { products: SolutionProduct[] }).products;
  const relatedProducts: SolutionProduct[] = solution.relatedProductSlugs
    .map((slug: string) => allProducts.find((p: SolutionProduct) => p.slug === slug))
    .filter((p): p is SolutionProduct => p !== undefined);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Solutions', url: '/solutions' },
          { name: solution.title, url: `/solutions/${solution.slug}` },
        ]}
      />
      <SolutionPage solution={solution} relatedProducts={relatedProducts} />
    </>
  );
}
