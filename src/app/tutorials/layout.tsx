import type { ReactNode } from "react";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import { TutorialsNavbar } from "@/components/tutorials/TutorialsNavbar";

export const revalidate = 600;

const getFeaturedTopics = unstable_cache(async () => {
  try {
    const topics = await prisma.tutorialsTopic.findMany({
      where: { isPublic: true },
      orderBy: { position: "asc" },
      select: { title: true, slug: true },
      take: 4,
    });
    return topics;
  } catch (err) {
    console.error("Error fetching featured topics", err);
    return [];
  }
}, ["tutorials-featured-topics"], { revalidate });

export default async function TutorialsLayout({ children }: { children: ReactNode }) {
  const topics = await getFeaturedTopics();
  
  return (
    <>
      <TutorialsNavbar featuredTopics={topics} />
      {children}
    </>
  );
}
