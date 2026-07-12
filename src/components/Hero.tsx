import Image from "next/image";

import { heroPhoto, profile } from "@/data/profile";
import { asset } from "@/lib/site";
import ContactLinks from "./ContactLinks";

type IconProps = { className?: string };
const svgBase = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/** 身高:上下箭頭量高 */
function HeightIcon({ className }: IconProps) {
  return (
    <svg {...svgBase} className={className}>
      <path d="M12 4v16" />
      <path d="M8.5 6.5 12 3l3.5 3.5" />
      <path d="M8.5 17.5 12 21l3.5-3.5" />
    </svg>
  );
}

/** 體重:量測儀表 */
function WeightIcon({ className }: IconProps) {
  return (
    <svg {...svgBase} className={className}>
      <circle cx="12" cy="13" r="8" />
      <path d="M12 5.5V7" />
      <path d="m12 13 3.5-3.5" />
    </svg>
  );
}

/** 三圍:量尺刻度 */
function MeasureIcon({ className }: IconProps) {
  return (
    <svg {...svgBase} className={className}>
      <rect x="3" y="9" width="18" height="6" rx="1.5" />
      <path d="M7.5 9v2.5M12 9v3M16.5 9v2.5" />
    </svg>
  );
}

const statIcons = [HeightIcon, WeightIcon, MeasureIcon];

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

          {/* 數據列:icon 方塊 + 標籤 + 數值(橫列,無單位) */}
          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-5">
            {profile.stats.map((s, i) => {
              const Icon = statIcons[i];
              return (
                <div key={s.label} className="flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-xl border border-hairline bg-surface-2 text-accent">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <dt className="text-[11px] tracking-[0.15em] text-muted">
                      {s.label}
                    </dt>
                    <dd className="font-serif text-lg font-semibold tabular-nums lining-nums text-accent">
                      {s.value}
                    </dd>
                  </div>
                </div>
              );
            })}
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
