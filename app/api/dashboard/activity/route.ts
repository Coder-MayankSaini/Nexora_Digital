import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Get recent posts and contacts
    const [recentPosts, recentContacts] = await Promise.all([
      prisma.post.findMany({
        take: 3,
        orderBy: { createdAt: 'desc' },
        include: {
          author: {
            select: { name: true }
          }
        }
      }),
      
      prisma.contactSubmission.findMany({
        take: 2,
        orderBy: { createdAt: 'desc' }
      })
    ]);

    const activities = [
      ...recentPosts.map((post: any) => ({
        icon: 'FileText',
        title: post.status === 'PUBLISHED' ? 'New post published' : 'New post created',
        description: `"${post.title}" by ${post.author.name}`,
        time: getTimeAgo(post.createdAt),
        color: post.status === 'PUBLISHED' ? 'bg-blue-500' : 'bg-gray-500'
      })),
      
      ...recentContacts.map((contact: any) => ({
        icon: 'MessageSquare',
        title: 'New contact submission',
        description: `${contact.name} from ${contact.companyName || contact.country}`,
        time: getTimeAgo(contact.createdAt),
        color: 'bg-emerald-500'
      }))
    ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());

    return NextResponse.json(activities.slice(0, 5));
  } catch (error) {
    console.error('Activity fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recent activity' },
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