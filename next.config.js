/** @type {import('next').NextConfig} */

const defaultEpasService = 'https://epas-service.devel.iit.cnr.it/:path*';

const nextConfig = {
  env: {
      CLIENTID: process.env.NEXT_PUBLIC_CLIENTID,
      CLIENTSECRET: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      NETXTAUTH_SECRET: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
      OAUTH_LOGIN: process.env.NEXT_PUBLIC_OAUTH_LOGIN || "true",
      LDAP_LOGIN: process.env.NEXT_PUBLIC_LDAP_LOGIN || "false",
      EPAS_SERVICE: process.env.NEXT_PUBLIC_EPAS_SERVICE,
      EPAS_HELPDESK_SERVICE: process.env.NEXT_PUBLIC_EPAS_HELPDESK_SERVICE,
    },

  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
              source: '/api/auth/:path*',
              destination: '/api/auth/:path*',
      }
    ]
  },
  output: 'standalone'
}

module.exports = nextConfig