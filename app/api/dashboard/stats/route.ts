import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Get real data from database
    const [
      totalPosts,
      totalUsers,
      totalContacts,
      recentPosts,
      recentContacts,
      publishedPosts,
      draftPosts
    ] = await Promise.all([
      // Count total posts
      prisma.post.count(),
      
      // Count total users
      prisma.user.count(),
      
      // Count total contact submissions
      prisma.contactSubmission.count(),
      
      // Get recent posts (last 7 days)
      prisma.post.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          }
        }
      }),
      
      // Get recent contacts (last 7 days)
      prisma.contactSubmission.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          }
        }
      }),
      
      // Count published posts
      prisma.post.count({
        where: { status: 'PUBLISHED' }
      }),
      
      // Count draft posts
      prisma.post.count({
        where: { status: 'DRAFT' }
      })
    ]);

    // Calculate growth percentages (mock for now, you'd need historical data)
    const stats = {
      totalViews: {
        value: totalPosts * 127, // Estimate views based on posts
        change: "+12.5%",
        trend: "up"
      },
      activeUsers: {
        value: totalUsers,
        change: `+${Math.round((recentContacts / Math.max(totalContacts - recentContacts, 1)) * 100)}%`,
        trend: recentContacts > 0 ? "up" : "neutral"
      },
      engagement: {
        value: totalPosts > 0 ? Math.round((publishedPosts / totalPosts) * 100) : 0,
        change: "+8.2%",
        trend: "up"
      },
      revenue: {
        value: totalContacts * 45.7, // Estimate revenue from contacts
        change: "+15.3%",
        trend: "up"
      },
      totalPosts,
      publishedPosts,
      draftPosts,
      totalContacts,
      recentActivity: {
        postsThisWeek: recentPosts,
        contactsThisWeek: recentContacts
      }
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
} 