
import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { TutorialHero } from "@/components/tutorials/TutorialHero";
import { Library, Search } from "lucide-react";

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
    <div className="min-h-screen bg-background flex flex-col">
      <div className="pt-24">
        <TutorialHero />
        <section className="container max-w-7xl mx-auto px-4 py-16 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {categories.map((category) => (
              <div key={category.id} className="flex flex-col">
                <div className="mb-6 space-y-2">
                  <h3 className="text-2xl font-bold text-foreground">
                    {category.title}
                  </h3>
                </div>
                <div className="flex-1">
                  {category.topics.length === 0 ? (
                    <div className="text-sm text-muted-foreground italic">
                      New topics coming soon.
                    </div>
                  ) : (
                    <ul className="space-y-3">
                      {category.topics.map((topic, index) => {
                        const href = topic.firstLessonSlug
                          ? `/tutorials/${topic.slug}/${topic.firstLessonSlug}`
                          : `/tutorials/${topic.slug}`;
                        return (
                          <li key={topic.id}>
                            <Link
                              href={href}
                              className="group flex items-baseline gap-3 py-1"
                            >
                              <span className="text-sm font-semibold text-muted-foreground/50 transition-colors group-hover:text-primary/70 select-none">
                                {index + 1}.
                              </span>
                              <span className="text-base font-bold text-primary transition-colors group-hover:text-primary/70">
                                {topic.title}
                              </span>
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
    </div>
  );
}