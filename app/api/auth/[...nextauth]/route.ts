import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

// Fix for Next.js 14+ async API warnings
export async function GET(req: Request, { params }: { params: { nextauth: string[] } }) {
  // Wait for params to be ready
  const nextauthParams = await Promise.resolve(params.nextauth);
  
  const handler = NextAuth(authOptions);
  return handler(req, { params: { nextauth: nextauthParams } });
}

export async function POST(req: Request, { params }: { params: { nextauth: string[] } }) {
  // Wait for params to be ready
  const nextauthParams = await Promise.resolve(params.nextauth);
  
  const handler = NextAuth(authOptions);
  return handler(req, { params: { nextauth: nextauthParams } });
} 