"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowRight, Bookmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface FeaturedBlogCardProps {
    blog: {
        id: number;
        title: string;
        description: string;
        image: string;
        tags: string[];
        category: string;
        categoryName: string;
        author: string;
        date: string;
        readTime: string;
    };
    variant?: "default" | "hero" | "horizontal";
}

export function FeaturedBlogCard({ blog, variant = "default" }: FeaturedBlogCardProps) {
    if (variant === "hero") {
        return (
            <Link href={`/blogs/${blog.id}`} className="block h-full">
                <article className="group relative bg-card border border-border rounded-3xl overflow-hidden hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 h-full min-h-[480px]">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <Image
                            src={blog.image}
                            alt={blog.title}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                    </div>

                    {/* Featured Badge */}
                    <div className="absolute top-4 left-4 z-10 flex gap-2">
                        <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 px-4 py-1.5">
                             Editor&apos;s Pick
                        </Badge>
                    </div>


                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                        <Badge
                            variant="secondary"
                            className="bg-white/10 text-white backdrop-blur-sm border-0 mb-4"
                        >
                            {blog.categoryName}
                        </Badge>

                        <h3 className="font-black text-2xl md:text-3xl lg:text-4xl text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                            {blog.title}
                        </h3>

                        <p className="text-white/80 text-base md:text-lg line-clamp-2 mb-6 max-w-xl">
                            {blog.description}
                        </p>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-white/70">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                        <User className="w-4 h-4" />
                                    </div>
                                    <span>{blog.author}</span>
                                </div>
                                <span>•</span>
                                <span>{blog.readTime}</span>
                            </div>
                            <div className="flex items-center gap-2 text-white font-medium opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                                <span>Read Article</span>
                                <ArrowRight className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                </article>
            </Link>
        );
    }

    if (variant === "horizontal") {
        return (
            <Link href={`/blogs/${blog.id}`}>
                <article className="group flex flex-col sm:flex-row bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 h-full">
                    {/* Image */}
                    <div className="relative w-full sm:w-48 md:w-56 h-48 sm:h-auto shrink-0 overflow-hidden">
                        <Image
                            src={blog.image}
                            alt={blog.title}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 sm:bg-gradient-to-t sm:from-black/40 sm:to-transparent" />
                        <div className="absolute top-3 left-3 sm:bottom-3 sm:top-auto">
                            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 text-xs">
                                Featured
                            </Badge>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-5 flex flex-col justify-between">
                        <div>
                            <Badge
                                variant="secondary"
                                className="bg-muted text-muted-foreground border-0 mb-3 text-xs"
                            >
                                {blog.categoryName}
                            </Badge>

                            <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                {blog.title}
                            </h3>

                            <p className="text-muted-foreground text-sm line-clamp-2">
                                {blog.description}
                            </p>
                        </div>

                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <span>{blog.author}</span>
                                <span>•</span>
                                <span>{blog.readTime}</span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </div>
                </article>
            </Link>
        );
    }

    // Default variant
    return (
        <Link href={`/blogs/${blog.id}`}>
            <article className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 h-full">
                {/* Featured Badge */}
                <div className="absolute top-3 right-3 z-10">
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
                        Featured
                    </Badge>
                </div>

                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                    <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                        <Badge
                            variant="secondary"
                            className="bg-background/90 text-foreground backdrop-blur-sm border border-border"
                        >
                            {blog.categoryName}
                        </Badge>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                        {blog.tags.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary font-medium"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-xl mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {blog.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                        {blog.description}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <User className="w-3.5 h-3.5" />
                                <span>{blog.author}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>{blog.date}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            <span>Read</span>
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
}