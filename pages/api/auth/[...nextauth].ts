import NextAuth, { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
  {
      id: "authIit",
      name: "authIit",
      type: "oauth",
      wellKnown:"https://auth.iit.cnr.it/auth/realms/testing/.well-known/uma2-configuration",
      authorization: {  url: "https://auth.iit.cnr.it/auth/realms/testing/protocol/openid-connect/auth",
                        params: { scope: process.env.SCOPES }
                     },
      issuer : "https://auth.iit.cnr.it/auth/realms/testing",
      token: {
               url: "https://auth.iit.cnr.it/auth/realms/testing/protocol/openid-connect/token",
               async request(context) {
                 // context contains useful properties to help you make the request.
                 const tokens = await makeTokenRequest(context)
                 console.log("tokens",tokens);
                 return { tokens }
               }
             },
      userinfo: "https://auth.iit.cnr.it/auth/realms/testing/protocol/openid-connect/userinfo",
      params: { grant_type: "password" },
      idToken: true,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          preferred_username: profile.preferred_username,
        }
      },
      clientId: process.env.CLIENTID,
      redirect: false
     }
  ],
  secret: process.env.NEXTAUTH_SECRET,
   session: {
       strategy: "jwt",
     },
  callbacks: {
//      async signIn({ user, account, profile, email, credentials }) {
//            return true
//          },
//      async redirect({ url, baseUrl }) {
//      console.log("redirect url", url);
//      console.log("redirect baseUrl", baseUrl);
//        return baseUrl
//      },
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
        token.id = profile.id
        token.username = profile.name
      }
      return token
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken
      session.user.id = token.id
      return session
    }
  },

     debug: true
}

export default NextAuth(authOptions)