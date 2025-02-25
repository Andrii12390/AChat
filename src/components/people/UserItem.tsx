"use client";

import { User } from "@prisma/client";
import { useRouter } from "@/i18n/routing";
import { Pencil } from "lucide-react";
import { Avatar } from "@/components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface UserItemProps {
  data: User;
}

export const UserItem = ({ data }: UserItemProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (userId: number) => {
      return axios
        .post("/api/conversations", { userId: userId })
        .then((res) => res.data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      router.push(`/conversations/${data}`); 
    },
    onError: (error) => {
      console.error("Error creating conversation:", error);
    },
  });


  const onClick = async () => {
    try {
      mutate(data.id);
    } catch (error: any) {
      console.error(error);
    }
  };


  return (
    <div className="w-full border-b border-border py-2 flex gap-x-3 animate-fade-right">
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
          className="text-xs p-1 rounded-md hover:bg-hover transition-colors cursor-pointer"
        >
          <Pencil className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};
