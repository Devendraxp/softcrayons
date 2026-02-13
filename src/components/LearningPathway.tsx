"use client";

import { useEffect, useRef, useState } from "react";
import {
  UserPlus,
  BookOpen,
  FolderCode,
  MessageSquare,
  Briefcase,
  Flag,
  MapPin,
  Trophy,
} from "lucide-react";

const milestones = [
  { icon: UserPlus, title: "Enroll", label: "START" },
  { icon: BookOpen, title: "Master Skills", label: "LEVEL 1" },
  { icon: FolderCode, title: "Build Projects", label: "LEVEL 2" },
  { icon: MessageSquare, title: "Mock Interviews", label: "LEVEL 3" },
  { icon: Trophy, title: "Get Hired!", label: "FINISH" },
];

// Desktop milestone positions — winding game-map path (left→right→left→right→center)
const desktopPos = [
  { x: 12, y: 8 },
  { x: 52, y: 5 },
  { x: 82, y: 25 },
  { x: 42, y: 52 },
  { x: 75, y: 78 },
];

// SVG path segments for the winding road between milestones
const roadSegments = [
  "M 165 80 Q 300 20, 540 70",              // 1→2
  "M 580 75 Q 720 50, 830 165",             // 2→3
  "M 820 200 Q 740 340, 490 310",           // 3→4
  "M 470 330 Q 540 430, 770 440",           // 4→5
];

export function LearningPathway() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const wh = window.innerHeight;
      const start = wh * 0.85;
      const end = -rect.height * 0.25;
      setProgress(Math.min(Math.max((start - rect.top) / (start - end), 0), 1));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="py-28 md:py-36 bg-muted/20 overflow-hidden">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
            Your <span className="text-gradient">Learning Pathway</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Follow the map - each milestone brings you closer to your dream job.
          </p>
        </div>
        <div className="hidden md:block max-w-5xl mx-auto">
          <div className="relative" style={{ height: "520px" }}>

            {/* Decorative dots scattered like a game map */}
            {[
              { l: 15, t: 12 }, { l: 32, t: 45 }, { l: 78, t: 18 },
              { l: 55, t: 72 }, { l: 22, t: 68 }, { l: 88, t: 35 },
              { l: 42, t: 88 }, { l: 68, t: 55 }, { l: 18, t: 32 },
              { l: 75, t: 82 }, { l: 48, t: 22 }, { l: 62, t: 42 },
              { l: 28, t: 78 }, { l: 85, t: 65 }, { l: 38, t: 15 },
              { l: 72, t: 48 }, { l: 52, t: 58 }, { l: 14, t: 52 },
            ].map((pos, i) => (
              <div
                key={`dot-${i}`}
                className="absolute w-1.5 h-1.5 rounded-full bg-border/60"
                style={{ left: `${pos.l}%`, top: `${pos.t}%` }}
              />
            ))}

            {/* SVG winding road */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 1000 520"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Background road (gray dashed) */}
              {roadSegments.map((d, i) => (
                <path
                  key={`bg-${i}`}
                  d={d}
                  stroke="currentColor"
                  className="text-border"
                  strokeWidth="3"
                  strokeDasharray="12 8"
                  fill="none"
                  strokeLinecap="round"
                />
              ))}

              {/* Animated road (primary color) */}
              {roadSegments.map((d, i) => {
                const segStart = i * 0.25;
                const segProgress = Math.max(Math.min((progress - segStart) / 0.25, 1), 0);
                return (
                  <path
                    key={`fg-${i}`}
                    d={d}
                    stroke="hsl(var(--primary))"
                    strokeWidth="3.5"
                    strokeDasharray="12 8"
                    fill="none"
                    strokeLinecap="round"
                    className="transition-all duration-500"
                    pathLength="1000"
                    style={{
                      strokeDashoffset: `${(1 - segProgress) * 1000}`,
                      opacity: segProgress > 0 ? 1 : 0,
                    }}
                  />
                );
              })}
            </svg>

            {/* Milestone nodes */}
            {milestones.map((m, i) => {
              const pos = desktopPos[i];
              const threshold = i / (milestones.length - 1);
              const isActive = progress >= threshold * 0.85;
              const isFinish = i === milestones.length - 1;
              const Icon = m.icon;

              return (
                <div
                  key={m.title}
                  className="absolute flex flex-col items-center transition-all duration-700"
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    transform: isActive ? "scale(1)" : "scale(0.9)",
                  }}
                >
                  {/* Level label */}
                  <span
                    className={`text-[10px] font-bold tracking-[0.2em] uppercase mb-2 transition-all duration-500 ${
                      isActive ? "text-primary" : "text-muted-foreground/30"
                    }`}
                  >
                    {m.label}
                  </span>

                  {/* Milestone marker */}
                  <div className="relative">
                    {/* Glow ring for active */}
                    {isActive && (
                      <div className="absolute -inset-2 rounded-full bg-primary/10 animate-pulse" />
                    )}

                    {/* Flag/pin for start/finish */}
                    {(i === 0 || isFinish) && isActive && (
                      <div className="absolute -top-3 -right-1 z-20">
                        {isFinish ? (
                          <Flag className="w-4 h-4 text-primary fill-primary" />
                        ) : (
                          <MapPin className="w-4 h-4 text-primary fill-primary" />
                        )}
                      </div>
                    )}

                    <div
                      className={`relative z-10 w-16 h-16 lg:w-[72px] lg:h-[72px] rounded-full flex items-center justify-center transition-all duration-700 border-[3px] ${
                        isFinish && isActive
                          ? "bg-primary text-white border-primary shadow-lg shadow-primary/30"
                          : isActive
                            ? "bg-card border-primary text-primary shadow-md shadow-primary/10"
                            : "bg-card border-border text-muted-foreground/30"
                      }`}
                    >
                      <Icon
                        className={`w-7 h-7 transition-all duration-500 ${
                          isActive ? "opacity-100" : "opacity-25"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className={`mt-3 text-sm lg:text-base font-bold text-center whitespace-nowrap transition-all duration-500 ${
                      isFinish && isActive
                        ? "text-primary"
                        : isActive
                          ? "text-foreground"
                          : "text-muted-foreground/25"
                    }`}
                  >
                    {m.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>

        {/* ============ MOBILE GAME MAP ============ */}
        <div className="md:hidden mx-auto" style={{ maxWidth: "320px" }}>
          <div className="relative" style={{ height: "560px" }}>

            {/* Decorative dots */}
            {[
              { l: 25, t: 15 }, { l: 65, t: 28 }, { l: 40, t: 48 },
              { l: 72, t: 65 }, { l: 20, t: 72 }, { l: 55, t: 85 },
              { l: 35, t: 35 }, { l: 80, t: 42 }, { l: 48, t: 58 },
              { l: 30, t: 90 },
            ].map((pos, i) => (
              <div
                key={`mdot-${i}`}
                className="absolute w-1 h-1 rounded-full bg-border/50"
                style={{ left: `${pos.l}%`, top: `${pos.t}%` }}
              />
            ))}

            {/* SVG winding vertical path */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 320 560"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Background road */}
              <path
                d="M 80 50 Q 200 80, 240 130 Q 280 180, 100 210 Q 20 230, 80 300 Q 140 350, 240 370 Q 310 385, 230 460 Q 180 500, 200 530"
                stroke="currentColor"
                className="text-border"
                strokeWidth="3"
                strokeDasharray="10 7"
                fill="none"
                strokeLinecap="round"
              />
              {/* Animated road */}
              <path
                d="M 80 50 Q 200 80, 240 130 Q 280 180, 100 210 Q 20 230, 80 300 Q 140 350, 240 370 Q 310 385, 230 460 Q 180 500, 200 530"
                stroke="hsl(var(--primary))"
                strokeWidth="3.5"
                strokeDasharray="10 7"
                fill="none"
                strokeLinecap="round"
                className="transition-all duration-500"
                pathLength="1000"
                style={{
                  strokeDashoffset: `${(1 - progress) * 1000}`,
                  opacity: progress > 0 ? 1 : 0,
                }}
              />
            </svg>

            {/* Mobile milestone nodes on the winding path */}
            {milestones.map((m, i) => {
              const threshold = i / (milestones.length - 1);
              const isActive = progress >= threshold * 0.85;
              const isFinish = i === milestones.length - 1;
              const Icon = m.icon;

              // Positions along the winding path
              const mobilePos = [
                { x: 12, y: 3 },
                { x: 58, y: 17 },
                { x: 10, y: 34 },
                { x: 56, y: 57 },
                { x: 45, y: 78 },
              ];
              const pos = mobilePos[i];

              return (
                <div
                  key={m.title}
                  className="absolute flex flex-col items-center"
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                  }}
                >
                  {/* Level label */}
                  <span
                    className={`text-[9px] font-bold tracking-[0.15em] uppercase mb-1.5 transition-all duration-500 ${
                      isActive ? "text-primary" : "text-muted-foreground/25"
                    }`}
                  >
                    {m.label}
                  </span>

                  <div className="relative">
                    {isActive && (
                      <div className="absolute -inset-1.5 rounded-full bg-primary/10 animate-pulse" />
                    )}
                    <div
                      className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-700 border-[2.5px] ${
                        isFinish && isActive
                          ? "bg-primary text-white border-primary shadow-md shadow-primary/25"
                          : isActive
                            ? "bg-card border-primary text-primary shadow-sm"
                            : "bg-card border-border text-muted-foreground/25"
                      }`}
                    >
                      <Icon className={`w-5 h-5 transition-all duration-500 ${isActive ? "opacity-100" : "opacity-25"}`} />
                    </div>
                  </div>

                  <h3
                    className={`mt-2 text-xs font-bold text-center whitespace-nowrap transition-all duration-500 ${
                      isFinish && isActive
                        ? "text-primary"
                        : isActive
                          ? "text-foreground"
                          : "text-muted-foreground/25"
                    }`}
                  >
                    {m.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
