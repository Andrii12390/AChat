import { NextResponse } from "next/server";
import { prisma } from "@/prisma-client";
import { getUser } from "@/actions";
import { pusherServer } from "@/libs/pusher";

export async function POST(request: Request) {
  try {
    const currentUser = await getUser();
    const body = await request.json();
    const { message, conversationId, image } = body;

    if (!currentUser?.username || !conversationId) {
      return new NextResponse("Missed params", { status: 400 });
    }

    const newMessage = await prisma.message.create({
      data: {
        text: message,
        image: image,
        sender: {
          connect: { id: currentUser.id },
        },
        conversation: {
          connect: { id: conversationId },
        },
      },
      include: {
        sender: true,
        conversation: true,
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
            id: newMessage.id,
          },
        },
      },
      include: {
        participants: true,
        messages: {
          orderBy: {
            createdAt: "desc"
          }
        },
      }
    });

    await pusherServer.trigger(
      conversationId.toString(),
      "messages:new",
      newMessage
    );

    await pusherServer.trigger(
      conversationId.toString(),
      'conversation:update',
      updatedConversation
   );
  
    return NextResponse.json(newMessage);
  } catch (error: any) {
    return new NextResponse("[Message:create] error", { status: 500 });
  }
}

export async function GET(request: Request) {
  try {

    const { searchParams } = new URL(request.url);
    const conversationId = searchParams.get("id");

    const messages = await prisma.message.findMany({
      where: {
        conversationId: parseInt(conversationId),
      },
      include: {
        sender: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(messages);
  } catch (error: any) {
    console.error(error)
  }
}