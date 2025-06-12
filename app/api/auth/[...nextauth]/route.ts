import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

// Fix for Next.js 14+ async API handlers
export const GET = async (req: Request) => {
  const handler = NextAuth(authOptions);
  return handler(req);
}

export const POST = async (req: Request) => {
  const handler = NextAuth(authOptions);
  return handler(req);
} 