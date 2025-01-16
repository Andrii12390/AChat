import { getServerSession } from "next-auth";
import { prisma } from "@/prisma-client";
import { authOptions } from "@/utils/authOptions";
import { NextResponse } from "next/server";
 
 export async function GET() {
  try {
     const session = await getServerSession(authOptions);
     if(!session?.user?.name) {
       return NextResponse.json(null)
     }
    const user = await prisma.user.findFirst({
        where: {
            username: session.user.name,
        },
    });
    
    return NextResponse.json(user);
  } catch (error) {
       return NextResponse.json(null)
  }
}