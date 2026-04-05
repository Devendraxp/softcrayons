import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TutorialSidebar } from "@/components/tutorials/TutorialSidebar";
import { TutorialContent } from "@/components/tutorials/TutorialContent";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { fetchServerApi } from "@/lib/server-api";

export const revalidate = 600;

type TocItem = { id: string; text: string };

type LessonPageParams = {
  params: Promise<{ topicSlug: string; lessonSlug: string }>;
};

type TopicLesson = { id: number; title: string; slug: string; position?: number | null };

type TopicSubtopic = {
  id: number;
  title: string;
  slug: string;
  position?: number | null;
  lessons: TopicLesson[];
};

type TopicData = {
  id: number;
  title: string;
  slug: string;
  subtopics: TopicSubtopic[];
};

type TopicResponse = {
  success: boolean;
  data?: TopicData;
  error?: string;
};

type LessonData = {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  content: string;
  tableOfContent?: unknown;
  nextLink?: string | null;
  previousLink?: string | null;
  homeLink?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  metaKeywords?: unknown;
  subtopic?: {
    id: number;
    title: string;
    slug: string;
    topic?: {
      id: number;
      title: string;
      slug: string;
    } | null;
  } | null;
};

type LessonResponse = {
  success: boolean;
  data?: LessonData;
  error?: string;
};

async function getLesson(slug: string) {
  try {
    const response = await fetchServerApi<LessonResponse>(`/api/tutorial-lessons/${encodeURIComponent(slug)}`, {
      next: { revalidate: 600 },
    });

    if (!response.success || !response.data) {
      return null;
    }

    return response.data;
  } catch (error: any) {
    if (error?.status === 404) {
      return null;
    }
    throw error;
  }
}

async function getTopicWithNav(slug: string) {
  try {
    const response = await fetchServerApi<TopicResponse>(`/api/tutorial-topics/${encodeURIComponent(slug)}`, {
      next: { revalidate: 600 },
    });

    if (!response.success || !response.data) {
      return null;
    }

    return {
      ...response.data,
      subtopics: [...response.data.subtopics]
        .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
        .map((subtopic) => ({
          ...subtopic,
          lessons: [...subtopic.lessons].sort((a, b) => (a.position ?? 0) - (b.position ?? 0)),
        })),
    };
  } catch (error: any) {
    if (error?.status === 404) {
      return null;
    }
    throw error;
  }
}

function toTableOfContent(value: any): TocItem[] {
  if (!value) return [];
  const parsed = typeof value === "string" ? (() => { try { return JSON.parse(value); } catch { return []; } })() : value;
  if (!Array.isArray(parsed)) return [];
  return parsed
    .map((item: any) => ({ id: String(item.id ?? "").trim(), text: String(item.text ?? "").trim() }))
    .filter((item: TocItem) => item.id && item.text);
}

function toKeywords(value: any): string[] | undefined {
  if (!value) return undefined;
  if (Array.isArray(value)) return value.map((k) => String(k));
  if (typeof value === "string") return value.split(",").map((k) => k.trim()).filter(Boolean);
  return undefined;
}

export async function generateMetadata({ params }: LessonPageParams): Promise<Metadata> {
  const { topicSlug, lessonSlug } = await params;
  const lesson = await getLesson(lessonSlug);

  if (!lesson || lesson.subtopic?.topic?.slug !== topicSlug) return {};

  const title = lesson.metaTitle || `${lesson.title} | ${lesson.subtopic.topic.title}`;
  const description = lesson.metaDescription || lesson.description || "Tutorial lesson";
  const keywords = toKeywords(lesson.metaKeywords);
  const url = `/tutorials/${lesson.subtopic.topic.slug}/${lesson.slug}`;

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: { title, description, url },
    twitter: { title, description, card: "summary_large_image" },
  };
}

export default async function LessonPage({ params }: LessonPageParams) {
  const { topicSlug, lessonSlug } = await params;
  const [lesson, topic] = await Promise.all([getLesson(lessonSlug), getTopicWithNav(topicSlug)]);

  if (!lesson || !topic || lesson.subtopic?.topic?.slug !== topicSlug) {
    notFound();
  }

  if (!lesson.subtopic?.topic) {
    notFound();
  }

  const navSubtopics = topic.subtopics.map((sub) => ({
    id: sub.id,
    title: sub.title,
    slug: sub.slug,
    lessons: sub.lessons,
  }));

  const toc = toTableOfContent(lesson.tableOfContent);
  const { previous, next } = computePrevNext(navSubtopics, lesson.slug, topic.slug);

  const previousHref = lesson.previousLink || previous?.href;
  const nextHref = lesson.nextLink || next?.href;
  const homeHref = lesson.homeLink || "/tutorials";
  const hasToc = toc.length > 0;

  return (
    <div className="bg-background pt-20 md:pt-24 overflow-x-hidden">
      <div className="flex min-h-[calc(100vh-5rem)] flex-col lg:h-[calc(100vh-6rem)] lg:min-h-[calc(100vh-6rem)] lg:flex-row lg:overflow-hidden">
        <TutorialSidebar topicSlug={topic.slug} subtopics={navSubtopics} currentLessonSlug={lesson.slug} />

        <main className="flex-1 min-w-0 lg:h-full lg:overflow-y-auto lg:overscroll-contain">
          <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-10 pb-12 space-y-10">
          <header className="space-y-5">
            <div className={hasToc ? "grid gap-6 xl:grid-cols-[minmax(0,1fr)_260px]" : "space-y-5"}>
              <div className="space-y-5">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  <Link href="/tutorials" className="hover:text-foreground">Tutorials</Link>
                  <span>•</span>
                  <Link href={`/tutorials/${topic.slug}`} className="hover:text-foreground">{topic.title}</Link>
                  <span>•</span>
                  <span className="text-foreground">{lesson.subtopic.title}</span>
                </div>
                <div className="space-y-3">
                  <h1 className="text-4xl font-black leading-tight">{lesson.title}</h1>
                  {lesson.description && (
                    <p className="text-lg text-muted-foreground max-w-3xl">{lesson.description}</p>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <span className="rounded-full bg-muted px-3 py-1">{lesson.subtopic.title}</span>
                  <span>•</span>
                  <span>{topic.title}</span>
                </div>
              </div>

              {hasToc && (
                <aside className="rounded-xl bg-muted/30 p-4 text-sm xl:sticky xl:top-28 xl:max-h-[calc(100vh-8rem)] xl:overflow-y-auto">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Contents
                  </p>
                  <ul className="space-y-2">
                    {toc.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="block rounded-md px-2 py-1 text-foreground transition-colors hover:bg-primary/10"
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </aside>
              )}
            </div>
            <NavButtons previousHref={previousHref} nextHref={nextHref} homeHref={homeHref} />
          </header>

          <TutorialContent content={lesson.content} />

          <div className="flex flex-wrap items-center gap-3">
            <NavButtons previousHref={previousHref} nextHref={nextHref} homeHref={homeHref} />
          </div>
          </div>
        </main>
      </div>
    </div>
  );
}

type NavTarget = { href: string; title: string };

type NavComputation = {
  previous?: NavTarget;
  next?: NavTarget;
};

function computePrevNext(subtopics: { lessons: { slug: string; title: string }[] }[], currentSlug: string, topicSlug: string): NavComputation {
  const sequence: NavTarget[] = subtopics
    .flatMap((sub) => sub.lessons)
    .map((lesson) => ({ href: `/tutorials/${topicSlug}/${lesson.slug}`, title: lesson.title }));

  const currentIndex = sequence.findIndex((item) => item.href.endsWith(`/${currentSlug}`));

  if (currentIndex === -1) return {};

  const previous = currentIndex > 0 ? sequence[currentIndex - 1] : undefined;
  const next = currentIndex < sequence.length - 1 ? sequence[currentIndex + 1] : undefined;

  return { previous, next };
}

function NavButtons({ previousHref, nextHref, homeHref }: { previousHref?: string; nextHref?: string; homeHref?: string }) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-3">
      {previousHref && (
        <Button asChild variant="secondary">
          <Link href={previousHref} className="inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Previous
          </Link>
        </Button>
      )}
      {homeHref && (
        <Button asChild variant="ghost">
          <Link href={homeHref} className="inline-flex items-center gap-2">
            <Home className="h-4 w-4" /> Home
          </Link>
        </Button>
      )}
      {nextHref && (
        <Button asChild>
          <Link href={nextHref} className="inline-flex items-center gap-2">
            Next <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      )}
    </div>
  );
}
