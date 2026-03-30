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

      <section className="relative z-20 -mt-8 mb-16">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="bg-card rounded-2xl shadow-xl border border-border/50 p-6 md:p-8 backdrop-blur-xl flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1 w-full space-y-2">
              <div className="flex items-center gap-2 text-primary font-medium mb-1">
                <Search className="w-4 h-4" />
                <span>Find a Tutorial</span>
              </div>
              <h2 className="text-2xl font-bold text-foreground">What do you want to learn today?</h2>
              <p className="text-muted-foreground text-sm">Search through our comprehensive library of coding resources.</p>
            </div>
            <div className="w-full md:w-[400px]">
              <TutorialSearch />
            </div>
          </div>
        </div>
      </section>

      <section className="container max-w-7xl mx-auto px-4 py-12 mb-20">
        <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Library className="w-6 h-6" />
            </div>
            <div>
                <h2 className="text-3xl font-black text-foreground tracking-tight">Browse Library</h2>
                <p className="text-muted-foreground">Select a category to start exploring topics.</p>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {categories.map((category) => (
            <div 
              key={category.id} 
              className="group flex flex-col bg-card rounded-[2rem] border border-border overflow-hidden hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 h-full"
            >
              <div className="p-8 pb-6 border-b border-border/50 bg-muted/20">
                <div className="flex items-start justify-between gap-4 mb-4">
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {category.title}
                    </h3>
                    <div className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground shrink-0 shadow-sm">
                        <BookOpen className="w-5 h-5" />
                    </div>
                </div>
                {category.description ? (
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                    {category.description}
                  </p>
                ) : (
                  <p className="text-muted-foreground text-sm italic">
                    Explore tutorials in {category.title}
                  </p>
                )}
              </div>

              <div className="p-8 flex-1 bg-card">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground uppercase tracking-wider mb-6">
                    <FileText className="w-4 h-4 text-primary" />
                    Available Topics ({category.topics.length})
                </div>

                {category.topics.length === 0 ? (
                  <div className="py-8 text-center bg-muted/30 rounded-xl border border-dashed border-border">
                    <p className="text-sm text-muted-foreground font-medium">New topics coming soon.</p>
                  </div>
                ) : (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                    {category.topics.map((topic) => {
                      const href = topic.firstLessonSlug
                        ? `/tutorials/${topic.slug}/${topic.firstLessonSlug}`
                        : `/tutorials/${topic.slug}`;
                      return (
                        <li key={topic.id}>
                          <Link
                            href={href}
                            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors py-1 group/link"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-border group-hover/link:bg-primary transition-colors shrink-0" />
                            <span className="text-sm font-medium truncate">{topic.title}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}