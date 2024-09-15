'use server';

import { prisma } from "../../prisma/prisma-client";

export async function registerUser (data: {username: string, password: string;}) {
  const user = await prisma.user.findFirst({
    where: {
      username: data.username
    }
  })
  if (user) {
    throw new Error("User with this username already exists")
  }
  const createdUser = await prisma.user.create({
    data: {
      username: data.username,
      password: data.password
    }
  })
}