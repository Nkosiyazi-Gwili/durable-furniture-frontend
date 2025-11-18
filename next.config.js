/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['localhost', 'your-vercel-app.vercel.app'],
    unoptimized: true // For static exports if needed
  },
 env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  // Add this for path aliases
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname),
    }
    return config
  },
  trailingSlash: true,
  output: 'standalone'
}

module.exports = nextConfig