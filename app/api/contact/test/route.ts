import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Test database connection
    const testConnection = await prisma.$queryRaw`SELECT 1 as test`;
    
    // Test environment variables
    const envVars = {
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      hasEmailUser: !!process.env.EMAIL_USER,
      hasEmailPass: !!process.env.EMAIL_PASS,
      nodeEnv: process.env.NODE_ENV,
    };
    
    return NextResponse.json({
      success: true,
      database: 'Connected',
      environment: envVars,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('Test endpoint error:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 