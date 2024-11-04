import { NextResponse } from "next/server";
import { prisma } from "@/prisma-client";

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
    });

    if (deletedConversation) {
      return new NextResponse("[Conversation] deleted succesfully", {
        status: 200,
      });
    }
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
