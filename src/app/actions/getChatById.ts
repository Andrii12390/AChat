import { prisma } from "../../../prisma/prisma-client";
import { getUser } from "./";

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
            user: { // Включаємо інформацію про користувача
              select: {
                avatarColor: true, // Вибираємо лише 
              }
            }
          }
        },
      },
    });
    // Перетворюємо учасників, щоб прибрати user та додати avatarColor
    const participantsWithAvatarColor = conversation?.participants.map(participant => ({
      userId: participant.userId,
      conversationId: participant.conversationId,
      avatarColor: participant.user.avatarColor, // Додаємо avatarColor
      username: participant.username // Додаємо username
      // Додайте інші поля, які вам потрібні
    }));

    // Повертаємо розмову з новою структурою учасників
    return {
      ...conversation,
      participants: participantsWithAvatarColor,
    };
  } catch (error: any) {
    return null;
  }
};

