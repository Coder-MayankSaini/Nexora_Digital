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
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password", placeholder: "password" }
      },
      async authorize(credentials) {
        // Check for admin credentials first
        if (credentials?.username === "admin" && credentials?.password === "adminpassword") {
          return {
            id: "admin-user",
            name: "Administrator",
            email: "admin@example.com",
            image: "https://ui-avatars.com/api/?name=Admin&background=f97316&color=fff",
            role: "ADMIN"
          }
        }
        
        // Check for demo user
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