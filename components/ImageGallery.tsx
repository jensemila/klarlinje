"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

interface GalleryImage {
  src: string;
  alt: string;
}

interface Props {
  images: GalleryImage[];
  className?: string;
  aspectRatio?: string;
}

export default function ImageGallery({
  images,
  className = "",
  aspectRatio = "aspect-[4/3]",
}: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const prev = useCallback(
    () => setIndex((i) => (i - 1 + images.length) % images.length),
    [images.length]
  );
  const next = useCallback(
    () => setIndex((i) => (i + 1) % images.length),
    [images.length]
  );

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, prev, next]);

  const open_ = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  return (
    <>
      {/* Grid */}
      <div className={`grid grid-cols-${images.length === 1 ? "1" : "2"} gap-4 ${className}`}>
        {images.map((img, i) => (
          <button
            key={img.src}
            onClick={() => open_(i)}
            className={`relative ${aspectRatio} rounded-2xl overflow-hidden shadow-sm group focus:outline-none focus-visible:ring-2 focus-visible:ring-forest`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-300 flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transition bg-white/80 backdrop-blur-sm text-charcoal text-xs font-medium px-3 py-1.5 rounded-full">
                Se større
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setOpen(false)}
        >
          {/* Image */}
          <div
            className="relative max-w-5xl w-full mx-4 aspect-[4/3]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[index].src}
              alt={images[index].alt}
              fill
              className="object-contain rounded-xl"
              sizes="100vw"
              priority
            />

            {/* Caption */}
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm bg-black/40 backdrop-blur-sm px-4 py-1.5 rounded-full whitespace-nowrap">
              {images[index].alt}
            </p>

            {/* Counter */}
            <p className="absolute top-4 right-4 text-white/50 text-xs">
              {index + 1} / {images.length}
            </p>
          </div>

          {/* Prev */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition"
              aria-label="Forrige bilde"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Next */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition"
              aria-label="Neste bilde"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Close */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition"
            aria-label="Lukk"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
