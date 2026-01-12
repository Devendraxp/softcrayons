"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Share2, ChevronRight, Tag, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState } from "react";

const blogs = [
    {
        id: 1,
        title: "Getting Started with React 19: What's New and Exciting",
        description:
            "Explore the latest features in React 19 including the new compiler, server components, and improved performance optimizations.",
        image:
            "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80",
        content: `
# Getting Started with React 19: What's New and Exciting

React 19 marks a significant milestone in the evolution of the world's most popular JavaScript library. With groundbreaking features and performance improvements, this version is set to revolutionize how we build web applications.

## The New React Compiler

One of the most anticipated features in React 19 is the new compiler, previously known as React Forget. This compiler automatically optimizes your React code, eliminating the need for manual memoization in most cases.

### Benefits of the New Compiler

- **Automatic Memoization**: No more \`useMemo\`, \`useCallback\`, or \`React.memo\` in most cases
- **Improved Performance**: Up to 2x faster re-renders in complex applications
- **Smaller Bundle Size**: Optimized output reduces JavaScript payload

\`\`\`jsx
// Before React 19
const MemoizedComponent = React.memo(({ data }) => {
  const processedData = useMemo(() => expensiveOperation(data), [data]);
  const handleClick = useCallback(() => doSomething(data), [data]);
  
  return <div onClick={handleClick}>{processedData}</div>;
});

// With React 19 Compiler - Just write normal code!
function Component({ data }) {
  const processedData = expensiveOperation(data);
  const handleClick = () => doSomething(data);
  
  return <div onClick={handleClick}>{processedData}</div>;
}
\`\`\`

## Server Components Are Now Stable

React Server Components (RSC) have moved from experimental to stable in React 19. This paradigm shift allows components to run on the server, reducing client-side JavaScript.

### Key Advantages

1. **Zero Bundle Size Impact**: Server components don't add to your JavaScript bundle
2. **Direct Database Access**: Query your database directly in components
3. **Improved SEO**: Server-rendered content is immediately available to crawlers

## Actions: Simplified Data Mutations

React 19 introduces Actions, a new way to handle form submissions and data mutations.

\`\`\`jsx
function CreatePost() {
  async function createPost(formData) {
    'use server';
    const title = formData.get('title');
    const content = formData.get('content');
    await db.posts.create({ title, content });
  }

  return (
    <form action={createPost}>
      <input name="title" placeholder="Title" />
      <textarea name="content" placeholder="Content" />
      <button type="submit">Create Post</button>
    </form>
  );
}
\`\`\`

## New Hooks in React 19

### useOptimistic

Handle optimistic updates with ease:

\`\`\`jsx
function LikeButton({ postId, initialLikes }) {
  const [likes, setLikes] = useState(initialLikes);
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    likes,
    (state) => state + 1
  );

  async function handleLike() {
    addOptimisticLike();
    await likePost(postId);
    setLikes(likes + 1);
  }

  return <button onClick={handleLike}>❤️ {optimisticLikes}</button>;
}
\`\`\`

### useFormStatus

Get form submission status without prop drilling:

\`\`\`jsx
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}
\`\`\`

## Migration Guide

Upgrading to React 19 is straightforward for most applications:

1. Update your dependencies
2. Run the codemod for automatic migrations
3. Test thoroughly, especially around effects and refs

\`\`\`bash
npm install react@19 react-dom@19
npx @react/codemod upgrade
\`\`\`

## Conclusion

React 19 represents a major leap forward in developer experience and application performance. The new compiler alone will save countless hours of optimization work, while Server Components and Actions provide powerful new patterns for building modern web applications.

Start experimenting with React 19 today and experience the future of web development!
`,
        tags: ["React", "JavaScript", "Frontend"],
        category: "web-development",
        author: "Devendra Kumar",
        authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
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
        content: `
# Building Scalable APIs with Node.js and GraphQL

GraphQL has revolutionized how we build and consume APIs. In this comprehensive guide, we'll explore how to build production-ready GraphQL APIs using Node.js and Apollo Server.

## Why GraphQL?

GraphQL offers several advantages over REST:

- **Precise Data Fetching**: Get exactly what you need, nothing more
- **Single Endpoint**: One endpoint for all your data needs
- **Strong Typing**: Built-in type system for better developer experience
- **Real-time Support**: Subscriptions for live data

## Setting Up Your Project

\`\`\`bash
mkdir graphql-api && cd graphql-api
npm init -y
npm install @apollo/server graphql
\`\`\`

## Defining Your Schema

\`\`\`graphql
type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
}

type Query {
  users: [User!]!
  user(id: ID!): User
  posts: [Post!]!
}

type Mutation {
  createUser(name: String!, email: String!): User!
  createPost(title: String!, content: String!, authorId: ID!): Post!
}
\`\`\`

## Best Practices

1. **Use DataLoaders** for batching and caching
2. **Implement proper authentication** with context
3. **Add rate limiting** to prevent abuse
4. **Use persisted queries** in production

## Conclusion

GraphQL with Node.js provides a powerful, flexible way to build APIs that scale with your application's needs.
`,
        tags: ["Node.js", "GraphQL", "API"],
        category: "web-development",
        author: "Priya Sharma",
        authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
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
        content: `
# Flutter vs React Native in 2026

Choosing the right cross-platform framework is crucial for your mobile development success. Let's compare Flutter and React Native in 2026.

## Performance Comparison

### Flutter
- Compiles to native ARM code
- Consistent 60fps animations
- Skia rendering engine

### React Native
- New Architecture with Fabric
- Turbo Modules for native performance
- JSI for synchronous native calls

## Developer Experience

Both frameworks have matured significantly, offering excellent tooling and hot reload capabilities.

## When to Choose Flutter

- Need consistent UI across platforms
- Building widget-heavy applications
- Team familiar with Dart

## When to Choose React Native

- Existing JavaScript/React expertise
- Need to share code with web
- Large ecosystem of libraries

## Conclusion

Both are excellent choices in 2026. Your decision should be based on team expertise and project requirements.
`,
        tags: ["Flutter", "React Native", "Mobile"],
        category: "mobile-development",
        author: "Rahul Verma",
        authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
        date: "January 5, 2026",
        readTime: "10 min read",
        featured: true,
    },
];

const categories = [
    { id: "web-development", name: "Web Development" },
    { id: "mobile-development", name: "Mobile Development" },
    { id: "data-science", name: "Data Science" },
    { id: "design", name: "UI/UX Design" },
    { id: "devops", name: "DevOps" },
    { id: "career", name: "Career Tips" },
];

// Custom components for ReactMarkdown
const MarkdownComponents = {
    code({ node, inline, className, children, ...props }) {
        const match = /language-(\w+)/.exec(className || "");
        return !inline && match ? (
            <SyntaxHighlighter
                style={oneDark}
                language={match[1]}
                PreTag="div"
                className="rounded-xl !bg-zinc-900 !my-6 text-sm"
                showLineNumbers
                {...props}
            >
                {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
        ) : (
            <code
                className="bg-primary/10 text-primary px-1.5 py-0.5 rounded text-sm font-mono"
                {...props}
            >
                {children}
            </code>
        );
    },
    h1: ({ children }) => (
        <h1 className="text-3xl md:text-4xl font-black mt-12 mb-6 text-foreground">
            {children}
        </h1>
    ),
    h2: ({ children }) => (
        <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-4 text-foreground border-b border-border pb-3">
            {children}
        </h2>
    ),
    h3: ({ children }) => (
        <h3 className="text-xl md:text-2xl font-semibold mt-8 mb-3 text-foreground">
            {children}
        </h3>
    ),
    p: ({ children }) => (
        <p className="text-muted-foreground leading-relaxed mb-6 text-base md:text-lg">
            {children}
        </p>
    ),
    ul: ({ children }) => (
        <ul className="space-y-3 mb-6 ml-4">{children}</ul>
    ),
    ol: ({ children }) => (
        <ol className="space-y-3 mb-6 ml-4 list-decimal">{children}</ol>
    ),
    li: ({ children }) => (
        <li className="text-muted-foreground leading-relaxed flex gap-2">
            <span className="text-primary mt-1.5">•</span>
            <span>{children}</span>
        </li>
    ),
    strong: ({ children }) => (
        <strong className="font-semibold text-foreground">{children}</strong>
    ),
    blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-primary pl-6 py-2 my-6 bg-primary/5 rounded-r-xl">
            {children}
        </blockquote>
    ),
    a: ({ children, href }) => (
        <a
            href={href}
            className="text-primary hover:underline font-medium"
            target="_blank"
            rel="noopener noreferrer"
        >
            {children}
        </a>
    ),
};

export default function BlogDetailPage() {
    const params = useParams();
    const blogId = parseInt(params.slug);
    const [showToast, setShowToast] = useState(false);

    const blog = blogs.find((b) => b.id === blogId);

    const handleShare = async () => {
        const url = window.location.href;
        try {
            await navigator.clipboard.writeText(url);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        } catch (err) {
            console.error("Failed to copy link:", err);
        }
    };

    if (!blog) {
        return (
            <div className="min-h-screen bg-background pt-24 pb-16">
                <div className="container">
                    <div className="text-center py-20">
                        <h1 className="text-4xl font-bold mb-4">Blog Not Found</h1>
                        <p className="text-muted-foreground mb-8">
                            The blog post you're looking for doesn't exist.
                        </p>
                        <Link href="/blogs">
                            <Button>
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Blogs
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const categoryName = categories.find((c) => c.id === blog.category)?.name || "";

    const relatedBlogs = blogs
        .filter((b) => b.category === blog.category && b.id !== blog.id)
        .slice(0, 3);

    return (
        <div className="min-h-screen bg-background">
            {/* Toast Notification */}
            <div
                className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
                    showToast
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4 pointer-events-none"
                }`}
            >
                <div className="flex items-center gap-3 bg-foreground text-background px-5 py-3 rounded-full shadow-lg">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium">Link copied to clipboard!</span>
                </div>
            </div>

            {/* Hero Section with Full Width Image */}
            <div className="relative h-[50vh] md:h-[60vh] w-full">
                <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

                {/* Back Button */}
                <div className="absolute top-24 left-0 right-0 z-10">
                    <div className="container">
                        <Link
                            href="/blogs"
                            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Back to Blogs</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container relative -mt-32 z-10 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Sidebar - Sticky */}
                    <aside className="hidden lg:block lg:col-span-1">
                        <div className="sticky top-24 flex flex-col items-center gap-4 pt-8">
                            <button
                                onClick={handleShare}
                                className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all group"
                                title="Copy link to clipboard"
                            >
                                <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            </button>
                            <div className="w-px h-16 bg-border" />
                            <span className="text-xs text-muted-foreground [writing-mode:vertical-lr] rotate-180">
                                Share this article
                            </span>
                        </div>
                    </aside>

                    {/* Main Article */}
                    <main className="lg:col-span-8">
                        <article className="bg-card border border-border rounded-3xl p-6 md:p-10 shadow-xl">
                            {/* Breadcrumb */}
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                                <Link href="/" className="hover:text-primary transition-colors">
                                    Home
                                </Link>
                                <ChevronRight className="w-4 h-4" />
                                <Link href="/blogs" className="hover:text-primary transition-colors">
                                    Blogs
                                </Link>
                                <ChevronRight className="w-4 h-4" />
                                <span className="text-foreground">{categoryName}</span>
                            </div>

                            {/* Category Badge */}
                            <Badge className="bg-primary/10 text-primary border-0 mb-4">
                                {categoryName}
                            </Badge>

                            {/* Title */}
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 leading-tight text-foreground">
                                {blog.title}
                            </h1>

                            {/* Description */}
                            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                                {blog.description}
                            </p>

                            {/* Author & Meta Row */}
                            <div className="flex flex-wrap items-center gap-6 pb-8 mb-8 border-b border-border">
                                <div className="flex items-center gap-3">
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/20">
                                        <Image
                                            src={blog.authorImage}
                                            alt={blog.author}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-foreground">{blog.author}</p>
                                        <p className="text-sm text-muted-foreground">Author</p>
                                    </div>
                                </div>
                                <div className="h-8 w-px bg-border hidden sm:block" />
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Calendar className="w-4 h-4 text-primary" />
                                    <span>{blog.date}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Clock className="w-4 h-4 text-primary" />
                                    <span>{blog.readTime}</span>
                                </div>
                            </div>

                            {/* Mobile Actions */}
                            <div className="flex items-center gap-3 mb-8 lg:hidden">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1"
                                    onClick={handleShare}
                                >
                                    <Share2 className="w-4 h-4 mr-2" />
                                    Share
                                </Button>
                            </div>

                            {/* Markdown Content */}
                            <div className="prose-custom">
                                <ReactMarkdown components={MarkdownComponents}>
                                    {blog.content}
                                </ReactMarkdown>
                            </div>

                            {/* Tags Section */}
                            <div className="mt-12 pt-8 border-t border-border">
                                <div className="flex items-center gap-2 mb-4">
                                    <Tag className="w-5 h-5 text-primary" />
                                    <span className="font-semibold">Tags</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {blog.tags.map((tag) => (
                                        <Link
                                            key={tag}
                                            href={`/blogs?tag=${tag}`}
                                            className="px-4 py-2 rounded-full bg-muted hover:bg-primary/10 hover:text-primary text-sm font-medium transition-colors"
                                        >
                                            {tag}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </article>
                    </main>

                    {/* Right Sidebar */}
                    <aside className="lg:col-span-3">
                        <div className="sticky top-24 space-y-6">
                            {/* Table of Contents Card */}
                            <div className="bg-card border border-border rounded-2xl p-6">
                                <h3 className="font-bold mb-4 flex items-center gap-2">
                                    <span className="w-1 h-5 bg-primary rounded-full" />
                                    Table of Contents
                                </h3>
                                <nav className="space-y-2 text-sm">
                                    <a href="#" className="block text-muted-foreground hover:text-primary transition-colors py-1">
                                        The New React Compiler
                                    </a>
                                    <a href="#" className="block text-muted-foreground hover:text-primary transition-colors py-1">
                                        Server Components Are Now Stable
                                    </a>
                                    <a href="#" className="block text-muted-foreground hover:text-primary transition-colors py-1">
                                        Actions: Simplified Data Mutations
                                    </a>
                                    <a href="#" className="block text-muted-foreground hover:text-primary transition-colors py-1">
                                        New Hooks in React 19
                                    </a>
                                    <a href="#" className="block text-muted-foreground hover:text-primary transition-colors py-1">
                                        Migration Guide
                                    </a>
                                    <a href="#" className="block text-muted-foreground hover:text-primary transition-colors py-1">
                                        Conclusion
                                    </a>
                                </nav>
                            </div>

                            {/* Related Tags */}
                            <div className="bg-card border border-border rounded-2xl p-6">
                                <h3 className="font-bold mb-4 flex items-center gap-2">
                                    <span className="w-1 h-5 bg-primary rounded-full" />
                                    Related Tags
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {blog.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1.5 rounded-full bg-muted text-xs font-medium"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>

                {/* Related Articles */}
                {relatedBlogs.length > 0 && (
                    <section className="mt-16">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold">Related Articles</h2>
                            <Link
                                href="/blogs"
                                className="text-primary hover:underline text-sm font-medium"
                            >
                                View All Articles
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedBlogs.map((relatedBlog) => (
                                <Link
                                    key={relatedBlog.id}
                                    href={`/blogs/${relatedBlog.id}`}
                                    className="group"
                                >
                                    <article className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 h-full">
                                        <div className="relative h-48 overflow-hidden">
                                            <Image
                                                src={relatedBlog.image}
                                                alt={relatedBlog.title}
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                            <div className="absolute bottom-3 left-3">
                                                <Badge className="bg-background/90 text-foreground backdrop-blur-sm border border-border">
                                                    {categories.find((c) => c.id === relatedBlog.category)?.name}
                                                </Badge>
                                            </div>
                                        </div>
                                        <div className="p-5">
                                            <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                                {relatedBlog.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                                {relatedBlog.description}
                                            </p>
                                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                                <span>{relatedBlog.author}</span>
                                                <span>•</span>
                                                <span>{relatedBlog.readTime}</span>
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}