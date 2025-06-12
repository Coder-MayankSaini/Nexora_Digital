# Google OAuth Setup Guide for Nexora Website

This guide will walk you through the steps to set up Google OAuth for authentication in the Nexora website.

## 1. Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Click on "Select a project" at the top of the page
3. Click on "New Project" in the modal that appears
4. Enter a project name (e.g., "Nexora Website")
5. Click "Create"

## 2. Configure OAuth Consent Screen

1. Select your newly created project
2. In the left sidebar, navigate to "APIs & Services" > "OAuth consent screen"
3. Select "External" user type (unless you have a Google Workspace account)
4. Click "Create"
5. Fill in the required information:
   - App name: "Nexora Website"
   - User support email: Your email address
   - Developer contact information: Your email address
6. Click "Save and Continue"
7. Skip adding scopes by clicking "Save and Continue"
8. Add test users (your email) if you're still in testing mode
9. Click "Save and Continue"
10. Review your settings and click "Back to Dashboard"

## 3. Create OAuth Credentials

1. In the left sidebar, navigate to "APIs & Services" > "Credentials"
2. Click "Create Credentials" at the top of the page
3. Select "OAuth client ID"
4. For Application type, select "Web application"
5. Name: "Nexora Web Client"
6. Add Authorized JavaScript origins:
   - `http://localhost:3000` (for local development)
   - Your production URL (e.g., `https://nexora-website.vercel.app`)
7. Add Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (for local development)
   - Your production callback URL (e.g., `https://nexora-website.vercel.app/api/auth/callback/google`)
8. Click "Create"
9. A modal will appear with your client ID and client secret. Save these values.

## 4. Configure Environment Variables

1. Create or update your `.env.local` file in the root of your project with the following variables:

```
# NextAuth.js Configuration
NEXTAUTH_SECRET=your-secret-key-here-change-in-production
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here

# Database
DATABASE_URL="file:./prisma/dev.db"
```

2. Replace `your-google-client-id-here` with the client ID you received
3. Replace `your-google-client-secret-here` with the client secret you received
4. Generate a strong random string for `NEXTAUTH_SECRET` (you can use `openssl rand -base64 32` in a terminal)

## 5. Restart Your Application

1. Stop your development server if it's running
2. Start it again with `npm run dev`
3. The Google OAuth sign-in should now work properly

## 6. Production Deployment

When deploying to production:

1. Update your environment variables on your hosting platform (e.g., Vercel, Netlify)
2. Make sure `NEXTAUTH_URL` points to your production URL
3. Ensure your Google Cloud OAuth settings include your production URLs

## Troubleshooting

- If you see "Error starting the OAuth sign-in process", check that your client ID and client secret are correctly set in your environment variables
- If you see "Error during the OAuth callback", verify that your redirect URIs are correctly configured in Google Cloud Console
- If you encounter CORS errors, make sure your authorized JavaScript origins are correctly set
- Check the server logs for more detailed error messages

For more information, refer to the [NextAuth.js documentation](https://next-auth.js.org/providers/google) and [Google OAuth documentation](https://developers.google.com/identity/protocols/oauth2). 