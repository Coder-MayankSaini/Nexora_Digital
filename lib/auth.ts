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
    // Admin credentials provider - ONLY for admin access
    CredentialsProvider({
      name: "Admin Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "admin username" },
        password: { label: "Password", type: "password", placeholder: "admin password" }
      },
      async authorize(credentials) {
        // Only check for admin credentials - NO other users allowed
        const adminUsername = process.env.ADMIN_USERNAME || "admin";
        const adminPassword = process.env.ADMIN_PASSWORD || "NexoraAdmin2024!";
        
        if (credentials?.username === adminUsername && credentials?.password === adminPassword) {
          return {
            id: "admin-user",
            name: "Administrator",
            email: "admin@nexoradigital.live",
            image: "https://ui-avatars.com/api/?name=Admin&background=f97316&color=fff",
            role: "ADMIN"
          }
        }
        
        // Return null for any other credentials - NO OTHER USERS ALLOWED
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Add role to JWT token
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Add user id and role to session from token
      if (session?.user && token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        
        // Additional security check - only allow ADMIN role
        if (token.role !== "ADMIN") {
          throw new Error("Unauthorized access");
        }
      }
      return session;
    },
    async signIn({ user }) {
      // Only allow sign in for admin users
      return user?.role === "ADMIN";
    },
  },
  pages: {
    signIn: '/admin-login',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  // Add a secret for JWT
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key-here-change-in-production",
  // Enhanced security
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      }
    }
  }
}

export default NextAuth(authOptions) 