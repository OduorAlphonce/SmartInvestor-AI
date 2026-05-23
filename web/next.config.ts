import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",

  // TypeScript settings
  typescript: {
    ignoreBuildErrors: false, // ⚠️ Keep false in production
  },

  images: {
    unoptimized: true, // Disable built-in optimization if using external CDN
  },

  // You can add headers, rewrites, redirects here if needed
};

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  // Suppress source map uploading logs during build
  silent: true,
  org: "smart-investor-ai",
  project: "javascript-nextjs",
});
