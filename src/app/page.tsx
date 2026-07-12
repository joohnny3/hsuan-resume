import BrandWall from "@/components/BrandWall";
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
        <Gallery />
      </main>
      <Footer />
    </>
  );
}
