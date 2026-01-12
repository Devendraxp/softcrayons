"use client";
import { ArrowRight, ArrowLeft, Clock, BarChart, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const courses = [
    {
        title: 'Full Stack Web Development',
        description:
            'Master React, Node.js, and MongoDB to build production-ready applications from scratch.',
        tags: ['React', 'Node.js', 'MongoDB'],
        duration: '16 weeks',
        level: 'Beginner',
        featured: true,
        isTrending: true,
        image:
            'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&auto=format&fit=crop&q=80',
    },
    {
        title: 'Python & Machine Learning',
        description:
            'Learn Python fundamentals and dive deep into machine learning algorithms and frameworks.',
        tags: ['Python', 'TensorFlow', 'NumPy'],
        duration: '12 weeks',
        level: 'Intermediate',
        featured: false,
        isTrending: false,
        image:
            'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&auto=format&fit=crop&q=80',
    },
    {
        title: 'DevOps & Cloud Engineering',
        description:
            'Deploy, scale, and manage applications on AWS with modern DevOps practices.',
        tags: ['AWS', 'Docker', 'Kubernetes'],
        duration: '10 weeks',
        level: 'Advanced',
        featured: false,
        isTrending: true,
        image:
            'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&auto=format&fit=crop&q=80',
    },
    {
        title: 'Mobile App Development',
        description:
            'Build cross-platform mobile applications with React Native for iOS and Android.',
        tags: ['React Native', 'TypeScript', 'Firebase'],
        duration: '14 weeks',
        level: 'Intermediate',
        featured: false,
        isTrending: false,
        image:
            'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&auto=format&fit=crop&q=80',
    },
    {
        title: 'Backend Engineering',
        description:
            'Deep dive into system design, databases, and building scalable backend systems.',
        tags: ['System Design', 'PostgreSQL', 'Redis'],
        duration: '12 weeks',
        level: 'Advanced',
        featured: false,
        isTrending: false,
        image:
            'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80',
    },
    {
        title: 'Frontend Mastery',
        description:
            'Advanced React patterns, performance optimization, and modern CSS techniques.',
        tags: ['React', 'Next.js', 'Tailwind'],
        duration: '10 weeks',
        level: 'Intermediate',
        featured: false,
        isTrending: false,
        image:
            'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&auto=format&fit=crop&q=80',
    },
];

export function CoursesSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Get trending course (first one with isTrending: true)
    const trendingCourse = courses.find((course) => course.isTrending);

    // Filter out trending course from carousel
    const carouselCourses = courses.filter((course) => course !== trendingCourse);

    const totalSlides = Math.ceil(carouselCourses.length / 3);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, [totalSlides]);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    // Auto-slide functionality
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            nextSlide();
        }, 4000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, nextSlide]);

    return (
        <section id="courses" className="py-24">
            <div className="container">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                        Our Courses
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
                        Industry-Ready <span className="text-gradient">Curriculum</span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Hands-on courses designed by industry experts to get you job-ready in
                        weeks, not years.
                    </p>
                </div>

                {/* Trending Course */}
                {trendingCourse && (
                    <div className="mb-16">
                        <div className="flex items-center gap-2 mb-6">
                            <TrendingUp className="w-5 h-5 text-primary" />
                            <span className="text-lg font-bold text-primary">Trending</span>
                        </div>
                        <div className="relative overflow-hidden rounded-3xl bg-card border border-border">
                            <div className="grid md:grid-cols-2 gap-0">
                                {/* Image Side */}
                                <div className="relative h-64 md:h-auto overflow-hidden">
                                    <img
                                        src={trendingCourse.image}
                                        alt={trendingCourse.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/80 md:block hidden" />
                                    <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-orange text-primary-foreground text-xs font-bold rounded-full flex items-center gap-1">
                                        <TrendingUp className="w-3 h-3" />
                                        Trending Now
                                    </div>
                                </div>

                                {/* Content Side */}
                                <div className="p-8 flex flex-col justify-center">
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                                        <span className="flex items-center gap-1.5">
                                            <Clock className="w-4 h-4" />
                                            {trendingCourse.duration}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <BarChart className="w-4 h-4" />
                                            {trendingCourse.level}
                                        </span>
                                    </div>

                                    <h3 className="text-2xl md:text-3xl font-bold mb-4">
                                        {trendingCourse.title}
                                    </h3>

                                    <p className="text-muted-foreground mb-6">
                                        {trendingCourse.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {trendingCourse.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 rounded-md bg-primary/10 text-primary text-xs font-mono font-medium"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <Link href="/courses/1">
                                        <Button className="w-fit group/btn">
                                            Explore Course
                                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Carousel Section */}
                <div
                    className="relative"
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                >
                    {/* Carousel Track */}
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {/* Slides */}
                            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                                <div
                                    key={slideIndex}
                                    className="w-full flex-shrink-0 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 px-1"
                                >
                                    {carouselCourses
                                        .slice(slideIndex * 3, slideIndex * 3 + 3)
                                        .map((course) => (
                                            <div
                                                key={course.title}
                                                className="bg-card border border-border rounded-2xl overflow-hidden"
                                            >
                                                {/* Course Image */}
                                                <div className="relative h-48 overflow-hidden">
                                                    <img
                                                        src={course.image}
                                                        alt={course.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                                                    {course.featured && (
                                                        <div className="absolute top-3 right-3 px-3 py-1 bg-gradient-orange text-primary-foreground text-xs font-bold rounded-full">
                                                            Most Popular
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Course Content */}
                                                <div className="p-6">
                                                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                                        <span className="flex items-center gap-1.5">
                                                            <Clock className="w-4 h-4" />
                                                            {course.duration}
                                                        </span>
                                                        <span className="flex items-center gap-1.5">
                                                            <BarChart className="w-4 h-4" />
                                                            {course.level}
                                                        </span>
                                                    </div>

                                                    <h3 className="text-xl font-bold mb-3">
                                                        {course.title}
                                                    </h3>

                                                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                                                        {course.description}
                                                    </p>

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

                                                    <Link href="/courses/1">
                                                        <Button variant="outline" className="w-full group/btn">
                                                        View Course
                                                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                                    </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Carousel Controls */}
                    <div className="flex items-center justify-center gap-4 mt-10">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={prevSlide}
                            className="rounded-full"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Button>

                        {/* Dots Indicator */}
                        <div className="flex items-center gap-2">
                            {Array.from({ length: totalSlides }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        index === currentIndex
                                            ? 'w-8 bg-primary'
                                            : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                                    }`}
                                />
                            ))}
                        </div>

                        <Button
                            variant="outline"
                            size="icon"
                            onClick={nextSlide}
                            className="rounded-full"
                        >
                            <ArrowRight className="w-5 h-5" />
                        </Button>
                    </div>
                </div>

                {/* View All Button */}
                <div className="text-center mt-12">
                    <Link href="/courses">
                        <Button variant="outline" size="lg">
                            View All Courses
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
