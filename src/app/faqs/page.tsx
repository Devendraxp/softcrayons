"use client";

import { useState, useEffect } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageCircle, BookOpen, Clock, Award, HelpCircle, Loader2 } from "lucide-react";
import Link from "next/link";

interface Faq {
    id: number;
    question: string;
    answer: string;
    category: {
        id: number;
        title: string;
        slug: string;
    };
}

interface FaqCategory {
    id: number;
    title: string;
    slug: string;
    _count?: {
        faqs: number;
    };
}

const categoryIcons: Record<string, typeof BookOpen> = {
    "courses-training": BookOpen,
    "admission-fees": Award,
    "prerequisites-timing": Clock,
};

export default function FaqsPage() {
    const [faqs, setFaqs] = useState<Faq[]>([]);
    const [categories, setCategories] = useState<FaqCategory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch FAQs and categories in parallel
                const [faqsRes, categoriesRes] = await Promise.all([
                    fetch('/api/faqs?limit=100'),
                    fetch('/api/faq-categories')
                ]);

                if (faqsRes.ok) {
                    const faqsData = await faqsRes.json();
                    if (faqsData.success) {
                        setFaqs(faqsData.data);
                    }
                }

                if (categoriesRes.ok) {
                    const categoriesData = await categoriesRes.json();
                    if (categoriesData.success) {
                        setCategories(categoriesData.data);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch FAQs:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    // Group FAQs by category
    const faqsByCategory = faqs.reduce((acc, faq) => {
        const categoryTitle = faq.category.title;
        if (!acc[categoryTitle]) {
            acc[categoryTitle] = [];
        }
        acc[categoryTitle].push(faq);
        return acc;
    }, {} as Record<string, Faq[]>);

    const categoryTitles = Object.keys(faqsByCategory);

    if (loading) {
        return (
            <div className="min-h-screen bg-background pt-24 pb-16">
                <div className="container">
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        <span className="ml-3 text-muted-foreground">Loading FAQs...</span>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-background">
            <main>
                {/* Hero Section with Background Effect */}
                <section className="relative pt-32 pb-20 overflow-hidden isolate">
                    {/* Background Pattern - Subtle Grid */}
                    <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

                    {/* Blurry Light Effects - Primary Color Only */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] -z-10 pointer-events-none">
                        {/* Large diffuse glow from top center */}
                        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 rounded-full blur-[120px]"></div>
                        
                        {/* Slightly more concentrated glow behind the heading */}
                        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[100px]"></div>
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-4xl mx-auto text-center relative">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 tracking-tight">
                                Frequently Asked <span className="text-gradient">Questions</span>
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
                                Find answers to common questions about our courses, training methodology, 
                                placements, and more. Can't find what you're looking for? Contact us directly.
                            </p>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="pb-20">
                    <div className="container mx-auto px-4 max-w-4xl">
                        {categoryTitles.length === 0 ? (
                            <div className="text-center py-16 bg-card border border-border rounded-2xl">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                                    <HelpCircle className="w-8 h-8 text-muted-foreground" />
                                </div>
                                <p className="text-muted-foreground text-lg mb-2">
                                    No FAQs available yet
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Check back later for updates
                                </p>
                            </div>
                        ) : (
                        <div className="space-y-12">
                            {categoryTitles.map((category, index) => {
                                const IconComponent = categoryIcons[category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '')] || HelpCircle;
                                return (
                                <div key={index} className="bg-muted/30 rounded-2xl p-6 md:p-8 border border-border/50 shadow-sm">
                                    <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-3">
                                        <IconComponent className="w-6 h-6 text-primary" />
                                        {category}
                                    </h3>
                                    
                                    <Accordion type="single" collapsible className="w-full space-y-4">
                                        {faqsByCategory[category].map((item, itemIndex) => (
                                                <AccordionItem 
                                                    key={item.id} 
                                                    value={`item-${index}-${itemIndex}`}
                                                    className="bg-background border rounded-xl px-4 shadow-sm"
                                                >
                                                    <AccordionTrigger className="text-left font-medium hover:text-primary transition-colors py-4">
                                                        {item.question}
                                                    </AccordionTrigger>
                                                    <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                                                        {item.answer}
                                                    </AccordionContent>
                                                </AccordionItem>
                                            ))
                                        }
                                    </Accordion>
                                </div>
                            )})}
                        </div>
                        )}
                    </div>
                </section>

                {/* Contact CTA Section */}
                <section className="py-20 bg-muted/30 relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent)]"></div>
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center">
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                                <MessageCircle className="w-8 h-8 text-primary" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                                Still have questions?
                            </h2>
                            <p className="text-muted-foreground mb-8 text-lg">
                                We're here to help! Reach out to our support team and we'll get back to you as soon as possible.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link 
                                    href="/query"
                                    className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
                                >
                                   Ask our support team
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}