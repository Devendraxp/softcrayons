import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export type TutorialTopicLite = {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  position?: number | null;
};

export type TutorialCategoryWithTopics = {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  logo?: string | null;
  topics: TutorialTopicLite[];
};

export function TutorialCategoryGrid({ categories }: { categories: TutorialCategoryWithTopics[] }) {
  if (!categories.length) {
    return <p className="text-muted-foreground">No categories found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <div
          key={category.id}
          className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary font-semibold">
              {category.title.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h3 className="text-lg font-semibold">{category.title}</h3>
              {category.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">{category.description}</p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {category.topics.length === 0 && (
              <p className="text-sm text-muted-foreground">Topics coming soon</p>
            )}
            {category.topics.map((topic) => (
              <Link key={topic.id} href={`/tutorials/${topic.slug}`}>
                <Badge variant="outline" className="gap-1 px-3 py-1 text-xs font-medium hover:bg-primary/10">
                  {topic.title}
                </Badge>
              </Link>
            ))}
          </div>

          {category.topics.length > 0 && (
            <div className="mt-auto pt-6 text-sm font-medium text-primary">
              <Link
                href={`/tutorials/${category.topics[0].slug}`}
                className="inline-flex items-center gap-2 hover:underline"
              >
                Explore topics
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
