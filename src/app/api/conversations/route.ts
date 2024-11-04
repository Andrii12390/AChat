import { getUser } from "@/actions";
import { NextResponse } from "next/server";
import { pusherServer } from "@/libs/pusher";
import { prisma } from "@/prisma-client";

export async function POST(request: Request) {
  const body = await request.json();
  const { action } = body;
  
  try {
    if (action === "create") {
      const currentUser = await getUser();
      const { userId } = body;
      if (!currentUser?.username) {
        return new NextResponse("[Conversation:create] unauthorized user", {
          status: 400,
        });
      }
      const user = await prisma.user.findFirst({
        where: {
          id: userId,
        },
      });

      const existingConversation = await findExistingChat(
        currentUser.id,
        userId
      );
      if (existingConversation) {
        return NextResponse.json(existingConversation.id, { status: 200 });
      }
      const conversation = await prisma.conversation.create({
        data: {
          participants: {
            create: [
              { userId: currentUser.id, username: currentUser.username },
              { userId: user?.id!, username: user?.username! },
            ],
          },
        },
        include: {
          participants: true,
        },
      });

      conversation.participants.map((participant) => {
        if (participant.username) {
          pusherServer.trigger(
            participant.username,
            "conversation:new",
            conversation
          );
        }
      });

      return NextResponse.json(conversation.id, { status: 200 });
    } else if (action === "delete") {
      const { conversationId } = body;
      if (!conversationId) {
        throw new Error("[Conversation:delete] error");
      }

      const deletedConversation = await prisma.conversation.delete({
        where: {
          id: conversationId,
        },
      });

      if (deletedConversation) {
        return new NextResponse("[Conversation] deleted succesfully", {
          status: 200,
        });
      }
    }
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}

async function findExistingChat(userId1: number, userId2: number) {
  const existingConversation = await prisma.conversation.findFirst({
    where: {
      participants: {
        every: {
          userId: { in: [userId1, userId2] },
        },
      },
      AND: [
        { participants: { some: { userId: userId1 } } },
        { participants: { some: { userId: userId2 } } },
      ],
    },
  });

  return existingConversation;
}
