import Image from "next/image";

import { heroPhoto, profile } from "@/data/profile";
import { asset } from "@/lib/site";
import { LineIcon } from "./Nav";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* 背景柔光 */}
      <div className="pointer-events-none absolute -top-24 -left-24 size-80 rounded-full bg-rose-300/25 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -right-28 size-96 rounded-full bg-blush-300/40 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-4 pt-10 pb-16 grid gap-10 md:grid-cols-[1.05fr_0.95fr] md:items-center">
        {/* 照片（手機版在最上面） */}
        <div className="md:order-2 flex justify-center">
          <div className="relative w-64 sm:w-72 md:w-80">
            <div className="absolute inset-0 -rotate-3 rounded-[2rem] bg-blush-300/70" />
            <Image
              src={asset(`/photos/${heroPhoto.file}`)}
              alt={`${profile.stageName} 形象照 - ${heroPhoto.caption}`}
              width={heroPhoto.w}
              height={heroPhoto.h}
              priority
              className="relative rotate-2 rounded-[2rem] border-4 border-white shadow-xl"
            />
            <span className="absolute bottom-3 left-3 rotate-2 rounded-full bg-white/90 px-3 py-1 text-xs text-cocoa-600 shadow-sm">
              ✿ {heroPhoto.caption}
            </span>
          </div>
        </div>

        {/* 文字 */}
        <div className="md:order-1 text-center md:text-left">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-blush-300 bg-white px-4 py-1.5 text-sm text-rose-500 shadow-sm">
            <span className="size-2 rounded-full bg-line-green animate-pulse" />
            活動邀約開放中
          </span>

          <h1 className="mt-5 text-5xl md:text-6xl font-black tracking-wide text-cocoa-900">
            {profile.stageName}
            <span className="font-display text-2xl md:text-3xl text-rose-400 ml-3 align-middle">
              {profile.englishName}
            </span>
          </h1>
          <p className="mt-3 text-cocoa-600">
            {profile.fullName}｜{profile.tagline}
          </p>

          <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
            {profile.roles.map((role) => (
              <span
                key={role}
                className="rounded-full bg-blush-200 px-3 py-1 text-sm text-cocoa-800"
              >
                {role}
              </span>
            ))}
          </div>

          <dl className="mt-6 grid grid-cols-3 gap-3 max-w-sm mx-auto md:mx-0">
            {profile.stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-blush-200 bg-white px-3 py-3 text-center shadow-sm"
              >
                <dt className="text-xs text-cocoa-500">{s.label}</dt>
                <dd className="mt-1 font-display font-bold text-rose-500 text-lg leading-none">
                  {s.value}
                  {s.unit && (
                    <span className="text-xs text-cocoa-500 ml-0.5">{s.unit}</span>
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-7 flex flex-wrap justify-center md:justify-start gap-3">
            <a
              href={profile.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-line-green px-6 py-3 font-bold text-white shadow-md hover:opacity-90 transition-opacity"
            >
              <LineIcon className="size-5" />
              LINE 邀約
            </a>
            <a
              href="#gallery"
              className="inline-flex items-center rounded-full border-2 border-rose-300 bg-white px-6 py-3 font-bold text-rose-500 hover:bg-blush-100 transition-colors"
            >
              查看作品 ♡
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
