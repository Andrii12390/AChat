import { getServerSession } from "next-auth";
import { prisma } from "@/prisma-client";
import { authOptions } from "@/utils/authOptions";
import { NextResponse } from "next/server";
import { getUser } from "@/actions";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.name) return NextResponse.json(null);

    const user = await prisma.user.findFirst({
      where: {
        username: session.user.name,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(null);
  }
}

export async function POST() {
  try {
    const currentUser = await getUser();

    if (!currentUser)
      return new NextResponse("[USERS: Delete] user not found", {
        status: 400,
      });

    await prisma.user.delete({
      where: {
        id: currentUser.id,
      },
    });
    return new NextResponse("[USERS: Delete] succesfully", { status: 200 });
  } catch (error: any) {
    return new NextResponse("[USERS: Delete] internal server error", {
      status: 500,
    });
  }
}
