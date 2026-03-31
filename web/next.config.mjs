/** @type {import('next').NextConfig} */
const nextConfig = {
  // TypeScript settings
  typescript: {
    // Temporarily allow builds even with type errors.
    // ⚠️ Recommended to set to false in production to catch type issues early.
    ignoreBuildErrors: false,
  },

  // Image optimization settings
  images: {
    // Disable Next.js built-in image optimization.
    // Useful for certain CDNs or external optimization pipelines.
    unoptimized: true,
  },

  // Recommended for modern Next.js builds
  reactStrictMode: true,  // Enable strict mode for React to catch potential issues
  swcMinify: true,        // Use the SWC compiler for faster minification

  // Optional: Enable experimental features if needed
  experimental: {
    appDir: true,         // Enables Next.js App Router
  },
}

export default nextConfig