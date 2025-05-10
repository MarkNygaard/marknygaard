/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['www.datocms-assets.com'],
  },
  experimental: {
    viewTransition: true,
  },
};

module.exports = nextConfig;
