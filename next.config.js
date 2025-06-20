/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['picsum.photos', 'res.cloudinary.com', 'i.pravatar.cc'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    // Don't set unoptimized to true for production as it disables image optimization
    unoptimized: process.env.NODE_ENV === 'development' ? true : false,
  },
  webpack: (config, { isServer, dev }) => {
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

    // Optimize bundle in production
    if (!dev && !isServer) {
      // Improve tree shaking
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
      
      // Split chunks more aggressively
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: {
            minChunks: 2,
            reuseExistingChunk: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 20,
            chunks: 'all',
          },
          animations: {
            test: /[\\/]node_modules[\\/](framer-motion)[\\/]/,
            name: 'animations',
            priority: 30,
            chunks: 'all',
          },
          ui: {
            test: /[\\/]components[\\/]ui[\\/]/,
            name: 'ui',
            priority: 25,
            chunks: 'all',
          },
        },
      };
    }

    return config;
  },
  // Performance optimizations
  experimental: {
    // Enable new optimizations
    optimizeCss: true,
    optimizePackageImports: ['framer-motion', 'lucide-react'],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  // Compiler options for better performance
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
    // Enable React compiler optimizations
    reactRemoveProperties: process.env.NODE_ENV === 'production',
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
  // Enable ESLint during builds
  eslint: {
    // Only run ESLint on specific directories during production builds
    dirs: ['app', 'components', 'lib', 'hooks'],
  },
  // Configure headers for better caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig; 