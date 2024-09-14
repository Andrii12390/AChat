import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../../../prisma/prisma-client";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const values = {
          username: credentials.username,
        };

        const findUser = await prisma.user.findFirst({
          where: values,
        });

        if (!findUser) {
          return null;
        }

        if (!(credentials.password === findUser.password)) {
          return null;
        }
        return {
          id: String(findUser.id),
          username: findUser.username,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token }) {
      const findUser = await prisma.user.findFirst({
        where: {
          username: token.username,
        }
      })
      if (findUser) {
        token.id = String(findUser.id);
        token.username = findUser.username;
      }

      return token;
    },
    session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
      }
      
      return session
    }
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
