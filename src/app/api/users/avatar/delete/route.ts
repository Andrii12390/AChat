import { NextResponse } from "next/server";
import { prisma } from "@/prisma-client";
import { getUser } from "@/actions";

export async function POST() {
  try {
    const user = await getUser();
  
    if (!user) {
      return new NextResponse("[Avatar:delete] Unauthorized user", {status: 400})
    }
  
    await prisma.user.update({
      where: {
        id: user?.id
      },
      data: {
        avatar: null
      }
    })
    return new NextResponse("[Avatar:delete] Successfully deleted", {status: 200})
  } catch (error: any) {
    return new NextResponse("[Avatar:delete] Internal server error", {status: 500})
  }
}