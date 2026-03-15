import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware to handle old OpenCart index.php?route= and index.php?path= URLs
 * that Next.js redirects() cannot match (query strings are not supported there).
 *
 * Old OpenCart category path= values:
 *   59 = manual-washers
 *   64 = top-load-washers (X51 series)
 *   65 = top-load-washers (X81 series)
 *   66 = top-load-washers (X51/2 series)
 *   67 = front-load-washers (X53/2)
 *   68 = rotary-immersion-washers
 *   69 = in-line-belt-conveyor-washers
 *
 * Old OpenCart product_id values mapped to new slugs.
 */

const CATEGORY_PATH_MAP: Record<string, string> = {
  '59': '/products/manual-washers',
  '64': '/products/top-load-washers',
  '65': '/products/top-load-washers',
  '66': '/products/top-load-washers',
  '67': '/products/front-load-washers',
  '68': '/products/rotary-immersion-washers',
  '69': '/products/in-line-belt-conveyor-washers',
};

const PRODUCT_ID_MAP: Record<string, string> = {
  '28': '/products/manual-washers/dg-9',
  '29': '/products/manual-washers/hp-30',
  '51': '/products/manual-washers/hp-25',
  '54': '/products/top-load-washers/l102',
  '55': '/products/top-load-washers/l122',
};

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Only intercept /index.php requests
  if (pathname !== '/index.php') return NextResponse.next();

  const route = searchParams.get('route') ?? '';
  const path = searchParams.get('path') ?? '';
  const productId = searchParams.get('product_id') ?? '';

  // Product detail page
  if (route.includes('product/product') || route.includes('product%2Fproduct')) {
    const dest = productId && PRODUCT_ID_MAP[productId]
      ? PRODUCT_ID_MAP[productId]
      : '/products';
    return NextResponse.redirect(new URL(dest, request.url), { status: 301 });
  }

  // Category page — check both ?path= and ?route= variants
  if (route.includes('product/category') || route.includes('product%2Fcategory')) {
    const dest = path && CATEGORY_PATH_MAP[path]
      ? CATEGORY_PATH_MAP[path]
      : '/products';
    return NextResponse.redirect(new URL(dest, request.url), { status: 301 });
  }

  // Fallback — any other /index.php request → home
  return NextResponse.redirect(new URL('/', request.url), { status: 301 });
}

export const config = {
  matcher: '/index.php',
};
