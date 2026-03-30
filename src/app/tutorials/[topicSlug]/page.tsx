import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { TutorialSidebar } from "@/components/tutorials/TutorialSidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Layers, BookOpen } from "lucide-react";

export const revalidate = 0;

type TopicPageParams = {
  params: Promise<{ topicSlug: string }>;
};

async function getTopic(slug: string) {
  return prisma.tutorialsTopic.findFirst({
    where: { slug, isPublic: true },
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
  });
}

function toKeywords(value: any): string[] | undefined {
  if (!value) return undefined;
  if (Array.isArray(value)) return value.map((k) => String(k));
  if (typeof value === "string") return value.split(",").map((k) => k.trim()).filter(Boolean);
  return undefined;
}

export async function generateMetadata({ params }: TopicPageParams): Promise<Metadata> {
  const { topicSlug } = await params;
  const topic = await prisma.tutorialsTopic.findFirst({
    where: { slug: topicSlug, isPublic: true },
    select: {
      title: true,
      description: true,
      metaTitle: true,
      metaDescription: true,
      metaKeywords: true,
      slug: true,
    },
  });

  if (!topic) return {};

  const title = topic.metaTitle || `${topic.title} tutorials`;
  const description = topic.metaDescription || topic.description || "Tutorials and lessons";
  const keywords = toKeywords(topic.metaKeywords);

  return {
    title,
    description,
    keywords,
    alternates: { canonical: `/tutorials/${topic.slug}` },
    openGraph: {
      title,
      description,
      url: `/tutorials/${topic.slug}`,
    },
    twitter: {
      title,
      description,
      card: "summary_large_image",
    },
  };
}

export default async function TopicPage({ params }: TopicPageParams) {
  const { topicSlug } = await params;
  const topic = await getTopic(topicSlug);
  if (!topic) notFound();

  const navSubtopics = topic.subtopics.map((sub) => ({
    id: sub.id,
    title: sub.title,
    slug: sub.slug,
    lessons: sub.lessons,
  }));

  const firstLesson = topic.subtopics
    .flatMap((sub) => sub.lessons)
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))[0];

  return (
    <div className="container py-10">
      <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
        <TutorialSidebar topicSlug={topic.slug} subtopics={navSubtopics} />

        <div className="space-y-8">
          <header className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <Link href="/tutorials" className="hover:text-foreground">Tutorials</Link>
              <span>•</span>
              {topic.category && (
                <Link href={`/tutorials`} className="hover:text-foreground">
                  {topic.category.title}
                </Link>
              )}
            </div>
            <h1 className="mt-3 text-3xl font-black leading-tight">{topic.title}</h1>
            {topic.description && (
              <p className="mt-3 text-lg text-muted-foreground">{topic.description}</p>
            )}
            {firstLesson && (
              <div className="mt-6">
                <Button asChild size="lg">
                  <Link href={`/tutorials/${topic.slug}/${firstLesson.slug}`} className="inline-flex items-center gap-2">
                    Start learning
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            )}
          </header>

          <section className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              <Layers className="h-4 w-4" /> Subtopics & Lessons
            </div>
            <div className="space-y-4">
              {topic.subtopics.map((subtopic) => (
                <div key={subtopic.id} className="rounded-xl border border-border bg-muted/40 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-muted-foreground">Subtopic</p>
                      <h3 className="text-lg font-semibold">{subtopic.title}</h3>
                      {subtopic.description && (
                        <p className="text-sm text-muted-foreground">{subtopic.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {subtopic.lessons.length === 0 && (
                      <Badge variant="outline">Lessons coming soon</Badge>
                    )}
                    {subtopic.lessons.map((lesson) => (
                      <Link
                        key={lesson.id}
                        href={`/tutorials/${topic.slug}/${lesson.slug}`}
                        className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm hover:border-primary/40 hover:text-primary"
                      >
                        <BookOpen className="h-4 w-4" />
                        {lesson.title}
                        <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
