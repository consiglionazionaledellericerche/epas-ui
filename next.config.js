/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
      OAUTH_LOGIN: process.env.OAUTH_LOGIN,
      LDAP_LOGIN: process.env.LDAP_LOGIN,
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