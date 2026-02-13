"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionLoader } from "@/components/ui/loader";

interface Blog {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  thumbnailImage: string | null;
  bannerImage: string | null;
  dateOfPublish: string;
  readTime: number;
  tags: string[];
  isFeatured: boolean;
  author: {
    id: string;
    name: string;
    image: string | null;
  };
  category: {
    id: number;
    title: string;
    slug: string;
  };
}

function KnowledgeHubCard({ blog, index }: { blog: Blog; index: number }) {
  const image = blog.thumbnailImage || blog.bannerImage;
  const formattedDate = new Date(blog.dateOfPublish).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );

  return (
    <Link href={`/blogs/${blog.slug || blog.id}`}>
      <article
        className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 h-full flex flex-col animate-fade-up"
        style={{ animationDelay: `${index * 0.15}s` }}
      >
        {/* Image */}
        <div className="relative h-52 overflow-hidden bg-muted">
          {image ? (
            <Image
              src={image}
              alt={blog.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
              <span className="text-4xl font-black text-primary/20">SC</span>
            </div>
          )}
          {/* Category Pill Badge */}
          <div className="absolute top-3 left-3">
            <Badge className="bg-primary text-primary-foreground border-0 text-xs shadow-md">
              {blog.category.title}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          {/* Read Time */}
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
            <Clock className="w-3 h-3" />
            <span>{blog.readTime} min read</span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {blog.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-grow">
            {blog.description || ""}
          </p>

          {/* Read More */}
          <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
            <div className="flex items-center gap-2">
              {blog.author.image ? (
                <Image
                  src={blog.author.image}
                  alt={blog.author.name}
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded-full object-cover"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-3 h-3 text-primary" />
                </div>
              )}
              <span className="text-xs text-muted-foreground">
                {blog.author.name}
              </span>
            </div>
            <span className="text-sm font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
              Read More
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export function KnowledgeHub() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blogs?featured=true&limit=3");
        const data = await response.json();
        if (data.success) {
          setBlogs(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <section className="py-24">
        <div className="container">
          <SectionLoader text="articles" />
        </div>
      </section>
    );
  }

  if (blogs.length === 0) {
    return null;
  }

  return (
    <section className="py-24">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
            Knowledge <span className="text-gradient">Hub</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Stay ahead with the latest insights, tutorials, and career tips from
            our experts.
          </p>
        </div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {blogs.map((blog, index) => (
            <KnowledgeHubCard key={blog.id} blog={blog} index={index} />
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <Link href="/blogs">
            <Button variant="outline" size="lg">
              Explore All Articles
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
