import { profile } from "@/data/profile";
import { InstagramIcon, LineIcon, MailIcon } from "./Nav";

export default function Footer() {
  const igUrl = `https://www.instagram.com/${profile.instagram}`;

  return (
    <footer
      id="contact"
      className="scroll-mt-20 border-t border-hairline bg-canvas-deep"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between">
        {/* 聯絡資訊(橫向) */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5 text-sm text-muted">
          <a
            href={profile.lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition-colors hover:text-accent"
          >
            <LineIcon className="size-4 shrink-0" />
            LINE　{profile.lineId}
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 transition-colors hover:text-accent"
          >
            <MailIcon className="size-4 shrink-0" />
            {profile.email}
          </a>
          {profile.instagram && (
            <a
              href={igUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-accent"
            >
              <InstagramIcon className="size-4 shrink-0" />
              Instagram
            </a>
          )}
        </div>

        {/* copyright */}
        <p className="text-xs text-muted-2">
          Copyright © 2026 Chang Yu Cheng. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
