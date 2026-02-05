import { Clock, BarChart, BookOpen, IndianRupee, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Course {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    about: string | null;
    fees: number | null;
    discount: number | null;
    duration: string | null;
    difficulty: string;
    topics: string[] | null;
    bannerImage: string | null;
    thumbnailImage: string | null;
    metaTitle: string | null;
    metaDescription: string | null;
    category: {
        id: number;
        title: string;
        slug: string;
    };
}

interface RelatedCourse {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    thumbnailImage: string | null;
    duration: string | null;
    difficulty: string;
    fees: number | null;
    discount: number | null;
}

async function getCourse(slug: string): Promise<{ course: Course | null; relatedCourses: RelatedCourse[] }> {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
        const response = await fetch(`${baseUrl}/api/courses/${slug}`, {
            cache: 'no-store',
        });
        
        if (!response.ok) {
            return { course: null, relatedCourses: [] };
        }
        
        const data = await response.json();
        if (data.success) {
            return { course: data.data, relatedCourses: data.relatedCourses || [] };
        }
        return { course: null, relatedCourses: [] };
    } catch (error) {
        console.error('Failed to fetch course:', error);
        return { course: null, relatedCourses: [] };
    }
}

const levelColors: Record<string, string> = {
    BEGINNER: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
    INTERMEDIATE: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
    ADVANCED: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
};

function formatDifficulty(difficulty: string): string {
    return difficulty.charAt(0) + difficulty.slice(1).toLowerCase();
}

function formatPrice(fees: number | null, discount: number | null): string {
    if (!fees) return "Free";
    const discountedPrice = discount ? fees - (fees * discount / 100) : fees;
    return `₹${discountedPrice.toLocaleString('en-IN')}`;
}

// Function to render HTML content safely
function renderContent(content: string | null) {
    if (!content) return null;
    
    // Check if content looks like HTML
    if (content.includes('<') && content.includes('>')) {
        return (
            <div 
                className="course-content"
                dangerouslySetInnerHTML={{ __html: content }}
            />
        );
    }
    
    // Otherwise, render as markdown-like content
    return (
        <div className="course-content">
            {content.split("\n").map((line, index) => {
                if (line.startsWith("## ")) {
                    return (
                        <h2 key={index} className="text-xl font-bold mt-6 mb-4">
                            {line.replace("## ", "")}
                        </h2>
                    );
                } else if (line.startsWith("### ")) {
                    return (
                        <h3 key={index} className="text-lg font-semibold mt-5 mb-3">
                            {line.replace("### ", "")}
                        </h3>
                    );
                } else if (line.startsWith("- **")) {
                    const match = line.match(/- \*\*(.+?)\*\*: (.+)/);
                    if (match) {
                        return (
                            <div key={index} className="flex items-start gap-3 mb-2">
                                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                <p className="text-muted-foreground">
                                    <span className="font-semibold text-foreground">
                                        {match[1]}
                                    </span>
                                    : {match[2]}
                                </p>
                            </div>
                        );
                    }
                } else if (line.startsWith("- ")) {
                    return (
                        <div key={index} className="flex items-start gap-3 mb-2">
                            <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                            <p className="text-muted-foreground">
                                {line.replace("- ", "")}
                            </p>
                        </div>
                    );
                } else if (line.match(/^\d+\. \*\*/)) {
                    const match = line.match(/^\d+\. \*\*(.+?)\*\*: (.+)/);
                    if (match) {
                        return (
                            <div key={index} className="flex items-start gap-3 mb-2 ml-4">
                                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">
                                    {line.match(/^\d+/)?.[0]}
                                </span>
                                <p className="text-muted-foreground">
                                    <span className="font-semibold text-foreground">
                                        {match[1]}
                                    </span>
                                    : {match[2]}
                                </p>
                            </div>
                        );
                    }
                } else if (line.trim() !== "") {
                    return (
                        <p key={index} className="text-muted-foreground mb-3">
                            {line}
                        </p>
                    );
                }
                return null;
            })}
        </div>
    );
}

export default async function CourseDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const { course, relatedCourses } = await getCourse(slug);

    if (!course) {
        notFound();
    }

    const topics = Array.isArray(course.topics) ? course.topics : [];

    return (
        <div className="min-h-screen bg-background pt-24 pb-16">
            <div className="container">
                {/* Back Button */}
                <Link
                    href="/courses"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Courses
                </Link>

                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Left Side - Course Content */}
                    <div className="flex-1">
                        {/* Category Badge */}
                        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                            {course.category.title}
                        </span>

                        {/* Title */}
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
                            {course.title}
                        </h1>

                        {/* Description */}
                        <p className="text-muted-foreground text-lg mb-8">
                            {course.description}
                        </p>

                        {/* About This Course */}
                        <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <BookOpen className="w-6 h-6 text-primary" />
                                About This Course
                            </h2>
                            {renderContent(course.about)}
                        </div>
                    </div>

                    {/* Right Side - Course Info Card */}
                    <div className="w-full lg:w-96 flex-shrink-0">
                        <div className="lg:sticky lg:top-24">
                            <div className="bg-card border border-border rounded-2xl overflow-hidden">
                                {/* Course Banner Image */}
                                <div className="relative h-40 sm:h-50">
                                    <img
                                        src={course.bannerImage || course.thumbnailImage || 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&auto=format&fit=crop&q=80'}
                                        alt={course.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Course Details */}
                                <div className="p-6">
                                    {/* Fees */}
                                    <div className="flex items-center justify-between mb-6">
                                        <span className="text-muted-foreground">Course Fees</span>
                                        <span className="text-3xl font-black text-primary flex items-center">
                                            {formatPrice(course.fees, course.discount)}
                                        </span>
                                    </div>

                                    {/* Info Grid */}
                                    <div className="space-y-4 mb-6">
                                        <div className="flex items-center justify-between py-3 border-b border-border">
                                            <span className="flex items-center gap-2 text-muted-foreground">
                                                <Clock className="w-4 h-4" />
                                                Duration
                                            </span>
                                            <span className="font-semibold">{course.duration || 'Self-paced'}</span>
                                        </div>
                                        <div className="flex items-center justify-between py-3 border-b border-border">
                                            <span className="flex items-center gap-2 text-muted-foreground">
                                                <BarChart className="w-4 h-4" />
                                                Difficulty
                                            </span>
                                            <span
                                                className={`px-3 py-1 text-xs font-bold rounded-full border ${levelColors[course.difficulty] || levelColors.BEGINNER}`}
                                            >
                                                {formatDifficulty(course.difficulty)}
                                            </span>
                                        </div>
                                        {topics.length > 0 && (
                                        <div className="py-3 border-b border-border">
                                            <span className="flex items-center gap-2 text-muted-foreground mb-3">
                                                <BookOpen className="w-4 h-4" />
                                                Topics Covered
                                            </span>
                                            <div className="flex flex-wrap gap-2">
                                                {topics.map((topic: string) => (
                                                    <span
                                                        key={topic}
                                                        className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-white"
                                                    >
                                                        {topic}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        )}
                                    </div>

                                    {/* Join Now Button */}
                                    <Link href="/query">
                                        <Button className="w-full" size="lg">
                                            Join Now
                                        </Button>
                                    </Link>

                                    {/* Additional Info */}
                                    <p className="text-center text-xs text-muted-foreground mt-4">
                                        30-day money-back guarantee
                                    </p>
                                </div>
                            </div>

                            {/* Help Card */}
                            <div className="bg-card border border-border rounded-2xl p-5 mt-4">
                                <h3 className="font-bold mb-2">Need Help?</h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Have questions about this course? We're here to help!
                                </p>
                                <Link href="/query">
                                    <Button variant="outline" className="w-full">
                                        Contact Us
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Courses */}
                {relatedCourses.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold mb-6">Related Courses</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedCourses.map((related) => (
                                <Link
                                    key={related.id}
                                    href={`/courses/${related.slug}`}
                                    className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-all"
                                >
                                    <div className="relative h-32 overflow-hidden">
                                        <img
                                            src={related.thumbnailImage || 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&auto=format&fit=crop&q=80'}
                                            alt={related.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-2">
                                            {related.title}
                                        </h3>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {related.duration || 'Self-paced'}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}