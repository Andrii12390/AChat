import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";
import { getUser } from "../../../actions";

export async function POST() {
  try {
    const currentUser = await getUser();
    console.log(currentUser)
    if (!currentUser) {
      return new NextResponse("[USERS: Delete] user not found", { status: 400 })
    }

    await prisma.user.delete({
      where: {
        id: currentUser.id
      }
    })
    return new NextResponse("[USERS: Delete] succesfully", {status: 200})

  } catch (error: any) {
    return new NextResponse("[USERS: Delete] internal server error", {status:500})
  }
}
