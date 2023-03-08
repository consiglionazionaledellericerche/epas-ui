import NextAuth, { NextAuthOptions} from "next-auth"

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
  {
      id: "authIIT",
      name: "authIIT",
      type: "oauth",
      wellKnown:"https://auth.iit.cnr.it/auth/realms/testing/.well-known/uma2-configuration",
      issuer : "https://auth.iit.cnr.it/auth/realms/testing",
      params: { grant_type: "client_credentials" },
      checks: ["pkce", "state"],
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          preferred_username: profile.preferred_username,
        }
      },
      clientId: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET,
      redirect: false,
      idToken:true
     }
  ],
  secret: process.env.NEXTAUTH_SECRET,
   session: {
       strategy: "jwt",
     },
  callbacks: {
//      async signIn({ user, account, profile, email, credentials }) {
//            return true
//      },
//      async redirect({ url, baseUrl }) {
//        return baseUrl
//      },
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
        token.id_token = account.id_token
      }
      return token
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken
      session.user.image = null;
      console.log('session>>>', session);
     return session
    }
  },
  debug: true
}

export default NextAuth(authOptions)