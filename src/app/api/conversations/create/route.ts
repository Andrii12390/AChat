import { getUser } from "@/actions";
import { NextResponse } from "next/server";
import { pusherServer } from "@/libs/pusher";
import { prisma } from "@/prisma-client";

export async function POST(request: Request) {
  
  
  try {
      const currentUser = await getUser();
      
      const body = await request.json();
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
      
      const newConversation = await prisma.conversation.create({
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
          messages: true
        },
      });

      const otherParticipant = newConversation.participants.filter(cur => cur.userId !== user.id)

      const otherUser = await prisma.user.findUnique({
        where: {
          id: otherParticipant[0].userId
        }
      })

      const extendedConversation = {
        ...newConversation,
        avatar: otherUser.avatar,
        avatarColor: otherUser.avatarColor as string
      }


      await pusherServer.trigger(
        newConversation.participants[0].username,
        "conversation:new",
        extendedConversation
      );

      await pusherServer.trigger(
        newConversation.participants[1].username,
        "conversation:new",
        extendedConversation
      );

      return NextResponse.json(newConversation.id, { status: 200 });
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
