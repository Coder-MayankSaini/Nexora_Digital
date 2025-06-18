import { authOptions } from "@/lib/auth"
import NextAuth from "next-auth"

// Create NextAuth handler
const handler = NextAuth(authOptions)

// Export as GET and POST handlers for App Router
export const GET = handler
export const POST = handler 