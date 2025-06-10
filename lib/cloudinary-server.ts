'use server';

import { v2 as cloudinary } from 'cloudinary';

// This file will only be used in server components
// Configure Cloudinary with server-side environment variables
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary; 