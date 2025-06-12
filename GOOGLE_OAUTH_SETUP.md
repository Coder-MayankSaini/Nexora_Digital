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
NEXTAUTH_SECRET=b3b4b07f-405b-49df-936b-0794733a6fbe
NEXTAUTH_URL=https://nexoradigital.netlify.app

# Google OAuth
GOOGLE_CLIENT_ID=1096180620718-dmufp3q4i2255t0048akgl1hg5ngfet2.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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

# Database
DATABASE_URL="postgresql://nexoradb_user:AVKkt3a6MdiumoEWMymu9StobW2WvCUO@dpg-d15arc63jp1c73fm8nag-a.singapore-postgres.render.com/nexoradb"
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

## Step 4: Update Redirect URIs for Custom Domain (When Ready)

After you've set up your custom domain with Netlify, you need to update your Google OAuth configuration:

1. Go back to the Google Cloud Console > APIs & Services > Credentials
2. Select your OAuth 2.0 Client ID
3. Add additional Authorized redirect URIs:
   - `https://your-custom-domain.com/api/auth/callback/google`
4. Save your changes
5. Update the `NEXTAUTH_URL` environment variable in Netlify to use your custom domain

This ensures authentication works properly when users access your site through your custom domain.

## Troubleshooting

- If you see "Error starting the OAuth sign-in process", check that your client ID and client secret are correctly set in your environment variables
- If you see "Error during the OAuth callback", verify that your redirect URIs are correctly configured in Google Cloud Console
- If you encounter CORS errors, make sure your authorized JavaScript origins are correctly set
- Check the server logs for more detailed error messages

For more information, refer to the [NextAuth.js documentation](https://next-auth.js.org/providers/google) and [Google OAuth documentation](https://developers.google.com/identity/protocols/oauth2). 