import React from "react";
import { Star, MapPin, Mail, ExternalLink, Briefcase, GraduationCap, Code } from "lucide-react";

interface FacultyData {
  id: number;
  name: string;
  title: string;
  tagline: string;
  image: string;
  location: string;
  email: string;
  featured: boolean;
  stats: {
    experience: string;
    projects: string;
    students: string;
    rating: number;
  };
  skills: string[];
  specialization: string;
  about: string;
  badges: string[];
}

interface FeaturedFacultyCardProps {
  faculty: FacultyData;
  index: number;
}

export const FeaturedFacultyCard = ({ faculty, index }: FeaturedFacultyCardProps) => {
  const isReversed = index % 2 !== 0;

  return (
    <div className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300">
      {/* Featured Badge */}
      <div className="absolute top-4 right-4 z-10">
        <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
          <Star className="w-3 h-3 fill-current" />
          Featured
        </span>
      </div>

      <div className={`grid md:grid-cols-5 ${isReversed ? "md:grid-flow-dense" : ""}`}>
        {/* Image Section - 2 columns */}
        <div className={`relative md:col-span-2 min-h-[280px] md:min-h-[380px] bg-muted/30 ${isReversed ? "md:col-start-4" : ""}`}>
          {/* Simple Pattern Background */}
          <div 
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary) / 0.15) 1px, transparent 0)`,
              backgroundSize: "20px 20px",
            }}
          />

          {/* Avatar */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="w-36 h-36 md:w-44 md:h-44 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg">
                <span className="text-5xl md:text-6xl font-bold text-primary-foreground">
                  {faculty.name.charAt(0)}
                </span>
              </div>
              {/* Status */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[10px] font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                Available
              </div>
            </div>
          </div>
        </div>

        {/* Content Section - 3 columns */}
        <div className={`md:col-span-3 p-6 md:p-8 ${isReversed ? "md:col-start-1 md:row-start-1" : ""}`}>
          {/* Specialization */}
          <span className="inline-block text-primary text-xs font-semibold tracking-wider uppercase mb-2">
            {faculty.specialization}
          </span>

          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-1">{faculty.name}</h3>
          <p className="text-muted-foreground mb-3">{faculty.title}</p>

          {/* Tagline */}
          <p className="text-muted-foreground/80 text-sm italic mb-4 border-l-2 border-primary/50 pl-3">
            &ldquo;{faculty.tagline}&rdquo;
          </p>

          <p className="text-muted-foreground text-sm mb-6 leading-relaxed line-clamp-2">
            {faculty.about}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-2 mb-6">
            {[
              { icon: Briefcase, value: faculty.stats.experience, label: "Years" },
              { icon: Code, value: faculty.stats.projects, label: "Projects" },
              { icon: GraduationCap, value: faculty.stats.students, label: "Students" },
              { icon: Star, value: faculty.stats.rating, label: "Rating", filled: true },
            ].map((stat, idx) => (
              <div key={idx} className="text-center p-2.5 bg-muted/50 rounded-lg">
                <stat.icon className={`w-4 h-4 mx-auto mb-1 text-primary ${stat.filled ? "fill-primary" : ""}`} />
                <div className="text-foreground font-semibold text-sm">{stat.value}</div>
                <div className="text-muted-foreground text-[10px] uppercase">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {faculty.skills.map((skill, idx) => (
              <span
                key={idx}
                className="bg-muted text-muted-foreground text-xs px-3 py-1.5 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border">
            <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              {faculty.location}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};