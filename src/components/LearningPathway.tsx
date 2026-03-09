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
  Star,
} from "lucide-react";

const milestones = [
  {
    icon: UserPlus,
    title: "Enroll",
    label: "START",
    side: "left" as const,
    xp: "+5 XP",
    badge: null as string | null,
    skills: ["Take Admission", "Start Learning"],
    isFinish: false,
    iconBg: "#3B82F6",
    shadowColor: "#3B82F6",
    labelColor: "#3B82F6",
  },
  {
    icon: BookOpen,
    title: "Master Skills",
    label: "LEVEL 1",
    side: "right" as const,
    xp: "+10 Skills XP",
    badge: null as string | null,
    skills: ["Java / Python", "AWS & Cloud", "Marketing", "Data Analysis"],
    isFinish: false,
    iconBg: "#8B5CF6",
    shadowColor: "#8B5CF6",
    labelColor: "#8B5CF6",
  },
  {
    icon: FolderCode,
    title: "Build Projects",
    label: "LEVEL 2",
    side: "left" as const,
    xp: "+10 Portfolio XP",
    badge: "Portfolio XP",
    skills: ["Real-world Projects"],
    isFinish: false,
    iconBg: "#F97316",
    shadowColor: "#F97316",
    labelColor: "#F97316",
  },
  {
    icon: MessageSquare,
    title: "Mock Interviews",
    label: "LEVEL 3",
    side: "right" as const,
    xp: "Interview Ready",
    badge: "Interview Readiness 100%",
    skills: ["HR & Communication", "Technical Rounds", "Resume Polish"],
    isFinish: false,
    iconBg: "#22C55E",
    shadowColor: "#22C55E",
    labelColor: "#22C55E",
  },
  {
    icon: Trophy,
    title: "Get Hired!",
    label: "FINISH",
    side: "left" as const,
    xp: "+100 Career XP",
    badge: null as string | null,
    skills: ["Dream Job"],
    isFinish: true,
    iconBg: "#F97316",
    shadowColor: "#F97316",
    labelColor: "#F97316",
  },
];

export function LearningPathway() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const wh = window.innerHeight;
      const start = wh * 0.9;
      const end = -rect.height * 0.15;
      setProgress(Math.min(Math.max((start - rect.top) / (start - end), 0), 1));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-muted/20 overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(var(--primary-rgb,234 88 12)/0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--primary-rgb,234 88 12)/0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20 md:mb-24">
          <span
            className="inline-block font-mono text-xs font-bold tracking-[0.25em] uppercase text-primary border border-primary/40 px-3 py-1 mb-5"
            style={{ boxShadow: "2px 2px 0px #F97316" }}
          >
            Your Journey
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
            Your{" "}
            <span className="text-gradient">Learning Pathway</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Follow the track, each milestone brings you one step closer to
            your dream job.
          </p>
        </div>

        <div className="hidden md:block max-w-6xl mx-auto">
          {/* Top cards — milestones with side="left" sit above the track */}
          <div className="flex items-end">
            {milestones.map((m, i) => {
              const isActive = progress >= (i / (milestones.length - 1)) * 0.88;
              return (
                <div key={`top-${i}`} className="flex-1 flex flex-col items-center px-2">
                  {m.side === "left" ? <HCard m={m} isActive={isActive} direction="down" /> : null}
                </div>
              );
            })}
          </div>

          {/* Top connectors */}
          <div className="flex">
            {milestones.map((m, i) => {
              const isActive = progress >= (i / (milestones.length - 1)) * 0.88;
              return (
                <div key={`ctop-${i}`} className="flex-1 flex justify-center">
                  <div
                    style={{
                      width: "2px",
                      height: m.side === "left" ? "20px" : "0px",
                      background: isActive ? m.iconBg : "hsl(var(--border))",
                      transition: "background 0.4s",
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Horizontal track + icon nodes */}
          <div className="relative flex items-center py-2">
            {/* Background track — spans between first and last icon centers */}
            <div
              className="absolute top-1/2 -translate-y-1/2"
              style={{ left: "10%", right: "10%", height: "4px", background: "hsl(var(--border))" }}
            />
            {/* Progress fill */}
            <div
              className="absolute top-1/2 -translate-y-1/2 bg-primary"
              style={{ left: "10%", height: "4px", width: `${progress * 80}%`, transition: "none" }}
            />

            {milestones.map((m, i) => {
              const isActive = progress >= (i / (milestones.length - 1)) * 0.88;
              const Icon = m.icon;
              return (
                <div key={`icon-${i}`} className="flex-1 flex justify-center relative z-10">
                  <div
                    className="relative flex items-center justify-center rounded-full transition-all duration-500"
                    style={{
                      width: m.isFinish ? "68px" : "56px",
                      height: m.isFinish ? "68px" : "56px",
                      background: isActive ? m.iconBg : "hsl(var(--muted))",
                      border: "4px solid hsl(var(--background))",
                      boxShadow: isActive
                        ? `4px 4px 0px ${m.shadowColor}`
                        : "4px 4px 0px hsl(var(--border))",
                    }}
                  >
                    <Icon
                      style={{
                        width: m.isFinish ? "28px" : "22px",
                        height: m.isFinish ? "28px" : "22px",
                        color: isActive ? "#fff" : "hsl(var(--muted-foreground))",
                      }}
                    />
                    {(i === 0 || m.isFinish) && isActive && (
                      <div className="absolute -top-2 -right-1 z-10">
                        {m.isFinish ? (
                          <Flag className="w-4 h-4 fill-current" style={{ color: m.iconBg }} />
                        ) : (
                          <MapPin className="w-4 h-4 fill-current" style={{ color: m.iconBg }} />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom connectors */}
          <div className="flex">
            {milestones.map((m, i) => {
              const isActive = progress >= (i / (milestones.length - 1)) * 0.88;
              return (
                <div key={`cbot-${i}`} className="flex-1 flex justify-center">
                  <div
                    style={{
                      width: "2px",
                      height: m.side === "right" ? "20px" : "0px",
                      background: isActive ? m.iconBg : "hsl(var(--border))",
                      transition: "background 0.4s",
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Bottom cards — milestones with side="right" sit below the track */}
          <div className="flex items-start">
            {milestones.map((m, i) => {
              const isActive = progress >= (i / (milestones.length - 1)) * 0.88;
              return (
                <div key={`bot-${i}`} className="flex-1 flex flex-col items-center px-2">
                  {m.side === "right" ? <HCard m={m} isActive={isActive} direction="up" /> : null}
                </div>
              );
            })}
          </div>
        </div>

        <div className="md:hidden max-w-sm mx-auto">
          <div className="relative">
            <div
              className="absolute top-0 bottom-0"
              style={{ left: "27px", width: "4px", background: "hsl(var(--border))" }}
            />
            <div
              className="absolute top-0 bg-primary origin-top"
              style={{ left: "27px", width: "4px", height: `${progress * 100}%`, transition: "none" }}
            />

            {milestones.map((m, i) => {
              const threshold = i / (milestones.length - 1);
              const isActive = progress >= threshold * 0.88;
              const Icon = m.icon;

              return (
                <div
                  key={m.title}
                  className="relative flex items-start gap-5"
                  style={{ paddingBottom: i < milestones.length - 1 ? "40px" : "0" }}
                >
                  <div
                    className="relative z-20 flex-shrink-0 flex items-center justify-center rounded-full transition-all duration-500"
                    style={{
                      width: "54px",
                      height: "54px",
                      background: isActive ? m.iconBg : "hsl(var(--muted))",
                      border: "4px solid hsl(var(--background))",
                      boxShadow: isActive
                        ? `3px 3px 0px ${m.shadowColor}`
                        : "3px 3px 0px hsl(var(--border))",
                    }}
                  >
                    <Icon
                      style={{
                        width: "20px",
                        height: "20px",
                        color: isActive ? "#fff" : "hsl(var(--muted-foreground))",
                      }}
                    />
                  </div>

                  <div
                    className="flex-1 pt-1 transition-all duration-500"
                    style={{
                      opacity: isActive ? 1 : 0.35,
                      transform: isActive ? "translateY(0)" : "translateY(8px)",
                    }}
                  >
                    <span
                      className="font-mono text-[9px] font-bold tracking-[0.22em] uppercase mb-1.5 block"
                      style={{ color: m.labelColor }}
                    >
                      {m.label}
                    </span>

                    <div
                      className="rounded-sm border-2"
                      style={{
                        borderColor: isActive ? m.iconBg : "hsl(var(--border))",
                        boxShadow: isActive ? `4px 4px 0px ${m.shadowColor}` : "none",
                        background: "hsl(var(--card))",
                        padding: "14px 16px",
                      }}
                    >
                      <div className="flex items-center justify-between mb-2 gap-2">
                        <h3 className="font-black text-sm text-foreground leading-tight">
                          {m.title}
                        </h3>
                        <span
                          className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-sm whitespace-nowrap flex-shrink-0"
                          style={{
                            background: `${m.iconBg}20`,
                            color: m.labelColor,
                            border: `1px solid ${m.iconBg}50`,
                          }}
                        >
                          {m.xp}
                        </span>
                      </div>

                      {m.badge && isActive && (
                        <div className="mb-2">
                          <span className="inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded-sm bg-yellow-400/15 text-yellow-600 border border-yellow-400/40">
                            <Star className="w-2 h-2 fill-yellow-500 text-yellow-500" />
                            {m.badge}
                          </span>
                        </div>
                      )}

                      <div
                        className="mb-2"
                        style={{ height: "1px", background: isActive ? `${m.iconBg}30` : "hsl(var(--border))" }}
                      />

                      <ul className="space-y-1">
                        {m.skills.map((s) => (
                          <li
                            key={s}
                            className="flex items-center gap-1.5 text-[10px] text-muted-foreground"
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-sm flex-shrink-0"
                              style={{ background: isActive ? m.iconBg : "hsl(var(--muted-foreground))" }}
                            />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
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

type Milestone = (typeof milestones)[number];

function HCard({
  m,
  isActive,
  direction = "down",
}: {
  m: Milestone;
  isActive: boolean;
  direction?: "down" | "up";
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="w-full transition-all duration-500"
      style={{
        opacity: isActive ? 1 : 0.3,
        transform: isActive
          ? "translateY(0)"
          : direction === "down"
          ? "translateY(10px)"
          : "translateY(-10px)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase block mb-1.5 text-center"
        style={{ color: isActive ? m.labelColor : "hsl(var(--muted-foreground))" }}
      >
        {m.label}
      </span>

      <div
        className="rounded-sm border-2 cursor-default transition-all duration-200"
        style={{
          borderColor: isActive ? m.iconBg : "hsl(var(--border))",
          boxShadow: isActive
            ? hovered
              ? `5px 5px 0px ${m.shadowColor}`
              : `3px 3px 0px ${m.shadowColor}`
            : "none",
          background:
            m.isFinish && isActive
              ? `linear-gradient(135deg, ${m.iconBg}18, ${m.iconBg}08)`
              : "hsl(var(--card))",
          padding: "12px 14px",
          transform: hovered && isActive ? "translate(-1px, -1px)" : "none",
        }}
      >
        <div className="flex items-center justify-between mb-2 gap-1">
          <h3
            className="font-black text-sm leading-tight"
            style={{
              color: isActive
                ? m.isFinish
                  ? m.labelColor
                  : "hsl(var(--foreground))"
                : "hsl(var(--muted-foreground))",
            }}
          >
            {m.title}
          </h3>
          <span
            className="font-mono text-[8px] font-bold px-1.5 py-0.5 rounded-sm whitespace-nowrap flex-shrink-0"
            style={{
              background: isActive ? `${m.iconBg}20` : "transparent",
              color: isActive ? m.labelColor : "hsl(var(--muted-foreground))",
              border: `1px solid ${isActive ? m.iconBg + "50" : "hsl(var(--border))"}`,
            }}
          >
            {m.xp}
          </span>
        </div>

        {m.badge && isActive && (
          <div className="mb-2">
            <span className="inline-flex items-center gap-1 text-[8px] font-bold px-1.5 py-0.5 rounded-sm bg-yellow-400/15 text-yellow-600 border border-yellow-400/40">
              <Star className="w-2 h-2 fill-yellow-500 text-yellow-500" />
              {m.badge}
            </span>
          </div>
        )}

        <div
          className="mb-2"
          style={{ height: "1px", background: isActive ? `${m.iconBg}30` : "hsl(var(--border))" }}
        />

        <ul className="space-y-1">
          {m.skills.map((s) => (
            <li
              key={s}
              className="flex items-center gap-1.5 text-[10px] text-muted-foreground"
            >
              <span
                className="w-1.5 h-1.5 rounded-sm flex-shrink-0"
                style={{ background: isActive ? m.iconBg : "hsl(var(--muted-foreground))" }}
              />
              {s}
            </li>
          ))}
        </ul>

        {m.isFinish && isActive && (
          <div
            className="mt-3 pt-2.5 flex items-center justify-center gap-1.5"
            style={{ borderTop: `1px solid ${m.iconBg}35` }}
          >
            <span
              className="font-mono font-black text-[8px] tracking-widest uppercase"
              style={{ color: m.labelColor }}
            >
              Career Launch Ready
            </span>
            <Flag className="w-3 h-3" style={{ color: m.labelColor, fill: m.labelColor }} />
          </div>
        )}
      </div>
    </div>
  );
}
