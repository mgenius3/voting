/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_TOKEN_KEY: process.env.NEXT_PUBLIC_TOKEN_KEY,
  },
};

module.exports = nextConfig;
