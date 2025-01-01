"use client";

import { User } from "@prisma/client";
import { useRouter } from "@/i18n/routing";
import { useCallback } from "react";
import { Pencil } from "lucide-react";
import { Avatar } from "@/components";
import axios from "axios";

interface UserItemProps {
  data: User;
}

export const UserItem = ({ data }: UserItemProps) => {
  const router = useRouter();
  const onClick = useCallback(() => {
    axios
      .post("/api/conversations/create", {
        userId: data.id,
      })
      .then((data) => {
        router.push(`/conversations/${data.data}`);
      });
  }, [data, router]);

  return (
    <div className="w-full border-b border-neutral-100 dark:border-white/15 py-2 flex gap-x-3">
        <Avatar
          color={data.avatarColor}
          avatar={data.avatar}
          username={data.username}
        />
        <div className="flex flex-1 items-center justify-between">
          <div className="max-w-28 overflow-hidden whitespace-nowrap overflow-ellipsis">{data.username}</div>
          <div
            onClick={onClick}
            className="text-xs p-1 rounded-md transition-colors hover:bg-neutral-100 dark:hover:bg-indigo-500"
          >
            <Pencil className="w-5 h-5" />
          </div>
        </div>
    </div>
  );
};
