import NextAuth, { NextAuthOptions} from "next-auth"
import KeycloakProvider from "next-auth/providers/keycloak";
import dotenv from 'dotenv';
dotenv.config();

const CLIENTID = process.env.CLIENTID || "";
const CLIENTSECRET = process.env.CLIENTSECRET || "";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    KeycloakProvider({
      clientId: CLIENTID,
      clientSecret: CLIENTSECRET,
      wellKnown:"https://auth.iit.cnr.it/auth/realms/testing/.well-known/uma2-configuration",
      issuer : "https://auth.iit.cnr.it/auth/realms/testing",
    })
  ],
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