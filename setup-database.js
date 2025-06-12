// This script sets up the database and generates the Prisma client

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Check if .env.local exists, if not create it
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('Creating .env.local file...');
  const envContent = `# NextAuth.js Configuration
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