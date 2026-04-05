import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TutorialSidebar } from "@/components/tutorials/TutorialSidebar";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Layers } from "lucide-react";
import { fetchServerApi } from "@/lib/server-api";

export const revalidate = 600;

type TopicPageParams = {
  params: Promise<{ topicSlug: string }>;
};

type TopicLesson = {
  id: number;
  title: string;
  slug: string;
  position?: number | null;
};

type TopicSubtopic = {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  position?: number | null;
  lessons: TopicLesson[];
};

type TopicData = {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  metaKeywords?: unknown;
  category?: { title: string; slug: string } | null;
  subtopics: TopicSubtopic[];
};

type TopicResponse = {
  success: boolean;
  data?: TopicData;
  error?: string;
};

async function getTopic(slug: string) {
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

function toKeywords(value: any): string[] | undefined {
  if (!value) return undefined;
  if (Array.isArray(value)) return value.map((k) => String(k));
  if (typeof value === "string") return value.split(",").map((k) => k.trim()).filter(Boolean);
  return undefined;
}

export async function generateMetadata({ params }: TopicPageParams): Promise<Metadata> {
  const { topicSlug } = await params;
  const topic = await getTopic(topicSlug);

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
    <div className="bg-background pt-20 md:pt-24 overflow-x-hidden">
      <div className="flex min-h-[calc(100vh-5rem)] flex-col lg:h-[calc(100vh-6rem)] lg:min-h-[calc(100vh-6rem)] lg:flex-row lg:overflow-hidden">
        <TutorialSidebar topicSlug={topic.slug} subtopics={navSubtopics} />

        <main className="flex-1 min-w-0 lg:h-full lg:overflow-y-auto lg:overscroll-contain">
          <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-10 pb-12 space-y-10">
          <header className="space-y-5">
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <Link href="/tutorials" className="hover:text-foreground">Tutorials</Link>
              <span>•</span>
              {topic.category && (
                <Link href={`/tutorials`} className="hover:text-foreground">
                  {topic.category.title}
                </Link>
              )}
            </div>
            <div className="space-y-3">
              <h1 className="text-4xl font-black leading-tight text-foreground">{topic.title}</h1>
              {topic.description && (
                <p className="text-lg text-muted-foreground max-w-3xl">{topic.description}</p>
              )}
            </div>
          </header>

          <section id="subtopics" className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              <Layers className="h-4 w-4" /> Subtopics & Lessons
            </div>
            <div className="space-y-3">
              {topic.subtopics.map((subtopic) => (
                <div key={subtopic.id} className="rounded-xl border border-border/60 p-4 transition-colors hover:bg-muted/30">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Subtopic</p>
                    <h3 className="text-lg font-semibold text-foreground">{subtopic.title}</h3>
                    {subtopic.description && (
                      <p className="text-sm text-muted-foreground leading-relaxed">{subtopic.description}</p>
                    )}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {subtopic.lessons.length === 0 && (
                      <Badge variant="secondary" className="bg-muted text-muted-foreground">Lessons coming soon</Badge>
                    )}
                    {subtopic.lessons.map((lesson) => (
                      <Link
                        key={lesson.id}
                        href={`/tutorials/${topic.slug}/${lesson.slug}`}
                        className="group inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/70 transition-colors group-hover:bg-primary" />
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
        </main>
      </div>
    </div>
  );
}
