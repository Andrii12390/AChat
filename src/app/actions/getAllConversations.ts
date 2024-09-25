import { prisma } from "../../../prisma/prisma-client";
import getUser from "./getUser";

const getAllConversations = async () => {
  const user = await getUser();

  if (!user) {
    return [];
  }

  try {
    const conversations = await prisma.conversation.findMany({
      orderBy: {
        lastMessageAt: 'desc',
      },
      where: {
        participants: {
          some: {
            userId: user.id, 
          },
        },
      },
      include: {
        participants: true, 
        messages: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            sender: true,
            seenByUsers: {
              include: {
                user: true, 
              },
            },
          },
        },
      },
    });

    return conversations;
  } catch (error: any) {
    return [];
  }
};


export default getAllConversations