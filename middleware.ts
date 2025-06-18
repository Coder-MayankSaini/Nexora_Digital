import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // Redirect all dashboard access to unauthorized if not an admin
    if (req.nextUrl.pathname.startsWith("/dashboard")) {
      if (req.nextauth.token?.role !== "ADMIN") {
        return NextResponse.rewrite(new URL("/dashboard/unauthorized", req.url))
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Protect all dashboard routes - require authentication
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