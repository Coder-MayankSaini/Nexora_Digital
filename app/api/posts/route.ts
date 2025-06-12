import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import slugify from 'slugify'

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      where: { status: 'PUBLISHED' },
      select: {
        id: true,
        title: true,
        slug: true,
        featuredImage: true,
        featuredImageAlt: true,
        seoDescription: true,
        publishedAt: true,
        author: {
          select: {
            name: true,
            image: true,
          }
        }
      },
      orderBy: {
        publishedAt: 'desc'
      }
    })

    return NextResponse.json({ posts }, { status: 200 })
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    // Check if user is authenticated and has required role
    if (!session?.user || !['EDITOR', 'ADMIN'].includes(session.user.role as string)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const data = await request.json()
    const { title, content, featuredImage, featuredImageAlt, seoTitle, seoDescription, keywords, status } = data
    
    // Generate a unique slug from title
    let slug = slugify(title, { lower: true, strict: true })
    
    // Check if slug already exists
    const existingPost = await prisma.post.findUnique({
      where: { slug }
    })
    
    // If slug exists, append a random string
    if (existingPost) {
      slug = `${slug}-${Math.random().toString(36).substring(2, 8)}`
    }
    
    // Create the post
    const post = await prisma.post.create({
      data: {
        title,
        content,
        slug,
        featuredImage,
        featuredImageAlt,
        seoTitle: seoTitle || title,
        seoDescription,
        keywords: keywords ? JSON.stringify(keywords) : null,
        status: status || 'DRAFT',
        publishedAt: status === 'PUBLISHED' ? new Date() : null,
        authorId: session.user.id
      }
    })
    
    return NextResponse.json({ post }, { status: 201 })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
} 