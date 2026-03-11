import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import { getBlogPost, getAllBlogSlugs, blogPosts } from '@/data/blog';
import { ShareButtons } from '@/components/ShareButtons';

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getBlogPost(params.slug);
  if (!post) return {};
  return {
    title: post.metaTitle + ' | Magido USA',
    description: post.metaDescription,
    alternates: { canonical: `https://www.magidousa.com/blog/${params.slug}` },
    openGraph: { url: `https://www.magidousa.com/blog/${params.slug}` },
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
      <nav className="border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-3 sm:px-6 lg:px-8" aria-label="Breadcrumb">
        <div className="mx-auto flex max-w-7xl items-center gap-2 text-sm">
          <Link href="/" className="text-[var(--color-text-muted)] transition-colors hover:text-magido-orange">Home</Link>
          <ChevronRight className="h-3.5 w-3.5 text-[var(--color-text-muted)]" />
          <Link href="/blog" className="text-[var(--color-text-muted)] transition-colors hover:text-magido-orange">Blog</Link>
          <ChevronRight className="h-3.5 w-3.5 text-[var(--color-text-muted)]" />
          <span className="font-medium text-[var(--color-text)] truncate max-w-[200px]">{post.title}</span>
        </div>
      </nav>

      <article className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
            <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
            <span>&bull;</span>
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
          </div>

          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-4xl">{post.title}</h1>

          <div className="mt-5 flex items-center justify-between border-b border-[var(--color-border)] pb-5">
            <ShareButtons title={post.title} slug={params.slug} />
          </div>

          <div className="mt-8 space-y-6">
            {post.sections.map((section, i) => (
              <div key={i}>
                {section.heading && <h2 className="mb-3 font-display text-xl font-bold text-[var(--color-text)] sm:text-2xl">{section.heading}</h2>}
                <p className="text-base leading-relaxed text-[var(--color-text-secondary)]">{section.content}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-xl border border-magido-orange/20 bg-magido-orange/5 p-6 text-center">
            <p className="font-display text-lg font-bold text-[var(--color-text)]">Need Help Choosing the Right System?</p>
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">Magido offers free parts cleaning process evaluations.</p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <Link href="/contact#evaluation" className="inline-flex items-center gap-2 rounded-lg bg-magido-orange px-5 py-2.5 text-sm font-semibold text-white hover:bg-magido-orange-dark">Free Evaluation <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/products" className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-5 py-2.5 text-sm font-semibold text-[var(--color-text)] hover:bg-[var(--color-bg-secondary)]">Browse Products</Link>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between border-t border-[var(--color-border)] pt-6">
            <ShareButtons title={post.title} slug={params.slug} />
          </div>

          <div className="mt-6 flex items-center justify-between">
            {prevPost ? (
              <Link href={`/blog/${prevPost.slug}`} className="group flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-magido-orange">
                <ArrowLeft className="h-4 w-4" /><span className="hidden sm:inline truncate max-w-[200px]">{prevPost.title}</span><span className="sm:hidden">Previous</span>
              </Link>
            ) : <div />}
            {nextPost ? (
              <Link href={`/blog/${nextPost.slug}`} className="group flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-magido-orange">
                <span className="hidden sm:inline truncate max-w-[200px]">{nextPost.title}</span><span className="sm:hidden">Next</span><ArrowRight className="h-4 w-4" />
              </Link>
            ) : <div />}
          </div>
        </div>
      </article>
    </>
  );
}
