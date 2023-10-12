/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
      CLIENTID: process.env.CLIENTID,
      CLIENTSECRET: process.env.CLIENTSECRET,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
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
        destination: process.env.EPAS_SERVICE // Proxy to Backend
      },
    ]
  }
}

module.exports = nextConfig