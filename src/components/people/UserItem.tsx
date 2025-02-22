"use client";

import { User } from "@prisma/client";
import { useRouter } from "@/i18n/routing";
import { Pencil } from "lucide-react";
import { Avatar } from "@/components";
import { useCreateConversation } from "@/hooks/useCreateConversation";

interface UserItemProps {
  data: User;
}

export const UserItem = ({ data }: UserItemProps) => {
  const router = useRouter();
  const { mutate } = useCreateConversation(data.id);

  const onClick = () => {
    mutate();
    router.replace(`/conversations`);
  };

  return (
    <section className="w-full border-b border-border py-2 flex gap-x-3">
      <Avatar
        color={data.avatarColor}
        avatar={data.avatar}
        username={data.username}
      />
      <div className="flex flex-1 items-center justify-between">
        <p className="max-w-28 overflow-hidden whitespace-nowrap overflow-ellipsis">
          {data.username}
        </p>
        <div
          onClick={onClick}
          className="text-xs p-1 rounded-md hover:bg-hover transition-colors cursor-pointer"
        >
          <Pencil className="size-5" />
        </div>
      </div>
    </section>
  );
};
