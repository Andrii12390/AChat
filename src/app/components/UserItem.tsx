"use client";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Pencil } from "lucide-react";
import profileImage from "../images/profile-img.jpg";
import Image from "next/image";
import axios from "axios";

interface UserItemProps {
  data: User;
}

export const UserItem: React.FC<UserItemProps> = ({ data }) => {
  const router = useRouter();
  const onClick = useCallback(() => {
    axios
      .post("api/conversations", {
        userId: data.id,
        action: "create",
      })
      .then((data) => {
        router.push(`/conversations/${data.data}`);
      })
  }, [data, router]);
  return (
    <div className="w-full px-3">
      <div className="border-b border-white/15 py-2">
      <div className="flex gap-x-3">
        <Image
          alt="user image"
          className="w-10 h-10 rounded-full"
          src={profileImage}
        />
        <div className="w-full flex items-center justify-between">
          <div>{data.username}</div>
          <div
            onClick={onClick}
            className="text-xs p-1 rounded-md transition duration-300 hover:bg-neutral-100 dark:hover:bg-indigo-500"
          >
            <Pencil className="w-5 h-5" />
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};
