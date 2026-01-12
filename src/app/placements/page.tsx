"use client";
import React from "react";
import { Trophy, Users, Briefcase, Building2, TrendingUp } from "lucide-react";
import { FeaturedPlacementCard } from "@/components/placements/FeaturedPlacementCard";
import { PlacementCard } from "@/components/placements/PlacementCard";

// Single Combined Data Source
const placementsData = [
	{
		id: 1,
		name: "Aditya Verma",
		course: "Full Stack Development",
		position: "SDE - I",
		company: "Microsoft",
		package: "42 LPA",
		image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&h=600&fit=crop",
		quote: "The mentorship at Softcrayons was exceptional. Working on live projects gave me the confidence to crack the technical rounds at Microsoft.",
		isFeatured: true,
	},
	{
		id: 2,
		name: "Riya Singh",
		course: "Data Science Masters",
		position: "Data Analyst",
		company: "Accenture",
		package: "14 LPA",
		image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=600&fit=crop",
		quote: "Coming from a non-tech background, I was worried about coding. But the structured curriculum and patient instructors made the transition smooth.",
		isFeatured: true,
	},
	{
		id: 3,
		name: "Karan Mehta",
		course: "Java Development",
		position: "Backend Developer",
		company: "TCS",
		package: "",
		image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop",
		quote: "Regular mock tests helped me improve my speed and accuracy for the aptitude rounds.",
		isFeatured: false,
	},
	{
		id: 4,
		name: "Sneha Patel",
		course: "UI/UX Design",
		position: "Product Designer",
		company: "Zomato",
		package: "8 LPA",
		image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop",
		quote: "The portfolio building sessions were the most valuable part of the course.",
		isFeatured: false,
	},
	{
		id: 5,
		name: "Rahul Kumar",
		course: "Python & Django",
		position: "Python Developer",
		company: "Infosys",
		package: "",
		image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
		quote: "Learned best practices that are actually used in the industry.",
		isFeatured: false,
	},
	{
		id: 6,
		name: "Anjali Gupta",
		course: "Digital Marketing",
		position: "SEO Specialist",
		company: "MakeMyTrip",
		package: "6 LPA",
		image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
		quote: "Practical assignments on live websites gave me real exposure.",
		isFeatured: false,
	},
	{
		id: 7,
		name: "Vikram Malhotra",
		course: "MERN Stack",
		position: "Frontend Dev",
		company: "Paytm",
		package: "10 LPA",
		image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop",
		quote: "From Zero to Hero in React.js. Highly recommended!",
		isFeatured: false,
	},
	{
		id: 8,
		name: "Pooja Sharma",
		course: "Software Testing",
		position: "QA Engineer",
		company: "HCL Tech",
		package: "",
		image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop",
		quote: "Manual + Automation testing syllabus covered everything needed for interviews.",
		isFeatured: false,
	},
	{
		id: 9,
		name: "Arjun Reddy",
		course: "Cloud Computing",
		position: "Cloud Associate",
		company: "Wipro",
		package: "",
		image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=500&fit=crop",
		quote: "AWS labs were very detailed and hands-on.",
		isFeatured: false,
	},
	{
		id: 10,
		name: "Meera Iyer",
		course: "Data Analytics",
		position: "Business Analyst",
		company: "Deloitte",
		package: "9 LPA",
		image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=500&fit=crop",
		quote: "Great insights into data visualization tools like Tableau.",
		isFeatured: false,
	},
];

export default function PlacementsPage() {
	const featuredPlacements = placementsData.filter((p) => p.isFeatured);
	const normalPlacements = placementsData.filter((p) => !p.isFeatured);

	return (
		<div className="min-h-screen bg-background pt-24 pb-16">
			<div className="container">
				{/* Header Section */}
				<div className="max-w-3xl mb-12">
					<span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
						Success Stories
					</span>
					<h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6">
						Our Students{" "}
						<span className="text-gradient">Placement Records</span>
					</h1>
					<p className="text-muted-foreground text-lg leading-relaxed">
						We don't just teach; we build careers. Join thousands of students who
						have secured their dream jobs at top-tier product and service-based
						companies.
					</p>
				</div>

				{/* Stats Row */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
					{[
						{ icon: Users, value: "5000+", label: "Total Placed" },
						{ icon: Building2, value: "450+", label: "Hiring Partners" },
						{ icon: TrendingUp, value: "92%", label: "Placement Rate" },
						{ icon: Trophy, value: "24 LPA", label: "Highest Package" },
					].map((stat, idx) => (
						<div
							key={idx}
							className="bg-card border border-border rounded-xl p-5 text-center hover:border-primary/30 transition-colors"
						>
							<stat.icon className="w-6 h-6 text-primary mx-auto mb-3" />
							<div className="text-2xl font-bold text-foreground mb-1">
								{stat.value}
							</div>
							<div className="text-xs text-muted-foreground uppercase tracking-widest font-medium">
								{stat.label}
							</div>
						</div>
					))}
				</div>

				{/* Featured Section */}
				<section className="mb-20">
					<div className="flex items-center justify-between mb-8">
						<h2 className="text-2xl font-bold flex items-center gap-2">
							<Trophy className="w-5 h-5 text-yellow-500 fill-yellow-500" />
							Top Achievers
						</h2>
						<div className="h-px bg-border flex-1 ml-6 hidden sm:block" />
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						{featuredPlacements.map((student) => (
							<FeaturedPlacementCard
								key={student.id}
								name={student.name}
								course={student.course}
								position={student.position}
								company={student.company}
								image={student.image}
								packageVal={student.package}
								quote={student.quote}
							/>
						))}
					</div>
				</section>

				{/* Recent Placements Section */}
				<section>
					<div className="flex items-center justify-between mb-8">
						<h2 className="text-2xl font-bold flex items-center gap-2">
							<Briefcase className="w-5 h-5 text-primary" />
							Recent Placements
						</h2>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{normalPlacements.map((student) => (
							<PlacementCard
								key={student.id}
								name={student.name}
								course={student.course}
								position={student.position}
								company={student.company}
								image={student.image}
								packageVal={student.package}
								quote={student.quote}
							/>
						))}
					</div>

					<div className="mt-12 text-center">
						<button className="px-8 py-3 rounded-full border border-border bg-card hover:bg-muted text-sm font-medium transition-colors">
							Load More Success Stories
						</button>
					</div>
				</section>
			</div>
		</div>
	);
}