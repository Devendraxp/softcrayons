import { CoursesSection } from "@/components/CoursesSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";
import { PartnersSection } from "@/components/PartnersSection";
import { PlacementsMarquee } from "@/components/PlacementsMarquee";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { TrustSection } from "@/components/TrustSection";
import { WhyChooseUs } from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">

      <main>
        <HeroSection />
        <TrustSection />
        <CoursesSection />
        <WhyChooseUs />
        <PlacementsMarquee />
        <TestimonialsSection />
        <PartnersSection />
        <CTASection />
      </main>
    </div>
  );
}
