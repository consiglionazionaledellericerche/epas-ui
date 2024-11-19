import NextAuth, { NextAuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import dotenv from 'dotenv';
dotenv.config();

const CLIENTID = process.env.NEXT_PUBLIC_CLIENTID || process.env.CLIENTID || "";
const CLIENTSECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET || process.env.CLIENT_SECRET || "";
const NEXTAUTH_SECRET = process.env.NEXT_PUBLIC_NEXTAUTH_SECRET || process.env.NEXTAUTH_SECRET || "";
const OAUTH_CONFIG_URL = process.env.NEXT_PUBLIC_OAUTH_CONFIG_URL || "";
const OAUTH_ISSUER_URL = process.env.NEXT_PUBLIC_OAUTH_ISSUER_URL || "";

async function refreshAccessToken(token: any) {
  try {
    const url = `${OAUTH_ISSUER_URL}/protocol/openid-connect/token`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: CLIENTID,
        client_secret: CLIENTSECRET,
        grant_type: "refresh_token",
        refresh_token: token.refresh_token || "",
      }),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      access_token: refreshedTokens.access_token,
      refresh_token: refreshedTokens.refresh_token || token.refresh_token, // Usa il refresh token precedente se non fornito
      access_token_expires: Date.now() + refreshedTokens.expires_in * 1000, // Convertito in ms
    };
  } catch (error) {
    console.error("Errore durante il refresh del token:", error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: CLIENTID,
      clientSecret: CLIENTSECRET,
      wellKnown: OAUTH_CONFIG_URL,
      issuer : OAUTH_ISSUER_URL
    })
  ],
  secret: NEXTAUTH_SECRET,
  debug: true,
  callbacks: {
    async session({ session, user, token }) {
      if (token) {
        session = Object.assign({}, session, {
          accessToken: token.access_token,
          refreshToken: token.refresh_token,
          user: token.user,
        });
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (account) {
        console.log("Nuovo access token ricevuto:", account.access_token);
        return {
          user: { name: token.name, email: token.email },
          access_token: account.access_token,
          refresh_token: account.refresh_token
        };
      }

      if (typeof token.access_token_expires === "number" && Date.now() < token.access_token_expires) {
              console.log("Token di accesso valido, nessun refresh necessario.");
              return token;
            }

      // Altrimenti, esegui il refresh del token
      console.log("Access token scaduto. Tentativo di refresh...");
      return await refreshAccessToken(token);
    }
  }
};

export default NextAuth(authOptions);
