import { prisma } from "@/prisma-client";
import { getUser } from "@/actions";
import { NextResponse } from "next/server";
import { pusherServer } from "libs/pusher";

export async function GET(request: Request) {
  const user = await getUser();
  const { searchParams } = new URL(request.url);
  const conversationId = searchParams.get("id");
  if (conversationId) {
    try {
      const conversation = await prisma.conversation.findFirst({
        where: {
          id: +conversationId,
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
      
      return NextResponse.json({
        ...conversation,
        participants: participantsWithAvatarColor,
      })
    } catch (error: any) {
      console.error(error) 
    }
  }

  if (!user) {
    return NextResponse.json([]);
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

    return NextResponse.json(conversations_);
  } catch (error: any) {
    return NextResponse.json([]);
  }
}


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

      const otherUser = await prisma.user.findUnique({
        where: {
          id: user.id
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


export async function DELETE(request: Request) {
  const body = await request.json();
  
  try {
    const { conversationId } = body;
    if (!conversationId) {
      throw new Error("[Conversation:delete] error");
    }

    const deletedConversation = await prisma.conversation.delete({
      where: {
        id: conversationId,
      },
      include: {
        participants: true
      }
    });
    
    if (deletedConversation) {  
      await pusherServer.trigger(
        deletedConversation.participants[0].username,
        "conversation:delete",
        deletedConversation
      );
      
      await pusherServer.trigger(
        deletedConversation.participants[1].username,
        "conversation:delete",
        deletedConversation
      );
      return new NextResponse("[Conversation] deleted succesfully", {
        status: 200,
      });
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
