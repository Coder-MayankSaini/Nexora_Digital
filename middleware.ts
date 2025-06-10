import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // Check if user is trying to access admin routes
    if (req.nextUrl.pathname.startsWith("/dashboard/admin")) {
      if (req.nextauth.token?.role !== "ADMIN") {
        return NextResponse.rewrite(new URL("/dashboard/unauthorized", req.url))
      }
    }

    // Check if user is trying to access editor routes
    if (req.nextUrl.pathname.startsWith("/dashboard/editor")) {
      if (req.nextauth.token?.role !== "ADMIN" && req.nextauth.token?.role !== "EDITOR") {
        return NextResponse.rewrite(new URL("/dashboard/unauthorized", req.url))
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Protect all dashboard routes
        if (req.nextUrl.pathname.startsWith("/dashboard")) {
          return !!token
        }
        return true
      },
    },
  }
)

export const config = {
  matcher: ["/dashboard/:path*"]
} 