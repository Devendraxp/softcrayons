"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, User, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface BlogCardProps {
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
}

export function BlogCard({ blog }: BlogCardProps) {
    return (
        <Link href={`/blogs/${blog.id}`}>
            <article className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 h-full flex flex-col">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                    <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute bottom-3 left-3">
                        <Badge
                            variant="secondary"
                            className="bg-background/90 text-foreground backdrop-blur-sm border border-border"
                        >
                            {blog.categoryName}
                        </Badge>
                    </div>

                    {/* Read Time */}
                    <div className="absolute bottom-3 right-3">
                        <span className="text-xs text-white/90 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {blog.readTime}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                        {blog.tags.slice(0, 2).map((tag) => (
                            <span
                                key={tag}
                                className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary font-medium"
                            >
                                {tag}
                            </span>
                        ))}
                        {blog.tags.length > 2 && (
                            <span className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground font-medium">
                                +{blog.tags.length - 2}
                            </span>
                        )}
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors flex-grow-0">
                        {blog.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-grow">
                        {blog.description}
                    </p>

                    {/* Author & Date */}
                    <div className="flex items-center gap-3 pt-4 border-t border-border mt-auto">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                            <User className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{blog.author}</p>
                            <p className="text-xs text-muted-foreground">{blog.date}</p>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
}