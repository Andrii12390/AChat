"use server";

import { prisma } from "../../../prisma/prisma-client";
import bcrypt from "bcryptjs";

export const registerUser = async (data: { username: string; password: string }) => {
  const colors = [
    "bg-yellow-500",
    "bg-red-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-sky-500"
  ]

  const color = colors[(Math.floor(Math.random() * colors.length))]
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
      avatarColor: color,
    },
  });
  return true;
};
