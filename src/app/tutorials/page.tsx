import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { TutorialHero } from "@/components/tutorials/TutorialHero";
import { TutorialSearch } from "@/components/tutorials/TutorialSearch";
import { BookOpen, Search, ArrowRight, Library, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Tutorials | SoftCrayons",
  description: "Docs for every developer. Explore categories, topics, and hands-on lessons.",
};

export const revalidate = 0;

type TopicLink = {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  categoryId: number;
  firstLessonSlug?: string;
};

type CategoryListing = {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  topics: TopicLink[];
};

async function getTutorialLanding(): Promise<CategoryListing[]> {
  const [categories, topics] = await Promise.all([
    prisma.tutorialsCategory.findMany({
      where: { isPublic: true },
      orderBy: { position: "asc" },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
      },
    }),
    prisma.tutorialsTopic.findMany({
      where: { isPublic: true },
      orderBy: { position: "asc" },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        categoryId: true,
        subtopics: {
          where: { isPublic: true },
          orderBy: { position: "asc" },
          select: {
            lessons: {
              where: { isPublic: true },
              orderBy: { position: "asc" },
              select: { slug: true },
              take: 1,
            },
          },
          take: 3,
        },
      },
    }),
  ]);

  const topicsWithFirstLesson: TopicLink[] = topics.map((topic) => {
    const firstLessonSlug = topic.subtopics.find((sub) => sub.lessons.length > 0)?.lessons[0]?.slug;
    return {
      id: topic.id,
      title: topic.title,
      slug: topic.slug,
      description: topic.description,
      categoryId: topic.categoryId,
      firstLessonSlug,
    };
  });

  return categories.map((category) => ({
    ...category,
    topics: topicsWithFirstLesson.filter((topic) => topic.categoryId === category.id),
  }));
}

export default async function TutorialsLandingPage() {
  const categories = await getTutorialLanding();

  return (
    <div className="min-h-screen bg-background flex flex-col pt-24">
      <TutorialHero />
        <div className="container px-4">
          <div className="bg-card rounded-2xl shadow-xl border border-border/50 p-6 md:p-8 backdrop-blur-xl flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1 w-full space-y-2">
              <div className="flex items-center gap-2 text-primary font-medium mb-1">
                <Search className="w-4 h-4" />
                <span>Find a Tutorial</span>
              </div>
            </div>
            <div className="w-full md:w-[400px]">
              <TutorialSearch />
            </div>
          </div>
        </div>

      <section className="container max-w-7xl mx-auto px-4 py-12 mb-20">
        <div className="flex items-start justify-between gap-4 mb-10 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-sm">
              <Library className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-foreground tracking-tight">Browse Library</h2>
              <p className="text-muted-foreground">Select a category and jump straight into topics.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-card to-primary/5 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="absolute inset-0 pointer-events-none opacity-60">
                <div className="absolute -left-10 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute -right-16 bottom-0 h-40 w-40 rounded-full bg-primary/5 blur-3xl" />
              </div>

              <div className="relative flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    Category
                  </div>
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
                    {category.description || `Explore tutorials in ${category.title}`}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-background/80 border border-border flex items-center justify-center text-muted-foreground shrink-0 shadow-inner">
                  <BookOpen className="w-5 h-5" />
                </div>
              </div>

              <div className="relative mt-6 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  <FileText className="h-4 w-4 text-primary" />
                  Topics {category.topics.length > 0 ? `(${category.topics.length})` : ""}
                </div>

                {category.topics.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-border/70 bg-background/70 px-4 py-6 text-sm text-muted-foreground">
                    New topics coming soon.
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {category.topics.map((topic) => {
                      const href = topic.firstLessonSlug
                        ? `/tutorials/${topic.slug}/${topic.firstLessonSlug}`
                        : `/tutorials/${topic.slug}`;
                      return (
                        <Link
                          key={topic.id}
                          href={href}
                          className="group/link inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/80 px-3 py-1.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:border-primary/50 hover:text-primary"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-border group-hover/link:bg-primary" />
                          <span className="truncate">{topic.title}</span>
                          <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover/link:opacity-100" />
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}