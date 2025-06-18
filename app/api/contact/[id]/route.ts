import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const { id } = params;
    const body = await request.json();
    
    // Validate status
    const { status } = body;
    const validStatuses = ['NEW', 'READ', 'REPLIED', 'ARCHIVED'];
    
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400 }
      );
    }
    
    // Update the submission status
    const updatedSubmission = await prisma.contactSubmission.update({
      where: { id },
      data: { 
        status,
        updatedAt: new Date()
      },
    });
    
    return NextResponse.json(updatedSubmission);
  } catch (error: any) {
    console.error('Error updating contact submission:', error);
    
    // Handle not found error
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Contact submission not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to update contact submission' },
      { status: 500 }
    );
  }
} 