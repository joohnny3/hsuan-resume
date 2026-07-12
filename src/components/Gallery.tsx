"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { photos } from "@/data/profile";
import { asset } from "@/lib/site";
import SectionTitle from "./SectionTitle";

export default function Gallery() {
  const [current, setCurrent] = useState<number | null>(null);

  const close = useCallback(() => setCurrent(null), []);
  const step = useCallback((delta: number) => {
    setCurrent((idx) =>
      idx === null ? null : (idx + delta + photos.length) % photos.length,
    );
  }, []);

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

  return (
    <section id="gallery" className="scroll-mt-20 border-t border-hairline">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <SectionTitle title="活動照片" sub="點擊照片可瀏覽完整原圖" />

        {/* 統一 3:4 直式卡(ADR-005),裁切構圖偏上避免砍頭 */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
          {photos.map((photo, i) => (
            <button
              key={photo.file}
              type="button"
              onClick={() => setCurrent(i)}
              aria-label={`放大檢視:${photo.caption}`}
              className="group relative aspect-[3/4] cursor-zoom-in overflow-hidden rounded-xl bg-surface ring-1 ring-hairline"
            >
              <Image
                src={asset(`/photos/${photo.file}`)}
                alt={photo.caption}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover object-[50%_18%] transition-transform duration-500 group-hover:scale-105"
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent px-3 pb-2.5 pt-10 text-left text-xs tracking-wide text-white/90">
                {photo.caption}
              </span>
            </button>
          ))}
        </div>

        {current !== null && photos[current] && (
          <div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 p-4"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={photos[current].caption}
          >
            <div
              className="relative flex max-h-full flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 燈箱顯示完整未裁切原圖 */}
              <Image
                src={asset(`/photos/${photos[current].file}`)}
                alt={photos[current].caption}
                width={photos[current].w}
                height={photos[current].h}
                className="max-h-[80vh] w-auto rounded-lg"
              />
              <p className="mt-4 font-serif text-sm tracking-wide text-white/90">
                {photos[current].caption}
                <span className="ml-3 text-xs text-white/40">
                  {current + 1} / {photos.length}
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
              className="absolute left-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-2xl text-white/80 transition-colors hover:border-accent hover:text-accent"
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
              className="absolute right-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-2xl text-white/80 transition-colors hover:border-accent hover:text-accent"
            >
              ›
            </button>
            <button
              type="button"
              onClick={close}
              aria-label="關閉"
              className="absolute right-3 top-3 flex size-11 items-center justify-center rounded-full border border-white/20 text-lg text-white/80 transition-colors hover:border-accent hover:text-accent"
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
