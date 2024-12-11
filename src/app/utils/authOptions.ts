import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/prisma-client";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }

        const values = {
          username: credentials.username,
        };

        const user = await prisma.user.findFirst({
          where: values,
        });

        if (!user) {
          return null;
        }
        const isMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isMatch) {
          return null;
        }

        return {
          id: user.id.toString(), 
          name: user.username,
          password: user.password,
          avatarColor: user.avatarColor,
          avatar: user.avatar,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name
      }

      return token;
    },
    session({ session, token }) {
      if (session?.user) {
        session.user.name = token.name;
      }

      return session;
    },
  },
};

