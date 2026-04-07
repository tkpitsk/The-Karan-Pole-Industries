import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import LocationSection from "@/components/home/LocationSection";
import WhyKPISection from "@/components/home/WhyKPISection";
import ProductsSection from "@/components/home/ProductsSection";

export default function HomePage() {
  return (
    <main className="bg-muted">
      <HeroSection />
      <AboutSection />
      {/* <ProductsSection /> */}
      <WhyKPISection />
      <LocationSection />
      {/* ProductsSection */}
      {/* WhyKPISection */}
      {/* CTASection */}
    </main>
  );
}
