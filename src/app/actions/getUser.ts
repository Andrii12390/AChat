import { getServerSession } from "next-auth";
import { prisma } from "@/prisma-client";
import { authOptions } from "@/utils/authOptions";

export const getUser = async () => {
  try {
    const session = await getServerSession(authOptions);
    const user = await prisma.user.findFirst({
      where: {
        username: session?.user?.name || "",
      },
    });

    return user;
  } catch (error: any) {
    return null;
  }
};

