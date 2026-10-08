import type { Metadata, Viewport } from "next";
import { Noto_Serif, Noto_Serif_TC, Shippori_Mincho } from "next/font/google";

import { profile } from "@/data/profile";
import { SITE_ORIGIN, SITE_URL } from "@/lib/site";

import "./globals.css";

// 拉丁襯線:思源宋的同源拉丁(Noto Serif),與中文思源宋筆形、基線對齊(ADR-009)
const serifLatin = Noto_Serif({
  variable: "--font-serif-latin",
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

// 中文襯線:思源宋體;內文改襯線後需 400 regular
const serifTC = Noto_Serif_TC({
  variable: "--font-serif-tc",
  weight: ["400", "600", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

// 首屏姓名專用:Shippori Mincho(築地體系的古典明體,ADR-009 例外)。日系字型,
// 已用 cmap 確認含「張庭瑄」三字。只取中文字,英文由 Noto Serif 負責,
// 故不 preload 用不到的 latin 子集;中文切片仍依 unicode-range 按需載入
const minchoName = Shippori_Mincho({
  variable: "--font-mincho-name",
  weight: "600",
  preload: false,
  display: "swap",
});

const title = `${profile.stageName} ${profile.englishName}｜展場模特兒`;
const description =
  "瑄瑄 HSUAN——展場 SG/PG、專櫃美妝、快閃派樣、典禮接待。30+ 場活動經驗，165cm，歡迎透過 LINE 邀約。";

export const metadata: Metadata = {
  // 只放 origin:opengraph-image 檔案慣例產生的路徑已含 basePath,放完整網址會重複
  metadataBase: new URL(SITE_ORIGIN),
  title,
  description,
  openGraph: {
    title,
    description,
    url: SITE_URL,
    siteName: title,
    locale: "zh_TW",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0a0b",
};

/** 防 FOUC:hydration 前先從 localStorage 套用主題(預設深色,ADR-004)。 */
const themeInit = `(function(){try{var t=localStorage.getItem("theme");document.documentElement.dataset.theme=(t==="light"||t==="dark")?t:"dark";}catch(e){document.documentElement.dataset.theme="dark";}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-Hant-TW"
      data-theme="dark"
      suppressHydrationWarning
      className={`${serifLatin.variable} ${serifTC.variable} ${minchoName.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
