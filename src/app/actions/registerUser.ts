"use server";

import { prisma } from "@/prisma-client";
import bcrypt from "bcryptjs";

interface registerUserProps {
  username: string;
  password: string;
}

const colors = [
  "bg-yellow-500",
  "bg-red-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-sky-500",
];

export const registerUser = async ({ username, password }: registerUserProps ) => {
  try {
    const color = colors[Math.floor(Math.random() * colors.length)];

    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    if (user) throw new Error("User with this username already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
        avatarColor: color,
      },
    });
    
    return true;
  } catch (error: any) {
    throw new Error(error.message);
  }
};