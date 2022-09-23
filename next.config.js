/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    forceSwcTransforms: true,
  },
  images: {
    domains: [
      "scontent.fsgn5-13.fna.fbcdn.net",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com"
    ],
  },
};

module.exports = nextConfig;
