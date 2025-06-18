# Admin-Only Dashboard Setup

This application has been configured with **admin-only** access to the dashboard. No regular users can access the dashboard - only administrators with valid credentials.

## Security Features

### 1. Environment-Based Admin Credentials
The admin credentials are stored in environment variables for security:

```bash
ADMIN_USERNAME=admin
ADMIN_PASSWORD=NexoraAdmin2024!
```

**⚠️ IMPORTANT**: Change these default credentials in production!

### 2. Multiple Security Layers

#### Layer 1: NextAuth Configuration
- Only admin credentials are accepted
- Google OAuth is available but doesn't grant dashboard access
- JWT tokens include role verification
- Session callbacks verify ADMIN role

#### Layer 2: Middleware Protection
- All `/dashboard/*` routes are protected
- Automatically redirects non-admins to unauthorized page
- Validates user role before allowing access

#### Layer 3: Client-Side Protection
- Dashboard layout verifies authentication
- Role-based access control components
- Automatic redirects for unauthorized users

### 3. Admin Login Process

1. Visit `/admin-login`
2. Enter admin username and password
3. System verifies credentials against environment variables
4. Only ADMIN role users can access dashboard

### 4. Protected Routes

All dashboard routes are protected:
- `/dashboard` - Main dashboard
- `/dashboard/contact-submissions` - Contact form submissions
- `/dashboard/*` - All sub-routes

### 5. Unauthorized Access Handling

Non-admin users are redirected to:
- `/dashboard/unauthorized` - Shows access denied message
- `/admin-login` - For unauthenticated users

## Setup Instructions

### 1. Set Environment Variables

Create a `.env.local` file with:

```bash
# Admin Credentials - CHANGE IN PRODUCTION
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_secure_admin_password

# NextAuth Configuration
NEXTAUTH_URL=https://nexoradigital.live/
NEXTAUTH_SECRET=your-super-secret-nextauth-secret

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 2. Access the Dashboard

1. Navigate to `https://nexoradigital.live/admin-login`
2. Enter your admin credentials
3. Access the dashboard at `https://nexoradigital.live/dashboard`

### 3. Security Best Practices

1. **Change Default Credentials**: Never use the default admin/password combination in production
2. **Use Strong Passwords**: Minimum 12 characters with mixed case, numbers, and symbols
3. **Secure Environment Variables**: Never commit `.env.local` to version control
4. **Regular Updates**: Change admin credentials periodically
5. **Monitor Access**: Check logs for unauthorized access attempts

## Troubleshooting

### Cannot Access Dashboard
- Verify you're using the correct admin credentials
- Check that environment variables are set correctly
- Ensure you're accessing `/admin-login` not `/login`

### Session Issues
- Clear browser cookies and try again
- Verify NEXTAUTH_SECRET is set in environment variables
- Check that the domain in NEXTAUTH_URL matches your site

### Role Verification Failed
- Confirm admin credentials in environment variables
- Check that the user role is properly set to "ADMIN"
- Verify middleware configuration is active

## Technical Implementation

The admin-only system uses:
- **NextAuth.js** for authentication
- **JWT strategy** for session management
- **Middleware** for route protection
- **Role-based access control** (RBAC)
- **Environment variables** for credential storage

Only users with the `ADMIN` role can access any dashboard functionality. This ensures complete security and prevents unauthorized access to administrative features. 