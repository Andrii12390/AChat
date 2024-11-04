import { prisma } from "@/prisma-client";
import { getUser } from "@/actions";

export const getChatById = async (conversationId: number) => {
  try {
    const user = await getUser();

    if (!user?.username) {
      return null;
    }
    const conversation = await prisma.conversation.findFirst({
      where: {
        id: conversationId,
      },
      include: {
        participants: {
          include: {
            user: {
              select: {
                avatarColor: true,
                avatar: true,
              }
            }
          }
        },
      },
    });
    const participantsWithAvatarColor = conversation?.participants.map(participant => ({
      userId: participant.userId,
      conversationId: participant.conversationId,
      avatarColor: participant.user.avatarColor,
      username: participant.username,
      avatar: participant.user.avatar
    }));

    return {
      ...conversation,
      participants: participantsWithAvatarColor,
    };
  } catch (error: any) {
    return null;
  }
};

