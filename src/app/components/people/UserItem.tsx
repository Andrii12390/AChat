"use client";

import { User } from "@prisma/client";
import { useRouter } from "@/i18n/routing";
import { Pencil } from "lucide-react";
import { Avatar } from "@/components";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface UserItemProps {
  data: User;
}

export const UserItem = ({ data }: UserItemProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["delete conversation"],
    mutationFn: () =>
      fetch("/api/conversations/create", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ userId: data.id }),
      }).then((res) => res.json()),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      router.push(`/conversations/${data}`);
    },
    onError: (data) => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      router.push(`/conversations/${data}`);
    },
  });

  const onClick = async () => {
    try {
      mutate();
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <div className="w-full border-b border-neutral-100 dark:border-white/15 py-2 flex gap-x-3">
      <Avatar
        color={data.avatarColor}
        avatar={data.avatar}
        username={data.username}
      />
      <div className="flex flex-1 items-center justify-between">
        <div className="max-w-28 overflow-hidden whitespace-nowrap overflow-ellipsis">
          {data.username}
        </div>
        <div
          onClick={onClick}
          className="text-xs p-1 rounded-md transition-colors hover:bg-neutral-100 dark:hover:bg-slate-800"
        >
          <Pencil className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};
