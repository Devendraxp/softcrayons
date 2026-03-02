"use client";

import { useEffect, useRef, useState } from "react";
import {
  UserPlus,
  BookOpen,
  FolderCode,
  MessageSquare,
  Trophy,
  Flag,
  MapPin,
  Zap,
  Star,
} from "lucide-react";

const milestones = [
  {
    icon: UserPlus,
    title: "Enroll",
    label: "START",
    xp: "+5 XP",
    badge: null,
    skills: ["Choose Your Track", "Set Clear Goals", "Meet Your Mentor"],
    accentHsl: "217 91% 60%",   // blue
  },
  {
    icon: BookOpen,
    title: "Master Skills",
    label: "LEVEL 1",
    xp: "+10 Skills XP",
    badge: null,
    skills: ["Java / Python", "AWS & Cloud", "NestJS / React", "DSA"],
    accentHsl: "271 81% 56%",   // purple
  },
  {
    icon: FolderCode,
    title: "Build Projects",
    label: "LEVEL 2",
    xp: "+10 Portfolio XP",
    badge: "Portfolio XP",
    skills: ["Real-world Apps", "GitHub Portfolio", "Live Code Reviews"],
    accentHsl: "var(--primary-hsl, 25 95% 53%)",  // primary/orange
  },
  {
    icon: MessageSquare,
    title: "Mock Interviews",
    label: "LEVEL 3",
    xp: "Interview Ready",
    badge: "Interview Readiness 100%",
    skills: ["HR & Soft Skills", "Technical Rounds", "System Design"],
    accentHsl: "142 71% 45%",   // green
  },
  {
    icon: Trophy,
    title: "Get Hired!",
    label: "FINISH",
    xp: "+100 Career XP",
    badge: null,
    skills: ["Resume Polish", "Dream Job Offers", "Salary Negotiation"],
    accentHsl: "var(--primary-hsl, 25 95% 53%)",
    isFinish: true,
  },
];

const desktopPos = [
  { x: 12, y: 8 },
  { x: 52, y: 5 },
  { x: 82, y: 25 },
  { x: 42, y: 52 },
  { x: 75, y: 78 },
];

const roadSegments = [
  "M 165 80 Q 300 20, 540 70",
  "M 580 75 Q 720 50, 830 165",
  "M 820 200 Q 740 340, 490 310",
  "M 470 330 Q 540 430, 770 440",
];

const mobileRoadPath =
  "M 80 50 Q 200 80, 240 130 Q 280 180, 100 210 Q 20 230, 80 300 Q 140 350, 240 370 Q 310 385, 230 460 Q 180 500, 200 530";

const mobileNodePos = [
  { x: 12, y: 3 },
  { x: 58, y: 17 },
  { x: 10, y: 34 },
  { x: 56, y: 57 },
  { x: 45, y: 78 },
];

const codeSnippets = [
  { code: "useEffect(() => {\n  subscribe();\n  return () => unsub();\n}, []);", x: 2, y: 10, rotate: -8 },
  { code: "FROM node:20-alpine\nWORKDIR /app\nRUN npm ci", x: 68, y: 3, rotate: 6 },
  { code: "async fn deploy() {\n  let pod = k8s::Pod::new();\n  pod.run().await?;\n}", x: 5, y: 58, rotate: -5 },
  { code: "SELECT u.name, COUNT(*)\nFROM users u\nJOIN enrollments e ON…", x: 72, y: 60, rotate: 4 },
  { code: "@Injectable()\nexport class CourseService {\n  constructor(\n    private readonly db: PrismaClient\n  ) {}", x: 30, y: 88, rotate: -3 },
];

function glassCard(active: boolean, isFinish: boolean): React.CSSProperties {
  return {
    background: active
      ? isFinish
        ? "linear-gradient(135deg, hsl(25 95% 53% / 0.25), hsl(25 95% 53% / 0.08))"
        : "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))"
      : "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: active
      ? isFinish
        ? "1.5px solid hsl(25 95% 53% / 0.6)"
        : "1.5px solid rgba(255,255,255,0.25)"
      : "1.5px solid rgba(255,255,255,0.08)",
    boxShadow: active
      ? isFinish
        ? "0 0 28px hsl(25 95% 53% / 0.35), 0 8px 32px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.15)"
        : "0 0 18px rgba(255,255,255,0.06), 0 8px 24px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.12)"
      : "0 2px 8px rgba(0,0,0,0.06)",
  };
}

const shimmerCSS = `
@keyframes lp-shimmer {
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
}
@keyframes lp-float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-6px); }
}
@keyframes lp-packet {
  0%   { opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 1; }
  100% { opacity: 0; }
}
@keyframes lp-glow-pulse {
  0%, 100% { filter: drop-shadow(0 0 4px hsl(25 95% 53% / 0.5)); }
  50%       { filter: drop-shadow(0 0 12px hsl(25 95% 53% / 0.9)); }
}
`;

export function LearningPathway() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    // inject shimmer CSS once
    if (typeof document !== "undefined" && !document.getElementById("lp-css")) {
      const style = document.createElement("style");
      style.id = "lp-css";
      style.textContent = shimmerCSS;
      document.head.appendChild(style);
    }
  }, []);

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
    <section ref={sectionRef} className="relative py-28 md:py-36 bg-muted/20 overflow-hidden">

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ perspective: "600px" }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            transformOrigin: "50% 100%",
            transform: "rotateX(55deg) scaleY(2.2) translateY(30%)",
            backgroundImage:
              "linear-gradient(rgba(var(--primary-rgb,234 88 12)/0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--primary-rgb,234 88 12)/0.07) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            opacity: 0.6,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 80% 60% at 50% 100%, transparent 30%, hsl(var(--background)) 80%)",
          }}
        />
      </div>

      {codeSnippets.map((s, i) => (
        <pre
          key={i}
          aria-hidden
          className="pointer-events-none absolute text-[10px] leading-relaxed font-mono select-none hidden md:block"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            opacity: 0.045,
            transform: `rotate(${s.rotate}deg)`,
            color: "currentColor",
            whiteSpace: "pre",
          }}
        >
          {s.code}
        </pre>
      ))}

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
            Your <span className="text-gradient">Learning Pathway</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Follow the map — each milestone brings you closer to your dream job.
          </p>
        </div>

        <div className="hidden md:block max-w-5xl mx-auto">
          <div className="relative" style={{ height: "520px" }}>

            {/* Decorative dots */}
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
              <defs>
                {/* Neon glow filter for the active road */}
                <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="neon-glow-strong" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="7" result="blur1" />
                  <feGaussianBlur stdDeviation="3" result="blur2" />
                  <feMerge>
                    <feMergeNode in="blur1" />
                    <feMergeNode in="blur2" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                {/* Packet glow */}
                <filter id="packet-glow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

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

              {roadSegments.map((d, i) => {
                const segProgress = Math.max(Math.min((progress - i * 0.25) / 0.25, 1), 0);
                if (segProgress <= 0) return null;
                return (
                  <path
                    key={`halo-${i}`}
                    d={d}
                    stroke="hsl(25 95% 53%)"
                    strokeWidth="10"
                    strokeDasharray="12 8"
                    fill="none"
                    strokeLinecap="round"
                    filter="url(#neon-glow-strong)"
                    opacity={segProgress * 0.45}
                    pathLength="1000"
                    style={{ strokeDashoffset: `${(1 - segProgress) * 1000}` }}
                  />
                );
              })}

              {roadSegments.map((d, i) => {
                const segProgress = Math.max(Math.min((progress - i * 0.25) / 0.25, 1), 0);
                return (
                  <path
                    key={`fg-${i}`}
                    d={d}
                    stroke="hsl(25 95% 53%)"
                    strokeWidth="3.5"
                    strokeDasharray="12 8"
                    fill="none"
                    strokeLinecap="round"
                    filter="url(#neon-glow)"
                    pathLength="1000"
                    style={{
                      strokeDashoffset: `${(1 - segProgress) * 1000}`,
                      opacity: segProgress > 0 ? 1 : 0,
                      transition: "stroke-dashoffset 0.4s ease, opacity 0.3s",
                    }}
                  />
                );
              })}

              {roadSegments.map((d, i) => {
                const segProgress = Math.max(Math.min((progress - i * 0.25) / 0.25, 1), 0);
                if (segProgress < 0.9) return null;
                return (
                  <circle
                    key={`packet-${i}`}
                    r="5"
                    fill="hsl(25 95% 53%)"
                    filter="url(#packet-glow)"
                    style={{ animation: "lp-packet 2.4s ease-in-out infinite" }}
                  >
                    <animateMotion
                      dur="2.4s"
                      repeatCount="indefinite"
                      path={d}
                    />
                  </circle>
                );
              })}
            </svg>

            {/* Milestone nodes */}
            {milestones.map((m, i) => {
              const pos = desktopPos[i];
              const threshold = i / (milestones.length - 1);
              const isActive = progress >= threshold * 0.85;
              const isFinish = !!m.isFinish;
              const isHovered = hoveredIndex === i;
              const Icon = m.icon;

              return (
                <div
                  key={m.title}
                  className="absolute flex flex-col items-center"
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    zIndex: isHovered ? 30 : 10,
                    transition: "transform 0.4s ease",
                    transform: isActive ? (isHovered ? "scale(1.08)" : "scale(1)") : "scale(0.9)",
                  }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Level label */}
                  <div className="flex items-center gap-1.5 mb-2">
                    {isActive && (
                      <Zap
                        className="w-3 h-3"
                        style={{ color: `hsl(${m.accentHsl})`, opacity: 0.9 }}
                      />
                    )}
                    <span
                      className="text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-500"
                      style={{ color: isActive ? `hsl(${m.accentHsl})` : "rgba(var(--muted-foreground-rgb,0 0 0)/0.3)" }}
                    >
                      {m.label}
                    </span>
                  </div>

                  {/* Glass card */}
                  <div
                    className="rounded-2xl transition-all duration-500 cursor-pointer"
                    style={{
                      ...glassCard(isActive, isFinish),
                      width: isFinish ? "148px" : "130px",
                      padding: isFinish ? "16px 12px 14px" : "12px 10px 10px",
                      animation: isFinish && isActive ? "lp-float 3s ease-in-out infinite" : "none",
                    }}
                  >
                    {/* Icon circle */}
                    <div className="flex justify-center mb-2.5">
                      {/* Glow ring */}
                      {isActive && (
                        <div
                          className="absolute rounded-full"
                          style={{
                            width: isFinish ? "60px" : "52px",
                            height: isFinish ? "60px" : "52px",
                            background: `hsl(${m.accentHsl} / 0.2)`,
                            filter: `blur(8px)`,
                          }}
                        />
                      )}
                      <div
                        className="relative flex items-center justify-center rounded-full transition-all duration-500"
                        style={{
                          width: isFinish ? "58px" : "50px",
                          height: isFinish ? "58px" : "50px",
                          background: isActive
                            ? isFinish
                              ? `hsl(${m.accentHsl})`
                              : `hsl(${m.accentHsl} / 0.15)`
                            : "rgba(255,255,255,0.04)",
                          border: `2px solid hsl(${m.accentHsl} / ${isActive ? 0.7 : 0.15})`,
                          boxShadow: isActive ? `0 0 16px hsl(${m.accentHsl} / 0.4)` : "none",
                        }}
                      >
                        <Icon
                          style={{
                            width: isFinish ? "26px" : "22px",
                            height: isFinish ? "26px" : "22px",
                            color: isActive ? (isFinish ? "#fff" : `hsl(${m.accentHsl})`) : "rgba(160,160,160,0.3)",
                          }}
                        />
                        {/* Flag / pin badge */}
                        {isActive && (i === 0 || isFinish) && (
                          <div className="absolute -top-2 -right-1 z-20">
                            {isFinish ? (
                              <Flag className="w-3.5 h-3.5 fill-current" style={{ color: `hsl(${m.accentHsl})` }} />
                            ) : (
                              <MapPin className="w-3.5 h-3.5 fill-current" style={{ color: `hsl(${m.accentHsl})` }} />
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <h3
                      className="text-center font-bold transition-all duration-500 leading-tight"
                      style={{
                        fontSize: isFinish ? "14px" : "12px",
                        color: isActive
                          ? isFinish ? `hsl(${m.accentHsl})` : "hsl(var(--foreground))"
                          : "rgba(160,160,160,0.3)",
                      }}
                    >
                      {m.title}
                    </h3>

                    {/* XP tag */}
                    {isActive && (
                      <div className="flex justify-center mt-1.5">
                        <span
                          className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                          style={{
                            background: `hsl(${m.accentHsl} / 0.15)`,
                            color: `hsl(${m.accentHsl})`,
                            border: `1px solid hsl(${m.accentHsl} / 0.3)`,
                          }}
                        >
                          {m.xp}
                        </span>
                      </div>
                    )}

                    {/* Badge pill (e.g. "Portfolio XP", "Interview Readiness 100%") */}
                    {isActive && m.badge && (
                      <div className="flex justify-center mt-1">
                        <span className="flex items-center gap-1 text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-yellow-400/15 text-yellow-500 border border-yellow-400/30">
                          <Star className="w-2 h-2 fill-yellow-400 text-yellow-400" />
                          {m.badge}
                        </span>
                      </div>
                    )}

                    {/* Hover: reveal sub-skills */}
                    <div
                      style={{
                        maxHeight: isHovered && isActive ? "120px" : "0px",
                        overflow: "hidden",
                        transition: "max-height 0.35s ease",
                      }}
                    >
                      <ul className="mt-2.5 space-y-1">
                        {m.skills.map((s) => (
                          <li
                            key={s}
                            className="flex items-center gap-1 text-[9px] text-muted-foreground"
                          >
                            <span
                              className="w-1 h-1 rounded-full flex-shrink-0"
                              style={{ background: `hsl(${m.accentHsl})` }}
                            />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Shimmer overlay for finish card */}
                    {isFinish && isActive && (
                      <div
                        className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
                        style={{ zIndex: 1 }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background:
                              "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)",
                            backgroundSize: "200% 100%",
                            animation: "lp-shimmer 2.5s linear infinite",
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ══ MOBILE MAP ════════════════════════════════════════════════ */}
        <div className="md:hidden mx-auto" style={{ maxWidth: "320px" }}>
          <div className="relative" style={{ height: "580px" }}>

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

            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 320 580"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <filter id="m-neon-glow">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="m-packet-glow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Background road */}
              <path
                d={mobileRoadPath}
                stroke="currentColor"
                className="text-border"
                strokeWidth="3"
                strokeDasharray="10 7"
                fill="none"
                strokeLinecap="round"
              />
              {/* Glow halo */}
              <path
                d={mobileRoadPath}
                stroke="hsl(25 95% 53%)"
                strokeWidth="9"
                strokeDasharray="10 7"
                fill="none"
                strokeLinecap="round"
                filter="url(#m-neon-glow)"
                opacity={progress * 0.45}
                pathLength="1000"
                style={{ strokeDashoffset: `${(1 - progress) * 1000}` }}
              />
              {/* Active road */}
              <path
                d={mobileRoadPath}
                stroke="hsl(25 95% 53%)"
                strokeWidth="3.5"
                strokeDasharray="10 7"
                fill="none"
                strokeLinecap="round"
                filter="url(#m-neon-glow)"
                pathLength="1000"
                style={{
                  strokeDashoffset: `${(1 - progress) * 1000}`,
                  opacity: progress > 0 ? 1 : 0,
                  transition: "stroke-dashoffset 0.4s ease, opacity 0.3s",
                }}
              />
              {/* Data packet */}
              {progress >= 0.9 && (
                <circle
                  r="5"
                  fill="hsl(25 95% 53%)"
                  filter="url(#m-packet-glow)"
                  style={{ animation: "lp-packet 2.4s ease-in-out infinite" }}
                >
                  <animateMotion dur="2.4s" repeatCount="indefinite" path={mobileRoadPath} />
                </circle>
              )}
            </svg>

            {/* Mobile milestone nodes */}
            {milestones.map((m, i) => {
              const threshold = i / (milestones.length - 1);
              const isActive = progress >= threshold * 0.85;
              const isFinish = !!m.isFinish;
              const pos = mobileNodePos[i];
              const Icon = m.icon;

              return (
                <div
                  key={m.title}
                  className="absolute flex flex-col items-center"
                  style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                >
                  <span
                    className="text-[8px] font-bold tracking-[0.15em] uppercase mb-1 transition-all duration-500"
                    style={{ color: isActive ? `hsl(${m.accentHsl})` : "rgba(160,160,160,0.25)" }}
                  >
                    {m.label}
                  </span>

                  <div
                    className="rounded-xl transition-all duration-500"
                    style={{
                      ...glassCard(isActive, isFinish),
                      width: isFinish ? "88px" : "76px",
                      padding: isFinish ? "10px 8px 8px" : "8px 6px 6px",
                      animation: isFinish && isActive ? "lp-float 3s ease-in-out infinite" : "none",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <div className="flex justify-center mb-1.5">
                      <div
                        className="relative flex items-center justify-center rounded-full"
                        style={{
                          width: isFinish ? "46px" : "40px",
                          height: isFinish ? "46px" : "40px",
                          background: isActive
                            ? isFinish ? `hsl(${m.accentHsl})` : `hsl(${m.accentHsl} / 0.15)`
                            : "rgba(255,255,255,0.04)",
                          border: `2px solid hsl(${m.accentHsl} / ${isActive ? 0.6 : 0.12})`,
                          boxShadow: isActive ? `0 0 12px hsl(${m.accentHsl} / 0.4)` : "none",
                        }}
                      >
                        <Icon
                          style={{
                            width: "18px",
                            height: "18px",
                            color: isActive ? (isFinish ? "#fff" : `hsl(${m.accentHsl})`) : "rgba(160,160,160,0.25)",
                          }}
                        />
                      </div>
                    </div>

                    <h3
                      className="text-center font-bold leading-tight"
                      style={{
                        fontSize: "10px",
                        color: isActive ? (isFinish ? `hsl(${m.accentHsl})` : "hsl(var(--foreground))") : "rgba(160,160,160,0.25)",
                      }}
                    >
                      {m.title}
                    </h3>

                    {isActive && (
                      <div className="flex justify-center mt-1">
                        <span
                          className="text-[8px] font-bold px-1 py-0.5 rounded-full"
                          style={{
                            background: `hsl(${m.accentHsl} / 0.15)`,
                            color: `hsl(${m.accentHsl})`,
                            border: `1px solid hsl(${m.accentHsl} / 0.3)`,
                          }}
                        >
                          {m.xp}
                        </span>
                      </div>
                    )}

                    {/* Shimmer on finish card */}
                    {isFinish && isActive && (
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          borderRadius: "12px",
                          background:
                            "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)",
                          backgroundSize: "200% 100%",
                          animation: "lp-shimmer 2.5s linear infinite",
                          pointerEvents: "none",
                        }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
