import { brands } from "@/data/profile";
import SectionTitle from "./SectionTitle";

export default function BrandWall() {
  return (
    <section id="brands" className="scroll-mt-20 border-t border-hairline">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <SectionTitle
          title="合作品牌"
          sub="參與 30+ 美妝、車展、科技品牌活動推廣經驗"
        />
        <ul className="grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-3 lg:grid-cols-4">
          {brands.map((name) => (
            <li
              key={name}
              className="border-l border-hairline pl-4 font-serif text-base tracking-wide text-muted transition-colors hover:border-accent hover:text-accent md:text-lg"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
