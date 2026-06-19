import { Client, type TToken } from "@arkejs/client";
import { redirect } from "next/navigation";
import NextAuth, {
  type User as AuthUser,
  getServerSession,
  type NextAuthOptions,
} from "next-auth";
import type { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

import { getEnvVar } from "@/hooks/use-runtime-env";
import { client, unauthorizedClient } from "@/lib/arke/client";
import { fetchCurrentUser } from "@/lib/arke/user";
import puedo, { type PermissionKey } from "@/lib/permission/puedo";

function decodeJWT(token: string) {
  const [, payload] = token.split(".");

  if (!payload) {
    return null;
  }

  return JSON.parse(Buffer.from(payload, "base64").toString());
}

async function checkTokenExpiration(token: JWT) {
  const decodedJWT = decodeJWT(token.access_token);
  const hasExpired = Math.round(decodedJWT.exp * 1000 - Date.now()) <= 0;

  if (!hasExpired) return token;

  const response = await unauthorizedClient.auth.refreshToken(
    token.refresh_token,
    token.refresh_token
  );

  return { ...token, ...response.data.content };
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        magic_link: { label: "Magic Link" },
      },
      authorize: async (credentials) => {
        if (!credentials) return null;

        if (credentials.email && credentials.password) {
          const res = await client.auth.signIn(
            {
              username: credentials.email,
              password: credentials.password,
            },
            "credentials"
          );

          const isUserSoftDeleted = res.data.content.hidden;

          if (res.status !== 200 || isUserSoftDeleted) return null;

          return res.data.content;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, account }) => {
      if (account) {
        token.id = account?.providerAccountId;
        token.user = {
          id: user.id,
          arke_id: user.arke_id,
          email: user.email,
          uncompleted_data: user.uncompleted_data,
        };
        token.access_token = user.access_token;
        token.refresh_token = user.refresh_token;
      }

      try {
        return await checkTokenExpiration(token as JWT);
      } catch {
        token.error = "RefreshTokenError";
        return token;
      }
    },
    session: async ({ session, token }) => {
      session.access_token = token.access_token;
      session.refresh_token = token.refresh_token;

      const client = new Client({
        serverUrl: getEnvVar("ARKE_URL"),
        project: getEnvVar("ARKE_PROJECT_ID"),
        getSession: () => new Promise((resolve) => resolve(session as TToken)),
      });

      const currentUser = await fetchCurrentUser(
        token.user as AuthUser,
        client
      );

      session.user = {
        ...token.user,
        ...currentUser,
      };

      return session;
    },
    redirect({ url, baseUrl }) {
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }

      if (url.startsWith(baseUrl)) {
        return url;
      }

      return `${baseUrl}/`;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/login",
  },
  session: { strategy: "jwt" },
};

export async function authPermission(permissionKey: PermissionKey) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  if (puedo.can(session.user, permissionKey)) {
    return session;
  }

  switch (session.user.arke_id) {
    case "super_admin":
    case "admin":
      redirect("/");
    default:
      redirect("/login");
  }
}

const authInstance = NextAuth(authOptions);

export const { handlers, signIn, signOut, auth } = authInstance;
