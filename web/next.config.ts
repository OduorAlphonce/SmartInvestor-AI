import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // TypeScript settings
  typescript: {
    ignoreBuildErrors: false, // ⚠️ Keep false in production
  },

  images: {
    unoptimized: true, // Disable built-in optimization if using external CDN
  },

  // You can add headers, rewrites, redirects here if needed
};

export default nextConfig;