"use client";

import { ArrowRight, Calendar, Star, CheckCircle, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";
import Link from "next/link";
import { useEffect, useMemo, useState, useCallback } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

const TECH_CHIPS = [
  { name: "Java",     src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
  { name: "Python",   src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "React",    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "AWS",      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { name: "Docker",   src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
  { name: "Node.js",  src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "Angular",  src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg" },
  { name: "GenAI",    src: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/openai.svg" },
  { name: "Cloud",    src: "https://cdn.simpleicons.org/googlecloud/4285F4" },
  { name: "AutoCAD",  src: "https://cdn.simpleicons.org/autodesk/0696D7" },
  { name: "Graphics", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg" },
  { name: "DevOps",   src: "https://cdn.simpleicons.org/githubactions/2088FF" },
];

export function HeroSection() {
  const [particlesReady, setParticlesReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setParticlesReady(true));
  }, []);

  // Now properly using the CSS variable for the primary color
  const particlesOptions: ISourceOptions = useMemo(
    () => ({
      fullScreen: { enable: false },
      fpsLimit: 60,
      particles: {
        color: { value: "hsl(var(--primary))" }, 
        links: {
          color: "hsl(var(--primary))",
          distance: 120,
          enable: true,
          opacity: 0.15,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.3,
          direction: "none" as const,
          outModes: { default: "bounce" as const },
        },
        number: {
          density: { enable: true },
          value: 40,
        },
        opacity: { value: 0.2 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 2 } },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: "grab" },
        },
        modes: {
          grab: { distance: 140, links: { opacity: 0.3 } },
        },
      },
      detectRetina: true,
    }),
    []
  );

  const particlesLoaded = useCallback(async () => {}, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 overflow-hidden bg-background">
      {/* Subtle Background Glows strictly using CSS variables */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 -left-1/4 w-[600px] h-[600px] rounded-full blur-[120px] animate-pulse-slow"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 -right-1/4 w-[600px] h-[600px] rounded-full blur-[120px] animate-pulse-slow"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 70%)",
            animationDelay: "2s",
          }}
        />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.2)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.2)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_110%_90%_at_15%_0%,black_55%,transparent_95%)] pointer-events-none" />

      {particlesReady && (
        <Particles
          id="hero-particles"
          className="absolute inset-0 z-[1] pointer-events-none"
          particlesLoaded={particlesLoaded}
          options={particlesOptions}
        />
      )}

      <div className="container relative z-10 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          <div className="text-center lg:text-left order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 mb-6 animate-fade-up backdrop-blur-sm shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Noida's #1 Tech Institute
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-black leading-[1.1] mb-6 animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              We Guarantee<br className="hidden lg:block" />
              Your{" "}
              <span className="relative inline-block">
                <span className="text-gradient">Placement!</span>
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-primary/30"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 5 Q 50 10 100 5"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p
              className="text-lg sm:text-xl text-muted-foreground max-w-xl mb-8 animate-fade-up mx-auto lg:mx-0 leading-relaxed"
              style={{ animationDelay: "0.2s" }}
            >
              Education goes far beyond textbooks. We focus on hands-on, practical learning that equips you with real, job-ready skills for the modern tech industry.
            </p>

            <div
              className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 animate-fade-up"
              style={{ animationDelay: "0.3s" }}
            >
              <Link href="/courses">
                <Button size="lg" className="w-full sm:w-auto text-base h-12 px-8 group">
                  Explore Courses
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/query">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto text-base h-12 px-8 bg-background/50 backdrop-blur-sm hover:bg-primary/5 hover:text-primary hover:border-primary/50 transition-all"
                >
                  <Book className="mr-2 w-4 h-4" />
                  Start Learning for Free
                </Button>
              </Link>
            </div>
          </div>

          <div
            className="relative animate-fade-up order-2 w-full max-w-lg mx-auto lg:max-w-none"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="relative z-10">
              <img
                src="https://res.cloudinary.com/dbrxgmnyn/image/upload/v1772445831/faculty-avatars/lt7xi0km2ovj0f7jwbeb.png"
                alt="SoftCrayons Instructors"
                className="w-full h-auto rounded-2xl object-cover relative z-10"
                style={{
                  filter: "contrast(1.02) saturate(1.05)",
                }}
              />

            </div>
            
            <div className="absolute inset-0 bg-primary/10 blur-[80px] -z-10 rounded-full scale-90 translate-y-4" />
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-16 lg:mt-24 bg-gradient-to-r from-background via-muted/30 to-background backdrop-blur-sm py-6 shadow-[0_-10px_40px_rgba(0,0,0,0.04)]">
        <div className="container flex flex-col lg:flex-row items-center gap-6">
          <p className="text-sm font-semibold text-muted-foreground whitespace-nowrap">
            Technologies you'll master:
          </p>
          <div className="flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
            <Marquee pauseOnHover duration={40}>
              {TECH_CHIPS.map((tech) => (
                <div
                  key={tech.name}
                  className="group flex items-center gap-2 px-4 py-2 mx-2 rounded-lg bg-card/80 shadow-sm transition-all duration-300 cursor-default"
                >
                  <img 
                    src={tech.src} 
                    alt={tech.name} 
                    className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all duration-300" 
                  />
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {tech.name}
                  </span>
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
}