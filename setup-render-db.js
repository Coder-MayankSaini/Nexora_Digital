/**
 * Render PostgreSQL Database Setup Script
 * 
 * This script helps you configure your local development environment
 * to connect to your Render PostgreSQL database.
 * 
 * Usage:
 * 1. Replace the placeholder URL below with your actual Render PostgreSQL URL
 * 2. Run this script with: node setup-render-db.js
 */

const fs = require('fs');
const { execSync } = require('child_process');

// ======== YOUR RENDER POSTGRESQL URL ========
const RENDER_POSTGRES_URL = "postgresql://nexoradb_user:AVKkt3a6MdiumoEWMymu9StobW2WvCUO@dpg-d15arc63jp1c73fm8nag-a.singapore-postgres.render.com/nexoradb";
// ====================================================================

// Check if URL is still the placeholder
if (RENDER_POSTGRES_URL.includes("your_username")) {
  console.error("\x1b[31mError: You need to replace the placeholder URL with your actual Render PostgreSQL URL\x1b[0m");
  console.log("Edit this script and replace the RENDER_POSTGRES_URL with your actual database URL from Render dashboard.");
  process.exit(1);
}

// Update .env.local file
try {
  console.log("📝 Updating .env.local file...");
  
  // Read existing .env.local file
  let envContent = "";
  try {
    envContent = fs.readFileSync('.env.local', 'utf8');
  } catch (err) {
    console.log("No existing .env.local file found. Creating a new one.");
  }

  // Replace DATABASE_URL or add it if it doesn't exist
  if (envContent.includes("DATABASE_URL=")) {
    envContent = envContent.replace(/DATABASE_URL=.*(\r?\n|$)/g, `DATABASE_URL=${RENDER_POSTGRES_URL}$1`);
  } else {
    envContent = `DATABASE_URL=${RENDER_POSTGRES_URL}\n${envContent}`;
  }

  // Write updated content back to .env.local
  fs.writeFileSync('.env.local', envContent);
  console.log("\x1b[32m✓ .env.local updated with Render PostgreSQL URL\x1b[0m");

  // Update .env.production.local file for deployment
  console.log("📝 Creating/updating .env.production.local for deployment...");
  
  // Read existing .env.production.local file
  let prodEnvContent = "";
  try {
    prodEnvContent = fs.readFileSync('.env.production.local', 'utf8');
  } catch (err) {
    console.log("No existing .env.production.local file found. Creating a new one.");
    // Copy content from .env.local as a starting point
    prodEnvContent = envContent;
  }

  // Replace DATABASE_URL or add it if it doesn't exist
  if (prodEnvContent.includes("DATABASE_URL=")) {
    prodEnvContent = prodEnvContent.replace(/DATABASE_URL=.*(\r?\n|$)/g, `DATABASE_URL=${RENDER_POSTGRES_URL}$1`);
  } else {
    prodEnvContent = `DATABASE_URL=${RENDER_POSTGRES_URL}\n${prodEnvContent}`;
  }

  // Make sure NEXTAUTH_URL is set for production
  if (!prodEnvContent.includes("NEXTAUTH_URL=")) {
    prodEnvContent += "\nNEXTAUTH_URL=https://your-netlify-domain.netlify.app\n";
    console.log("\x1b[33m⚠ Added placeholder NEXTAUTH_URL. Please update with your actual Netlify domain.\x1b[0m");
  }

  // Write updated content back to .env.production.local
  fs.writeFileSync('.env.production.local', prodEnvContent);
  console.log("\x1b[32m✓ .env.production.local updated with Render PostgreSQL URL\x1b[0m");

  // Run Prisma commands to setup the database
  console.log("\n🔄 Running Prisma commands to setup your database...");
  
  try {
    console.log("\n📊 Generating Prisma client...");
    execSync("npx prisma generate", { stdio: 'inherit' });
    
    console.log("\n📤 Pushing schema to database...");
    execSync("npx prisma db push", { stdio: 'inherit' });
    
    console.log("\n\x1b[32m✅ Database setup complete!\x1b[0m");
    console.log("\nNext steps:");
    console.log("1. Verify your database connection with: npx prisma studio");
    console.log("2. Run your application locally with: npm run dev");
    console.log("3. When deploying to Netlify, add the DATABASE_URL environment variable in the Netlify dashboard");
  } catch (error) {
    console.error("\n\x1b[31m❌ Error setting up database.\x1b[0m");
    console.log("Check the error message above for details on what went wrong.");
    console.log("Common issues:");
    console.log("- Make sure your Render database URL is correct");
    console.log("- Ensure your IP address is allowed to connect to your Render database");
    console.log("- Verify your Prisma schema is properly configured for PostgreSQL");
  }

} catch (error) {
  console.error("\x1b[31mError:\x1b[0m", error.message);
} 