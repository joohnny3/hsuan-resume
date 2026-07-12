import { profile } from "@/data/profile";
import { InstagramIcon, LineIcon, MailIcon } from "./Nav";

const quickLinks = [
  ["#brands", "合作品牌"],
  ["#gallery", "活動照片"],
] as const;

export default function Footer() {
  const igUrl = `https://www.instagram.com/${profile.instagram}`;

  return (
    <footer
      id="contact"
      className="scroll-mt-20 border-t border-hairline bg-canvas-deep"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:grid-cols-2 md:grid-cols-3">
        {/* 品牌 */}
        <div>
          <p className="font-serif text-2xl font-bold tracking-wide">
            {profile.stageName}
            <span className="ml-2 text-lg font-medium italic text-muted">
              {profile.englishName}
            </span>
          </p>
          <p className="mt-3 text-sm text-muted">{profile.eyebrow}</p>
          <p className="mt-1 text-sm text-muted-2">
            {profile.tagline}・專櫃美妝・快閃派樣・典禮接待
          </p>
        </div>

        {/* 聯絡資訊 */}
        <div>
          <h3 className="text-sm font-bold tracking-wide text-ink">聯絡資訊</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li>
              <a
                href={profile.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 transition-colors hover:text-accent"
              >
                <LineIcon className="size-4 shrink-0" />
                LINE　{profile.lineId}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2.5 transition-colors hover:text-accent"
              >
                <MailIcon className="size-4 shrink-0" />
                {profile.email}
              </a>
            </li>
            {profile.instagram && (
              <li>
                <a
                  href={igUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-accent"
                >
                  <InstagramIcon className="size-4 shrink-0" />
                  Instagram
                </a>
              </li>
            )}
          </ul>
        </div>

        {/* 快速連結 */}
        <div>
          <h3 className="text-sm font-bold tracking-wide text-ink">快速連結</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            {quickLinks.map(([href, label]) => (
              <li key={href}>
                <a href={href} className="transition-colors hover:text-accent">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 底部 copyright */}
      <div className="border-t border-hairline">
        <div className="mx-auto max-w-6xl px-5 py-6">
          <p className="text-xs text-muted-2">
            Copyright © 2026 Chang Yu Cheng. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
