import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageCircle, BookOpen, Clock, Award, Code, GraduationCap } from "lucide-react";

// Updated FAQ Data Structure (Array of objects with flatten structure)
const faqs = [
    {
        question: "What courses does SoftCrayons offer?",
        answer: "We offer a wide range of IT courses including Full Stack Development (Java, Python, MERN), Data Science, Cloud Computing (AWS, Azure), DevOps, Digital Marketing, and more. All our courses are designed to meet current industry standards.",
        category: "Courses & Training"
    },
    {
        question: "Do you provide placement assistance?",
        answer: "Yes, we provide 100% placement assistance. We have a dedicated placement cell that helps students with resume building, interview preparation, and connecting with our partner companies for job opportunities.",
        category: "Courses & Training"
    },
    {
        question: "Are the certifications recognized?",
        answer: "Absolutely. Our certifications are ISO certified and widely recognized in the industry. We also help prepare you for global certifications from vendors like Oracle, Microsoft, and AWS.",
        category: "Courses & Training"
    },
    {
        question: "What is the fee structure for the courses?",
        answer: "The fee varies depending on the course and duration. We offer competitive pricing and flexible installment options. Please contact our counselors or visit our center for detailed fee structures.",
        category: "Admission & Fees"
    },
    {
        question: "Can I take a demo class before joining?",
        answer: "Yes, we offer free demo classes for all our courses. This allows you to interact with our trainers and understand our teaching methodology before making a commitment.",
        category: "Admission & Fees"
    },
    {
        question: "Do you offer online classes?",
        answer: "Yes, we offer both classroom and online training options. Our online classes are live and interactive, ensuring you get the same quality of education as our offline students.",
        category: "Admission & Fees"
    },
    {
        question: "Do I need a technical background to join?",
        answer: "Not necessarily. We have courses for beginners as well as experienced professionals. Our trainers start from the basics and gradually move to advanced concepts.",
        category: "Prerequisites & Timing"
    },
    {
        question: "What are the batch timings?",
        answer: "We have flexible batch timings including weekdays and weekends. Batches are available in the morning, afternoon, and evening to suit students and working professionals.",
        category: "Prerequisites & Timing"
    }
];

// Helper to group FAQs by category for display
const categories = Array.from(new Set(faqs.map(item => item.category)));

export default function FaqsPage() {
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
                        <div className="space-y-12">
                            {categories.map((category, index) => (
                                <div key={index} className="bg-muted/30 rounded-2xl p-6 md:p-8 border border-border/50 shadow-sm">
                                    <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-3">
                                        {category === "Courses & Training" && <BookOpen className="w-6 h-6 text-primary" />}
                                        {category === "Admission & Fees" && <Award className="w-6 h-6 text-primary" />}
                                        {category === "Prerequisites & Timing" && <Clock className="w-6 h-6 text-primary" />}
                                        {category}
                                    </h3>
                                    
                                    <Accordion type="single" collapsible className="w-full space-y-4">
                                        {faqs
                                            .filter(item => item.category === category)
                                            .map((item, itemIndex) => (
                                                <AccordionItem 
                                                    key={itemIndex} 
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
                            ))}
                        </div>
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
                                <button className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity shadow-lg shadow-primary/25">
                                   Ask to our support team
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}