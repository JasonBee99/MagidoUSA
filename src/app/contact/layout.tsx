import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us — Get a Quote or Request a Demo',
  description:
    'Contact Magido USA to request a quote, schedule an evaluation, or ask about aqueous parts washing systems. Reach our sales team in Sturtevant, WI.',
  alternates: {
    canonical: 'https://magidousa.com/contact',
  },
  openGraph: {
    title: 'Contact Us — Get a Quote or Request a Demo',
    description:
      'Request a quote, schedule an evaluation, or ask about our aqueous parts washing systems. Sturtevant, WI.',
    url: 'https://magidousa.com/contact',
    images: [{ url: 'https://magidousa.com/images/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Magido USA — Get a Quote',
    description:
      'Request a quote, schedule a free process evaluation, or ask about aqueous parts washing systems.',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
