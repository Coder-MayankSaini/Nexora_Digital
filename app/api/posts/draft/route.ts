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

    const data = await request.json();
    
    const {
      id,
      title,
      content,
      featuredImage,
      featuredImageAlt,
      seo,
      status = 'draft'
    } = data;

    // Validate required fields
    if (!title && !content) {
      return NextResponse.json({ error: 'Title or content is required' }, { status: 400 });
    }

    // Check if updating existing draft or creating new one
    if (id) {
      // Update existing draft
      const updatedDraft = await prisma.post.update({
        where: {
          id: id,
          authorId: session.user.id // Ensure user can only update their own drafts
        },
        data: {
          title: title || '',
          content: content || '',
          featuredImage: featuredImage || '',
          featuredImageAlt: featuredImageAlt || '',
          seoTitle: seo?.title || '',
          seoDescription: seo?.description || '',
          slug: seo?.slug || '',
          keywords: seo?.keywords ? JSON.stringify(seo.keywords) : '[]',
          status,
          updatedAt: new Date()
        }
      });

      return NextResponse.json({
        ...updatedDraft,
        keywords: updatedDraft.keywords ? JSON.parse(updatedDraft.keywords) : [],
        lastSaved: updatedDraft.updatedAt.toISOString()
      });
    } else {
      // Create new draft
      const newDraft = await prisma.post.create({
        data: {
          title: title || '',
          content: content || '',
          featuredImage: featuredImage || '',
          featuredImageAlt: featuredImageAlt || '',
          seoTitle: seo?.title || '',
          seoDescription: seo?.description || '',
          slug: seo?.slug || generateSlug(title || 'untitled'),
          keywords: seo?.keywords ? JSON.stringify(seo.keywords) : '[]',
          status,
          authorId: session.user.id,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });

      return NextResponse.json({
        ...newDraft,
        keywords: newDraft.keywords ? JSON.parse(newDraft.keywords) : [],
        lastSaved: newDraft.updatedAt.toISOString()
      });
    }
  } catch (error) {
    console.error('Draft save error:', error);
    return NextResponse.json({ error: 'Failed to save draft' }, { status: 500 });
  }
}

// Helper function to generate slug
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .substring(0, 50);
} 