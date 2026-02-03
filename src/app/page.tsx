import FloatingNavbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <FloatingNavbar />
      <main>
        <HeroSection />
        {/* AboutSection */}
        {/* ProductsSection */}
        {/* WhyKPISection */}
        {/* CTASection */}
      </main>
      <Footer />
    </>
  );
}