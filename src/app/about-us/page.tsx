import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, Clock, Award, BookOpen, GraduationCap, Users, Trophy } from "lucide-react";
import Image from "next/image";
import { DynamicFacultyCarousel } from "@/components/faculties/DynamicFacultyCarousel";

// Placeholder data - update as needed
const branches = [
    {
        id: 1,
        name: "SoftCrayons - Main Branch",
        address: "123 Main Street, Sector 62, Noida, Uttar Pradesh - 201301",
        phone: "+91 98765 43210",
        altPhone: "+91 98765 43211",
        email: "main@softcrayons.com",
        timing: "Mon - Sat: 9:00 AM - 7:00 PM",
    },
    {
        id: 2,
        name: "SoftCrayons - Branch 2",
        address: "456 Tech Park, Sector 18, Noida, Uttar Pradesh - 201301",
        phone: "+91 98765 43212",
        altPhone: "+91 98765 43213",
        email: "branch2@softcrayons.com",
        timing: "Mon - Sat: 9:00 AM - 7:00 PM",
    },
];

const leadership = [
    {
        name: "Dr. Anil Sharma",
        role: "Director",
        experience: "20+ Years in IT Education",
        description: "Visionary leader with extensive experience in IT training and corporate solutions.",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
    },
    {
        name: "Meera Kapoor",
        role: "Center Manager",
        experience: "15+ Years in Education Management",
        description: "Expert in operations and student success with a passion for quality education.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
    },
];

const stats = [
    { icon: GraduationCap, value: "15+", label: "Years Experience" },
    { icon: Users, value: "10000+", label: "Students Trained" },
    { icon: BookOpen, value: "50+", label: "Courses Offered" },
    { icon: Trophy, value: "95%", label: "Placement Rate" },
];

export default function AboutUsPage() {
    return (
        <div className="min-h-screen bg-background">
            <main>
                {/* Hero Section */}
                <section className="pt-32 pb-20">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto text-center">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 tracking-tight">
                                <span className="text-gradient">Your Success Story </span> Starts Here
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
                                SoftCrayons is a leading IT training institute dedicated to transforming
                                aspiring professionals into industry-ready experts. With years of experience
                                and a commitment to excellence, we provide comprehensive training programs
                                that bridge the gap between academia and industry.
                            </p>

                            {/* Stats - Plain like home page */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
                                {stats.map((stat, index) => (
                                    <div key={index} className="text-center">
                                        <stat.icon className="w-10 h-10 text-primary mx-auto mb-3" />
                                        <div className="text-4xl md:text-5xl font-black text-foreground mb-1">
                                            {stat.value}
                                        </div>
                                        <div className="text-muted-foreground font-medium">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Branches Section */}
                <section className="py-20 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                                Our Locations
                            </span>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
                                Visit Our <span className="text-gradient">Branches</span>
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                We have multiple locations to serve you better
                            </p>
                        </div>

                        <div className="space-y-12 max-w-5xl mx-auto">
                            {branches.map((branch, index) => (
                                <div
                                    key={branch.id}
                                    className="grid md:grid-cols-2 gap-8 items-center"
                                >
                                    {/* Map Placeholder */}
                                    <div className={`bg-muted rounded-2xl min-h-[300px] flex items-center justify-center ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                                        <div className="text-center p-8">
                                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                                <MapPin className="w-8 h-8 text-primary" />
                                            </div>
                                            <p className="text-muted-foreground font-medium">
                                                Google Map will be added here
                                            </p>
                                        </div>
                                    </div>

                                    {/* Branch Details */}
                                    <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                                        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                                            {index === 0 ? "Main Branch" : `Branch ${index + 1}`}
                                        </span>
                                        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                                            {branch.name}
                                        </h3>

                                        <div className="space-y-4">
                                            <div className="flex items-start gap-4 group cursor-pointer">
                                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                                                    <MapPin className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">Address</p>
                                                    <p className="text-muted-foreground">{branch.address}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-4 group cursor-pointer">
                                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                                                    <Phone className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">Phone</p>
                                                    <p className="text-muted-foreground">{branch.phone}</p>
                                                    <p className="text-muted-foreground">{branch.altPhone}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-4 group cursor-pointer">
                                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                                                    <Mail className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">Email</p>
                                                    <p className="text-muted-foreground">{branch.email}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-4 group cursor-pointer">
                                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                                                    <Clock className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">Working Hours</p>
                                                    <p className="text-muted-foreground">{branch.timing}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Faculties Section */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                                Our Team
                            </span>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
                                Meet Our Expert <span className="text-gradient">Faculties</span>
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Learn from industry professionals with years of real-world experience
                            </p>
                        </div>

                        <div className="max-w-6xl mx-auto">
                            <DynamicFacultyCarousel />
                        </div>
                    </div>
                </section>

                {/* Leadership Section */}
                <section className="py-20 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                                Leadership
                            </span>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
                                Our <span className="text-gradient">Leadership Team</span>
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Guided by experienced professionals committed to your success
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                            {leadership.map((leader, index) => (
                                <div
                                    key={index}
                                    className="text-center group cursor-pointer"
                                >
                                    {/* Rounded Image */}
                                    <div className="relative w-48 h-48 rounded-full overflow-hidden ring-4 ring-primary/10 group-hover:ring-primary/40 transition-all duration-300 mx-auto mb-6">
                                        <Image
                                            src={leader.image}
                                            alt={leader.name}
                                            fill
                                            className="object-cover object-top"
                                        />
                                    </div>

                                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-3">
                                        {leader.role}
                                    </span>
                                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 mb-2">
                                        {leader.name}
                                    </h3>
                                    <div className="flex items-center justify-center gap-2 mb-4">
                                        <Award className="w-4 h-4 text-primary" />
                                        <p className="text-primary font-semibold">
                                            {leader.experience}
                                        </p>
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">
                                        {leader.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Closing Section */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto text-center">
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                                <BookOpen className="w-8 h-8 text-primary" />
                            </div>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-6">
                                Start Your Journey <span className="text-gradient">With Us</span>
                            </h2>
                            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                                Join thousands of successful professionals who have transformed their
                                careers with SoftCrayons. Whether you&apos;re a fresher looking to start
                                your IT career or a professional seeking to upskill, we have the right
                                program for you.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 group cursor-pointer hover:bg-primary transition-colors">
                                    <Award className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                                    <span className="font-medium text-foreground group-hover:text-white transition-colors">ISO Certified</span>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 group cursor-pointer hover:bg-primary transition-colors">
                                    <Users className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                                    <span className="font-medium text-foreground group-hover:text-white transition-colors">Expert Trainers</span>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 group cursor-pointer hover:bg-primary transition-colors">
                                    <BookOpen className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                                    <span className="font-medium text-foreground group-hover:text-white transition-colors">Industry Curriculum</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}