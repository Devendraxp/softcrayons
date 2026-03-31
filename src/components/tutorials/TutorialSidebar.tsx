"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, ChevronRight, Menu, X } from "lucide-react";

export type TutorialNavLesson = {
  id?: number | null;
  title: string;
  slug: string;
};

export type TutorialNavSubtopic = {
  id?: number | null;
  title: string;
  slug: string;
  lessons: TutorialNavLesson[];
};

type Props = {
  topicSlug: string;
  subtopics: TutorialNavSubtopic[];
  currentLessonSlug?: string;
};

export function TutorialSidebar({ topicSlug, subtopics, currentLessonSlug }: Props) {
  const [open, setOpen] = useState(false);

  const nav = (
    <nav className="space-y-4">
      {subtopics.map((subtopic) => (
        <div key={subtopic.slug} className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <BookOpen className="h-4 w-4" />
            <span>{subtopic.title}</span>
          </div>
          <div className="space-y-1">
            {subtopic.lessons.map((lesson) => {
              const active = lesson.slug === currentLessonSlug;
              return (
                <Link
                  key={lesson.slug}
                  href={`/tutorials/${topicSlug}/${lesson.slug}`}
                  onClick={() => setOpen(false)}
                  className={`group relative flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted/60"
                  }`}
                >
                  <span
                    className={`h-8 w-0.5 rounded-full transition-colors ${
                      active ? "bg-primary" : "bg-transparent group-hover:bg-border"
                    }`}
                  />
                  <ChevronRight className="h-4 w-4" />
                  <span className="line-clamp-1">{lesson.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );

  return (
    <aside className="lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] lg:w-[260px] lg:flex-none lg:overflow-y-auto lg:border-r lg:border-border bg-card/70 lg:bg-card px-3 py-4 shadow-sm backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between lg:hidden">
        <h3 className="text-base font-semibold">Contents</h3>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          {open ? "Close" : "Browse"}
        </button>
      </div>

      <div className={`lg:block ${open ? "block" : "hidden"}`}>
        {subtopics.length ? (
          nav
        ) : (
          <p className="text-sm text-muted-foreground">Lessons will appear here.</p>
        )}
      </div>
    </aside>
  );
}
