# Deploying Nexora Digital to Netlify

This guide provides step-by-step instructions for deploying your Next.js application to Netlify with a PostgreSQL database on Render.

## Step 1: Database Setup on Render

1. **Create a PostgreSQL Database**:
   - Sign up or log in to [Render](https://render.com/)
   - Click "New" > "PostgreSQL"
   - Fill in the details:
     - Name: `nexora-db` (or your preferred name)
     - Database: `nexoradb`
     - User: Leave as default
     - Region: Choose closest to your users
     - Plan: Select appropriate plan (Free tier available)
   - Click "Create Database"

2. **Get Your Database Connection String**:
   - After creation, find the "External Database URL" in the database dashboard
   - It looks like: `postgres://username:password@host:port/database_name`
   - Save this URL for later use

## Step 2: Netlify Deployment

1. **Prepare Your GitHub Repository**:
   - Make sure your project is pushed to GitHub
   - Ensure all necessary files are committed:
     - `netlify.toml`
     - `.env.production.example` (as a reference)
     - Updated `prisma/schema.prisma` with PostgreSQL provider
     - Updated `package.json` with build script

2. **Connect to Netlify**:
   - Sign up or log in to [Netlify](https://netlify.com/)
   - Click "Add new site" > "Import an existing project"
   - Select GitHub as your Git provider
   - Authorize Netlify to access your repositories
   - Select your Nexora Digital repository

3. **Configure Build Settings**:
   - Build command: `npm run build` (already in netlify.toml)
   - Publish directory: `.next` (already in netlify.toml)
   - Click "Show advanced" to add environment variables

4. **Set Up Environment Variables**:
   - Go to Site settings > Environment variables
   - Add the following variables:
     - `NEXTAUTH_URL`: Set to `https://nexoradigital.netlify.app`
     - `NEXTAUTH_SECRET`: Set to `b3b4b07f-405b-49df-936b-0794733a6fbe`
     - `DATABASE_URL`: `postgresql://nexoradb_user:AVKkt3a6MdiumoEWMymu9StobW2WvCUO@dpg-d15arc63jp1c73fm8nag-a.singapore-postgres.render.com/nexoradb`
     - `GOOGLE_CLIENT_ID`: `1096180620718-dmufp3q4i2255t0048akgl1hg5ngfet2.apps.googleusercontent.com`
     - `GOOGLE_CLIENT_SECRET`: `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`
   
   **Important**: When you later connect your custom domain, remember to update the `NEXTAUTH_URL` environment variable to use your custom domain. Also update your Google OAuth redirect URIs to include the custom domain.

5. **Deploy Your Site**:
   - Click "Deploy site"
   - Wait for the build and deployment to complete

## Step 3: Update Google OAuth Configuration

1. **Update Google OAuth Redirect URIs**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Navigate to your project > "APIs & Services" > "Credentials"
   - Edit your OAuth 2.0 Client ID
   - Add authorized redirect URIs:
     - `https://your-netlify-domain.netlify.app/api/auth/callback/google`
     - `https://your-netlify-domain.netlify.app/api/auth/callback`

## Step 4: Verify Deployment

1. **Test Your Application**:
   - Visit your Netlify site URL
   - Test the authentication flow
   - Verify database connections are working

2. **Monitor Logs**:
   - Check Netlify deploy logs for any errors
   - Monitor Render database logs if needed

## Troubleshooting

- **Database Connection Issues**:
  - Verify the DATABASE_URL is correctly set in Netlify environment variables
  - Check if your IP is allowed in Render's database access controls
  
- **Authentication Errors**:
  - Ensure NEXTAUTH_URL matches your actual Netlify domain
  - Verify Google OAuth credentials and redirect URIs are correct

- **Build Failures**:
  - Check Netlify deploy logs for specific error messages
  - Verify the Prisma schema is correctly configured for PostgreSQL 