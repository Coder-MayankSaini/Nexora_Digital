import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    // Create a sample user if none exists
    let user = await prisma.user.findFirst();
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: 'admin@nexora.com',
          name: 'Admin User',
          emailVerified: new Date(),
        }
      });
    }

    // Create sample posts
    const samplePosts = [
      {
        title: 'Getting Started with Modern Web Development',
        slug: 'getting-started-modern-web-dev',
        content: JSON.stringify({
          time: Date.now(),
          blocks: [
            {
              type: 'paragraph',
              data: {
                text: 'This is a comprehensive guide to modern web development practices and tools that every developer should know.'
              }
            }
          ]
        }),
        status: 'PUBLISHED',
        authorId: user.id,
        featuredImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800',
        seoTitle: 'Getting Started with Modern Web Development',
        seoDescription: 'Learn modern web development practices and tools',
        keywords: JSON.stringify(['web-development', 'javascript', 'react']),
        publishedAt: new Date()
      },
      {
        title: 'Advanced React Patterns and Best Practices',
        slug: 'advanced-react-patterns',
        content: JSON.stringify({
          time: Date.now(),
          blocks: [
            {
              type: 'paragraph',
              data: {
                text: 'Explore advanced React patterns including hooks, context, and performance optimization techniques.'
              }
            }
          ]
        }),
        status: 'PUBLISHED',
        authorId: user.id,
        featuredImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
        seoTitle: 'Advanced React Patterns and Best Practices',
        seoDescription: 'Master advanced React patterns and optimization',
        keywords: JSON.stringify(['react', 'patterns', 'performance']),
        publishedAt: new Date()
      },
      {
        title: 'Building Scalable APIs with Node.js',
        slug: 'scalable-apis-nodejs',
        content: JSON.stringify({
          time: Date.now(),
          blocks: [
            {
              type: 'paragraph',
              data: {
                text: 'Learn how to build robust, scalable APIs using Node.js, Express, and modern database technologies.'
              }
            }
          ]
        }),
        status: 'DRAFT',
        authorId: user.id,
        featuredImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
        seoTitle: 'Building Scalable APIs with Node.js',
        seoDescription: 'Learn to build scalable Node.js APIs',
        keywords: JSON.stringify(['nodejs', 'api', 'scalability'])
      }
    ];

    // Create posts
    for (const postData of samplePosts) {
      const existingPost = await prisma.post.findUnique({
        where: { slug: postData.slug }
      });
      
      if (!existingPost) {
        await prisma.post.create({ data: postData });
      }
    }

    // Create sample contact submissions
    const sampleContacts = [
      {
        name: 'Sarah Johnson',
        email: 'sarah@techstartup.com',
        phoneNumber: '+1-555-0123',
        country: 'United States',
        companyName: 'Tech Startup Inc',
        services: JSON.stringify(['web-development']),
        message: 'We need a modern e-commerce platform with advanced features. Timeline: 2-3 months, Budget: $10,000-$25,000'
      },
      {
        name: 'Michael Chen',
        email: 'michael@digitalagency.com',
        phoneNumber: '+1-555-0456',
        country: 'Canada',
        companyName: 'Digital Agency Co',
        services: JSON.stringify(['digital-marketing']),
        message: 'Looking for comprehensive digital marketing strategy and implementation. Timeline: 1-2 months, Budget: $5,000-$10,000'
      },
      {
        name: 'Emma Rodriguez',
        email: 'emma@localstore.com',
        phoneNumber: '+34-555-0789',
        country: 'Spain',
        companyName: 'Local Store',
        services: JSON.stringify(['local-seo']),
        message: 'Need help with local SEO to increase foot traffic to our store. Timeline: 1 month, Budget: $2,500-$5,000'
      }
    ];

    // Create contact submissions
    for (const contactData of sampleContacts) {
      const existingContact = await prisma.contactSubmission.findFirst({
        where: { email: contactData.email }
      });
      
      if (!existingContact) {
        await prisma.contactSubmission.create({ data: contactData });
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Sample data created successfully',
      data: {
        postsCreated: samplePosts.length,
        contactsCreated: sampleContacts.length
      }
    });
  } catch (error) {
    console.error('Seed data error:', error);
    return NextResponse.json(
      { error: 'Failed to create sample data' },
      { status: 500 }
    );
  }
} 