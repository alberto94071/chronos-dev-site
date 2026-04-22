/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
  experimental: {
    serverActions: {
      bodySizeLimit: "8mb",
    },
  },
};
module.exports = nextConfig;
