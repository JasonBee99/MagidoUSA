export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Droplets } from 'lucide-react';
import { blogPosts } from '@/data/blog';
import { BlogList } from '@/components/BlogList';
import blogConfig from '@/data/blog-config.json';

export function generateMetadata(): Metadata {
  return {
    title: blogConfig.meta.title,
    description: blogConfig.meta.description,
    alternates: { canonical: blogConfig.meta.canonical },
    openGraph: {
      title: blogConfig.meta.title,
      description: blogConfig.meta.description,
      url: blogConfig.meta.canonical,
      images: [{ url: 'https://magidousa.com/images/og-default.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: blogConfig.meta.title,
      description: blogConfig.meta.description,
    },
  };
}

export default function BlogPage() {
  const { breadcrumb, hero } = blogConfig;

  return (
    <>
      <nav
        className="border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Breadcrumb"
      >
        <div className="mx-auto flex max-w-7xl items-center gap-2 text-sm">
          <Link
            href={breadcrumb.home.href}
            className="text-[var(--color-text-muted)] transition-colors hover:text-magido-orange"
          >
            {breadcrumb.home.label}
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-[var(--color-text-muted)]" />
          <span className="font-medium text-[var(--color-text)]">{breadcrumb.current}</span>
        </div>
      </nav>

      <section className="hero-bg px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-magido-orange/30 bg-magido-orange/10 px-4 py-1.5 text-sm font-medium text-magido-orange">
            <Droplets className="h-3.5 w-3.5" aria-hidden="true" />
            Industrial Parts Washing Guides
          </div>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {hero.heading}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">
            {hero.subheading}
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-4xl">
          <BlogList posts={blogPosts} sortOptions={blogConfig.sortOptions} />
        </div>
      </section>
    </>
  );
}
