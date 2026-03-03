"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
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
    skills: ["Take Admission", "Set Clear Goals", "Meet Your Mentor"],
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
    skills: ["Java / Python", "AWS & Cloud", "NestJS / React", "DSA"],
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
    skills: ["Real-world Apps", "GitHub Portfolio", "Live Code Reviews"],
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
    skills: ["HR & Soft Skills", "Technical Rounds", "System Design"],
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
    skills: ["Resume Polish", "Dream Job Offers", "Salary Negotiation"],
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

        <div className="hidden md:block max-w-4xl mx-auto">
          <div className="relative">
            <div
              className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2"
              style={{ width: "4px", background: "hsl(var(--border))" }}
            />
            <div
              className="absolute left-1/2 top-0 -translate-x-1/2 bg-primary origin-top"
              style={{ width: "4px", height: `${progress * 100}%`, transition: "none" }}
            />

            {milestones.map((m, i) => {
              const threshold = i / (milestones.length - 1);
              const isActive = progress >= threshold * 0.88;
              const isLeft = m.side === "left";
              const Icon = m.icon;

              return (
                <div
                  key={m.title}
                  className="relative flex items-center"
                  style={{ paddingBottom: i < milestones.length - 1 ? "72px" : "0" }}
                >
                  <div className="flex-1 pr-12 flex justify-end">
                    {isLeft && (
                      <MilestoneCard m={m} isActive={isActive} side="left" />
                    )}
                  </div>

                  <div className="relative z-20 flex-shrink-0">
                    {isLeft ? (
                      <div
                        className="absolute right-full top-1/2 -translate-y-1/2"
                        style={{
                          width: "48px",
                          height: "4px",
                          background: isActive ? m.iconBg : "hsl(var(--border))",
                          transition: "background 0.4s",
                        }}
                      />
                    ) : (
                      <div
                        className="absolute left-full top-1/2 -translate-y-1/2"
                        style={{
                          width: "48px",
                          height: "4px",
                          background: isActive ? m.iconBg : "hsl(var(--border))",
                          transition: "background 0.4s",
                        }}
                      />
                    )}

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
                        className="transition-all duration-500"
                        style={{
                          width: m.isFinish ? "28px" : "22px",
                          height: m.isFinish ? "28px" : "22px",
                          color: isActive ? "#fff" : "hsl(var(--muted-foreground))",
                        }}
                      />
                      {(i === 0 || m.isFinish) && isActive && (
                        <div className="absolute -top-2 -right-1 z-10">
                          {m.isFinish ? (
                            <Flag
                              className="w-4 h-4 fill-current"
                              style={{ color: m.iconBg }}
                            />
                          ) : (
                            <MapPin
                              className="w-4 h-4 fill-current"
                              style={{ color: m.iconBg }}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 pl-12 flex justify-start">
                    {!isLeft && (
                      <MilestoneCard m={m} isActive={isActive} side="right" />
                    )}
                  </div>
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

function MilestoneCard({
  m,
  isActive,
  side,
}: {
  m: Milestone;
  isActive: boolean;
  side: "left" | "right";
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={cn(
        "transition-all duration-500",
        side === "left" ? "text-right" : "text-left"
      )}
      style={{
        opacity: isActive ? 1 : 0.3,
        transform: isActive
          ? "translateX(0)"
          : side === "left"
          ? "translateX(14px)"
          : "translateX(-14px)",
        maxWidth: "300px",
        width: "100%",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className={cn(
          "font-mono text-[10px] font-bold tracking-[0.25em] uppercase block mb-2",
          side === "left" ? "text-right" : "text-left"
        )}
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
              ? `6px 6px 0px ${m.shadowColor}`
              : `4px 4px 0px ${m.shadowColor}`
            : "none",
          background:
            m.isFinish && isActive
              ? `linear-gradient(135deg, ${m.iconBg}18, ${m.iconBg}08)`
              : "hsl(var(--card))",
          padding: m.isFinish ? "20px 22px" : "16px 20px",
          transform: hovered && isActive ? "translate(-1px, -1px)" : "none",
        }}
      >
        <div
          className={cn(
            "flex items-start gap-3 mb-3",
            side === "left" ? "flex-row-reverse" : "flex-row"
          )}
        >
          <h3
            className="font-black leading-tight flex-1"
            style={{
              fontSize: m.isFinish ? "20px" : "16px",
              color: isActive
                ? m.isFinish
                  ? m.labelColor
                  : "hsl(var(--foreground))"
                : "hsl(var(--muted-foreground))",
              textAlign: side === "left" ? "right" : "left",
            }}
          >
            {m.title}
          </h3>
          <span
            className="font-mono text-[10px] font-bold px-2 py-1 rounded-sm whitespace-nowrap flex-shrink-0"
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
          <div
            className={cn(
              "mb-3",
              side === "left" ? "flex justify-end" : "flex justify-start"
            )}
          >
            <span className="inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-sm bg-yellow-400/15 text-yellow-600 border border-yellow-400/40">
              <Star className="w-2.5 h-2.5 fill-yellow-500 text-yellow-500" />
              {m.badge}
            </span>
          </div>
        )}

        <div
          className="mb-3"
          style={{
            height: "1px",
            background: isActive ? `${m.iconBg}35` : "hsl(var(--border))",
          }}
        />

        <ul
          className={cn(
            "space-y-1.5 flex flex-col",
            side === "left" ? "items-end" : "items-start"
          )}
        >
          {m.skills.map((s) => (
            <li
              key={s}
              className={cn(
                "flex items-center gap-2 text-[11px] text-muted-foreground",
                side === "left" ? "flex-row-reverse" : "flex-row"
              )}
            >
              <span
                className="w-1.5 h-1.5 rounded-sm flex-shrink-0"
                style={{
                  background: isActive ? m.iconBg : "hsl(var(--muted-foreground))",
                }}
              />
              {s}
            </li>
          ))}
        </ul>

        {m.isFinish && isActive && (
          <div
            className="mt-3 pt-3 flex items-center justify-center gap-2"
            style={{ borderTop: `1px solid ${m.iconBg}35` }}
          >
            <span
              className="font-mono font-black text-[10px] tracking-widest uppercase"
              style={{ color: m.labelColor }}
            >
              Career Launch Ready
            </span>
            <Flag
              className="w-3.5 h-3.5"
              style={{ color: m.labelColor, fill: m.labelColor }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
