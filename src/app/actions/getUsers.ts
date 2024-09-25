import { prisma } from "../../../prisma/prisma-client";
import getUserSession from "./getUserSession";

const getUsers = async () => {
  const session = await getUserSession();
  if (!session?.user?.name) {
    return [];
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      where: {
        NOT: {
          username: session.user.name
        }
      }
    })

    return users
  } catch (error: any) {
    return []
  }
}

export default getUsers;