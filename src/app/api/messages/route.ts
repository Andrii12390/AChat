import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";
import { getUser } from "../../actions";
import { pusherServer } from "../../libs/pusher";

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
        messages: true,
      },
    });

    await pusherServer.trigger(
      conversationId.toString(),
      "messages:new",
      newMessage
    );

    // updatedConversation.participants.map((participant) => {
    //   pusherServer.trigger(participant.username!, 'conversation:update', {
    //     updatedConversation
    //   });
    // });
    return NextResponse.json(newMessage);
  } catch (error: any) {
    return new NextResponse("[Message:create] error", { status: 500 });
  }
}
