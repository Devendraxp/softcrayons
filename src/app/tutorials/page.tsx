
import { Metadata } from "next";
import Link from "next/link";
import { TutorialHero } from "@/components/tutorials/TutorialHero";
import { fetchServerApi } from "@/lib/server-api";

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
  position?: number | null;
  categoryId: number;
  firstLessonSlug?: string;
};

type CategoryListing = {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  position?: number | null;
  topics: TopicLink[];
};

type LandingResponse = {
  success: boolean;
  data: CategoryListing[];
  error?: string;
};

async function getTutorialLanding(): Promise<CategoryListing[]> {
  const response = await fetchServerApi<LandingResponse>("/api/tutorials/landing", {
    next: { revalidate: 0 },
  });

  if (!response.success) {
    throw new Error(response.error || "Failed to fetch tutorials landing data");
  }

  return [...response.data]
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
    .map((category) => ({
      ...category,
      topics: [...category.topics].sort((a, b) => (a.position ?? 0) - (b.position ?? 0)),
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