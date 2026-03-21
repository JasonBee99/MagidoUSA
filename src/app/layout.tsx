import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import Script from 'next/script';
import '@/styles/globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { CompareProvider } from '@/components/CompareProvider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CompareBar } from '@/components/CompareBar';
import { OrganizationJsonLd } from '@/components/JsonLd';

const GA_ID = 'G-M6YLZ7YG7T';

const bodyFont = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const displayFont = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: {
    default: 'Magido USA — Leaders in Aqueous Parts Washing Systems',
    template: '%s | Magido USA',
  },
  description:
    'Magido USA manufactures professional aqueous parts washers built entirely from AISI 304 stainless steel. Spray cabinet, immersion, conveyor, and rotary systems for every industrial cleaning application.',
  keywords: [
    'aqueous parts washer',
    'industrial parts cleaning',
    'stainless steel parts washer',
    'spray cabinet washer',
    'immersion parts washer',
    'conveyor parts washer',
    'rotary drum washer',
    'parts cleaning systems',
    'AISI 304 stainless steel',
    'Magido USA',
  ],
  verification: {
    google: 'cThqZI_BN2gt3t2kc77Y6TtfTLPr7TtbkMFxWcE184U',
  },
  authors: [{ name: 'Magido USA' }],
  creator: 'Magido USA',
  metadataBase: new URL('https://magidousa.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://magidousa.com',
    siteName: 'Magido USA',
    title: 'Magido USA — Leaders in Aqueous Parts Washing Systems',
    description:
      'Professional aqueous parts washers built from AISI 304 stainless steel. Spray cabinet, immersion, conveyor, and rotary systems.',
    images: [
      {
        url: 'https://magidousa.com/images/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Magido USA — Aqueous Parts Washing Systems',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Magido USA — Aqueous Parts Washing Systems',
    description:
      'Professional aqueous parts washers built from AISI 304 stainless steel.',
    images: ['https://magidousa.com/images/og-default.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://magidousa.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Favicon */}
        <link rel="icon" href="/images/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/favicon.png" />
        {/* Prevent FOUC for dark mode */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('magido-theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        <OrganizationJsonLd />
      </head>
      <body
        className={`${bodyFont.variable} ${displayFont.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <CompareProvider>
            <a
              href="#main-content"
              className="absolute -top-full left-4 z-[9999] rounded-lg bg-magido-orange px-4 py-2 text-sm font-semibold text-white shadow-lg focus:top-4 focus:outline-none"
            >
              Skip to main content
            </a>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main id="main-content" className="flex-1">{children}</main>
              <Footer />
            </div>
            <CompareBar />
          </CompareProvider>
        </ThemeProvider>

        {/* ─── Google Analytics 4 ─── */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </body>
    </html>
  );
}
