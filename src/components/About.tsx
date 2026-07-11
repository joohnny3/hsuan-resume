import { profile } from "@/data/profile";
import SectionTitle from "./SectionTitle";

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 mx-auto max-w-3xl px-4 py-14">
      <SectionTitle eyebrow="About Me" title="自我介紹" />
      <div className="rounded-3xl border border-blush-200 bg-white p-7 md:p-9 shadow-sm">
        {profile.intro.map((p) => (
          <p
            key={p.slice(0, 10)}
            className="text-cocoa-800 leading-loose not-first:mt-4"
          >
            {p}
          </p>
        ))}
        <div className="mt-6 flex flex-wrap gap-2">
          {profile.traits.map((t) => (
            <span
              key={t}
              className="rounded-full bg-blush-100 border border-blush-200 px-3 py-1 text-sm text-rose-600"
            >
              ♡ {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
