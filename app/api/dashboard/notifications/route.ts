import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Get unread contact submissions
    const newContactSubmissions = await prisma.contactSubmission.count({
      where: { status: 'NEW' }
    });

    // Get recent posts that need attention (drafts)
    const draftPosts = await prisma.post.count({
      where: { status: 'DRAFT' }
    });

    // Get recent contact submissions (last 7 days)
    const recentContacts = await prisma.contactSubmission.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        }
      }
    });

    // Get latest contact submissions for activity feed
    const latestSubmissions = await prisma.contactSubmission.findMany({
      where: { status: 'NEW' },
      take: 3,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        companyName: true,
        country: true,
        createdAt: true,
        services: true
      }
    });

    const notifications = {
      newContactSubmissions,
      draftPosts,
      recentContacts,
      latestSubmissions: latestSubmissions.map((submission: any) => ({
        id: submission.id,
        title: 'New Contact Submission',
        description: `${submission.name} from ${submission.companyName || submission.country}`,
        time: getTimeAgo(submission.createdAt),
        type: 'contact',
        link: '/dashboard/contact-submissions',
        services: JSON.parse(submission.services || '[]')
      })),
      totalNotifications: newContactSubmissions + draftPosts
    };

    return NextResponse.json(notifications);
  } catch (error) {
    console.error('Notifications fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 }
    );
  }
}

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
} 