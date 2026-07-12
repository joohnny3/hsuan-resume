import BrandWall from "@/components/BrandWall";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <BrandWall />
        <Experience />
        <Gallery />
      </main>
      <Footer />
    </>
  );
}
