import { prisma } from "../../../prisma/prisma-client";
import { getUser } from "./";

export const getChatById = async (conversetionId: number) => {
  try {
    const user = await getUser();

    if (!user?.username) {
      return null;
    }

    const conversetion = await prisma.conversation.findFirst({
      where: {
        id: conversetionId,
      },
      include: {
        participants: true,
      },
    });

    return conversetion;
  } catch (error: any) {
    return null;
  }
};

