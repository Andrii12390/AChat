import { User } from "@prisma/client";
import { useRouter } from "@/i18n/routing";
import { Pencil } from "lucide-react";
import { Avatar } from "@/components";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UserItemProps {
  data: User;
}

export const UserItem = ({ data }: UserItemProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["create conversation"],
    mutationFn: () =>
      fetch("/api/conversations", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ userId: data.id }),
      }).then((res) => {
        queryClient.invalidateQueries({queryKey: ["conversations"]})
        return res.json()
      }),
    onSuccess: (data) => {
      router.push(`/conversations/${data}`);
    }
  });
  
  const onClick = async () => {
    try {
      mutate();
      router.push(`/conversations`);
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
