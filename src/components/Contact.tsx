import { profile } from "@/data/profile";
import CopyButton from "./CopyButton";
import { LineIcon } from "./Nav";
import SectionTitle from "./SectionTitle";

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-hairline">
      <div className="mx-auto max-w-3xl px-5 py-20">
        <SectionTitle eyebrow="Contact" title="合作邀約" />
        <div className="rounded-3xl border border-hairline bg-surface px-8 py-12 text-center md:px-12">
          <p className="leading-relaxed text-ink/90">
            展場活動、專櫃檔期、快閃派樣、典禮接待——
            <br className="hidden md:block" />
            歡迎透過 LINE 洽詢檔期與細節，看到訊息會盡快回覆。
          </p>

          <div className="mt-8 inline-flex items-center gap-4 border-y border-hairline px-6 py-3.5">
            <span className="text-[11px] uppercase tracking-[0.25em] text-muted">
              LINE ID
            </span>
            <span className="font-serif text-lg font-semibold tracking-widest text-accent">
              {profile.lineId}
            </span>
            <CopyButton text={profile.lineId} />
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={profile.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3 font-bold text-on-accent transition-colors hover:bg-accent-hover"
            >
              <LineIcon className="size-5" />
              加 LINE 聊聊
            </a>
            {profile.instagram && (
              <a
                href={`https://www.instagram.com/${profile.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-hairline px-8 py-3 font-medium text-ink transition-colors hover:border-accent hover:text-accent"
              >
                Instagram
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
