/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    inlineCss: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.datocms-assets.com',
      },
    ],
  },
};

module.exports = nextConfig;
