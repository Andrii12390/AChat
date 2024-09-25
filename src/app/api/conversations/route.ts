import { prisma } from "../../../../prisma/prisma-client";
import getUser from "../../actions/getUser";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const currentUser =  await getUser()
    const body = await request.json()
    const { userId } = body;
    if (!currentUser?.username) {
      return new NextResponse("[Conversations] unauthorized user", {status: 400})
    }

    const user = await prisma.user.findFirst({
      where: {
        id: userId
      }
    })

    if(!user) {
      throw new Error();
    }

    const existingConversation = await findExistingChat(currentUser.id, userId)
    if (existingConversation) {
      return NextResponse.json(existingConversation.id, {status: 200})
    }
    const conversation = await prisma.conversation.create({
      data: {
        participants: {
          create: [
            { userId: currentUser.id, username: currentUser.username },
            { userId: user?.id, username: user?.username},
          ],
        },
      },
    });
    return NextResponse.json(conversation.id, {status: 200})
  } catch (error: any) {
    return new NextResponse("[Conversations] error", {status: 500})
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