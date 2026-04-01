import { Metadata } from "next";
import { unstable_cache } from "next/cache";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { TutorialSidebar } from "@/components/tutorials/TutorialSidebar";
import { TutorialContent } from "@/components/tutorials/TutorialContent";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";

export const revalidate = 600;

type TocItem = { id: string; text: string };

type LessonPageParams = {
  params: Promise<{ topicSlug: string; lessonSlug: string }>;
};

const getLessonWithNav = unstable_cache(
  async (slug: string) => {
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
  },
  ["tutorial-lesson-page"],
  { revalidate },
);

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
  const lesson = await getLessonWithNav(lessonSlug);

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
  const hasToc = toc.length > 0;

  return (
    <div className="flex min-h-screen bg-background pt-20 md:pt-24">
      <TutorialSidebar topicSlug={topic.slug} subtopics={navSubtopics} currentLessonSlug={lesson.slug} />

      <main className="flex-1">
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
