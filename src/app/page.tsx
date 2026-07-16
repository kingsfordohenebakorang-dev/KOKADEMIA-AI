import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeaturesSection } from "@/components/FeaturesSection";
import { PricingSection } from "@/components/PricingSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#08080c] text-white selection:bg-indigo-500/20">
      <Navbar />
      <Hero />
      <FeaturesSection />
      <div id="pricing">
        <PricingSection />
      </div>

      {/* Footer */}
      <footer className="border-t border-white/[0.04] py-12 px-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-[11px] text-gray-700">© 2026 Kokademia. Built for serious students.</span>
          <div className="flex items-center gap-6 text-[11px] text-gray-700">
            <a href="#" className="hover:text-gray-500 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-500 transition-colors">Terms</a>
            <a href="mailto:support@kokademia.com" className="hover:text-gray-500 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
