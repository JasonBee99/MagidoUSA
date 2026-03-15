import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compare Parts Washers — Side-by-Side Specs',
  description:
    'Compare Magido USA aqueous parts washers side by side. View full specifications, features, and options across models to find the right machine for your application.',
  alternates: {
    canonical: 'https://www.magidousa.com/compare',
  },
  openGraph: {
    title: 'Compare Parts Washers',
    description:
      'Side-by-side specs, features, and options across Magido USA aqueous parts washing models.',
    url: 'https://www.magidousa.com/compare',
  },
  robots: {
    index: false, // comparison tool state is ephemeral — no value in indexing
    follow: true,
  },
};

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
