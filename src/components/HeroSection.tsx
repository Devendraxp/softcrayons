"use client";

import { ArrowRight, BookOpen, CheckCircle2, PhoneCall, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";
import Link from "next/link";

const TECH_CHIPS = [
  { name: "Java", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
  { name: "Python", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "AWS", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { name: "Docker", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
  { name: "Node.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "Angular", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg" },
  { name: "GenAI", src: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/openai.svg" },
  { name: "Cloud", src: "https://cdn.simpleicons.org/googlecloud/4285F4" },
  { name: "AutoCAD", src: "https://cdn.simpleicons.org/autodesk/0696D7" },
  { name: "Graphics", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg" },
  { name: "DevOps", src: "https://cdn.simpleicons.org/githubactions/2088FF" },
];

const wins = ["Live mentor-led classes", "Project portfolio", "Interview practice", "Placement support"];

export function HeroSection() {
  return (
    <section className="brand-section relative min-h-screen overflow-hidden pt-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="container relative z-10 flex min-h-[calc(100vh-6rem)] flex-col justify-center py-14">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-3xl text-center lg:text-left">
            <span className="brand-eyebrow animate-fade-up">
              Noida and Ghaziabad #1 Tech Institute
            </span>

            <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl animate-fade-up">
              We Guarantee Your{" "}
              <span className="text-gradient">Placement</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl lg:mx-0 animate-fade-up">
              Practical IT courses, expert mentors, live projects, and placement-focused guidance for learners who want a real career path.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start animate-fade-up">
              <Link href="/query" className="w-full sm:w-auto">
                <Button size="lg" className="w-full group bg-secondary hover:bg-secondary/90">
                  Book Free Demo Class
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/courses" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full">
                  <BookOpen className="h-5 w-5" />
                  Explore Courses
                </Button>
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 animate-fade-up">
              {wins.map((win) => (
                <div key={win} className="flex items-center gap-2 rounded-md border border-border/80 bg-card/80 px-3 py-2 text-left text-sm font-semibold shadow-sm">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-secondary" />
                  <span>{win}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl animate-fade-up">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-primary/12 via-transparent to-secondary/16 blur-2xl" />
            <div className="brand-panel relative overflow-hidden rounded-lg p-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-muted">
                <img
                  src="https://res.cloudinary.com/dbrxgmnyn/image/upload/v1772445831/faculty-avatars/lt7xi0km2ovj0f7jwbeb.png"
                  alt="SoftCrayons classroom and mentors"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="mt-3 grid gap-3 sm:absolute sm:left-6 sm:right-6 sm:bottom-6 sm:mt-0 sm:grid-cols-2">
                <div className="rounded-md border border-white/40 bg-white/90 p-3 shadow-lg backdrop-blur sm:p-4">
                  <div className="flex items-center gap-1 text-secondary">
                    {[...Array(5)].map((_, index) => (
                      <Star key={index} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-2 text-sm font-black text-primary">Best Rated Teachers in Noida & Ghaziabad</p>
                </div>
                <Link href="tel:+918545012345" className="rounded-md border border-white/40 bg-primary p-3 text-primary-foreground shadow-lg transition hover:bg-primary/90 sm:p-4">
                  <div className="flex items-center gap-2 text-sm font-bold">
                    <PhoneCall className="h-4 w-4" />
                    Call for admission
                  </div>
                  <p className="mt-1 text-base font-black sm:text-lg">+91 85450 12345</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-y border-white/10 bg-[hsl(var(--brand-navy))] py-6 text-white">
        <div className="mb-4 text-center text-sm font-bold uppercase tracking-[0.18em] text-white/65">
          Technologies learners master here
        </div>
        <Marquee pauseOnHover duration={42} className="[--gap:1rem]">
          {TECH_CHIPS.map((tech) => (
            <div key={tech.name} className="flex min-w-[180px] items-center justify-center gap-3 rounded-md border border-white/10 bg-white/10 px-5 py-3">
              <img src={tech.src} alt={tech.name} className="h-6 w-6" />
              <span className="font-bold">{tech.name}</span>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
