'use client'

import { useRouter } from "next/navigation";
import { useState } from "react"
import useConversation from "../hooks/useConversation";
import { CustomConversation } from "../types";
import { ConversationItem } from "./"
import { useSession } from "next-auth/react";
import { User } from "@prisma/client";

interface ConversationListProps {
  list: CustomConversation[],
  currentUser: User
}

export function ConversationList({list, currentUser}: ConversationListProps) {
  const [listItems, setList] = useState(list)
  const router = useRouter();
  const { conversationId, isOpen} = useConversation();
  const session = useSession()
  return (
    <div className="flex flex-col gap-2 overflow-y-auto">
      {listItems.map((item) => {
        return <ConversationItem key={item.id} data={item} currentUser={currentUser} isSelected={conversationId === item.id}/>
      })}
    </div>
  )
}
