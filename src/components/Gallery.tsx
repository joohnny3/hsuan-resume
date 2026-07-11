"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { galleryCategories, photos, type GalleryCategory } from "@/data/profile";
import { asset } from "@/lib/site";
import SectionTitle from "./SectionTitle";

export default function Gallery() {
  const [cat, setCat] = useState<GalleryCategory>("all");
  const [current, setCurrent] = useState<number | null>(null);

  const filtered = cat === "all" ? photos : photos.filter((p) => p.category === cat);

  const close = useCallback(() => setCurrent(null), []);
  const step = useCallback(
    (delta: number) => {
      setCurrent((idx) =>
        idx === null ? null : (idx + delta + filtered.length) % filtered.length,
      );
    },
    [filtered.length],
  );

  useEffect(() => {
    if (current === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [current, close, step]);

  const countOf = (key: GalleryCategory) =>
    key === "all" ? photos.length : photos.filter((p) => p.category === key).length;

  return (
    <section id="gallery" className="scroll-mt-20 mx-auto max-w-5xl px-4 py-14">
      <SectionTitle
        eyebrow="Gallery"
        title="活動照片牆"
        sub="點照片可放大瀏覽"
      />

      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {galleryCategories.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => {
              setCat(key);
              setCurrent(null);
            }}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              cat === key
                ? "border-rose-500 bg-rose-500 font-bold text-white shadow-sm"
                : "border-blush-300 bg-white text-cocoa-600 hover:border-rose-300 hover:text-rose-500"
            }`}
          >
            {label}
            <span className="ml-1 font-display text-xs opacity-70">
              {countOf(key)}
            </span>
          </button>
        ))}
      </div>

      <div className="columns-2 gap-3 md:columns-3">
        {filtered.map((photo, i) => (
          <figure
            key={photo.file}
            className="mb-3 break-inside-avoid overflow-hidden rounded-2xl border border-blush-200 bg-white shadow-sm"
          >
            <button
              type="button"
              onClick={() => setCurrent(i)}
              className="block w-full cursor-zoom-in"
              aria-label={`放大檢視：${photo.caption}`}
            >
              <Image
                src={asset(`/photos/${photo.file}`)}
                alt={photo.caption}
                width={photo.w}
                height={photo.h}
                className="w-full h-auto transition-transform duration-300 hover:scale-[1.03]"
              />
            </button>
            <figcaption className="px-3 py-2 text-xs text-cocoa-600">
              ✿ {photo.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      {current !== null && filtered[current] && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cocoa-900/90 p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={filtered[current].caption}
        >
          <div
            className="relative flex max-h-full flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={asset(`/photos/${filtered[current].file}`)}
              alt={filtered[current].caption}
              width={filtered[current].w}
              height={filtered[current].h}
              className="max-h-[78vh] w-auto rounded-2xl"
            />
            <p className="mt-4 text-sm text-white/90">
              {filtered[current].caption}
              <span className="ml-2 font-display text-white/50">
                {current + 1} / {filtered.length}
              </span>
            </p>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="上一張"
            className="absolute left-3 top-1/2 -translate-y-1/2 flex size-11 items-center justify-center rounded-full bg-white/15 text-2xl text-white hover:bg-white/30 transition-colors"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="下一張"
            className="absolute right-3 top-1/2 -translate-y-1/2 flex size-11 items-center justify-center rounded-full bg-white/15 text-2xl text-white hover:bg-white/30 transition-colors"
          >
            ›
          </button>
          <button
            type="button"
            onClick={close}
            aria-label="關閉"
            className="absolute right-3 top-3 flex size-11 items-center justify-center rounded-full bg-white/15 text-xl text-white hover:bg-white/30 transition-colors"
          >
            ✕
          </button>
        </div>
      )}
    </section>
  );
}
