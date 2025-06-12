/**
 * Setup Netlify Environment Variables Guide
 * 
 * This script helps you configure your Netlify environment variables
 * for proper connection to the Render PostgreSQL database.
 */

console.log('\n=== NETLIFY ENVIRONMENT VARIABLES SETUP GUIDE ===\n');
console.log('Copy and paste the following environment variables into your Netlify dashboard:');
console.log('Site settings > Environment variables\n');

console.log('DATABASE_URL=postgresql://nexoradb_user:AVKkt3a6MdiumoEWMymu9StobW2WvCUO@dpg-d15arc63jp1c73fm8nag-a.singapore-postgres.render.com/nexoradb');
console.log('NEXTAUTH_URL=https://nexoradigital.netlify.app');
console.log('NEXTAUTH_SECRET=b3b4b07f-405b-49df-936b-0794733a6fbe');
console.log('GOOGLE_CLIENT_ID=1096180620718-dmufp3q4i2255t0048akgl1hg5ngfet2.apps.googleusercontent.com');
console.log('GOOGLE_CLIENT_SECRET=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');

console.log('\n=== TROUBLESHOOTING DATABASE CONNECTION ===\n');
console.log('1. Make sure your Render database is active and running');
console.log('2. Check if your database URL is correct in the Netlify environment variables');
console.log('3. Ensure your IP address is allowed in Render\'s database access control');
console.log('4. Verify that the database credentials are correct');
console.log('5. Check if your database schema is properly initialized (Prisma DB push should be run during build)');

console.log('\n=== TESTING DATABASE CONNECTION ===\n');
console.log('To test the database connection, deploy your site with these environment variables');
console.log('If issues persist, check the deploy logs in the Netlify dashboard for specific error messages'); 