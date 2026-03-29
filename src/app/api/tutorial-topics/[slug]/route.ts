import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json({ success: false, error: 'Slug is required' }, { status: 400 });
    }

    const topic = await prisma.tutorialsTopic.findUnique({
      where: { 
        slug,
        isPublic: true,
      },
      include: {
        category: {
          select: { id: true, title: true, slug: true }
        },
        subtopics: {
          where: { isPublic: true },
          orderBy: { position: 'asc' },
          select: {
            id: true,
            title: true,
            slug: true,
            description: true,
            position: true,
            logo: true,
            lessons: {
              where: { isPublic: true },
              orderBy: { position: 'asc' },
              select: {
                id: true,
                title: true,
                slug: true,
                position: true,
              }
            }
          }
        }
      }
    });

    if (!topic) {
      return NextResponse.json({ success: false, error: 'Topic not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: topic,
    }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to fetch topic',
    }, { status: 500 });
  }
}
