import type { Metadata, Viewport } from "next";
import { Noto_Sans_TC, Quicksand } from "next/font/google";

import { profile } from "@/data/profile";
import { SITE_ORIGIN, SITE_URL } from "@/lib/site";

import "./globals.css";

const noto = Noto_Sans_TC({
  variable: "--font-noto",
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const title = `${profile.stageName} ${profile.englishName}｜展場活動 SG・PG 作品集`;
const description =
  "哈囉，我是瑄瑄！展場 SG/PG、專櫃美妝、快閃派樣、典禮接待。165cm，活潑親切愛笑，歡迎活動邀約（LINE 洽詢）。";

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
  themeColor: "#fff3f5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-Hant-TW"
      className={`${noto.variable} ${quicksand.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
