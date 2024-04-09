import NextAuth from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { prismadb } from "./lib/prismadb";
import authConfig from "./auth.config";
import { getUserById } from "./data/user";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    // async signIn({ user, account }) {
    //   //Allow Oauth without  email verification for now
    //   if (account?.provider !== "credentials") return true;

    //   const existingUser = await getUserById(user?.id as string);

    //   //prevent signIn without email verification
    //   // if (!existingUser?.verified) return false;

    //   return true;

    //   // TODO:Add 2FA check
    // },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existUser = await getUserById(token.sub);

      if (!existUser) return token;

      token.role = existUser.role;

      return token;
    },
  },
  adapter: PrismaAdapter(prismadb),
  session: { strategy: "jwt" },
  ...authConfig,
});
