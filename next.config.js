/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['picsum.photos', 'res.cloudinary.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    // Don't set unoptimized to true for production as it disables image optimization
    unoptimized: process.env.NODE_ENV === 'development' ? true : false,
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
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  // Configure compression for production builds
  compress: true,
  // Configure trailing slashes
  trailingSlash: false,
  // Configure powered by header
  poweredByHeader: false,
};

module.exports = nextConfig; 