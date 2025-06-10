/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['picsum.photos'],
    unoptimized: process.env.NODE_ENV === 'production' ? true : false,
  },
  webpack: (config, { isServer }) => {
    // Only include the 'cloudinary' module in server-side builds
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        child_process: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
  // Ignore npm/yarn warnings and continue build
  // This is important to make Netlify builds work
  onDemandEntries: {
    // Make Next.js ignore Netlify errors
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 5,
  },
};

module.exports = nextConfig; 