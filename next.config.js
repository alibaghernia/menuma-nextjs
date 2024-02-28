const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: process.env.NODE_ENV == 'development',
  workboxOptions: {
    disableDevLogs: true,
  },
  // ... other options you like
});
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    'kitchen-flow-editor',
    '@ant-design/icons',
    'zustand',
    'leva',
    'zaman',
    'react-jss',
  ],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  staticPageGenerationTimeout: 1000,
};

module.exports = withBundleAnalyzer(withPWA(nextConfig));
