import { prisma } from "@/prisma-client";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const getUsers = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.name) {
    return [];
  }
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        NOT: {
          username: session.user.name,
        },
      },
    });

    return users;
  } catch (error: any) {
    return [];
  }
};
