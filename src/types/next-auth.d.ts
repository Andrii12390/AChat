import NextAuth, { DefaultSession} from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      username: string;
      id: number;
      avatar: string;
      avatarColor: string;
    } & DefaultSession["user"]
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    username: string;
    id: number;
    avatar: string;
    avatarColor: string;
  }
}