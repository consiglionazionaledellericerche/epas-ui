/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
//      {
//        source: '/api(^(?!.*\/auth\/).*$)/:path*',
////        source: '/api/rest/:path*',
//        destination: 'http://localhost:8080/:path*' // Proxy to Backend
//      }
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
