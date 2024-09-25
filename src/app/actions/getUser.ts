import { prisma } from "../../../prisma/prisma-client";
import getUserSession from "./getUserSession";

export default async function getUser () {
  try {
    const userSession = await getUserSession();
    const user = await prisma.user.findFirst({
      where: {
        username: userSession?.user?.name || ""
      }
    })

    return user
  } catch (error: any) {
    return null
  }
}