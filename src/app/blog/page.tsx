import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ArrowRight, Clock } from 'lucide-react';
import { blogPosts } from '@/data/blog';

export const metadata: Metadata = {
  title: 'Blog — Industrial Parts Washing Guides & Insights',
  description: 'Expert guides on aqueous parts washing: cleaning methods, maintenance tips, sizing guides, and industry comparisons from the Magido USA team.',
  alternates: {
    canonical: 'https://www.magidousa.com/blog',
  },
};

export default function BlogPage() {
  return (
    <>
      <nav className="border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-3 sm:px-6 lg:px-8" aria-label="Breadcrumb">
        <div className="mx-auto flex max-w-7xl items-center gap-2 text-sm">
          <Link href="/" className="text-[var(--color-text-muted)] transition-colors hover:text-magido-orange">Home</Link>
          <ChevronRight className="h-3.5 w-3.5 text-[var(--color-text-muted)]" />
          <span className="font-medium text-[var(--color-text)]">Blog</span>
        </div>
      </nav>

      <section className="hero-bg px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="font-display text-sm font-semibold uppercase tracking-widest text-magido-orange">Blog &amp; Guides</p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">Parts Washing Insights</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">Expert guides on aqueous cleaning methods, maintenance, sizing, and making the right equipment decisions.</p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-4xl space-y-6">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-6 transition-all hover:border-magido-orange/30 hover:shadow-lg">
              <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
                <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                <span>&bull;</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
              </div>
              <h2 className="mt-2 font-display text-xl font-bold text-[var(--color-text)] transition-colors group-hover:text-magido-orange">{post.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">{post.excerpt}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-magido-orange">Read More <ArrowRight className="h-3.5 w-3.5" /></span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
