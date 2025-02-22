import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { prisma } from "@/prisma-client";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) return null;

        const values = { username: credentials.username };

        const user = await prisma.user.findFirst({
          where: values,
        });

        if (!user) throw new Error("User not found");
        
        const isMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );
        
        if (!isMatch) throw new Error("Invalid credentials");

        return {
          id: user.id.toString(), 
          name: user.username,
          avatarColor: user.avatarColor,
          avatar: user.avatar
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token }) {
      const user = await prisma.user.findFirst({
        where: {
          username: token.name
        },
      });

      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.avatar = user.avatar;
        token.avatarColor = user.avatarColor;
      }

      return token;
    },
    session({ session, token }) {
      if (token.id) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.avatar = token.avatar;
        session.user.avatarColor = token.avatarColor;
      }
      return session;
    },
  },
};

