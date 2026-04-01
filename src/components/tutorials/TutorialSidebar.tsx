"use client";

import { useState } from "react";
import Link from "next/link";

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
    <nav className="space-y-5">
      {subtopics.map((subtopic) => (
        <div key={subtopic.slug} className="space-y-2.5">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {subtopic.title}
          </p>
          <div className="space-y-1">
            {subtopic.lessons.map((lesson) => {
              const active = lesson.slug === currentLessonSlug;
              return (
                <Link
                  key={lesson.slug}
                  href={`/tutorials/${topicSlug}/${lesson.slug}`}
                  onClick={() => setOpen(false)}
                  className={`block rounded-md px-3 py-2 text-sm leading-snug transition-colors ${
                    active
                      ? "bg-primary/10 font-semibold text-foreground"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  }`}
                >
                  <span className="line-clamp-2">{lesson.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );

  return (
    <aside className="lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] lg:w-[280px] lg:flex-none lg:overflow-y-auto lg:border-r lg:border-border/60 bg-background px-4 py-5">
      <div className="mb-4 flex items-center justify-between lg:hidden">
        <h3 className="text-base font-semibold">Lesson Outline</h3>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="rounded-lg border border-border px-3 py-2 text-sm font-medium"
        >
          {open ? "Hide lessons" : "Browse lessons"}
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
