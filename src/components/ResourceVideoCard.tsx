'use client';

// src/components/ResourceVideoCard.tsx
// Shared video card for the Resources page.
// Uses the same modal pattern as ProductCard.tsx.

import { useState } from 'react';
import Link from 'next/link';
import { Play, X } from 'lucide-react';

export interface ResourceVideo {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  productLink?: string;
  productLinkLabel?: string;
}

export function ResourceVideoCard({ video }: { video: ResourceVideo }) {
  const [showModal, setShowModal] = useState(false);
  const thumbSrc = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
  const embedUrl = `https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`;

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] transition-all hover:border-magido-orange/30 hover:shadow-lg">
        {/* Thumbnail — click opens modal */}
        <button
          onClick={() => setShowModal(true)}
          className="group/video relative block aspect-video w-full overflow-hidden bg-black"
          aria-label={`Play ${video.title}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumbSrc}
            alt={video.title}
            className="h-full w-full object-cover transition-opacity duration-300 group-hover/video:opacity-80"
            loading="lazy"
          />
          {/* Dark overlay + play button — matches ProductCard style */}
          <span className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover/video:bg-black/50">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-magido-orange shadow-lg transition-transform duration-200 group-hover/video:scale-110">
              <Play className="h-6 w-6 translate-x-0.5 fill-white text-white drop-shadow" />
            </span>
          </span>
        </button>

        {/* Info */}
        <div className="p-4">
          <p className="font-display text-sm font-bold text-[var(--color-text)]">
            {video.title}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-[var(--color-text-secondary)]">
            {video.description}
          </p>
          {video.productLink && (
            <Link
              href={video.productLink}
              className="mt-3 inline-block text-xs font-semibold text-magido-orange transition-colors hover:text-magido-orange-dark"
            >
              {video.productLinkLabel} →
            </Link>
          )}
        </div>
      </div>

      {/* Modal — identical structure to ProductCard */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute -right-2 -top-10 rounded-full bg-white/10 p-1.5 text-white transition-colors hover:bg-white/20"
              aria-label="Close video"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="aspect-video w-full overflow-hidden rounded-xl">
              <iframe
                src={embedUrl}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={video.title}
              />
            </div>
            <p className="mt-3 text-sm text-white/80">{video.title}</p>
          </div>
        </div>
      )}
    </>
  );
}
