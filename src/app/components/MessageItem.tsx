"use client"

import { format } from "date-fns";
import { useSession } from "next-auth/react";

interface MessageItemProps {
  data: ({
    sender: {
        id: number;
        username: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    };
} & {
    id: number;
    text: string | null;
    image: string | null;
    senderId: number;
    conversationId: number;
    createdAt: Date;
    updatedAt: Date;
})
}

export function MessageItem({data}: MessageItemProps) {
  const session = useSession();
  const isCurrentUserMessage = session.data?.user?.name === data.sender.username;
  return (
    <div className={`flex flex-col max-w-[60%] h-max rounded-xl words-break ${isCurrentUserMessage ? "ml-auto m-2 bg-slate-100 rounded-br-none" : "mr-auto ml-2 rounded-bl-none bg-blue-200"} px-2 py-1`}>
      <div className="text-sm">
        {data.text}
      </div>
      <div className={`text-[10px]  ${isCurrentUserMessage && "text-end"}`}>
        {format(new Date(data.createdAt), 'p')}
      </div>
    </div>
  )
}
