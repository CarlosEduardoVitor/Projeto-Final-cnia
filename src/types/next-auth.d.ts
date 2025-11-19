import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      name: string;
      email: string;
      token: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: number;
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    accessToken: string;
    email: string;
    name: string;
  }
}
