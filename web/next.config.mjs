/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   appDir: true,  <-- Remove or check docs for replacement
  // },
  // swcMinify: true, <-- Remove; minification is automatic in recent Next.js
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig;