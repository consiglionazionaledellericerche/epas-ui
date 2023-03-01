import NextAuth, { NextAuthOptions } from "next-auth"
import Credentials from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
//  providers: [
//  {
//                id: "authIit",
//                name: "authIit",
//                type: "oauth",
//                authorization: "https://auth.iit.cnr.it/auth/realms/testing/protocol/openid-connect/authorize",
//                token: "https://auth.iit.cnr.it/auth/realms/testing/protocol/openid-connect/token",
//                userinfo: "https://auth.iit.cnr.it/auth/realms/testing/protocol/openid-connect/userinfo",
//                profile(profile) {
//                  return {
//                    id: profile.sub,
//                    name: profile.name,
//                    email: profile.email,
//                    preferred_username: profile.preferred_username,
//                  }
//                }
//               }
//             ],
//
//  callbacks: {
//      async signIn({ user, account, profile, email, credentials }) {
//            return true
//          },
//      async redirect({ url, baseUrl }) {
//        return baseUrl
//      },
//     async jwt({ token, account }) {
//       // Persist the OAuth access_token to the token right after signin
//       if (account) {
//         token.accessToken = account.access_token
//         token.id = profile.id
//         token.username = profile.name
//       }
//       return token
//     },
//     async session({ session, token, user }) {
//       // Send properties to the client, like an access_token from a provider.
//       session.accessToken = token.accessToken
//       session.user.id = token.id
//       return session
//     }
//   }
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
  {
      id: "authIit",
      name: "authIit",
      type: "oauth",
      authorization: "https://auth.iit.cnr.it/auth/realms/testing/protocol/openid-connect/authorize",
      token: "https://auth.iit.cnr.it/auth/realms/testing/protocol/openid-connect/token",
      userinfo: "https://auth.iit.cnr.it/auth/realms/testing/protocol/openid-connect/userinfo",
      params: { grant_type: "password" },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          preferred_username: profile.preferred_username,
        }
      },
      clientId: process.env.CLIENTID,
     }
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
     async session({ session, token, user }) {
       // Send properties to the client, like an access_token from a provider.
//       session.accessToken = token.accessToken
//       session.user.id = token.id
       return session
     },
    async jwt({ token }) {
      token.userRole = "admin"
      return token
    },
  },

}

export default NextAuth(authOptions)