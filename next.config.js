/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.100.38',
        port: "8000",
        pathname: '/storage/**',
      },
      {
        protocol: 'http',
        hostname: 'panel.menuma.online',
        port: "",
        pathname: '/storage/**',
      },
    ],
  },
}

module.exports = nextConfig
