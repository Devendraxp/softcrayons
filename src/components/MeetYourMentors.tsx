"use client";

import { useState, useEffect } from "react";
import { Star, Linkedin, Award, Code, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionLoader } from "@/components/ui/loader";

interface Faculty {
  id: number;
  name: string;
  designation: string;
  domain: string | null;
  avatar: string | null;
  bio: string | null;
  experience: string | null;
  ProjectsHandled: string | null;
  studentsMentored: string | null;
  ratings: number | null;
  technologies: string[];
  locations: string | null;
  isFeatured: boolean;
}

function MentorCard({ faculty, index }: { faculty: Faculty; index: number }) {
  return (
    <div
      className="group relative bg-card border border-border rounded-2xl overflow-visible hover:shadow-xl hover:border-primary/30 transition-all duration-300 animate-fade-up"
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      {/* Card Content */}
      <div className="pt-16 pb-6 px-8 text-center">
        {/* Avatar popping out of top */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-card shadow-lg bg-muted">
              {faculty.avatar ? (
                <img
                  src={faculty.avatar}
                  alt={faculty.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-primary/70 text-white text-2xl font-bold">
                  {faculty.name.charAt(0)}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Name & Designation */}
        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
          {faculty.name}
        </h3>
        <p className="text-muted-foreground text-sm mt-1">{faculty.designation}</p>

        {/* Domain */}
        {faculty.domain && (
          <span className="inline-block mt-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
            {faculty.domain}
          </span>
        )}

        {/* Bio */}
        {faculty.bio && (
          <p className="text-muted-foreground text-sm mt-3 line-clamp-2 leading-relaxed">
            {faculty.bio}
          </p>
        )}

        {/* Stats Row */}
        <div className="flex items-center justify-center gap-4 mt-4 text-sm">
          {faculty.experience && (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Award className="w-4 h-4 text-primary" />
              <span className="font-medium">{faculty.experience} Exp</span>
            </div>
          )}
          {faculty.ratings && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="font-medium">{faculty.ratings}</span>
            </div>
          )}
          {faculty.studentsMentored && (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Users className="w-4 h-4 text-primary" />
              <span className="font-medium">{faculty.studentsMentored}</span>
            </div>
          )}
        </div>

        {/* Technologies */}
        {faculty.technologies && faculty.technologies.length > 0 && (
          <div className="flex flex-wrap justify-center gap-1.5 mt-4">
            {faculty.technologies.slice(0, 4).map((tech, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-md bg-muted text-muted-foreground text-xs font-medium border border-border"
              >
                {tech}
              </span>
            ))}
            {faculty.technologies.length > 4 && (
              <span className="px-2 py-0.5 rounded-md bg-muted text-muted-foreground text-xs font-medium border border-border">
                +{faculty.technologies.length - 4}
              </span>
            )}
          </div>
        )}

        {/* View Profile Button - appears on hover */}
        <div className="mt-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link href="/faculties">
            <Button variant="outline" size="sm" className="w-full">
              View Profile
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export function MeetYourMentors() {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const response = await fetch("/api/faculties?featured=true&limit=3");
        const data = await response.json();
        if (data.success) {
          setFaculties(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch faculties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFaculties();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-[#fdf6f0] dark:bg-primary/5">
        <div className="container">
          <SectionLoader text="mentors" />
        </div>
      </section>
    );
  }

  if (faculties.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-[#fdf6f0] dark:bg-primary/5">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
            Meet Your <span className="text-gradient">Mentors</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Learn from industry leaders who have worked at top companies and bring
            real-world expertise to every session.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {faculties.map((faculty, index) => (
            <MentorCard key={faculty.id} faculty={faculty} index={index} />
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <Link href="/faculties">
            <Button variant="outline" size="lg">
              View All Instructors
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
