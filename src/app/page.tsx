import { CoursesSection } from "@/components/CoursesSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";
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
        <TestimonialsSection />
        <CTASection />
      </main>
    </div>
  );
}
