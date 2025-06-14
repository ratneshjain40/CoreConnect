/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  reactStrictMode: true,
  poweredByHeader: false, // Remove the X-Powered-By header for security and reduced response size
  compress: true, // Enable gzip compression for all HTTP responses
  // Configure output for better performance
  headers: async () => {
    return [
      {
        source: '/api/event/webhook',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: '*',
          },
        ],
      },
      // Add cache control headers for static assets
      {
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          }
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          }
        ],
      },
    ];
  },
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bijlmakers.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'wallpapercat.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;