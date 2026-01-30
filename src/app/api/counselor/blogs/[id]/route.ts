import { NextResponse } from 'next/server';
import { getBlogById, updateBlog, deleteBlog } from '@/services/blog.service';
import { getUserFromHeaders } from '@/lib/request-user';

/**
 * GET /api/counselor/blogs/[id]
 * Get a specific blog - counselors can only access their own blogs
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUserFromHeaders();
    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized',
      }, { status: 401 });
    }

    const { id: idStr } = await params;
    const id = parseInt(idStr);
    
    if (isNaN(id)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid blog ID',
      }, { status: 400 });
    }

    const blog = await getBlogById(id);
    
    if (!blog) {
      return NextResponse.json({
        success: false,
        error: 'Blog not found',
      }, { status: 404 });
    }

    // Check if the blog belongs to the current user
    if (blog.authorId !== user.id) {
      return NextResponse.json({
        success: false,
        error: 'You can only access your own blogs',
      }, { status: 403 });
    }
    
    return NextResponse.json({
      success: true,
      data: blog,
    }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch blog';
    return NextResponse.json({
      success: false,
      error: errorMessage,
    }, { status: 500 });
  }
}

/**
 * PUT /api/counselor/blogs/[id]
 * Update a blog - counselors have limited control:
 * - Cannot modify isPublic
 * - Cannot modify isFeatured
 * - Cannot change author
 * - Cannot change publish date
 * - Can only update their own blogs
 */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUserFromHeaders();
    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized',
      }, { status: 401 });
    }

    const { id: idStr } = await params;
    const id = parseInt(idStr);
    
    if (isNaN(id)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid blog ID',
      }, { status: 400 });
    }

    // Check if blog exists and belongs to user
    const existingBlog = await getBlogById(id);
    if (!existingBlog) {
      return NextResponse.json({
        success: false,
        error: 'Blog not found',
      }, { status: 404 });
    }

    if (existingBlog.authorId !== user.id) {
      return NextResponse.json({
        success: false,
        error: 'You can only update your own blogs',
      }, { status: 403 });
    }

    const body = await request.json();

    // Filter out restricted fields
    const allowedFields = ['title', 'description', 'content', 'categoryId', 'slug', 'bannerImage', 'thumbnailImage', 'readTime', 'tags', 'tableOfContents', 'metaTitle', 'metaDescription', 'metaKeywords'];
    
    const updateData: Record<string, unknown> = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    const updatedBlog = await updateBlog(id, updateData);
    
    return NextResponse.json({
      success: true,
      data: updatedBlog,
      message: 'Blog updated successfully',
    }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update blog';
    return NextResponse.json({
      success: false,
      error: errorMessage,
    }, { status: 400 });
  }
}

/**
 * DELETE /api/counselor/blogs/[id]
 * Delete a blog - counselors can only delete their own blogs
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUserFromHeaders();
    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized',
      }, { status: 401 });
    }

    const { id: idStr } = await params;
    const id = parseInt(idStr);
    
    if (isNaN(id)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid blog ID',
      }, { status: 400 });
    }

    // Check if blog exists and belongs to user
    const existingBlog = await getBlogById(id);
    if (!existingBlog) {
      return NextResponse.json({
        success: false,
        error: 'Blog not found',
      }, { status: 404 });
    }

    if (existingBlog.authorId !== user.id) {
      return NextResponse.json({
        success: false,
        error: 'You can only delete your own blogs',
      }, { status: 403 });
    }

    await deleteBlog(id);
    
    return NextResponse.json({
      success: true,
      message: 'Blog deleted successfully',
    }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete blog';
    return NextResponse.json({
      success: false,
      error: errorMessage,
    }, { status: 400 });
  }
}
