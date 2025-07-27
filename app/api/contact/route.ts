import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendContactFormEmail } from '@/lib/email';

export async function GET() {
  try {
    const submissions = await prisma.contactSubmission.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Parse services from JSON string to array
    const formattedSubmissions = submissions.map((submission: any) => ({
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

export async function POST(request: NextRequest) {
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
    
    // Send email notification to marketing team
    try {
      await sendContactFormEmail({
        name,
        email,
        phoneNumber,
        companyName: body.companyName,
        country,
        services: Array.isArray(services) ? services : [],
        message,
      });
      console.log('Email notification sent to marketing team');
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
      // Don't fail the entire request if email fails
    }
    
    return NextResponse.json({ 
      success: true,
      id: submission.id 
    }, { status: 201 });
  } catch (error: any) {
    console.error('Contact submission error:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Failed to submit contact form';
    
    if (error.code === 'P2002') {
      errorMessage = 'A submission with this email already exists';
    } else if (error.code === 'P2025') {
      errorMessage = 'Database connection failed';
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 