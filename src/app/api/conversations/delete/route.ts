import { NextResponse } from "next/server";
import { prisma } from "@/prisma-client";
import { pusherServer } from "@/libs/pusher";

export async function POST(request: Request) {
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
