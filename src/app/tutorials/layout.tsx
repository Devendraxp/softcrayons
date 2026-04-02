import type { ReactNode } from "react";
import { TutorialsNavbar } from "@/components/tutorials/TutorialsNavbar";
import { prisma } from "@/lib/prisma";

async function getNavbarTopics() {
  const featured = await prisma.tutorialsTopic.findMany({
    where: { isPublic: true, isFeatured: true },
    select: { title: true, slug: true },
    orderBy: [{ position: "asc" }, { id: "asc" }],
    take: 4,
  });

  if (featured.length >= 4) return featured;

  const fallback = await prisma.tutorialsTopic.findMany({
    where: {
      isPublic: true,
      slug: { notIn: featured.map((topic) => topic.slug) },
    },
    select: { title: true, slug: true },
    orderBy: [{ position: "asc" }, { id: "asc" }],
    take: 4 - featured.length,
  });

  return [...featured, ...fallback];
}

export default async function TutorialsLayout({ children }: { children: ReactNode }) {
  const featuredTopics = await getNavbarTopics();

  return (
    <>
      <TutorialsNavbar featuredTopics={featuredTopics} />
      {children}
    </>
  );
}
