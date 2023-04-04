/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    },
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
              source: '/api/auth/:path*',
              destination: '/api/auth/:path*',
      },
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/:path*' // Proxy to Backend
      },
    ]
  }
}

module.exports = nextConfig
