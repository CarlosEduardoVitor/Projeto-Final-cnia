// pages/api/auth/authOptions.ts
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import axios from "axios";

type BackendLoginResponse = {
  token?: string;
  id?: number | string;
  name?: string;
  email?: string;
};

interface UserType {
  id: number;
  name: string;
  email: string;
  token: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const response = await axios.post<BackendLoginResponse>(
            "http://localhost:8080/api/auth/login",
            {
              email: credentials.email,
              password: credentials.password,
            },
            { validateStatus: () => true } 
          );

          const data = response.data ?? {};

          if (!data?.token) {
            console.error("Login failed: backend did not return token", data);
            return null;
          }

          const user: UserType = {
            id: data.id ? Number(data.id) : 0, 
            name: data.name || "", 
            email: data.email ?? credentials.email,
            token: data.token,
          };

          return user;
        } catch (error) {
          console.error("Login failed (exception):", error);
          return null;
        }
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = Number((user as any).id ?? token.id ?? 0);
        token.name = (user as any).name ?? token.name ?? "";
        token.email = (user as any).email ?? token.email ?? "";
        token.accessToken = (user as any).token ?? token.accessToken ?? "";
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = Number((token as any).id ?? 0);
        session.user.name = (token as any).name ?? "";
        session.user.email = (token as any).email ?? "";
        (session.user as any).token = (token as any).accessToken ?? "";
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
