# Connecting to Your Render PostgreSQL Database

This guide walks you through the process of connecting your PostgreSQL database on Render to your Next.js application.

## Step 1: Get Your Render PostgreSQL Connection URL

1. **Log in to your Render dashboard** at https://dashboard.render.com/
2. **Navigate to your PostgreSQL database** service
3. **Locate the "Connection" section** in your database dashboard
4. **Copy the "External Database URL"** - it should look like:
   ```
   postgres://username:password@host:port/database_name
   ```

## Step 2: Update Your Local Environment

1. **Update your local `.env.local` file** with the Render database URL:
   ```
   DATABASE_URL=postgres://username:password@host:port/database_name
   ```
   Replace the existing SQLite URL (`file:./dev.db`) with your Render PostgreSQL URL.

2. **Verify your database connection:**
   ```bash
   npx prisma db push
   ```
   This will create the necessary tables in your Render PostgreSQL database.

## Step 3: Push Your Prisma Schema to Render Database

1. **Create necessary tables in your Render database**:
   ```bash
   npx prisma db push
   ```

2. **Generate Prisma client**:
   ```bash
   npx prisma generate
   ```

3. **Verify your database setup**:
   ```bash
   npx prisma studio
   ```
   This should open the Prisma Studio interface connected to your Render database.

## Step 4: Configure for Netlify Deployment

1. **Update your `.env.production.local` file** with your Render PostgreSQL URL:
   ```
   DATABASE_URL=postgres://username:password@host:port/database_name
   NEXTAUTH_URL=https://nexoradigital.live
   NEXTAUTH_SECRET=your-nextauth-secret
   
   # Google OAuth
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

2. **When deploying to Netlify**, add the same environment variables in your Netlify dashboard:
   - Go to Site settings > Environment variables
   - Add `DATABASE_URL` with your Render PostgreSQL URL
   - Add other environment variables as shown above

## Step 5: Test Your Application

1. **Run your application locally** with the new database connection:
   ```bash
   npm run dev
   ```

2. **Test database functionality** to ensure it's working properly with your Render PostgreSQL database.

## Troubleshooting

- **Connection Issues**: Ensure your Render database allows connections from your IP address. You may need to configure IP-based access control in your Render dashboard.
  
- **Migration Errors**: If you encounter migration errors, you can reset your database and run migrations again:
  ```bash
  npx prisma migrate reset --force
  npx prisma migrate dev
  ```

- **SSL Requirements**: Render PostgreSQL requires SSL. Your connection URL should work automatically, but if you encounter issues, you may need to add SSL parameters.

- **Database Configuration**: Make sure your Prisma schema is properly configured for PostgreSQL:
  ```prisma
  datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
  }
  ``` 