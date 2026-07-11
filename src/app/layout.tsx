import type { Metadata, Viewport } from "next";
import { Noto_Sans_TC, Noto_Serif_TC, Playfair_Display } from "next/font/google";

import { profile } from "@/data/profile";
import { SITE_ORIGIN, SITE_URL } from "@/lib/site";

import "./globals.css";

const noto = Noto_Sans_TC({
  variable: "--font-noto",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const serifTC = Noto_Serif_TC({
  variable: "--font-serif-tc",
  weight: ["600", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const title = `${profile.stageName} ${profile.englishName}｜展場活動 SG・PG 作品集`;
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
  themeColor: "#0e0d0b",
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
      className={`${noto.variable} ${serifTC.variable} ${playfair.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
