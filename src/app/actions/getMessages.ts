import { prisma } from "../../../prisma/prisma-client";

const getMessages = async(conversationId: number) => {
  try {
    const messages = await prisma.message.findMany({
      where: {
        conversationId: conversationId, 
      },
      include: {
        sender: true,
      },
      orderBy: {
        createdAt: 'asc',  // щоб отримати повідомлення у хронологічному порядку
      },
    });
    return messages
  } catch (error: any) {
    return []
  }
}

export default getMessages