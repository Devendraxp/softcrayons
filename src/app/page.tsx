import { CoursesSection } from "@/components/CoursesSection";
import { CTASection } from "@/components/CTASection";
import { FaqSection } from "@/components/FaqSection";
import { HeroSection } from "@/components/HeroSection";
import { KnowledgeHub } from "@/components/KnowledgeHub";
import { LearningPathway } from "@/components/LearningPathway";
import { MeetYourMentors } from "@/components/MeetYourMentors";
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
        <LearningPathway />
        <CoursesSection />
        <MeetYourMentors />
        <WhyChooseUs />
        <PlacementsMarquee />
        <KnowledgeHub />
        <TestimonialsSection />
        <FaqSection />
        <CTASection />
      </main>
    </div>
  );
}
