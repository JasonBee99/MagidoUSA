import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import { getBlogPost, getAllBlogSlugs, blogPosts, type BlogSectionImage } from '@/data/blog';
import { ShareButtons } from '@/components/ShareButtons';

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getBlogPost(params.slug);
  if (!post) return {};
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: `https://magidousa.com/blog/${params.slug}` },
    openGraph: { url: `https://magidousa.com/blog/${params.slug}` },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const currentIndex = blogPosts.findIndex((p) => p.slug === params.slug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  return (
    <>
      {/* ── Breadcrumb ── */}
      <nav
        className="border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Breadcrumb"
      >
        <div className="mx-auto flex max-w-7xl items-center gap-2 text-sm">
          <Link href="/" className="text-[var(--color-text-muted)] transition-colors hover:text-magido-orange">Home</Link>
          <ChevronRight className="h-3.5 w-3.5 text-[var(--color-text-muted)]" />
          <Link href="/blog" className="text-[var(--color-text-muted)] transition-colors hover:text-magido-orange">Blog</Link>
          <ChevronRight className="h-3.5 w-3.5 text-[var(--color-text-muted)]" />
          <span className="font-medium text-[var(--color-text)] truncate max-w-xs">{post.title}</span>
        </div>
      </nav>

      {/* ── Hero — dark banner, title left, hero image right when present ── */}
      <section className="hero-bg px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className={`flex flex-col gap-8 ${post.heroImage ? 'lg:flex-row lg:items-center lg:gap-12' : ''}`}>

            {/* Left: meta + title + share */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 text-sm text-white/50">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
                <span>&bull;</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readTime}
                </span>
              </div>
              <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {post.title}
              </h1>
              <div className="mt-5 border-t border-white/10 pt-5">
                <ShareButtons title={post.title} slug={params.slug} />
              </div>
            </div>

            {/* Right: hero image — only when defined */}
            {post.heroImage && (
              <div className="w-full flex-shrink-0 lg:w-80 xl:w-96">
                <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
                  <Image
                    src={post.heroImage}
                    alt={post.heroImageAlt || post.title}
                    width={480}
                    height={360}
                    className="h-56 w-full object-contain p-4 lg:h-64"
                    priority
                  />
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* ── Article body — full max-w-7xl, matching every other page ── */}
      <article className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">

          <div className="space-y-10">
            {post.sections.map((section, i) => (
              <div key={i}>
                {section.image ? (
                  /* Side-by-side: heading full width, then image + text row */
                  <div>
                    {section.heading && (
                      <h2 className="mb-5 font-display text-xl font-bold text-[var(--color-text)] sm:text-2xl">
                        {section.heading}
                      </h2>
                    )}
                    <div className={`flex flex-col gap-6 sm:flex-row ${section.image.side === 'left' ? 'sm:flex-row-reverse' : ''}`}>
                      <p className="flex-1 text-base leading-relaxed text-[var(--color-text-secondary)]">
                        {section.content}
                      </p>
                      <BlogSectionImageBlock image={section.image} />
                    </div>
                  </div>
                ) : (
                  /* Text-only */
                  <div>
                    {section.heading && (
                      <h2 className="mb-3 font-display text-xl font-bold text-[var(--color-text)] sm:text-2xl">
                        {section.heading}
                      </h2>
                    )}
                    <p className="text-base leading-relaxed text-[var(--color-text-secondary)]">
                      {section.content}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ── CTA block — entire section links to how-to-choose ── */}
          <Link href="/how-to-choose" className="group mt-14 block rounded-xl border border-magido-orange/20 bg-magido-orange/5 p-8 text-center transition-all hover:border-magido-orange/50 hover:shadow-md">
            <p className="font-display text-xl font-bold text-[var(--color-text)]">Need Help Choosing the Right System?</p>
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">Magido offers free parts cleaning process evaluations.</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact#evaluation"
                className="inline-flex items-center gap-2 rounded-lg bg-magido-orange px-5 py-2.5 text-sm font-semibold text-white hover:bg-magido-orange-dark"
              >
                Free Evaluation <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-5 py-2.5 text-sm font-semibold text-[var(--color-text)] hover:bg-[var(--color-bg-secondary)]"
              >
                Browse Products
              </Link>
            </div>
          </Link>
          <div className="mt-10 border-t border-[var(--color-border)] pt-6">
            <ShareButtons title={post.title} slug={params.slug} />
          </div>

          <div className="mt-6 flex items-center justify-between">
            {prevPost ? (
              <Link
                href={`/blog/${prevPost.slug}`}
                className="group flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-magido-orange"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline truncate max-w-xs">{prevPost.title}</span>
                <span className="sm:hidden">Previous</span>
              </Link>
            ) : <div />}
            {nextPost ? (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="group flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-magido-orange"
              >
                <span className="hidden sm:inline truncate max-w-xs">{nextPost.title}</span>
                <span className="sm:hidden">Next</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : <div />}
          </div>

        </div>
      </article>
    </>
  );
}

// ─── Blog Section Image Block ─────────────────────────────────────────────────
// Compact product image card matching the site's product card style:
// - rounded-xl corners throughout
// - orange border on hover (matches home page product card hover)
// - series badge (orange, top-left, rounded-br-lg) → links to series
// - model badge (blue, top-right, rounded-bl-lg) → links to product
// - image itself also links to product page
function BlogSectionImageBlock({ image }: { image: BlogSectionImage }) {
  return (
    <div className="w-full flex-shrink-0 sm:w-52 lg:w-60">
      <div className="relative overflow-hidden rounded-xl">
        {/* Image — links to product page */}
        <a
          href={image.productUrl}
          className="product-card-image-bg group relative flex aspect-square w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-[var(--color-card-border)] transition-all duration-200 hover:border-magido-orange/50 hover:shadow-lg"
          aria-label={`View ${image.model} product page`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 240px"
          />
        </a>

        {/* Series badge — top-left, rounded-br-lg, links to series tab */}
        <a
          href={image.seriesUrl}
          className="absolute left-0 top-0 z-10 rounded-br-lg bg-magido-orange px-2.5 py-1 text-xs font-bold text-white transition-opacity hover:opacity-80"
          aria-label={`View ${image.seriesName} series`}
        >
          {image.seriesName} Series
        </a>

        {/* Model badge — top-right, rounded-bl-lg, links to product */}
        <a
          href={image.productUrl}
          className="absolute right-0 top-0 z-10 rounded-bl-lg bg-magido-blue px-2.5 py-1 text-xs font-bold text-white transition-opacity hover:opacity-80"
          aria-label={`View ${image.model} product page`}
        >
          {image.model}
        </a>
      </div>

      {/* Caption */}
      <p className="mt-2 text-center text-xs text-[var(--color-text-muted)]">
        {image.seriesName} Series — {image.model}
      </p>
    </div>
  );
}
