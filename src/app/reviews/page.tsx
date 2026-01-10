import { TestimonialCard } from "@/components/testimonial-card";

const testimonials = [
	{
		name: "Rahul Sharma",
		description: "Full Stack Developer",
		testimonial:
			"SoftCrayons transformed my career. The hands-on projects and mentorship helped me land my dream job at a top tech company. The curriculum is industry-relevant and the instructors are amazing!",
		profileImage:
			"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
	},
	{
		name: "Priya Patel",
		description: "Data Scientist at Google",
		testimonial:
			"The data science course was comprehensive and practical. I went from zero coding knowledge to working as a data scientist in just 6 months. Highly recommended!",
		profileImage:
			"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
	},
	{
		name: "Amit Kumar",
		description: "Software Engineer",
		testimonial:
			"Best investment I've made in my education. The live classes, doubt sessions, and community support made learning so much easier.",
		profileImage:
			"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
	},
	{
		name: "Sneha Gupta",
		description: "Frontend Developer at Microsoft",
		testimonial:
			"The React and Next.js courses are top-notch. The projects we built during the course are now part of my portfolio that impressed my interviewers. The instructors explain complex concepts in simple terms.",
		profileImage:
			"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
	},
	{
		name: "Vikram Singh",
		description: "DevOps Engineer",
		testimonial:
			"SoftCrayons' DevOps course covered everything from Docker to Kubernetes to CI/CD pipelines. Real-world scenarios and hands-on labs made all the difference.",
		profileImage:
			"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
	},
	{
		name: "Anjali Verma",
		description: "UI/UX Designer",
		testimonial:
			"Excellent course structure and supportive community. The feedback on my projects helped me improve rapidly.",
		profileImage:
			"https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
	},
	{
		name: "Rohit Mehra",
		description: "Backend Developer at Amazon",
		testimonial:
			"The Node.js and MongoDB course was exactly what I needed. Within 3 months of completing the course, I received multiple job offers. The placement support is genuine and effective.",
		profileImage:
			"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
	},
	{
		name: "Kavita Reddy",
		description: "Mobile App Developer",
		testimonial:
			"Learning React Native here was a game-changer. Now I build apps for both iOS and Android!",
		profileImage:
			"https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
	},
	{
		name: "Arjun Nair",
		description: "Cloud Architect",
		testimonial:
			"The AWS certification prep course was thorough and well-structured. Passed my exam on the first attempt thanks to the comprehensive coverage and practice tests provided.",
		profileImage:
			"https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop&crop=face",
	},
];

export default function ReviewsPage() {
	return (
		<main className="min-h-screen bg-white dark:bg-black pt-32 pb-20 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-16">
					<h1 className="text-4xl sm:text-7xl font-extrabold text-gray-900 dark:text-white mb-4">
						Wall of{" "}
						<span className="text-gradient font-black">Love</span>
					</h1>
					<p className="text-gray-600 dark:text-zinc-400 text-lg max-w-2xl mx-auto">
						Hear from our community of learners who have transformed their
						careers with SoftCrayons
					</p>
				</div>

				{/* Simple Grid Layout */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{testimonials.map((testimonial, index) => (
						<TestimonialCard key={index} {...testimonial} />
					))}
				</div>
			</div>
		</main>
	);
}