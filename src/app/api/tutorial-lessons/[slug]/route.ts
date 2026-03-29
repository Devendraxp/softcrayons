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

    const lesson = await prisma.tutorialsLesson.findUnique({
      where: { 
        slug,
        isPublic: true,
      },
      include: {
        subtopic: {
          select: { 
            id: true, title: true, slug: true,
            topic: { 
              select: { 
                id: true, title: true, slug: true,
                category: { select: { id: true, title: true, slug: true } }
              }
            }
          }
        }
      }
    });

    if (!lesson) {
      return NextResponse.json({ success: false, error: 'Lesson not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: lesson,
    }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to fetch lesson',
    }, { status: 500 });
  }
}
