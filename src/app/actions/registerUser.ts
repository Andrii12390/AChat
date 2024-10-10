"use server";

import { prisma } from "../../../prisma/prisma-client";
import bcrypt from "bcryptjs";

export const registerUser = async (data: { username: string; password: string }) => {
  const user = await prisma.user.findFirst({
    where: {
      username: data.username,
    },
  });
  if (user) {
    throw new Error("User with this username already exists");
  }
  const hashedPassword = await bcrypt.hash(data.password, 10);
  await prisma.user.create({
    data: {
      username: data.username,
      password: hashedPassword,
    },
  });
  return true;
};
