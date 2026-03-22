// src/app/api/indexnow/route.ts
// POST /api/indexnow?secret=magido-indexnow-2026
// Submits all site URLs to Bing via IndexNow protocol.
// Pulls URL list directly from sitemap() so it's always in sync.

import { NextResponse } from 'next/server';
import sitemap from '@/app/sitemap';

const INDEXNOW_KEY = '789825D2AD4DFA38B9CAA16B7C9FEC3B';
const BASE = 'https://magidousa.com';
const SECRET = process.env.INDEXNOW_SECRET ?? 'magido-indexnow-2026';

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  if (searchParams.get('secret') !== SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Pull URLs directly from sitemap — single source of truth
    const sitemapEntries = sitemap();
    const urlList = sitemapEntries.map((entry) => entry.url);

    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: 'magidousa.com',
        key: INDEXNOW_KEY,
        keyLocation: `${BASE}/${INDEXNOW_KEY}.txt`,
        urlList,
      }),
    });

    if (res.ok || res.status === 202) {
      return NextResponse.json({
        success: true,
        submitted: urlList.length,
        status: res.status,
      });
    }

    const text = await res.text();
    return NextResponse.json({ success: false, status: res.status, body: text }, { status: 500 });

  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
