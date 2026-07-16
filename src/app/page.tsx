import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustLayerSection } from "@/components/landing/TrustLayerSection";
import { CoverageSection } from "@/components/landing/CoverageSection";
import { BentoGrid } from "@/components/landing/BentoGrid";
import { InteractiveDemo } from "@/components/landing/InteractiveDemo";
import { TechStack } from "@/components/landing/TechStack";
import { WhyKokademia } from "@/components/landing/WhyKokademia";
import { Testimonials } from "@/components/landing/Testimonials";
import { PricingSection } from "@/components/PricingSection";
import { CinematicCTA } from "@/components/landing/CinematicCTA";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-ivory text-rich-black selection:bg-gold-muted landing-page overflow-x-hidden">
      <Navbar />
      <Hero />
      <TrustLayerSection />
      <CoverageSection />
      <BentoGrid />
      <InteractiveDemo />
      <TechStack />
      <WhyKokademia />
      <Testimonials />
      <PricingSection />
      <CinematicCTA />
      <Footer />
    </main>
  );
}
