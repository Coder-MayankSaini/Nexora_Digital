import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user has publishing permissions (EDITOR or ADMIN)
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    });

    if (!user || (user.role !== 'EDITOR' && user.role !== 'ADMIN')) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    const data = await request.json();
    
    const {
      id,
      title,
      content,
      featuredImage,
      featuredImageAlt,
      seo,
      publishedAt
    } = data;

    // Validate required fields for publishing
    if (!title?.trim()) {
      return NextResponse.json({ error: 'Title is required for publishing' }, { status: 400 });
    }

    if (!content?.trim()) {
      return NextResponse.json({ error: 'Content is required for publishing' }, { status: 400 });
    }

    if (!seo?.slug?.trim()) {
      return NextResponse.json({ error: 'URL slug is required for publishing' }, { status: 400 });
    }

    // Check if slug is already taken (excluding current post if updating)
    const existingPost = await prisma.post.findFirst({
      where: {
        slug: seo.slug,
        id: { not: id || undefined },
        status: 'PUBLISHED'
      }
    });

    if (existingPost) {
      return NextResponse.json({ error: 'URL slug is already taken' }, { status: 400 });
    }

    const publishData = {
      title,
      content,
      featuredImage: featuredImage || '',
      featuredImageAlt: featuredImageAlt || '',
      seoTitle: seo?.title || title,
      seoDescription: seo?.description || '',
      slug: seo.slug,
      keywords: seo?.keywords ? JSON.stringify(seo.keywords) : '[]',
      status: 'PUBLISHED' as const,
      publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
      updatedAt: new Date()
    };

    let publishedPost;

    if (id) {
      // Update existing post
      publishedPost = await prisma.post.update({
        where: {
          id: id,
          authorId: session.user.id // Ensure user can only update their own posts
        },
        data: publishData,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true
            }
          }
        }
      });
    } else {
      // Create new published post
      publishedPost = await prisma.post.create({
        data: {
          ...publishData,
          authorId: session.user.id,
          createdAt: new Date()
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true
            }
          }
        }
      });
    }

    return NextResponse.json({
      ...publishedPost,
      keywords: publishedPost.keywords ? JSON.parse(publishedPost.keywords) : [],
      lastSaved: publishedPost.updatedAt.toISOString()
    });
  } catch (error) {
    console.error('Publish error:', error);
    
    // Handle specific Prisma errors
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json({ error: 'URL slug is already taken' }, { status: 400 });
    }
    
    return NextResponse.json({ error: 'Failed to publish post' }, { status: 500 });
  }
} 