import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable strict mode for React to help catch potential issues early
  reactStrictMode: true,

  // Enable SWC minification for faster builds and smaller bundles
  swcMinify: true,

  // TypeScript settings
  typescript: {
    // ⚠️ Set to false in production to prevent deploying with type errors
    ignoreBuildErrors: false,
  },

  // Image optimization settings
  images: {
    // Disable built-in Next.js image optimization
    // Useful if you rely on an external CDN for image processing
    unoptimized: true,
  },

  // Experimental features
  experimental: {
    appDir: true, // Enables the App Router (recommended for new projects)
  },

  // Optional headers, rewrites, and redirects can be added here
};

export default nextConfig;