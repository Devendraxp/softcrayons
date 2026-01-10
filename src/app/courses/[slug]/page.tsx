import { Clock, BarChart, BookOpen, IndianRupee, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// This would typically come from a database or API
const courses = [
    {
        id: 1,
        slug: "react-fundamentals",
        title: "React Fundamentals",
        description: "Master React basics, hooks, and component patterns to build modern web applications.",
        category: "web-development",
        categoryName: "Web Development",
        duration: "8 weeks",
        level: "Beginner",
        fees: "₹12,999",
        tags: ["React", "JavaScript", "Hooks", "JSX", "State Management"],
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&auto=format&fit=crop&q=80",
        about: `
## What You'll Learn

This comprehensive React course takes you from zero to building production-ready applications. You'll master the fundamentals and advanced patterns used by top companies.

### Course Highlights

- **Component Architecture**: Learn to think in components and build reusable UI
- **React Hooks**: Master useState, useEffect, useContext, useReducer, and custom hooks
- **State Management**: Understand local vs global state and when to use each
- **Performance Optimization**: Learn React.memo, useMemo, useCallback
- **Real-world Projects**: Build 3 complete projects from scratch

### Prerequisites

- Basic knowledge of HTML, CSS, and JavaScript
- Understanding of ES6+ features (arrow functions, destructuring, modules)
- A computer with Node.js installed

### Who This Course Is For

- Beginners who want to learn modern frontend development
- JavaScript developers transitioning to React
- Anyone looking to build interactive web applications

### Course Structure

The course is divided into 8 weeks with hands-on assignments every week:

1. **Week 1-2**: React Basics & JSX
2. **Week 3-4**: Hooks Deep Dive
3. **Week 5-6**: State Management & Context
4. **Week 7-8**: Advanced Patterns & Final Project
        `,
    },
    {
        id: 2,
        slug: "nodejs-backend-development",
        title: "Node.js Backend Development",
        description: "Build scalable backend APIs with Node.js, Express, and MongoDB.",
        category: "web-development",
        categoryName: "Web Development",
        duration: "10 weeks",
        level: "Intermediate",
        fees: "₹15,999",
        tags: ["Node.js", "Express", "MongoDB", "REST API", "Authentication"],
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80",
        about: `
## What You'll Learn

Master backend development with Node.js and build production-ready APIs that can handle millions of requests.

### Course Highlights

- **Node.js Fundamentals**: Event loop, modules, streams, and async patterns
- **Express.js**: Build robust REST APIs with middleware and routing
- **MongoDB & Mongoose**: Database design and ORM patterns
- **Authentication**: JWT, OAuth, and session management
- **Deployment**: Docker, CI/CD, and cloud deployment

### Prerequisites

- JavaScript fundamentals
- Basic understanding of HTTP and web concepts
- Familiarity with command line

### Course Structure

1. **Week 1-2**: Node.js Core Concepts
2. **Week 3-4**: Express.js Deep Dive
3. **Week 5-6**: MongoDB & Database Design
4. **Week 7-8**: Authentication & Security
5. **Week 9-10**: Deployment & Final Project
        `,
    },
    {
        id: 3,
        slug: "flutter-app-development",
        title: "Flutter App Development",
        description: "Create beautiful cross-platform mobile apps with Flutter and Dart.",
        category: "mobile-development",
        categoryName: "Mobile Development",
        duration: "12 weeks",
        level: "Beginner",
        fees: "₹18,999",
        tags: ["Flutter", "Dart", "Mobile", "iOS", "Android"],
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&auto=format&fit=crop&q=80",
        about: `
## What You'll Learn

Build beautiful, natively compiled applications for mobile from a single codebase using Flutter.

### Course Highlights

- **Dart Programming**: Master the Dart language from scratch
- **Flutter Widgets**: Build beautiful UIs with Material and Cupertino widgets
- **State Management**: Provider, Riverpod, and BLoC patterns
- **Native Features**: Camera, GPS, notifications, and more
- **App Publishing**: Deploy to Play Store and App Store

### Prerequisites

- Basic programming knowledge (any language)
- A computer capable of running Android Studio or Xcode
- Enthusiasm to learn mobile development!

### Course Structure

1. **Week 1-3**: Dart Language & Flutter Basics
2. **Week 4-6**: Widgets & Layouts
3. **Week 7-9**: State Management & Navigation
4. **Week 10-12**: Native Features & Publishing
        `,
    },
    {
        id: 4,
        slug: "react-native-mastery",
        title: "React Native Mastery",
        description: "Build production-ready iOS and Android apps with React Native.",
        category: "mobile-development",
        categoryName: "Mobile Development",
        duration: "10 weeks",
        level: "Intermediate",
        fees: "₹16,999",
        tags: ["React Native", "TypeScript", "Firebase", "Mobile", "Expo"],
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&auto=format&fit=crop&q=80",
        about: `
## What You'll Learn

Leverage your React skills to build native mobile applications for both iOS and Android platforms.

### Course Highlights

- **React Native Core**: Components, styling, and navigation
- **TypeScript Integration**: Type-safe mobile development
- **Firebase Backend**: Authentication, Firestore, and Cloud Functions
- **Native Modules**: Bridge native code when needed
- **App Store Deployment**: Complete publishing workflow

### Prerequisites

- Strong React.js knowledge
- JavaScript/TypeScript fundamentals
- Basic understanding of mobile app concepts
        `,
    },
    {
        id: 5,
        slug: "python-for-data-science",
        title: "Python for Data Science",
        description: "Learn Python fundamentals and data analysis with Pandas and NumPy.",
        category: "data-science",
        categoryName: "Data Science",
        duration: "14 weeks",
        level: "Beginner",
        fees: "₹14,999",
        tags: ["Python", "Pandas", "NumPy", "Data Analysis", "Visualization"],
        image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&auto=format&fit=crop&q=80",
        about: `
## What You'll Learn

Start your data science journey with Python, the most popular language for data analysis and machine learning.

### Course Highlights

- **Python Fundamentals**: Variables, loops, functions, and OOP
- **NumPy**: Numerical computing and array operations
- **Pandas**: Data manipulation and analysis
- **Matplotlib & Seaborn**: Data visualization
- **Real Datasets**: Work with Kaggle datasets

### Prerequisites

- No prior programming experience required
- Basic math knowledge
- Curiosity about data!
        `,
    },
    {
        id: 6,
        slug: "machine-learning-basics",
        title: "Machine Learning Basics",
        description: "Dive into ML algorithms, neural networks, and TensorFlow.",
        category: "data-science",
        categoryName: "Data Science",
        duration: "16 weeks",
        level: "Advanced",
        fees: "₹24,999",
        tags: ["ML", "TensorFlow", "Python", "Neural Networks", "Deep Learning"],
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&auto=format&fit=crop&q=80",
        about: `
## What You'll Learn

Master machine learning algorithms and build AI-powered applications with TensorFlow.

### Course Highlights

- **ML Fundamentals**: Supervised, unsupervised, and reinforcement learning
- **Algorithms**: Linear regression, decision trees, SVM, clustering
- **Neural Networks**: Build and train deep learning models
- **TensorFlow & Keras**: Industry-standard ML frameworks
- **Capstone Project**: End-to-end ML pipeline

### Prerequisites

- Python programming experience
- Basic statistics and linear algebra
- Completed Python for Data Science or equivalent
        `,
    },
    {
        id: 7,
        slug: "figma-for-beginners",
        title: "Figma for Beginners",
        description: "Master Figma basics and create stunning UI designs from scratch.",
        category: "design",
        categoryName: "UI/UX Design",
        duration: "6 weeks",
        level: "Beginner",
        fees: "₹8,999",
        tags: ["Figma", "UI", "Design", "Prototyping", "Components"],
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&auto=format&fit=crop&q=80",
        about: `
## What You'll Learn

Learn the industry-standard design tool and create beautiful user interfaces from scratch.

### Course Highlights

- **Figma Basics**: Interface, tools, and shortcuts
- **Design Principles**: Color theory, typography, spacing
- **Components**: Build reusable design systems
- **Prototyping**: Create interactive prototypes
- **Collaboration**: Work with developers effectively
        `,
    },
    {
        id: 8,
        slug: "advanced-ui-design",
        title: "Advanced UI Design",
        description: "Learn design systems, micro-interactions, and advanced prototyping.",
        category: "design",
        categoryName: "UI/UX Design",
        duration: "8 weeks",
        level: "Intermediate",
        fees: "₹12,999",
        tags: ["UI/UX", "Prototyping", "Design Systems", "Animation", "Figma"],
        image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=600&auto=format&fit=crop&q=80",
        about: `
## What You'll Learn

Take your design skills to the next level with advanced techniques used by top design teams.

### Course Highlights

- **Design Systems**: Build scalable, consistent design systems
- **Micro-interactions**: Add delightful animations
- **Advanced Prototyping**: Complex interactions and flows
- **User Research**: Validate designs with real users
- **Portfolio Project**: Showcase-ready case study
        `,
    },
    {
        id: 9,
        slug: "docker-kubernetes",
        title: "Docker & Kubernetes",
        description: "Containerize applications and orchestrate with Kubernetes.",
        category: "devops",
        categoryName: "DevOps",
        duration: "10 weeks",
        level: "Intermediate",
        fees: "₹19,999",
        tags: ["Docker", "Kubernetes", "DevOps", "Containers", "Cloud"],
        image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&auto=format&fit=crop&q=80",
        about: `
## What You'll Learn

Master containerization and orchestration to deploy and scale applications like a pro.

### Course Highlights

- **Docker Fundamentals**: Images, containers, and Dockerfile
- **Docker Compose**: Multi-container applications
- **Kubernetes Core**: Pods, services, deployments
- **Helm Charts**: Package and deploy applications
- **Cloud Deployment**: AWS EKS, GCP GKE, Azure AKS
        `,
    },
    {
        id: 10,
        slug: "cicd-pipeline-mastery",
        title: "CI/CD Pipeline Mastery",
        description: "Build automated pipelines with GitHub Actions and Jenkins.",
        category: "devops",
        categoryName: "DevOps",
        duration: "8 weeks",
        level: "Advanced",
        fees: "₹17,999",
        tags: ["CI/CD", "GitHub Actions", "Jenkins", "Automation", "DevOps"],
        image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&auto=format&fit=crop&q=80",
        about: `
## What You'll Learn

Automate your entire software delivery pipeline from code to production.

### Course Highlights

- **CI/CD Concepts**: Continuous integration and deployment principles
- **GitHub Actions**: Build powerful automation workflows
- **Jenkins**: Enterprise-grade CI/CD pipelines
- **Testing Automation**: Unit, integration, and E2E tests
- **Security Scanning**: SAST, DAST, and dependency checks
        `,
    },
];

const levelColors = {
    Beginner: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
    Intermediate: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
    Advanced: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
};

export default async function CourseDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const course = courses.find((c) => c.slug === slug || c.id.toString() === slug);

    if (!course) {
        return (
            <div className="min-h-screen bg-background pt-24 pb-16">
                <div className="container">
                    <div className="text-center py-20">
                        <h1 className="text-3xl font-bold mb-4">Course Not Found</h1>
                        <p className="text-muted-foreground mb-6">
                            The course you're looking for doesn't exist.
                        </p>
                        <Link href="/courses">
                            <Button>
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Courses
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

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
                            {course.categoryName}
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
                            <div className="prose prose-neutral dark:prose-invert max-w-none">
                                {course.about.split("\n").map((line, index) => {
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
                        </div>
                    </div>

                    {/* Right Side - Course Info Card */}
                    <div className="w-full lg:w-96 flex-shrink-0">
                        <div className="lg:sticky lg:top-24">
                            <div className="bg-card border border-border rounded-2xl overflow-hidden">
                                {/* Course Image */}
                                <div className="relative h-52">
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                                </div>

                                {/* Course Details */}
                                <div className="p-6">
                                    {/* Fees */}
                                    <div className="flex items-center justify-between mb-6">
                                        <span className="text-muted-foreground">Course Fees</span>
                                        <span className="text-3xl font-black text-primary flex items-center">
                                            {course.fees}
                                        </span>
                                    </div>

                                    {/* Info Grid */}
                                    <div className="space-y-4 mb-6">
                                        <div className="flex items-center justify-between py-3 border-b border-border">
                                            <span className="flex items-center gap-2 text-muted-foreground">
                                                <Clock className="w-4 h-4" />
                                                Duration
                                            </span>
                                            <span className="font-semibold">{course.duration}</span>
                                        </div>
                                        <div className="flex items-center justify-between py-3 border-b border-border">
                                            <span className="flex items-center gap-2 text-muted-foreground">
                                                <BarChart className="w-4 h-4" />
                                                Difficulty
                                            </span>
                                            <span
                                                className={`px-3 py-1 text-xs font-bold rounded-full border ${levelColors[course.level as keyof typeof levelColors]}`}
                                            >
                                                {course.level}
                                            </span>
                                        </div>
                                        <div className="py-3 border-b border-border">
                                            <span className="flex items-center gap-2 text-muted-foreground mb-3">
                                                <BookOpen className="w-4 h-4" />
                                                Topics Covered
                                            </span>
                                            <div className="flex flex-wrap gap-2">
                                                {course.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="px-3 py-1 rounded-full bg-muted text-xs font-medium"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Join Now Button */}
                                    <Button className="w-full" size="lg">
                                        Join Now
                                    </Button>

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
                                <Button variant="outline" className="w-full">
                                    Contact Us
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}