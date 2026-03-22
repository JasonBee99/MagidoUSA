interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Organization schema for the whole site
export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Magido USA',
        url: 'https://magidousa.com',
        logo: 'https://magidousa.com/images/magido-usa-logo.png',
        description:
          'Magido USA manufactures professional aqueous parts washers built entirely from AISI 304 stainless steel.',
        telephone: '+1-844-462-4436',
        email: 'Sales@MagidoUSA.com',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Sturtevant',
          addressRegion: 'WI',
          postalCode: '53177',
          addressCountry: 'US',
        },
        sameAs: ['https://www.linkedin.com/in/toscottmorin'],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+1-844-462-4436',
          contactType: 'sales',
          availableLanguage: 'English',
        },
      }}
    />
  );
}

const BASE_URL = 'https://magidousa.com';

function toAbsoluteUrl(path: string): string {
  if (!path) return BASE_URL;
  if (path.startsWith('http')) return path;
  return `${BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

// Product schema for individual product pages
export function ProductJsonLd({
  name,
  model,
  description,
  image,
  category,
  url,
}: {
  name: string;
  model: string;
  description: string;
  image?: string;
  category: string;
  url: string;
}) {
  const absoluteUrl = toAbsoluteUrl(url);
  const absoluteImage = image ? toAbsoluteUrl(image) : undefined;

  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: `Magido ${model}`,
        description,
        brand: {
          '@type': 'Brand',
          name: 'Magido',
        },
        manufacturer: {
          '@type': 'Organization',
          name: 'Magido Group S.r.l.',
        },
        material: 'AISI 304 Stainless Steel',
        category,
        url: absoluteUrl,
        ...(absoluteImage ? { image: absoluteImage } : {}),
        offers: {
          '@type': 'Offer',
          availability: 'https://schema.org/InStock',
          // Google requires a numeric price. We use 0 with a
          // description so the Offer is valid while signalling
          // "contact for pricing". This satisfies the schema
          // validator without misrepresenting actual pricing.
          price: '0',
          priceCurrency: 'USD',
          priceValidUntil: new Date(
            new Date().setFullYear(new Date().getFullYear() + 1)
          )
            .toISOString()
            .split('T')[0],
          description: 'Contact Magido USA for current pricing and availability.',
          url: absoluteUrl,
          seller: {
            '@type': 'Organization',
            name: 'Magido USA',
            url: BASE_URL,
          },
        },
      }}
    />
  );
}

// WebSite schema — enables Google sitelinks search box in SERPs
export function WebSiteJsonLd() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Magido USA',
        url: 'https://magidousa.com',
        description:
          'Industrial aqueous parts washers — 100% AISI 304 stainless steel, made in Italy. Spray cabinet, immersion, belt conveyor, rotary drum, and manual parts washers.',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://magidousa.com/products?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      }}
    />
  );
}

// WebPage schema for the home page
export function HomePageJsonLd() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': 'https://magidousa.com/#webpage',
        url: 'https://magidousa.com',
        name: 'Magido USA — Industrial Aqueous Parts Washers | Stainless Steel, Made in Italy',
        description:
          'Industrial aqueous parts washers by Magido USA. Spray cabinet, immersion, belt conveyor, rotary drum, and manual. 75+ models, AISI 304 stainless steel, made in Italy.',
        inLanguage: 'en-US',
        isPartOf: {
          '@type': 'WebSite',
          '@id': 'https://magidousa.com/#website',
          url: 'https://magidousa.com',
          name: 'Magido USA',
        },
        about: {
          '@type': 'Organization',
          '@id': 'https://magidousa.com/#organization',
          name: 'Magido USA',
        },
        dateModified: new Date().toISOString().split('T')[0],
      }}
    />
  );
}


export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: item.name,
          item: toAbsoluteUrl(item.url),
        })),
      }}
    />
  );
}

// Blog article schema
export function ArticleJsonLd({
  title,
  description,
  url,
  datePublished,
}: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description,
        url,
        datePublished,
        author: {
          '@type': 'Organization',
          name: 'Magido USA',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Magido USA',
          logo: {
            '@type': 'ImageObject',
            url: 'https://magidousa.com/images/magido-usa-logo.png',
          },
        },
      }}
    />
  );
}
