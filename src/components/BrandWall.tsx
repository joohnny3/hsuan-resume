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
        {/* 品牌連結牆:點擊於新分頁開啟官方網站(來源 taiwan-brand-official-links.md) */}
        <ul className="grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-3 lg:grid-cols-4">
          {brands.map(({ name, url }) => (
            <li key={name}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-serif text-base tracking-wide text-muted transition-colors hover:text-accent md:text-lg"
              >
                {name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
