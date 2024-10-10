import NextAuth, { NextAuthOptions} from "next-auth"
import KeycloakProvider from "next-auth/providers/keycloak";
import dotenv from 'dotenv';
dotenv.config();

const CLIENTID = process.env.NEXT_PUBLIC_CLIENTID || process.env.CLIENTID || "";
const CLIENTSECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET || process.env.CLIENT_SECRET || "";
const NEXTAUTH_SECRET = process.env.NEXT_PUBLIC_NEXTAUTH_SECRET || process.env.NEXTAUTH_SECRET || "";
const OAUTH_CONFIG_URL = process.env.NEXT_PUBLIC_OAUTH_CONFIG_URL || "";
const OAUTH_ISSUER_URL = process.env.NEXT_PUBLIC_OAUTH_ISSUER_URL || "";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    KeycloakProvider({
      clientId: CLIENTID,
      clientSecret: CLIENTSECRET,
      wellKnown: OAUTH_CONFIG_URL,
      issuer : OAUTH_ISSUER_URL,
    })
  ],
  secret: NEXTAUTH_SECRET,
  debug: true,
  callbacks: {
    async session({ session, user, token }) {
      if (token) {
          session = Object.assign({}, session, {accessToken: token.access_token,
          refreshToken:token.refresh_token,
          user:token.user});
//             session.accessToken = token.access_token;
//             session.refreshToken = token.refresh_token;
//             session.user = token.user;
      }
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (account){
       return {
                user: {name: token.name,
                       email: token.email},
                access_token: account.access_token,
                refresh_token: account.refresh_token
              }
      }
      return token
    }
  }
}

export default NextAuth(authOptions)