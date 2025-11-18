/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  // Remove experimental.appDir for Next.js 13.4+
  // Remove webpack config for path aliases (use jsconfig.json instead)
  // Remove output: 'standalone' unless you need it
  // Remove trailingSlash: true unless specifically needed
}

module.exports = nextConfig