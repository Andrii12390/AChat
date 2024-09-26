import { NextResponse } from "next/server"
import getUser from "../../actions/getUser"
import { prisma } from "../../../../prisma/prisma-client";

export async function POST(request: Request) {
  try {
    const currentUser = await getUser();
    const body = await request.json();
    const {
      message,
      conversationId
    } = body

    if (!currentUser?.username || !message || !conversationId) {
      return new NextResponse("Missed params", {status: 400})
    }

    const newMessage = await prisma.message.create({
      data: {
        text: message,         // текст повідомлення
        sender: {
          connect: { id: currentUser.id }, // Встановлюємо зв'язок з відправником
        },
        conversation: {
          connect: { id: conversationId }, // Встановлюємо зв'язок з розмовою
        },
      },
      include: {
        sender: true, // Повертаємо також дані відправника
        conversation: true, // Повертаємо дані про розмову
      },
    });
  
    const updatedConversation = await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id
          }
        }
      },
      include: {
        participants: true
      }
    });

    return NextResponse.json(newMessage);
  } catch (error: any) {
    console.log(error, "MESSAGE CREATION ERROR")
    return new NextResponse("Server error [MESSAGES]", {status: 500})
  }
}