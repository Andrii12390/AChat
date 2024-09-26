"use client";

import { Conversation, User } from "@prisma/client";
import useParticipant from "../hooks/useParticipant";
import profileImage from "../images/profile-img.jpg"
import Image from "next/image";
import { EllipsisVertical } from "lucide-react";

interface ChatHeaderProps {
  conversation: Conversation & {
    participants: {
      userId: number,
      username: string,
      conversationId: number
    }[]
  },
  user: User | null
}

export function ChatHeader({conversation, user}: ChatHeaderProps) {
  const otherUser = useParticipant(conversation, user!)

  return (
    <div className="w-full px-3  py-[10px] border-b shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-x-2">
        <Image src={profileImage} alt="User image" className="w-10 h-10 rounded-full"/>
        <div className="flex flex-col">
          <div className="text-sm">
          {otherUser.username}
          </div>
          <div className="text-xs text-blue-500">
            online
          </div>
        </div>
      </div>
      <div className="px-1 py-1 rounded-md hover:bg-slate-100 transition-colors duration-300">
        <EllipsisVertical size={20}/>
      </div>
    </div>
  )
}
