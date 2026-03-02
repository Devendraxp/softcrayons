"use client";

import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";
import Link from "next/link";
import { useEffect, useMemo, useState, useCallback } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

const TECH_CHIPS = [
  { name: "Java",       src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
  { name: "Python",     src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "React",      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "AWS",        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { name: "Docker",     src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
  { name: "Node.js",    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "Angular",    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg" },
  { name: "GenAI",      src: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/openai.svg" },
  { name: "Cloud",      src: "https://cdn.simpleicons.org/googlecloud/4285F4" },
  { name: "AutoCAD",    src: "https://cdn.simpleicons.org/autodesk/0696D7" },
  { name: "Graphics",   src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg" },
  { name: "DevOps",     src: "https://cdn.simpleicons.org/githubactions/2088FF" },
];

const FLOAT_ANIMS = ["float-drift-1", "float-drift-2", "float-drift-3", "float-drift-4", "float-drift-5"];



function CircuitLines() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="circuit-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(25 95% 53% / 0)" />
          <stop offset="50%" stopColor="hsl(25 95% 53% / 0.3)" />
          <stop offset="100%" stopColor="hsl(25 95% 53% / 0)" />
        </linearGradient>
        <linearGradient id="circuit-grad-2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(220 70% 50% / 0)" />
          <stop offset="50%" stopColor="hsl(220 70% 50% / 0.25)" />
          <stop offset="100%" stopColor="hsl(220 70% 50% / 0)" />
        </linearGradient>
      </defs>
      <path
        d="M0,192 L192,192 L192,128 L384,128 L384,256 L576,256 L576,192 L768,192 L768,128 L960,128 L960,256"
        fill="none"
        stroke="url(#circuit-grad-1)"
        strokeWidth="1"
        strokeDasharray="8 12"
        style={{ animation: "circuit-flow 22s linear infinite" }}
      />
      <path
        d="M960,64 L768,64 L768,192 L576,192 L576,64 L384,64 L384,192 L192,192 L192,320 L0,320"
        fill="none"
        stroke="url(#circuit-grad-1)"
        strokeWidth="1"
        strokeDasharray="6 14"
        style={{ animation: "circuit-flow-reverse 28s linear infinite" }}
      />
      <path
        d="M0,96 L64,96 L64,256 L192,256 L192,128 L320,128 L320,320 L448,320 L448,192 L640,192 L640,320 L800,320"
        fill="none"
        stroke="url(#circuit-grad-2)"
        strokeWidth="1"
        strokeDasharray="10 10"
        style={{ animation: "circuit-flow 20s linear infinite" }}
      />
      <path
        d="M800,512 L800,384 L640,384 L640,256 L480,256 L480,384 L320,384 L320,192 L160,192 L160,384 L0,384"
        fill="none"
        stroke="url(#circuit-grad-2)"
        strokeWidth="1"
        strokeDasharray="8 16"
        style={{ animation: "circuit-flow-reverse 24s linear infinite" }}
      />
      <path
        d="M0,448 L128,448 L128,320 L256,320 L256,448 L512,448 L512,320 L650,320"
        fill="none"
        stroke="url(#circuit-grad-1)"
        strokeWidth="0.8"
        strokeDasharray="5 18"
        style={{ animation: "circuit-flow 30s linear infinite" }}
      />
    </svg>
  );
}

function ShimmerButton({
  children,
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <span
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 3s ease-in-out infinite",
        }}
      />
    </Button>
  );
}

export function HeroSection() {
  const [particlesReady, setParticlesReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setParticlesReady(true));
  }, []);

  const particlesOptions: ISourceOptions = useMemo(
    () => ({
      fullScreen: { enable: false },
      fpsLimit: 60,
      particles: {
        color: { value: "hsl(25, 95%, 53%)" },
        links: {
          color: "hsl(25, 95%, 53%)",
          distance: 120,
          enable: true,
          opacity: 0.08,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.4,
          direction: "none" as const,
          outModes: { default: "bounce" as const },
        },
        number: {
          density: { enable: true },
          value: 60,
        },
        opacity: { value: 0.15 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 2 } },
      },
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "grab",
          },
        },
        modes: {
          grab: {
            distance: 140,
            links: { opacity: 0.25 },
          },
        },
      },
      detectRetina: true,
    }),
    []
  );

  const particlesLoaded = useCallback(async () => {}, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-0 -left-1/4 w-[600px] h-[600px] rounded-full blur-[120px] animate-pulse-slow"
          style={{
            background:
              "radial-gradient(circle, rgba(255,140,0,0.15) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 -right-1/4 w-[600px] h-[600px] rounded-full blur-[120px] animate-pulse-slow"
          style={{
            background:
              "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)",
            animationDelay: "2s",
          }}
        />
        <div
          className="absolute top-1/3 right-1/3 w-[400px] h-[400px] rounded-full blur-[100px] opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(255,140,0,0.1) 0%, rgba(37,99,235,0.05) 50%, transparent 70%)",
          }}
        />
      </div>

      <CircuitLines />

      {particlesReady && (
        <Particles
          id="hero-particles"
          className="absolute inset-0 z-[1]"
          particlesLoaded={particlesLoaded}
          options={particlesOptions}
        />
      )}

      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.15)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.15)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_110%_90%_at_15%_0%,#000_55%,transparent_95%)]" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-up backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-sm font-medium text-primary">
                New Batch Starting Soon
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-6 animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              Learn Skills That
              <br /> Actually Get You
              <span className="relative inline-block">
                <span className="text-gradient"> &nbsp; Hired !</span>
                <span
                  className="absolute bottom-1 left-1 right-0 h-3 bg-primary/20 -skew-x-6 rounded-sm -z-10"
                  style={{
                    animation: "marker-draw 0.8s ease-out 0.8s forwards",
                    width: 0,
                  }}
                />
              </span>
            </h1>

            <p
              className="text-lg sm:text-xl text-muted-foreground max-w-xl mb-10 animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              At SoftCrayons, education goes far beyond textbooks and theory. We
              focus on practical learning that equips you with real, job-ready
              skills.
            </p>

            <div
              className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 animate-fade-up"
              style={{ animationDelay: "0.3s" }}
            >
              <Link href="/query">
                <ShimmerButton className="group w-full sm:w-auto cursor-pointer">
                  Start Learning
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </ShimmerButton>
              </Link>
              <Link href="/courses">
                <Button
                  variant="outline"
                  className="group w-full sm:w-auto backdrop-blur-sm bg-background/50 border-border/50 hover:bg-primary/5 hover:border-primary/30 transition-all duration-300 cursor-pointer"
                >
                  <Play className="w-5 h-5" />
                  View Courses
                </Button>
              </Link>
            </div>

            <div
              className="mt-12 animate-fade-up"
              style={{ animationDelay: "0.4s" }}
            >
              <p className="text-sm text-muted-foreground mb-4">
                Technologies you&apos;ll master
              </p>
              <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                <Marquee pauseOnHover duration={30}>
                  {TECH_CHIPS.map((tech) => (
                    <span
                      key={tech.name}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 border border-border text-sm font-mono font-medium hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 cursor-default backdrop-blur-sm whitespace-nowrap"
                    >
                      <img src={tech.src} alt={tech.name} width={16} height={16} className="w-4 h-4" />
                      {tech.name}
                    </span>
                  ))}
                </Marquee>
              </div>
            </div>
          </div>

          <div
            className="relative animate-fade-up hidden lg:block"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="relative">
              <div
                className="absolute -inset-4 rounded-3xl blur-[60px] opacity-60"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,140,0,0.25) 0%, rgba(37,99,235,0.15) 100%)",
                }}
              />

              <div className="relative rounded-3xl border border-white/10 bg-white/5 dark:bg-white/[0.03] backdrop-blur-xl p-3 shadow-2xl">

                <img
                  src="https://res.cloudinary.com/dbrxgmnyn/image/upload/v1772445831/faculty-avatars/lt7xi0km2ovj0f7jwbeb.png"
                  alt="SoftCrayons instructors"
                  className="w-full h-auto rounded-2xl relative z-[8]"
                  style={{
                    filter: "contrast(1.05) saturate(1.1)",
                    clipPath: "inset(0 0 0 0 round 1rem)",
                  }}
                />

                <div className="absolute -top-6 -left-6 -right-6 -bottom-6 z-0 pointer-events-none">
                  <div className="absolute top-0 left-1/4 w-20 h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                  <div className="absolute bottom-0 right-1/4 w-20 h-[2px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
                  <div className="absolute left-0 top-1/4 h-20 w-[2px] bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
                  <div className="absolute right-0 bottom-1/4 h-20 w-[2px] bg-gradient-to-b from-transparent via-blue-500/30 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 rounded-full bg-primary animate-pulse" />
        </div>
      </div>
    </section>
  );
}
