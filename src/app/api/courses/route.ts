import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search') || '';
    const categoryId = searchParams.get('categoryId');

    const courses = await prisma.course.findMany({
      where: {
        isPublic: true,
        ...(search && {
          OR: [
            { title: { contains: search } },
            { description: { contains: search } },
          ],
        }),
        ...(categoryId && { categoryId: parseInt(categoryId) }),
      },
      select: {
        id: true,
        title: true,
        slug: true,
        thumbnailImage: true,
        duration: true,
        category: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
      orderBy: {
        title: 'asc',
      },
    });

    return NextResponse.json({
      success: true,
      data: courses,
      count: courses.length,
    }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to fetch courses',
    }, { status: 500 });
  }
}
