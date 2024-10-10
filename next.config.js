/** @type {import('next').NextConfig} */

const epasService = 'NEXT_PUBLIC_EPAS_SERVICE';
const apiDestination = process.env[epasService] || process.env.EPAS_SERVICE;

const nextConfig = {
  env: {
      CLIENTID: process.env.NEXT_PUBLIC_CLIENTID || process.env.CLIENTID || "",
      CLIENTSECRET: process.env.NEXT_PUBLIC_CLIENT_SECRET || process.env.CLIENT_SECRET || "",
      NEXTAUTH_URL: process.env.NEXT_PUBLIC_NEXTAUTH_URL || process.env.NEXTAUTH_URL || "",
      NETXTAUTH_SECRET: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET || process.env.NEXTAUTH_SECRET || "",
      OAUTH_LOGIN: process.env.NEXT_PUBLIC_OAUTH_LOGIN || "true",
      LDAP_LOGIN: process.env.NEXT_PUBLIC_LDAP_LOGIN || "false",
      EPAS_SERVICE: process.env[epasService] || process.env.EPAS_SERVICE || "",
      EPAS_HELPDESK_SERVICE: process.env.NEXT_PUBLIC_EPAS_HELPDESK_SERVICE || process.env.EPAS_HELPDESK_SERVICE || "",
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
        destination: apiDestination // Proxy to Backend
      },
    ]
  },
  output: 'standalone'
}

module.exports = nextConfig