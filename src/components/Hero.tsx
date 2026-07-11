import Image from "next/image";

import { heroPhoto, profile } from "@/data/profile";
import { asset } from "@/lib/site";
import { LineIcon } from "./Nav";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* 背景氛圍:極淡的金色光暈 */}
      <div className="pointer-events-none absolute -top-32 right-[-10%] size-[28rem] rounded-full bg-gold/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pt-14 pb-20 md:grid-cols-[1.1fr_0.9fr] md:pt-20">
        {/* 文字(手機版照片在上) */}
        <div className="order-2 md:order-1">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
            {profile.eyebrow}
          </p>

          <h1 className="mt-5 font-serif text-6xl font-black leading-none tracking-wide md:text-7xl">
            {profile.stageName}
            <span className="mt-3 block font-serif text-xl font-medium italic tracking-[0.3em] text-gold md:text-2xl">
              {profile.englishName}
            </span>
          </h1>

          <p className="mt-4 text-sm text-muted">
            {profile.fullName}
            <span className="mx-2 text-hairline">|</span>
            {profile.traits.join("・")}
          </p>

          {/* 濃縮自介(ADR-005:獨立自介區已整合) */}
          <div className="mt-6 max-w-lg space-y-2 leading-relaxed text-ink/90">
            {profile.intro.map((line) => (
              <p key={line.slice(0, 8)}>{line}</p>
            ))}
          </div>

          {/* 數據列:細線分隔 */}
          <dl className="mt-8 flex max-w-md divide-x divide-hairline border-y border-hairline">
            {profile.stats.map((s) => (
              <div key={s.label} className="flex-1 px-4 py-4 text-center first:pl-0 md:text-left">
                <dt className="text-[11px] uppercase tracking-[0.2em] text-muted">
                  {s.label}
                </dt>
                <dd className="mt-1.5 font-serif text-lg font-semibold text-gold">
                  {s.value}
                  {s.unit && <span className="ml-0.5 text-xs text-muted">{s.unit}</span>}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href={profile.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 font-bold text-canvas transition-colors hover:bg-gold-strong"
            >
              <LineIcon className="size-5" />
              LINE 邀約
            </a>
            <a
              href="#gallery"
              className="inline-flex items-center rounded-full border border-hairline bg-surface px-7 py-3 font-medium text-ink transition-colors hover:border-gold hover:text-gold"
            >
              查看作品
            </a>
          </div>
        </div>

        {/* 形象照 */}
        <div className="order-1 flex justify-center md:order-2 md:justify-end">
          <div className="relative w-64 sm:w-72 md:w-80">
            <div className="absolute -inset-3 rounded-[1.75rem] border border-gold/30" />
            <Image
              src={asset(`/photos/${heroPhoto.file}`)}
              alt={`${profile.stageName} 形象照 — ${heroPhoto.caption}`}
              width={heroPhoto.w}
              height={heroPhoto.h}
              priority
              className="relative rounded-3xl object-cover shadow-2xl"
            />
            <span className="absolute bottom-4 left-4 rounded-full bg-overlay px-3.5 py-1.5 text-xs tracking-wide text-ink backdrop-blur-sm">
              {heroPhoto.caption}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
