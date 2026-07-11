import { profile } from "@/data/profile";
import CopyButton from "./CopyButton";
import { LineIcon } from "./Nav";
import SectionTitle from "./SectionTitle";

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 mx-auto max-w-3xl px-4 py-14">
      <SectionTitle eyebrow="Contact" title="合作邀約" />
      <div className="rounded-[2rem] border border-blush-300 bg-gradient-to-br from-blush-200 via-blush-100 to-white p-8 md:p-10 text-center shadow-sm">
        <p className="text-cocoa-800 leading-relaxed">
          展場活動、專櫃檔期、快閃派樣、典禮接待——
          <br className="hidden md:block" />
          歡迎透過 LINE 洽詢檔期與細節，看到訊息會盡快回覆！
        </p>

        <div className="mt-6 inline-flex items-center gap-3 rounded-full bg-white px-5 py-2.5 shadow-sm">
          <span className="text-sm text-cocoa-500">LINE ID</span>
          <span className="font-display font-bold tracking-wider text-cocoa-900">
            {profile.lineId}
          </span>
          <CopyButton text={profile.lineId} />
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href={profile.lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-line-green px-7 py-3 font-bold text-white shadow-md hover:opacity-90 transition-opacity"
          >
            <LineIcon className="size-5" />
            加 LINE 聊聊
          </a>
          {profile.instagram && (
            <a
              href={`https://www.instagram.com/${profile.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-rose-300 bg-white px-7 py-3 font-bold text-rose-500 hover:bg-blush-100 transition-colors"
            >
              Instagram
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
