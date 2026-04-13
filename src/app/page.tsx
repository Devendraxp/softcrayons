import { CoursesSection } from "@/components/CoursesSection";
import { CTASection } from "@/components/CTASection";
import { FaqSection } from "@/components/FaqSection";
import { HeroSection } from "@/components/HeroSection";
import { KnowledgeHub } from "@/components/KnowledgeHub";
import { LearningPathway } from "@/components/LearningPathway";
import AppleCardsCarouselDemo from "@/components/apple-cards-carousel-demo";
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
        <PlacementsMarquee />
        <CoursesSection />
        <LearningPathway />
        <WhyChooseUs />
        <PartnersSection />
        <KnowledgeHub />
        <TestimonialsSection />
        <AppleCardsCarouselDemo />
        <FaqSection />
        <CTASection />
      </main>
    </div>
  );
}
