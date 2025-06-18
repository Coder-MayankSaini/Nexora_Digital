#!/bin/bash

# Netlify deployment script for Next.js with Prisma and PostgreSQL

echo "🚀 Starting Netlify deployment process..."

# Install dependencies with legacy-peer-deps to resolve dependency conflicts
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

# Generate Prisma client
echo "🔄 Generating Prisma client..."
npx prisma generate

# Skip database migrations during build - handled separately
echo "🗃️ Skipping database migrations during build..."

# Build Next.js app
echo "🏗️ Building Next.js application..."
npx next build

echo "✅ Deployment preparation complete!" 