import { authOptions } from "@/lib/auth"
import NextAuth from "next-auth"

// Create NextAuth handler
const handler = NextAuth(authOptions)

// Export as GET and POST handlers for App Router with proper typing
export async function GET(request: Request, context: { params: Promise<{ nextauth: string[] }> }) {
  const params = await context.params;
  return handler(request, { params });
}

export async function POST(request: Request, context: { params: Promise<{ nextauth: string[] }> }) {
  const params = await context.params;
  return handler(request, { params });
} 