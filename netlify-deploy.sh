#!/bin/bash

# Netlify deployment script for Next.js with Prisma and PostgreSQL

echo "🚀 Starting Netlify deployment process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma client
echo "🔄 Generating Prisma client..."
npx prisma generate

# Deploy database migrations
echo "🗃️ Deploying database migrations..."
# Use db push in production for simplicity (or migrate deploy if you're using migrations)
npx prisma db push --accept-data-loss

# Build Next.js app
echo "🏗️ Building Next.js application..."
next build

echo "✅ Deployment preparation complete!" 