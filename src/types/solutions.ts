export interface SolutionSection {
  heading: string;
  content: string;
}

export interface ComparisonTable {
  headers: string[];
  rows: string[][];
}

export interface Solution {
  slug: string;
  type: 'comparison' | 'use-case';
  title: string;
  headline: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  sections: SolutionSection[];
  comparisonTable?: ComparisonTable;
  verdict?: string;
  keyBenefits?: string[];
  ctaHeading: string;
  ctaText: string;
  relatedProductSlugs: string[];
  relatedProductHeading: string;
}

export interface SolutionsData {
  _version: string;
  _description: string;
  solutions: Solution[];
}

export interface SolutionProduct {
  slug: string;
  model: string;
  name: string;
  url: string;
  images: string[];
  seriesSlug: string;
  categorySlug: string;
}
