import About from "@/components/About";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
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
        <About />
        <Experience />
        <Gallery />
        <Contact />
      </main>
      <footer className="border-t border-blush-200 py-8 text-center text-xs text-cocoa-500">
        © {new Date().getFullYear()} {profile.stageName} {profile.englishName}
        ｜{profile.tagline}｜Made with ♡
      </footer>
    </>
  );
}
