import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const query = (searchParams.get("q") || "").trim();
    const limitParam = parseInt(searchParams.get("limit") || "8", 10);
    const limit = Math.min(Math.max(limitParam, 1), 25);

    if (query.length < 2) {
      return NextResponse.json({
        success: true,
        data: { topics: [], lessons: [] },
        message: "Search query must be at least 2 characters",
      });
    }

    const [topics, lessons] = await Promise.all([
      prisma.tutorialsTopic.findMany({
        where: {
          isPublic: true,
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
          ],
        },
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          category: { select: { title: true, slug: true } },
        },
        orderBy: [{ position: "asc" }, { title: "asc" }],
        take: limit,
      }),
      prisma.tutorialsLesson.findMany({
        where: {
          isPublic: true,
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
            { content: { contains: query, mode: "insensitive" } },
          ],
        },
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          position: true,
          subtopic: {
            select: {
              title: true,
              slug: true,
              topic: { select: { title: true, slug: true } },
            },
          },
        },
        orderBy: [{ position: "asc" }, { title: "asc" }],
        take: limit,
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: { topics, lessons },
      query,
      total: topics.length + lessons.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Failed to search tutorials",
      },
      { status: 500 },
    );
  }
}
