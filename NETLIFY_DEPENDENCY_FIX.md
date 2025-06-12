# Netlify Deployment Dependency Conflict Fix

## Problem

The Netlify deployment was failing during the dependency installation phase with the following error:

```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE could not resolve
npm ERR!
npm ERR! While resolving: next-auth@4.24.7
npm ERR! Found: next@15.3.3
npm ERR! node_modules/next
npm ERR!   next@"^15.3.3" from the root project
npm ERR!   peer next@"^12 || ^13 || ^14 || >=15.0.0-rc || ^15" from next-cloudinary@6.16.0
npm ERR!   node_modules/next-cloudinary
npm ERR!     next-cloudinary@"^6.16.0" from the root project
```

This indicates a conflict between `next-auth` and our Next.js version.

## Solution

The following changes were made to fix the issue:

1. **Added Legacy Peer Dependencies flag**:
   - Updated `netlify-deploy.sh` to use `npm install --legacy-peer-deps`
   - Added `NPM_FLAGS = "--legacy-peer-deps"` to netlify.toml

2. **Added Package Overrides**:
   - Added overrides section to package.json to explicitly resolve next-auth's next dependency:
   ```json
   "overrides": {
     "next-auth": {
       "next": "^15.3.3"
     }
   }
   ```

3. **Created .npmrc file**:
   - Added global settings for npm with legacy-peer-deps option enabled

4. **Updated Build Process**:
   - Adjusted the build command to use `npx next build` for better compatibility
   - Added a postinstall script to ensure Prisma client is generated properly

## Verify Deployment

After pushing these changes, the Netlify deployment should succeed. If issues persist:

1. Check the Netlify build logs for specific errors
2. Consider downgrading next-auth if necessary
3. Verify environment variables are correctly set in Netlify dashboard

## Resources

- [Netlify Next.js Plugin Documentation](https://github.com/netlify/netlify-plugin-nextjs)
- [Next-Auth Documentation](https://next-auth.js.org/)
- [npm dependency resolution](https://docs.npmjs.com/cli/v9/configuring-npm/package-json#overrides) 