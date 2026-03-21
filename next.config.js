/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow network access from local devices during development
  allowedDevOrigins: ['192.168.1.113'],
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
    dangerouslyAllowSVG: false,
    contentDispositionType: 'inline',
  },
  // Enable compression
  compress: true,
  // ─── 301 redirects ───────────────────────────────────────────────────────
  async redirects() {
    return [
      // ── www → non-www canonical redirect (MUST be first) ──────────────────
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.magidousa.com' }],
        destination: 'https://magidousa.com/:path*',
        permanent: true,
      },
      // ── Old product-category pages → new category pages ──
      { source: '/product-category/manual-washers/:path*',              destination: '/products/manual-washers',                permanent: true },
      { source: '/product-category/top-load-washers/:path*',            destination: '/products/top-load-washers',              permanent: true },
      { source: '/product-category/front-load-washers/:path*',          destination: '/products/front-load-washers',            permanent: true },
      { source: '/product-category/immersion-washers/:path*',           destination: '/products/immersion-washers',             permanent: true },
      { source: '/product-category/in-line-belt-conveyor/:path*',       destination: '/products/in-line-belt-conveyor-washers', permanent: true },
      { source: '/product-category/rotary-drum/:path*',                 destination: '/products/rotary-drum-washers',           permanent: true },
      { source: '/product-category/rotary-immersion/:path*',            destination: '/products/rotary-immersion-washers',      permanent: true },
      { source: '/product-category/:path*',                             destination: '/products',                               permanent: true },
      // ── Old individual product pages → new product pages ──
      { source: '/product/l-101',                                  destination: '/products/top-load-washers/l101',         permanent: true },
      { source: '/product/l102',                                   destination: '/products/top-load-washers/l102',         permanent: true },
      { source: '/product/l-102',                                  destination: '/products/top-load-washers/l102',         permanent: true },
      { source: '/product/l-122',                                  destination: '/products/top-load-washers/l122',         permanent: true },
      { source: '/product/l-152',                                  destination: '/products/top-load-washers/l152',         permanent: true },
      { source: '/product/hp25',                                   destination: '/products/manual-washers/hp-25',          permanent: true },
      { source: '/product/hp-25',                                  destination: '/products/manual-washers/hp-25',          permanent: true },
      { source: '/product/hp30',                                   destination: '/products/manual-washers/hp-30',          permanent: true },
      { source: '/product/hp-30',                                  destination: '/products/manual-washers/hp-30',          permanent: true },
      { source: '/product/a700-top-load-immersion-parts-washer',  destination: '/products/immersion-washers/a700',        permanent: true },
      { source: '/product/a900-top-load-immersion-parts-washer',  destination: '/products/immersion-washers/a900',        permanent: true },
      { source: '/product/a1100-top-load-immersion-parts-washer', destination: '/products/immersion-washers/a1100',       permanent: true },
      { source: '/product/a1300-top-load-immersion-parts-washer', destination: '/products/immersion-washers/a1300',       permanent: true },
      { source: '/product/l101hp',                                 destination: '/products/top-load-washers/l101hp',       permanent: true },
      { source: '/product/l101-hp',                                destination: '/products/top-load-washers/l101hp',       permanent: true },
      { source: '/product/magido-l10-manual-parts-washer',        destination: '/products/manual-washers/l-10',           permanent: true },
      { source: '/product/magido-l7-manual-parts-washer',         destination: '/products/manual-washers/l-7',            permanent: true },
      { source: '/product/dg-8',                                   destination: '/products/manual-washers/dg-8',           permanent: true },
      { source: '/product/dg-9',                                   destination: '/products/manual-washers/dg-9',           permanent: true },
      { source: '/product/dg-11',                                  destination: '/products/manual-washers/dg-11',          permanent: true },
      // Catch-all for any remaining /product/ URLs not explicitly mapped above
      { source: '/product/:path*',                                 destination: '/products',                               permanent: true },
      // ── Old docs/resources pages → new resources pages ──
      // NOTE: /docs/ catch-all is safe — PDF brochures now live at /brochures/ (not /docs/)
      { source: '/docs/magido-manual-aqueous-parts-washers',               destination: '/resources/manual-washers',              permanent: true },
      { source: '/docs/front-loading-aqueous-parts-washing-systems',       destination: '/resources/front-load-washers',          permanent: true },
      { source: '/docs/helical-rotary-drum-aqueous-parts-washing-system',  destination: '/resources/rotary-drum-washers',         permanent: true },
      { source: '/docs/in-line-belt-conveyor-aqueous-parts-washing-systems', destination: '/resources/in-line-belt-conveyor-washers', permanent: true },
      { source: '/docs/top-load-aqueous-parts-washing-systems',            destination: '/resources/top-load-washers',            permanent: true },
      { source: '/docs/2722',                                              destination: '/resources/catalog',                     permanent: true },
      { source: '/docs/:path*',                                            destination: '/resources',                             permanent: true },
      // ── Old misc pages ──
      { source: '/applications',            destination: '/solutions',    permanent: true },
      { source: '/applications/:path*',     destination: '/solutions',    permanent: true },
      { source: '/about-magido-usa',        destination: '/about',        permanent: true },
      { source: '/contact-us',              destination: '/contact',      permanent: true },
      { source: '/brand/magido-usa',        destination: '/about',        permanent: true },
      { source: '/brand/:path*',            destination: '/about',        permanent: true },
      // ── Old WP/OpenCart query string URLs ──
      // Next.js redirects don't support query string matching natively.
      // The /index.php path redirect handles the path portion.
      // ?route= and ?path= OpenCart variants are handled in middleware.ts
      { source: '/index.php',              destination: '/',              permanent: true },
    ];
  },
  // Headers for caching static assets
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, immutable', // 30 days
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // 1 year
          },
        ],
      },
      // ── PDF brochures — cache 7 days, serve inline ──
      {
        source: '/brochures/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, stale-while-revalidate=86400',
          },
          {
            key: 'Content-Disposition',
            value: 'inline',
          },
        ],
      },
    ];
  },
  // PoweredByHeader off for security
  poweredByHeader: false,
};
module.exports = nextConfig;
