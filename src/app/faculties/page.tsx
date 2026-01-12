"use client"
import React from "react";
import { Star, Users, Award, Code, GraduationCap, Mail, Heart } from "lucide-react";
import { FeaturedFacultyCard } from "@/components/faculties/FeaturedFacultyCard";
import { FacultyCard } from "@/components/faculties/FacultyCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Faculty data
const facultiesData = [
  {
    id: 1,
    name: "Chai Lover",
    title: "Full Stack Developer",
    tagline: "Crafting digital experiences with code and creativity",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80",
    location: "San Francisco, CA",
    email: "chai@chaicode.com",
    featured: true,
    stats: {
      experience: "5+",
      projects: "50+",
      students: "1000+",
      rating: 4.9,
    },
    skills: ["React", "Node.js", "TypeScript", "Next.js", "MongoDB"],
    specialization: "Frontend Development",
    about: "Passionate full-stack developer with 5+ years of experience building scalable web applications. I love turning complex problems into simple, beautiful solutions.",
    badges: ["Coffee Enthusiast", "Open Source Contributor", "Problem Solver"],
  },
  {
    id: 2,
    name: "Priya Sharma",
    title: "Data Science Expert",
    tagline: "Transforming data into actionable insights",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&q=80",
    location: "Bangalore, India",
    email: "priya@softcrayons.com",
    featured: true,
    stats: {
      experience: "8+",
      projects: "100+",
      students: "2500+",
      rating: 4.8,
    },
    skills: ["Python", "TensorFlow", "PyTorch", "SQL", "Tableau"],
    specialization: "Machine Learning & AI",
    about: "Data scientist with a passion for machine learning and AI. Helping students understand complex algorithms through practical, real-world examples.",
    badges: ["AI Researcher", "Kaggle Expert", "Tech Speaker"],
  },
  {
    id: 3,
    name: "Rahul Verma",
    title: "Cloud Architect",
    tagline: "Building scalable cloud infrastructure",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&q=80",
    location: "Mumbai, India",
    email: "rahul@softcrayons.com",
    featured: true,
    stats: {
      experience: "10+",
      projects: "75+",
      students: "1800+",
      rating: 4.9,
    },
    skills: ["AWS", "Azure", "Kubernetes", "Docker", "Terraform"],
    specialization: "Cloud Computing",
    about: "Certified cloud architect with expertise in designing and implementing enterprise-grade cloud solutions. AWS and Azure certified professional.",
    badges: ["AWS Certified", "Azure Expert", "DevOps Pro"],
  },
  {
    id: 4,
    name: "Sneha Patel",
    title: "UI/UX Designer",
    tagline: "Designing experiences that users love",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&q=80",
    location: "Delhi, India",
    email: "sneha@softcrayons.com",
    featured: false,
    stats: {
      experience: "6+",
      projects: "80+",
      students: "900+",
      rating: 4.7,
    },
    skills: ["Figma", "Adobe XD", "Sketch", "Prototyping", "User Research"],
    specialization: "UI/UX Design",
    about: "Creative designer focused on creating intuitive and beautiful user interfaces. Believer in user-centered design principles.",
    badges: ["Design Thinker", "Accessibility Advocate", "Mentor"],
  },
  {
    id: 5,
    name: "Amit Kumar",
    title: "Mobile App Developer",
    tagline: "Creating apps that make a difference",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&q=80",
    location: "Hyderabad, India",
    email: "amit@softcrayons.com",
    featured: false,
    stats: {
      experience: "7+",
      projects: "45+",
      students: "1200+",
      rating: 4.8,
    },
    skills: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
    specialization: "Mobile Development",
    about: "Mobile app developer specializing in cross-platform development. Published multiple apps with millions of downloads.",
    badges: ["App Store Featured", "Flutter Expert", "Tech Blogger"],
  },
  {
    id: 6,
    name: "Neha Gupta",
    title: "Cybersecurity Specialist",
    tagline: "Protecting digital assets in the modern world",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&q=80",
    location: "Pune, India",
    email: "neha@softcrayons.com",
    featured: false,
    stats: {
      experience: "9+",
      projects: "60+",
      students: "800+",
      rating: 4.9,
    },
    skills: ["Ethical Hacking", "Network Security", "SIEM", "Penetration Testing", "Compliance"],
    specialization: "Cybersecurity",
    about: "Cybersecurity expert with experience in enterprise security. Certified ethical hacker helping organizations secure their infrastructure.",
    badges: ["CEH Certified", "Security Researcher", "Bug Hunter"],
  },
  {
    id: 7,
    name: "Vikram Singh",
    title: "Backend Developer",
    tagline: "Building robust and scalable server solutions",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&q=80",
    location: "Chennai, India",
    email: "vikram@softcrayons.com",
    featured: false,
    stats: {
      experience: "6+",
      projects: "55+",
      students: "700+",
      rating: 4.6,
    },
    skills: ["Java", "Spring Boot", "Microservices", "PostgreSQL", "Redis"],
    specialization: "Backend Development",
    about: "Backend specialist with deep expertise in Java ecosystem. Passionate about building high-performance, distributed systems.",
    badges: ["Java Champion", "System Designer", "Code Reviewer"],
  },
  {
    id: 8,
    name: "Ananya Reddy",
    title: "DevOps Engineer",
    tagline: "Bridging the gap between development and operations",
    image: "https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?w=400&h=400&fit=crop&q=80",
    location: "Kolkata, India",
    email: "ananya@softcrayons.com",
    featured: false,
    stats: {
      experience: "5+",
      projects: "40+",
      students: "600+",
      rating: 4.7,
    },
    skills: ["CI/CD", "Jenkins", "GitLab", "Ansible", "Linux"],
    specialization: "DevOps & Automation",
    about: "DevOps engineer passionate about automation and continuous improvement. Helping teams deliver software faster and more reliably.",
    badges: ["Automation Expert", "Linux Admin", "Agile Practitioner"],
  },
];

export default function FacultiesPage() {
  const featuredFaculties = facultiesData.filter((f) => f.featured);
  const regularFaculties = facultiesData.filter((f) => !f.featured);

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container">
        {/* Header */}
        <div className="mb-12 max-w-3xl">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Our Expert Team
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
            Learn from{" "}
            <span className="text-gradient">Industry Experts</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Our faculty members bring years of real-world experience to help you master the skills that matter. Get mentored by the best in the industry.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { icon: Award, value: `${facultiesData.length}+`, label: "Expert Mentors" },
            { icon: Code, value: "50+", label: "Years Combined Experience" },
            { icon: GraduationCap, value: "10K+", label: "Students Mentored" },
            { icon: Star, value: "4.8", label: "Average Rating" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-5 text-center hover:border-primary/30 transition-colors"
            >
              <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-muted-foreground text-xs uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Featured Faculty Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5">
              <Star className="w-4 h-4 text-primary fill-primary" />
              <span className="text-foreground text-sm font-medium">Featured Faculty</span>
            </div>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="space-y-6">
            {featuredFaculties.map((faculty, index) => (
              <FeaturedFacultyCard key={faculty.id} faculty={faculty} index={index} />
            ))}
          </div>
        </section>

        {/* All Faculty Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center gap-2 bg-muted border border-border rounded-full px-4 py-1.5">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-foreground text-sm font-medium">All Faculty Members</span>
            </div>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {regularFaculties.map((faculty) => (
              <FacultyCard
                key={faculty.id}
                name={faculty.name}
                role={faculty.title}
                experience={faculty.stats.experience}
                image={faculty.image}
                skills={faculty.skills}
              />
            ))}
          </div>
        </section>

        {/* Join CTA */}
        <section className="bg-card border border-border rounded-2xl p-8 md:p-12 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-4">
            <Heart className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">Join Our Team</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Want to Become a Mentor?
          </h2>

          <p className="text-muted-foreground max-w-xl mx-auto mb-6">
            Are you passionate about teaching and have expertise in technology? We&apos;re always looking for talented instructors to join our team.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/instructor">
              <Button  className="w-full sm:w-auto group">
                <Mail className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                Apply to be an Instructor
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}