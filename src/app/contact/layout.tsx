import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us — Get a Quote or Request a Demo',
  description:
    'Contact Magido USA to request a quote, schedule an evaluation, or ask about aqueous parts washing systems. Reach our sales team in Sturtevant, WI.',
  alternates: {
    canonical: 'https://www.magidousa.com/contact',
  },
  openGraph: {
    title: 'Contact Us',
    description:
      'Request a quote, schedule an evaluation, or ask about our aqueous parts washing systems.',
    url: 'https://www.magidousa.com/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
