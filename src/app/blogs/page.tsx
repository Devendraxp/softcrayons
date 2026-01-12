"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BlogCard } from "@/components/blogs/BlogCard";
import { FeaturedBlogCard } from "@/components/blogs/FeaturedBlogCard";
import { BlogSidebar } from "@/components/blogs/BlogSidebar";
import { Search, TrendingUp, Sparkles } from "lucide-react";

const categories = [
    { id: "all", name: "All Blogs", count: 12 },
    { id: "web-development", name: "Web Development", count: 3 },
    { id: "mobile-development", name: "Mobile Development", count: 2 },
    { id: "data-science", name: "Data Science", count: 2 },
    { id: "design", name: "UI/UX Design", count: 2 },
    { id: "devops", name: "DevOps", count: 2 },
    { id: "career", name: "Career Tips", count: 1 },
];

export interface BlogData {
    id: number;
    title: string;
    description: string;
    image: string;
    content: string;
    tags: string[];
    category: string;
    author: string;
    date: string;
    readTime: string;
    featured?: boolean;
}

const blogs: BlogData[] = [
    {
        id: 1,
        title: "Getting Started with React 19: What's New and Exciting",
        description:
            "Explore the latest features in React 19 including the new compiler, server components, and improved performance optimizations.",
        image:
            "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80",
        content: `# Getting Started with React 19\n\nReact 19 brings exciting new features...`,
        tags: ["React", "JavaScript", "Frontend"],
        category: "web-development",
        author: "Devendra Kumar",
        date: "January 10, 2026",
        readTime: "8 min read",
        featured: true,
    },
    {
        id: 2,
        title: "Building Scalable APIs with Node.js and GraphQL",
        description:
            "Learn how to design and implement production-ready GraphQL APIs using Node.js, Apollo Server, and best practices.",
        image:
            "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80",
        content: `# Building Scalable APIs\n\nGraphQL has revolutionized how we build APIs...`,
        tags: ["Node.js", "GraphQL", "API"],
        category: "web-development",
        author: "Priya Sharma",
        date: "January 8, 2026",
        readTime: "12 min read",
        featured: true,
    },
    {
        id: 3,
        title: "Flutter vs React Native in 2026: Which One to Choose?",
        description:
            "A comprehensive comparison of Flutter and React Native for cross-platform mobile development in 2026.",
        image:
            "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=80",
        content: `# Flutter vs React Native\n\nChoosing the right framework...`,
        tags: ["Flutter", "React Native", "Mobile"],
        category: "mobile-development",
        author: "Rahul Verma",
        date: "January 5, 2026",
        readTime: "10 min read",
        featured: true,
    },
    {
        id: 4,
        title: "Machine Learning for Beginners: A Complete Roadmap",
        description:
            "Your complete guide to starting a career in machine learning, from basics to advanced concepts.",
        image:
            "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&fit=crop&q=80",
        content: `# Machine Learning Roadmap\n\nMachine learning is transforming industries...`,
        tags: ["ML", "Python", "AI"],
        category: "data-science",
        author: "Ankit Singh",
        date: "January 3, 2026",
        readTime: "15 min read",
        featured: true,
    },
    {
        id: 5,
        title: "Design Systems: Building Consistent UI at Scale",
        description:
            "Learn how to create and maintain a design system that scales with your organization.",
        image:
            "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop&q=80",
        content: `# Design Systems\n\nA design system is more than just a component library...`,
        tags: ["Design", "UI/UX", "Figma"],
        category: "design",
        author: "Neha Gupta",
        date: "December 28, 2025",
        readTime: "9 min read",
        featured: true,
    },
    {
        id: 6,
        title: "Kubernetes Best Practices for Production Deployments",
        description:
            "Master Kubernetes deployment strategies, security practices, and monitoring for production environments.",
        image:
            "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&auto=format&fit=crop&q=80",
        content: `# Kubernetes Best Practices\n\nDeploying to production requires careful planning...`,
        tags: ["Kubernetes", "DevOps", "Docker"],
        category: "devops",
        author: "Vikram Patel",
        date: "December 25, 2025",
        readTime: "11 min read",
        featured: true,
    },
    {
        id: 7,
        title: "TypeScript Advanced Patterns You Should Know",
        description:
            "Deep dive into advanced TypeScript patterns including generics, conditional types, and utility types.",
        image:
            "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&auto=format&fit=crop&q=80",
        content: `# Advanced TypeScript Patterns\n\nTypeScript offers powerful type features...`,
        tags: ["TypeScript", "JavaScript", "Programming"],
        category: "web-development",
        author: "Devendra Kumar",
        date: "December 20, 2025",
        readTime: "14 min read",
    },
    {
        id: 8,
        title: "Building Your First iOS App with SwiftUI",
        description:
            "A hands-on guide to creating beautiful iOS applications using SwiftUI and Swift.",
        image:
            "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop&q=80",
        content: `# SwiftUI Tutorial\n\nSwiftUI makes iOS development intuitive...`,
        tags: ["iOS", "SwiftUI", "Swift"],
        category: "mobile-development",
        author: "Arjun Mehta",
        date: "December 18, 2025",
        readTime: "13 min read",
    },
    {
        id: 9,
        title: "Data Visualization with Python: Charts That Tell Stories",
        description:
            "Learn to create compelling data visualizations using Matplotlib, Seaborn, and Plotly.",
        image:
            "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&auto=format&fit=crop&q=80",
        content: `# Data Visualization\n\nVisualizing data effectively is crucial...`,
        tags: ["Python", "Data Viz", "Analytics"],
        category: "data-science",
        author: "Priya Sharma",
        date: "December 15, 2025",
        readTime: "10 min read",
    },
    {
        id: 10,
        title: "Micro-interactions: The Secret to Delightful UX",
        description:
            "Discover how small animations and interactions can dramatically improve user experience.",
        image:
            "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800&auto=format&fit=crop&q=80",
        content: `# Micro-interactions\n\nThe best interfaces feel alive...`,
        tags: ["UX", "Animation", "Design"],
        category: "design",
        author: "Neha Gupta",
        date: "December 12, 2025",
        readTime: "7 min read",
    },
    {
        id: 11,
        title: "CI/CD with GitHub Actions: A Complete Guide",
        description:
            "Set up automated testing, building, and deployment pipelines using GitHub Actions.",
        image:
            "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&auto=format&fit=crop&q=80",
        content: `# CI/CD with GitHub Actions\n\nAutomation is key to modern development...`,
        tags: ["CI/CD", "GitHub", "Automation"],
        category: "devops",
        author: "Vikram Patel",
        date: "December 10, 2025",
        readTime: "12 min read",
    },
    {
        id: 12,
        title: "How to Land Your First Developer Job in 2026",
        description:
            "Practical tips and strategies for breaking into the tech industry as a new developer.",
        image:
            "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&auto=format&fit=crop&q=80",
        content: `# Landing Your First Dev Job\n\nBreaking into tech can be challenging...`,
        tags: ["Career", "Jobs", "Tips"],
        category: "career",
        author: "Rahul Verma",
        date: "December 5, 2025",
        readTime: "8 min read",
    },
];

const popularTags = ["React", "JavaScript", "Python", "DevOps", "UI/UX", "Mobile", "AI"];

export default function BlogsPage() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const featuredBlogs = blogs.filter((blog) => blog.featured).slice(0, 3);
    const heroBlog = featuredBlogs[0];
    const sideFeatured = featuredBlogs.slice(1, 3);

    const filteredBlogs = blogs.filter((blog) => {
        const matchesCategory =
            selectedCategory === "all" || blog.category === selectedCategory;
        const matchesSearch =
            searchQuery === "" ||
            blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.tags.some((tag) =>
                tag.toLowerCase().includes(searchQuery.toLowerCase())
            );
        return matchesCategory && matchesSearch;
    });

    const blogsWithCategoryName = filteredBlogs.map((blog) => ({
        ...blog,
        categoryName: categories.find((c) => c.id === blog.category)?.name || "",
    }));

    return (
        <div className="min-h-screen bg-background pt-24 pb-16">
            <div className="container">
                {/* Header Section */}
                <div className="mb-12">
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                        <div>
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                                Our Blog
                            </span>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
                                Kuchh{" "}
                                <span className="text-gradient">Khas Baaten</span>
                            </h1>
                            <p className="text-muted-foreground text-lg max-w-2xl">
                                Tech trends, tutorials, aur career tips – sab kuch ek jagah!
                            </p>
                        </div>

                        {/* Search Bar */}
                        <div className="relative w-full lg:w-96">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-12 pr-4 py-6 rounded-2xl bg-card border-border focus:border-primary"
                            />
                        </div>
                    </div>

                    {/* Popular Tags */}
                    <div className="flex flex-wrap items-center gap-3 mt-6">
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <TrendingUp className="w-4 h-4" />
                            Trending:
                        </span>
                        {popularTags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setSearchQuery(tag)}
                                className="px-3 py-1.5 text-sm rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Hero Featured Section - Bento Grid Style */}
                {!searchQuery && selectedCategory === "all" && (
                    <section className="mb-16">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-1 h-6 bg-primary rounded-full" />
                            <h2 className="text-2xl font-bold">Featured Articles</h2>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Main Featured */}
                            {heroBlog && (
                                <FeaturedBlogCard
                                    blog={{
                                        ...heroBlog,
                                        categoryName:
                                            categories.find((c) => c.id === heroBlog.category)
                                                ?.name || "",
                                    }}
                                    variant="hero"
                                />
                            )}
                            {/* Side Featured */}
                            <div className="grid grid-cols-1 gap-6">
                                {sideFeatured.map((blog) => (
                                    <FeaturedBlogCard
                                        key={blog.id}
                                        blog={{
                                            ...blog,
                                            categoryName:
                                                categories.find((c) => c.id === blog.category)
                                                    ?.name || "",
                                        }}
                                        variant="horizontal"
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Divider */}
                <div className="border-t border-border mb-10" />

                {/* All Blogs Section */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Sidebar */}
                    <BlogSidebar
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onCategoryChange={setSelectedCategory}
                    />

                    {/* Right Side - Blog Listings */}
                    <main className="flex-1">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold">
                                {searchQuery
                                    ? `Search Results`
                                    : selectedCategory === "all"
                                    ? "All Articles"
                                    : categories.find((c) => c.id === selectedCategory)?.name}
                            </h2>
                            <p className="text-muted-foreground">
                                <span className="font-semibold text-foreground">
                                    {filteredBlogs.length}
                                </span>{" "}
                                article
                                {filteredBlogs.length !== 1 ? "s" : ""}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {blogsWithCategoryName.map((blog) => (
                                <BlogCard key={blog.id} blog={blog} />
                            ))}
                        </div>

                        {filteredBlogs.length === 0 && (
                            <div className="text-center py-16 bg-card border border-border rounded-2xl">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                                    <Search className="w-8 h-8 text-muted-foreground" />
                                </div>
                                <p className="text-muted-foreground text-lg mb-2">
                                    No articles found
                                </p>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Try adjusting your search or filter
                                </p>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setSelectedCategory("all");
                                        setSearchQuery("");
                                    }}
                                >
                                    Clear Filters
                                </Button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}