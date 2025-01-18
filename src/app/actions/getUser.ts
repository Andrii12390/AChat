import { getServerSession } from "next-auth";
import { prisma } from "@/prisma-client";
import { authOptions } from "@/utils/authOptions";

export const getUser = async () => {
  try {
    const session = await getServerSession(authOptions);
    const user = await prisma.user.findFirst({
      where: {
        username: session?.user?.name || "",
      }
    });

    if (!user) return null;

    return {
      id: user.id,
      username: user.username,
      avatar: user.avatar,
      avatarColor: user.avatarColor,
    };
    
  } catch (error: any) {
    return null;
  }
};

