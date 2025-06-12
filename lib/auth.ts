import { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "./prisma"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "dummy-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "dummy-client-secret",
    }),
    // Add credentials provider for testing
    CredentialsProvider({
      name: "Demo Account",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "demo" },
        password: { label: "Password", type: "password", placeholder: "demo" }
      },
      async authorize(credentials) {
        // This is a demo account - in production, you would validate against your database
        if (credentials?.username === "demo" && credentials?.password === "demo") {
          // Return a mock user
          return {
            id: "demo-user",
            name: "Demo User",
            email: "demo@example.com",
            image: "https://ui-avatars.com/api/?name=Demo+User&background=random",
            role: "USER"
          }
        }
        return null
      }
    })
  ],
  callbacks: {
    async session({ session, user }) {
      // Add user id and role to session
      if (session?.user) {
        session.user.id = user?.id || "demo-user"
        session.user.role = user?.role || "USER"
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt', // Use JWT for credentials provider
  },
  // Add a secret for JWT
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key-here-change-in-production",
}

export default NextAuth(authOptions) 