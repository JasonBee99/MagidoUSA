// src/data/blog.ts
// Types, interfaces, and helper functions only.
// All post content lives in blog.json — edit that file to add or update posts.

import blogPostsData from './blog.json';

export interface BlogSectionImage {
  src: string;
  alt: string;
  side?: 'left' | 'right';
  productUrl: string;
  seriesUrl: string;
  seriesName: string;
  model: string;
}

export interface BlogSection {
  heading?: string;
  content: string;
  image?: BlogSectionImage;
}

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  date: string;
  readTime: string;
  heroImage?: string;
  heroImageAlt?: string;
  heroSeriesName?: string;
  heroModel?: string;
  heroProductUrl?: string;
  heroSeriesUrl?: string;
  illustrationKey: string;
  sections: BlogSection[];
}

export const blogPosts: BlogPost[] = blogPostsData as BlogPost[];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}
