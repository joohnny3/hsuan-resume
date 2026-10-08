import { experiences } from "@/data/profile";
import SectionTitle from "./SectionTitle";

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 border-t border-hairline">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <SectionTitle title="活動經歷" />
        {/* 桌機雙欄:先左欄由上往下、再右欄(column-first);每項不跨欄斷開 */}
        <ul className="columns-1 gap-x-12 sm:columns-2">
          {experiences.map((item) => (
            <li
              key={item}
              className="mb-3.5 flex break-inside-avoid gap-3 font-serif text-sm leading-relaxed text-muted md:text-base"
            >
              <span
                aria-hidden
                className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-accent"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
