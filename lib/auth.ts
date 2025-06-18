import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
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
        console.log("Authorize called with credentials:", { username: credentials?.username, hasPassword: !!credentials?.password });
        
        // Only check for admin credentials - NO other users allowed
        const adminUsername = process.env.ADMIN_USERNAME || "admin";
        const adminPassword = process.env.ADMIN_PASSWORD || "maybrain";
        
        console.log("Expected credentials:", { username: adminUsername, hasPassword: !!adminPassword });
        
        if (credentials?.username === adminUsername && credentials?.password === adminPassword) {
          console.log("Admin credentials verified successfully");
          return {
            id: "admin-user",
            name: "Administrator",
            email: "admin@nexoradigital.live",
            role: "ADMIN"
          }
        }
        
        console.log("Invalid credentials provided");
        // Return null for any other credentials - NO OTHER USERS ALLOWED
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Add role to JWT token
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Add user id and role to session from token
      if (session?.user && token) {
        (session.user as any).id = token.id as string;
        (session.user as any).role = token.role as string;
        
        // Additional security check - only allow ADMIN role
        if (token.role !== "ADMIN") {
          throw new Error("Unauthorized access");
        }
      }
      return session;
    },
    async signIn({ user }) {
      // Only allow sign in for admin users
      return (user as any)?.role === "ADMIN";
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
  secret: process.env.NEXTAUTH_SECRET || "development-secret-key-change-in-production",
  debug: process.env.NODE_ENV === 'development',
} 