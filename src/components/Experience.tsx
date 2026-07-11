import { experienceGroups, experienceNote } from "@/data/profile";
import SectionTitle from "./SectionTitle";

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 mx-auto max-w-5xl px-4 py-14">
      <SectionTitle
        eyebrow="Experience"
        title="活動經歷"
        sub="展場、專櫃到賣場——各種場合都有實戰經驗"
      />
      <div className="grid gap-5 md:grid-cols-3">
        {experienceGroups.map((group) => (
          <div
            key={group.title}
            className="rounded-3xl border border-blush-200 bg-white p-6 shadow-sm"
          >
            <h3 className="text-lg font-bold text-cocoa-900">{group.title}</h3>
            <p className="mt-1 text-xs text-cocoa-500">{group.blurb}</p>
            <ul className="mt-4">
              {group.items.map((item) => (
                <li
                  key={item.name}
                  className="flex items-baseline justify-between gap-3 border-b border-blush-100 py-2 text-sm last:border-0"
                >
                  <span className="text-cocoa-800">{item.name}</span>
                  {item.date && (
                    <span className="shrink-0 font-display text-xs text-rose-400">
                      {item.date}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-7 text-center text-sm text-cocoa-500">✿ {experienceNote}</p>
    </section>
  );
}
