import NextAuth from "next-auth";
import type { NextAuthOptions, Session, Account } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import jwt_decode from "jwt-decode";

export const authOptions: NextAuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KC_CLIENT_ID as string,
      clientSecret: process.env.KC_CLIENT_SECRET as string,
      issuer: process.env.KC_ISSUER as string,
    }),
  ],
  events: {
    signOut: async ({ token }) => {
      await fetch(`${process.env.KC_ISSUER}/protocol/openid-connect/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: process.env.KC_CLIENT_ID as string,
          client_secret: process.env.KC_CLIENT_SECRET as string,
          refresh_token: token.refresh_token as string,
        }),
      });
    },
  },
  callbacks: {
    async jwt({ token, account }: { token: any; account: Account | null }) {
      const nowTimeStamp = Math.floor(Date.now() / 1000);

      if (account) {
        token.access_token = account.access_token;
        token.refresh_token = account.refresh_token;
        token.id_token = account.id_token;
        token.expires_at = account.expires_at;
        token.scope = account.scope;
        token.token_type = account.token_type;
        token.session_state = account.session_state;

        return token;
      } else if (token.expires_at && nowTimeStamp < token.expires_at) {
        return token;
      } //TODO Refresh token
    },
    async session({ session, token }: { session: Session; token: any }) {
      if (token && !token.access_token) return session;
      const decoded = jwt_decode(token.access_token) as any;
      return {
        ...session,
        user: {
          id: decoded.sub,
          email: decoded.email,
          emailVerified: decoded.email_verified,
          roles:
            decoded.resource_access[process.env.KC_CLIENT_ID as string]
              ?.roles || [],
        },
      };
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
