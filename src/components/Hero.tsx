import Image from "next/image";

import { heroPhoto, profile } from "@/data/profile";
import { asset } from "@/lib/site";
import ContactLinks from "./ContactLinks";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-canvas-deep">
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pt-14 pb-20 md:grid-cols-[1.1fr_0.9fr] md:pt-20">
        {/* 文字(手機版照片在上) */}
        <div className="order-2 md:order-1">
          {/* 職稱 */}
          <p className="text-xs font-semibold tracking-[0.28em] text-accent">
            {profile.eyebrow}
          </p>

          {/* 姓名 + 英文名 */}
          <h1 className="mt-4 font-serif text-5xl font-black leading-none tracking-wide md:text-6xl">
            {profile.fullName}
            <span className="ml-3 align-baseline text-2xl font-medium italic tracking-widest text-muted md:text-3xl">
              {profile.englishName}
            </span>
          </h1>

          {/* 自我介紹 */}
          <div className="mt-6 max-w-xl space-y-3 text-sm leading-relaxed text-muted md:text-[0.95rem]">
            {profile.intro.map((line) => (
              <p key={line.slice(0, 10)}>{line}</p>
            ))}
          </div>

          {/* 數據列:細線分隔 */}
          <dl className="mt-8 flex max-w-md divide-x divide-hairline border-y border-hairline">
            {profile.stats.map((s) => (
              <div key={s.label} className="flex-1 px-4 py-4 text-center first:pl-0 md:text-left">
                <dt className="text-[11px] uppercase tracking-[0.2em] text-muted">
                  {s.label}
                </dt>
                <dd className="mt-1.5 font-serif text-lg font-semibold tabular-nums lining-nums text-accent">
                  {s.value}
                  {s.unit && <span className="ml-0.5 text-xs text-muted">{s.unit}</span>}
                </dd>
              </div>
            ))}
          </dl>

          {/* 聯絡列(共用元件:順序 IG→LINE→信箱,與 footer 一致) */}
          <ContactLinks className="mt-8" />
        </div>

        {/* 形象照 */}
        <div className="order-1 flex justify-center md:order-2 md:justify-end">
          <div className="relative w-64 sm:w-72 md:w-80">
            <div className="absolute -inset-3 rounded-[1.75rem] border border-accent/30" />
            <Image
              src={asset(`/photos/${heroPhoto.file}`)}
              alt={`${profile.stageName} 形象照 — ${heroPhoto.caption}`}
              width={heroPhoto.w}
              height={heroPhoto.h}
              priority
              className="relative rounded-3xl object-cover shadow-2xl"
            />
            <span className="absolute bottom-4 left-4 rounded-full bg-overlay px-3.5 py-1.5 text-xs tracking-wide text-white/90 backdrop-blur-sm">
              {heroPhoto.caption}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
