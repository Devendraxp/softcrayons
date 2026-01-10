import { Clock, BarChart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Course {
    id: number;
    title: string;
    description: string;
    category: string;
    categoryName: string;
    duration: string;
    level: "Beginner" | "Intermediate" | "Advanced";
    tags: string[];
    image: string;
}

interface CourseCardProps {
    course: Course;
}

const levelColors = {
    Beginner: "bg-green-500/10 text-green-600 dark:text-green-400",
    Intermediate: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
    Advanced: "bg-red-500/10 text-red-600 dark:text-red-400",
};

export function CourseCard({ course }: CourseCardProps) {
    return (
        <div className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all duration-300">
            {/* Course Image */}
            <div className="relative h-44 overflow-hidden">
                <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                <div
                    className={`absolute top-3 right-3 px-3 py-1 text-xs font-bold rounded-full ${levelColors[course.level]}`}
                >
                    {course.level}
                </div>
            </div>

            {/* Course Content */}
            <div className="p-5">
                {/* Category Badge */}
                <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-3">
                    {course.categoryName}
                </span>

                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                    {course.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {course.description}
                </p>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {course.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <BarChart className="w-4 h-4" />
                        {course.level}
                    </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                    {course.tags.slice(0, 2).map((tag) => (
                        <span
                            key={tag}
                            className="px-2 py-1 rounded-md bg-muted text-xs font-mono font-medium"
                        >
                            {tag}
                        </span>
                    ))}
                    {course.tags.length > 2 && (
                        <span className="px-2 py-1 rounded-md bg-muted text-xs font-mono font-medium">
                            +{course.tags.length - 2}
                        </span>
                    )}
                </div>

                <Link href={`/courses/${course.id}`}>
                    <Button variant="outline" className="w-full group/btn">
                        View Details
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                </Link>
            </div>
        </div>
    );
}