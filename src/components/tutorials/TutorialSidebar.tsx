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
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                    active
                      ? "bg-primary/10 text-primary border border-primary/30"
                      : "border border-transparent hover:border-border hover:bg-muted/60"
                  }`}
                >
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
    <aside className="lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)] lg:border-r lg:border-border lg:pr-6">
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
