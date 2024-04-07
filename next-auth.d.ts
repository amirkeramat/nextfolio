import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "@auth/core/jwt";
import { Role } from "@prisma/client";
export type ExtendedUser = DefaultSession["user"] & {
  role: Role;
};
declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    role: Role;
  }
}
