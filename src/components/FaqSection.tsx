"use client";

import { useState, useEffect } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { SectionLoader } from "@/components/ui/loader";

interface Faq {
  id: number;
  question: string;
  answer: string;
  slug: string | null;
  category: {
    id: number;
    title: string;
    slug: string;
  };
}

function FaqItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: Faq;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-white/10 last:border-b-0">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-5 text-left group"
      >
        <span
          className={`text-base sm:text-lg font-semibold pr-4 transition-colors duration-300 ${
            isOpen
              ? "text-primary"
              : "text-white group-hover:text-primary/80"
          }`}
        >
          {faq.question}
        </span>
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? "bg-primary text-primary-foreground rotate-180"
              : "bg-white/10 text-white/60"
          }`}
        >
          <ChevronDown className="w-4 h-4" />
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100 pb-5" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-white/70 text-sm sm:text-base leading-relaxed pr-12">
          {faq.answer}
        </p>
      </div>
    </div>
  );
}

export function FaqSection() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<number | null>(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetch("/api/faqs?limit=5");
        const data = await response.json();
        if (data.success) {
          setFaqs(data.data);
          // Open the first FAQ by default
          if (data.data.length > 0) {
            setOpenId(data.data[0].id);
          }
        }
      } catch (error) {
        console.error("Failed to fetch FAQs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-gray-900 dark:bg-gray-950">
        <div className="container">
          <SectionLoader text="FAQs" />
        </div>
      </section>
    );
  }

  if (faqs.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-gray-900 dark:bg-gray-950 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
              Frequently Asked{" "}
              <span className="text-gradient">Questions</span>
            </h2>
          </div>

          {/* Accordion */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sm:p-8">
            {faqs.map((faq) => (
              <FaqItem
                key={faq.id}
                faq={faq}
                isOpen={openId === faq.id}
                onToggle={() =>
                  setOpenId(openId === faq.id ? null : faq.id)
                }
              />
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-10">
            <p className="text-white/50 text-sm">
              Still have questions?{" "}
              <a
                href="/query"
                className="text-primary hover:text-primary/80 font-semibold underline underline-offset-4 transition-colors"
              >
                Contact us
              </a>{" "}
              and we&apos;ll get back to you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
