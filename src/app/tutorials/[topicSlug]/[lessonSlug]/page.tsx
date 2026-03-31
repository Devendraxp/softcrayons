import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { TutorialSidebar } from "@/components/tutorials/TutorialSidebar";
import { TutorialContent, TocItem } from "@/components/tutorials/TutorialContent";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";

export const revalidate = 0;

type LessonPageParams = {
  params: Promise<{ topicSlug: string; lessonSlug: string }>;
};

async function getLessonWithNav(slug: string) {
  return prisma.tutorialsLesson.findFirst({
    where: { slug, isPublic: true },
    include: {
      subtopic: {
        include: {
          topic: {
            include: {
              category: { select: { title: true, slug: true } },
              subtopics: {
                where: { isPublic: true },
                orderBy: { position: "asc" },
                include: {
                  lessons: {
                    where: { isPublic: true },
                    orderBy: { position: "asc" },
                    select: { id: true, title: true, slug: true, position: true },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
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
  const lesson = await prisma.tutorialsLesson.findFirst({
    where: { slug: lessonSlug, isPublic: true },
    select: {
      title: true,
      description: true,
      metaTitle: true,
      metaDescription: true,
      metaKeywords: true,
      slug: true,
      subtopic: {
        select: {
          title: true,
          topic: { select: { slug: true, title: true } },
        },
      },
    },
  });

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
  const lesson = await getLessonWithNav(lessonSlug);

  if (!lesson || lesson.subtopic?.topic?.slug !== topicSlug) {
    notFound();
  }

  if (!lesson.subtopic?.topic) {
    notFound();
  }

  const topic = lesson.subtopic.topic;
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

  return (
    <div className="flex min-h-screen bg-background">
      <TutorialSidebar topicSlug={topic.slug} subtopics={navSubtopics} currentLessonSlug={lesson.slug} />

      <main className="flex-1">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-10 py-12 space-y-10">
          <header className="space-y-4 rounded-2xl bg-card/30 p-6 shadow-sm backdrop-blur-sm">
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
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{lesson.subtopic.title}</Badge>
              <Badge variant="outline">{topic.title}</Badge>
            </div>
            <NavButtons previousHref={previousHref} nextHref={nextHref} homeHref={homeHref} />
          </header>

          <TutorialContent content={lesson.content} tableOfContent={toc} />

          <div className="flex flex-wrap items-center gap-3">
            <NavButtons previousHref={previousHref} nextHref={nextHref} homeHref={homeHref} />
          </div>
        </div>
      </main>
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
        <Button asChild variant="outline">
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
