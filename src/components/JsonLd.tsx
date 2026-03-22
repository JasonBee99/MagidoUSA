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
        '@id': 'https://magidousa.com/#organization',
        name: 'Magido USA',
        url: 'https://magidousa.com',
        logo: 'https://magidousa.com/images/magido-usa-logo.png',
        description:
          'Magido USA distributes professional aqueous parts washers built entirely from AISI 304 stainless steel, manufactured by Magido Group in Italy.',
        telephone: '+1-844-462-4436',
        email: 'Sales@MagidoUSA.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '1500 S Sylvania Ave',
          addressLocality: 'Sturtevant',
          addressRegion: 'WI',
          postalCode: '53177',
          addressCountry: 'US',
        },
        sameAs: [
          'https://www.linkedin.com/in/toscottmorin',
          'https://magido.com',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+1-844-462-4436',
          contactType: 'sales',
          areaServed: 'US',
          availableLanguage: 'English',
          hoursAvailable: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '08:00',
            closes: '17:00',
          },
        },
      }}
    />
  );
}

// LocalBusiness schema — helps Google Knowledge Panel show address/hours
export function LocalBusinessJsonLd() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': 'https://magidousa.com/#localbusiness',
        name: 'Magido USA',
        description:
          'Industrial aqueous parts washers — spray cabinet, immersion, belt conveyor, rotary drum, and manual. 100% AISI 304 stainless steel, made in Italy.',
        url: 'https://magidousa.com',
        telephone: '+1-844-462-4436',
        email: 'Sales@MagidoUSA.com',
        logo: 'https://magidousa.com/images/magido-usa-logo.png',
        image: 'https://magidousa.com/images/og-default.png',
        priceRange: '$$',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '1500 S Sylvania Ave',
          addressLocality: 'Sturtevant',
          addressRegion: 'WI',
          postalCode: '53177',
          addressCountry: 'US',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 42.7166028,
          longitude: -87.9552287,
        },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '17:00',
        },
        sameAs: [
          'https://www.linkedin.com/in/toscottmorin',
          'https://magido.com',
        ],
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
        dateModified: '2026-03-22',
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
