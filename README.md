# Nexora Website

A modern web project built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Next.js 14**: Utilizing the latest features and App Router
- **TypeScript**: For type safety and better developer experience
- **Tailwind CSS**: For utility-first styling
- **shadcn/ui**: For beautiful, accessible UI components
- **Framer Motion**: For smooth animations

## Project Structure

- `/app`: Page routes using App Router
- `/components`: Reusable UI components
- `/lib`: Utility functions
- `/styles`: Global CSS and animations

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the app for production
- `npm start`: Run the production build
- `npm run lint`: Run ESLint

## Adding shadcn/ui Components

```bash
npx shadcn@latest add [component-name]
```

## Environment Variables

Make sure to set the following environment variables in your Netlify deployment:
- `NEXTAUTH_URL`: Your site's URL (e.g., https://nexoradigital.live)
- `NEXTAUTH_SECRET`: A strong secret key for NextAuth.js
- `GOOGLE_CLIENT_ID`: Your Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Your Google OAuth client secret

These variables are required for authentication providers to work correctly.

## License

ISC 