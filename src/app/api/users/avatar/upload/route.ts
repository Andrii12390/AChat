import { NextResponse } from "next/server";
import { prisma } from "../../../../../../prisma/prisma-client";
import { getUser } from "../../../../actions";

export async function POST(request: Request) {
  try {
    const user = await getUser();
  
    if (!user) {
      return new NextResponse("[Avatar:upload] Unauthorized user", {status: 400})
    }
  
    const body = await request.json()
    const { avatar } = body
    
    console.log("avatar ", avatar)
    await prisma.user.update({
      where: {
        id: user?.id
      },
      data: {
        avatar: avatar
      }
    })
    return new NextResponse("[Avatar:upload] Successfully uploaded", {status: 200})
  } catch (error: any) {
    return new NextResponse("[Avatar:upload] Internal server error", {status: 500})
  }
}