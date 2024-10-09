'use client'

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react"
import useConversation from "../hooks/useConversation";
import { CustomConversation } from "../types";
import { ConversationItem } from "./"
import { useSession } from "next-auth/react";
import { User } from "@prisma/client";
import { pusherClient } from "../libs/pusher";
import { find } from "lodash";

interface ConversationListProps {
  list: CustomConversation[],
  currentUser: User
}

export function ConversationList({list, currentUser}: ConversationListProps) {
  const [listItems, setList] = useState(list)
  const router = useRouter();
  const { conversationId, isOpen} = useConversation();
  const session = useSession()

  const pusherKey = useMemo(() => {
    return session.data?.user?.name
  }, [session.data?.user?.name])

  useEffect(() => {
    if (!pusherKey) {
      return;
    }

    pusherClient.subscribe(pusherKey)

    const newConversationHandler = (conversation: CustomConversation) => {
      setList((item) => {
        if (find(item, {id: conversation.id})) {
          return item
        }
        return [conversation, ...item]
      })
    }

    pusherClient.bind('conversation:new', newConversationHandler)
    return () => {
      pusherClient.unsubscribe(pusherKey)
      pusherClient.unbind('conversation:new', newConversationHandler)
    }
  }, [pusherKey])
  return (
    <div className="flex flex-col gap-2 overflow-y-auto">
      {listItems.map((item) => {
        return <ConversationItem key={item.id} data={item} currentUser={currentUser} isSelected={conversationId === item.id}/>
      })}
    </div>
  )
}
