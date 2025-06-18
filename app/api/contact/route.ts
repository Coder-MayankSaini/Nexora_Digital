import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const submissions = await prisma.contactSubmission.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Parse services from JSON string to array
    const formattedSubmissions = submissions.map(submission => ({
      ...submission,
      services: JSON.parse(submission.services)
    }));

    return NextResponse.json(formattedSubmissions);
  } catch (error: any) {
    console.error('Error fetching contact submissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contact submissions' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { name, email, phoneNumber, country, services, message } = body;
    
    if (!name || !email || !phoneNumber || !country || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Create contact submission in database
    const submission = await prisma.contactSubmission.create({
      data: {
        name,
        email,
        phoneNumber,
        companyName: body.companyName || null,
        country,
        services: Array.isArray(services) ? JSON.stringify(services) : JSON.stringify([]),
        message,
        status: 'NEW',
      },
    });
    
    return NextResponse.json({ 
      success: true,
      id: submission.id 
    }, { status: 201 });
  } catch (error: any) {
    console.error('Contact submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    );
  }
} 