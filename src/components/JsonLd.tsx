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
        url: 'https://adv.magidousa.com',
        logo: 'https://adv.magidousa.com/images/magido-usa-logo.png',
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
        sameAs: [],
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
        url,
        ...(image ? { image } : {}),
        offers: {
          '@type': 'Offer',
          availability: 'https://schema.org/InStock',
          priceCurrency: 'USD',
          price: '0',
          priceValidUntil: '2026-12-31',
          seller: {
            '@type': 'Organization',
            name: 'Magido USA',
          },
        },
      }}
    />
  );
}

// BreadcrumbList schema
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
          item: item.url,
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
            url: 'https://adv.magidousa.com/images/magido-usa-logo.png',
          },
        },
      }}
    />
  );
}
