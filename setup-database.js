// This script sets up the database and generates the Prisma client

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Check if .env.local exists, if not create it
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('Creating .env.local file...');
  const envContent = `# NextAuth.js Configuration
NEXTAUTH_SECRET=b3b4b07f-405b-49df-936b-0794733a6fbe
NEXTAUTH_URL=https://nexoradigital.live

# Google OAuth
GOOGLE_CLIENT_ID=1096180620718-dmufp3q4i2255t0048akgl1hg5ngfet2.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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

# GitHub OAuth
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Database
DATABASE_URL="postgresql://nexoradb_user:AVKkt3a6MdiumoEWMymu9StobW2WvCUO@dpg-d15arc63jp1c73fm8nag-a.singapore-postgres.render.com/nexoradb"
`;
  fs.writeFileSync(envPath, envContent);
  console.log('Created .env.local file with default configuration');
}

// Run Prisma commands
console.log('Generating Prisma client...');
try {
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('Prisma client generated successfully');
} catch (error) {
  console.error('Error generating Prisma client:', error.message);
  process.exit(1);
}

console.log('Pushing schema to database...');
try {
  execSync('npx prisma db push', { stdio: 'inherit' });
  console.log('Database schema pushed successfully');
} catch (error) {
  console.error('Error pushing schema to database:', error.message);
  process.exit(1);
}

console.log('\nDatabase setup complete! You can now run:');
console.log('  npm run dev     - Start the development server');
console.log('  npx prisma studio - Open Prisma Studio to manage your database\n');
console.log('Note: Update your .env.local file with proper credentials for authentication providers.'); 