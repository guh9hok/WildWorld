import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      earnings: number;
    } & DefaultSession["user"]
  }

  interface User {
    role: string;
    earnings: number;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email as string))
          .limit(1);

        if (!user.length) {
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user[0].password
        );

        if (!isValid) {
          return null;
        }

        return {
          id: user[0].id.toString(),
          email: user[0].email,
          name: user[0].name,
          role: user[0].role,
          earnings: user[0].earnings,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.earnings = user.earnings;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.earnings = token.earnings as number;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
});