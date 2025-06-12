# Database Setup Guide

This guide will help you set up and use the database for the Nexora Digital website.

## Overview

The Nexora Digital website uses:
- **Prisma ORM** for database access
- **SQLite** for local development
- **NextAuth.js** for authentication with database integration

## Getting Started

### 1. Set up environment variables

Create a `.env.local` file in the root directory with the following variables:

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
DATABASE_URL="file:./prisma/dev.db"
```

### 2. Run the database setup script

```bash
npm run db:setup
```

This script will:
- Generate the Prisma client
- Push the schema to the database
- Create a new SQLite database if it doesn't exist

### 3. Open Prisma Studio (optional)

To view and manage your database with a GUI:

```bash
npm run db:studio
```

This will open Prisma Studio at http://localhost:5555

## Database Schema

The database includes the following models:

### Authentication Models

- **User**: User accounts with role-based access
- **Account**: OAuth provider connections
- **Session**: Active user sessions
- **VerificationToken**: Email verification tokens

### Content Models

- **Post**: Blog posts with various metadata fields

## API Routes

The following API routes interact with the database:

- **GET /api/posts**: Fetch published posts
- **POST /api/posts**: Create a new post (requires authentication)

## User Roles

The system supports three user roles:

- **USER**: Basic access to dashboard
- **EDITOR**: Can create and edit content
- **ADMIN**: Full administrative access

## Development Workflow

1. Make changes to the Prisma schema in `prisma/schema.prisma`
2. Run `npx prisma generate` to update the Prisma client
3. Run `npx prisma db push` to update the database schema
4. Use `prisma.ts` singleton for database access in your code

## Production Deployment

For production, you should:

1. Use a more robust database (PostgreSQL, MySQL)
2. Update the `DATABASE_URL` in your production environment
3. Run migrations instead of using `db push`

Example production setup:

```env
DATABASE_URL="postgresql://username:password@hostname:port/database"
```

## Troubleshooting

### Common Issues

1. **Database connection errors**: Check that your `DATABASE_URL` is correct
2. **Authentication errors**: Ensure OAuth credentials are set up correctly
3. **Prisma client not generated**: Run `npx prisma generate`

### Resetting the Database

If you need to reset your development database:

1. Delete the `prisma/dev.db` file
2. Run `npm run db:setup` to recreate it 