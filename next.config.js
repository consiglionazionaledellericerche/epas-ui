/** @type {import('next').NextConfig} */

const defaultEpasService = 'https://epas-service.devel.iit.cnr.it';

const nextConfig = {
  env: {},
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
        destination: process.env.NEXT_PUBLIC_EPAS_SERVICE || defaultEpasService // Proxy to Backend
      },
    ]
  },
  output: 'standalone'
}

module.exports = nextConfig