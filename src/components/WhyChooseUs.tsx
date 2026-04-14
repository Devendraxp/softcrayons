import Link from "next/link";
import { ArrowRight, Phone, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const highlights = [
  "100% Placement Assistance",
  "15+ Years Industry Expert Trainers",
  "Hands-On Projects & Real-World Use Cases",
  "AI-Personalized Learning Paths",
  "40+ Industry-Relevant Courses",
  "Global Certifications",
];

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-muted/35 overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-10 items-center max-w-6xl mx-auto">
          <div className="relative flex items-center justify-center animate-fade-up min-h-[320px] sm:min-h-[420px]">
            <img
                src="https://img.freepik.com/free-photo/young-girl-with-book-isolated-white-background_93675-131667.jpg"
                alt="Softcrayons learner"
                className="w-[78%] max-w-[360px] sm:max-w-[430px] h-auto object-contain"
              />
          </div>

          <div className="animate-fade-up" style={{ animationDelay: "0.12s" }}>

            <h2 className="text-4xl sm:text-5xl font-black leading-tight mb-5">
              Why Choose <span className="text-gradient">Softcrayons</span>
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-xl">
              Softcrayons delivers practical, career-focused training with mentorship, live projects, and deep placement support so learners become job-ready with confidence.
            </p>

            <ul className="mb-9 space-y-5 list-none p-0">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-4 text-foreground">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500 text-white shadow-[0_4px_12px_rgba(249,115,22,0.35)]">
                    <ChevronRight className="h-5 w-5" />
                  </span>
                  <span className="text-lg sm:text-[1.1rem] font-semibold leading-tight">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
