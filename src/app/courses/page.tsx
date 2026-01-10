"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CourseSidebar } from "@/components/courses/CourseSidebar";
import { CourseCard } from "@/components/courses/CourseCard";

const categories = [
	{ id: "all", name: "All Courses", count: 10 },
	{ id: "web-development", name: "Web Development", count: 2 },
	{ id: "mobile-development", name: "Mobile Development", count: 2 },
	{ id: "data-science", name: "Data Science", count: 2 },
	{ id: "design", name: "UI/UX Design", count: 2 },
	{ id: "devops", name: "DevOps", count: 2 },
];

const courses = [
	{
		id: 1,
		title: "React Fundamentals",
		description:
			"Master React basics, hooks, and component patterns to build modern web applications.",
		category: "web-development",
		duration: "8 weeks",
		level: "Beginner",
		tags: ["React", "JavaScript", "Hooks"],
		image:
			"https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&auto=format&fit=crop&q=80",
	},
	{
		id: 2,
		title: "Node.js Backend Development",
		description: "Build scalable backend APIs with Node.js, Express, and MongoDB.",
		category: "web-development",
		duration: "10 weeks",
		level: "Intermediate",
		tags: ["Node.js", "Express", "MongoDB"],
		image:
			"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80",
	},
	{
		id: 3,
		title: "Flutter App Development",
		description: "Create beautiful cross-platform mobile apps with Flutter and Dart.",
		category: "mobile-development",
		duration: "12 weeks",
		level: "Beginner",
		tags: ["Flutter", "Dart", "Mobile"],
		image:
			"https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&auto=format&fit=crop&q=80",
	},
	{
		id: 4,
		title: "React Native Mastery",
		description: "Build production-ready iOS and Android apps with React Native.",
		category: "mobile-development",
		duration: "10 weeks",
		level: "Intermediate",
		tags: ["React Native", "TypeScript", "Firebase"],
		image:
			"https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&auto=format&fit=crop&q=80",
	},
	{
		id: 5,
		title: "Python for Data Science",
		description: "Learn Python fundamentals and data analysis with Pandas and NumPy.",
		category: "data-science",
		duration: "14 weeks",
		level: "Beginner",
		tags: ["Python", "Pandas", "NumPy"],
		image:
			"https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&auto=format&fit=crop&q=80",
	},
	{
		id: 6,
		title: "Machine Learning Basics",
		description: "Dive into ML algorithms, neural networks, and TensorFlow.",
		category: "data-science",
		duration: "16 weeks",
		level: "Advanced",
		tags: ["ML", "TensorFlow", "Python"],
		image:
			"https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&auto=format&fit=crop&q=80",
	},
	{
		id: 7,
		title: "Figma for Beginners",
		description: "Master Figma basics and create stunning UI designs from scratch.",
		category: "design",
		duration: "6 weeks",
		level: "Beginner",
		tags: ["Figma", "UI", "Design"],
		image:
			"https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&auto=format&fit=crop&q=80",
	},
	{
		id: 8,
		title: "Advanced UI Design",
		description:
			"Learn design systems, micro-interactions, and advanced prototyping.",
		category: "design",
		duration: "8 weeks",
		level: "Intermediate",
		tags: ["UI/UX", "Prototyping", "Design Systems"],
		image:
			"https://images.unsplash.com/photo-1545235617-9465d2a55698?w=600&auto=format&fit=crop&q=80",
	},
	{
		id: 9,
		title: "Docker & Kubernetes",
		description: "Containerize applications and orchestrate with Kubernetes.",
		category: "devops",
		duration: "10 weeks",
		level: "Intermediate",
		tags: ["Docker", "Kubernetes", "DevOps"],
		image:
			"https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&auto=format&fit=crop&q=80",
	},
	{
		id: 10,
		title: "CI/CD Pipeline Mastery",
		description: "Build automated pipelines with GitHub Actions and Jenkins.",
		category: "devops",
		duration: "8 weeks",
		level: "Advanced",
		tags: ["CI/CD", "GitHub Actions", "Jenkins"],
		image:
			"https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&auto=format&fit=crop&q=80",
	},
];

export default function CoursesPage() {
	const [selectedCategory, setSelectedCategory] = useState("all");

	const filteredCourses =
		selectedCategory === "all"
			? courses
			: courses.filter((course) => course.category === selectedCategory);

	// Add categoryName to each course for the card component
	const coursesWithCategoryName = filteredCourses.map((course) => ({
		...course,
		categoryName: categories.find((c) => c.id === course.category)?.name || "",
	}));

	return (
		<div className="min-h-screen bg-background pt-24 pb-16">
			<div className="container">
				{/* Header */}
				<div className="mb-10">
					<span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
						Explore Courses
					</span>
					<h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
						Find Your{" "}
						<span className="text-gradient">Perfect Course</span>
					</h1>
					<p className="text-muted-foreground text-lg max-w-2xl">
						Agar nahi samajh me aa raha to koi baat nahi, koi sa bhi choose kar lo, hamari support team aapse contact karke sahi course decide karne me help kar degi.
					</p>
				</div>

				<div className="flex flex-col lg:flex-row gap-8">
					{/* Left Sidebar */}
					<CourseSidebar
						categories={categories}
						selectedCategory={selectedCategory}
						onCategoryChange={setSelectedCategory}
					/>

					{/* Right Side - Course Listings */}
					<main className="flex-1">
						<div className="flex items-center justify-between mb-6">
							<p className="text-muted-foreground">
								Showing{" "}
								<span className="font-semibold text-foreground">
									{filteredCourses.length}
								</span>{" "}
								course
								{filteredCourses.length !== 1 ? "s" : ""}
							</p>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
							{coursesWithCategoryName.map((course) => (
								<CourseCard key={course.id} course={course} />
							))}
						</div>

						{filteredCourses.length === 0 && (
							<div className="text-center py-16 bg-card border border-border rounded-2xl">
								<p className="text-muted-foreground text-lg">
									No courses found in this category.
								</p>
								<Button
									variant="outline"
									className="mt-4"
									onClick={() => setSelectedCategory("all")}
								>
									View All Courses
								</Button>
							</div>
						)}
					</main>
				</div>
			</div>
		</div>
	);
}