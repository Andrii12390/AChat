import { prisma } from "../../../prisma/prisma-client";
import { getUser } from "./";

export const getAllConversations = async () => {
  const user = await getUser();

  if (!user) {
    return [];
  }

  try {
    const conversations = await prisma.conversation.findMany({
      orderBy: {
        lastMessageAt: "desc",
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
            createdAt: "desc",
          },
          include: {
            sender: true,
          },
        },
      },
    });

    const conversations_ = await Promise.all(
      conversations.map(async (conversation) => {
        const otherUserId = conversation.participants[0].userId === user.id
          ? conversation.participants[1].userId
          : conversation.participants[0].userId;
          
        const otherUser = await prisma.user.findFirst({
          where: {
            id: otherUserId,
          },
        });
    
        return {
          ...conversation,
          avatarColor: otherUser?.avatarColor,
          avatar: otherUser?.avatar
        };
      })
    );

    return conversations_;
  } catch (error: any) {
    return [];
  }
};

