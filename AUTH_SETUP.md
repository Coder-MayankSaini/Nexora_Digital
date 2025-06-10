# Authentication Setup Guide

This guide will help you set up the NextAuth.js authentication system with Google and GitHub providers.

## Prerequisites

- Node.js and npm installed
- A Google Developer account
- A GitHub account

## Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```env
# NextAuth.js Configuration
NEXTAUTH_SECRET=your-secret-key-here-change-in-production
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Database
DATABASE_URL="file:./dev.db"
```

## Setting up OAuth Providers

### Google OAuth Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Configure the OAuth consent screen
6. Create OAuth 2.0 credentials:
   - Application type: Web application
   - Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
7. Copy the Client ID and Client Secret to your `.env.local` file

### GitHub OAuth Setup

1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Click "New OAuth App"
3. Fill in the application details:
   - Application name: Your app name
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy the Client ID and Client Secret to your `.env.local` file

## Database Setup

The project uses Prisma with SQLite for development. To set up the database:

```bash
# Generate Prisma client
npx prisma generate

# Push the schema to the database
npx prisma db push

# (Optional) View the database
npx prisma studio
```

## User Roles

The system supports three user roles:

- **USER**: Basic access to dashboard
- **EDITOR**: Can access content management features
- **ADMIN**: Full access to all administrative features

### Setting User Roles

Since this is a demo, you can manually update user roles in the database:

1. Run `npx prisma studio`
2. Open the User table
3. Edit the `role` field for any user

## Protected Routes

The following routes are protected by authentication and role-based access:

- `/dashboard` - Requires authentication
- `/dashboard/editor` - Requires EDITOR or ADMIN role
- `/dashboard/admin` - Requires ADMIN role

## Testing the Authentication

1. Start the development server: `npm run dev`
2. Navigate to `http://localhost:3000`
3. Click the "Sign In" button in the header
4. Choose Google or GitHub to sign in
5. After signing in, you'll be redirected back to the site
6. Access the dashboard at `/dashboard`

## Troubleshooting

### Common Issues

1. **Environment variables not loading**: Make sure `.env.local` is in the root directory
2. **OAuth errors**: Check that redirect URIs match exactly in provider settings
3. **Database errors**: Run `npx prisma db push` to ensure database is up to date
4. **Role access denied**: Check user role in database using Prisma Studio

### Production Deployment

For production deployment:

1. Update `NEXTAUTH_URL` to your production domain
2. Update OAuth provider redirect URIs to use your production domain
3. Use a production database (PostgreSQL, MySQL, etc.)
4. Generate a secure `NEXTAUTH_SECRET`

## Features Implemented

✅ NextAuth.js with Google and GitHub providers  
✅ Database adapter with Prisma  
✅ Protected routes with middleware  
✅ Role-based access control (USER, EDITOR, ADMIN)  
✅ Dashboard with role-specific content  
✅ Session management  
✅ Responsive authentication UI  

## File Structure

```
├── app/
│   ├── api/auth/[...nextauth]/route.ts  # NextAuth API route
│   ├── dashboard/                       # Protected dashboard routes
│   │   ├── layout.tsx                   # Dashboard layout
│   │   ├── page.tsx                     # Main dashboard
│   │   ├── admin/page.tsx              # Admin-only page
│   │   ├── editor/page.tsx             # Editor page
│   │   └── unauthorized/page.tsx        # Access denied page
├── components/auth/                     # Authentication components
│   ├── AuthButton.tsx                  # Login/logout button
│   └── SessionProvider.tsx             # Session provider wrapper
├── lib/
│   ├── auth.ts                         # NextAuth configuration
│   └── useSession.ts                   # Custom session hooks
├── middleware.ts                       # Route protection middleware
└── prisma/schema.prisma                # Database schema
``` 