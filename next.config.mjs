/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
    optimizePackageImports: ['@mantine/core', '@mantine/hooks', '@mantine/tiptap'],
  },
  reactStrictMode: true,
  images: {
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
