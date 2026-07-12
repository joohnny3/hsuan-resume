import BrandWall from "@/components/BrandWall";
import Contact from "@/components/Contact";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import { profile } from "@/data/profile";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <BrandWall />
        <Gallery />
        <Contact />
      </main>
      <footer className="border-t border-hairline bg-canvas-deep py-10 text-center">
        <p className="font-serif text-sm tracking-[0.25em] text-muted">
          {profile.stageName}
          <span className="mx-2 italic text-accent">{profile.englishName}</span>
        </p>
        <p className="mt-2 text-xs text-muted-2">
          © {new Date().getFullYear()} {profile.tagline}・專櫃美妝・快閃派樣・典禮接待
        </p>
      </footer>
    </>
  );
}
