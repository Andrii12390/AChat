"use client"

import { useEffect, useRef, useState } from "react";
import useConversation from "../hooks/useConversation";
import { MessageItem } from "./";
import { pusherClient } from "../libs/pusher";
import { find } from "lodash";
import { extendedMessage } from "../types";

interface MessageListProps {
  messages: extendedMessage[]
}

export function MessageList({messages}: MessageListProps) {
  const [currentMessages, setCurrentMessages] = useState(messages)

  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();
  console.log("id", conversationId)

  useEffect(() => {
    pusherClient.subscribe(conversationId.toString())
    bottomRef?.current?.scrollIntoView();

    const createHandler = (message: extendedMessage) => {
      setCurrentMessages((current) => {
        if (find(current, {id: message.id})) {
          return current;
        }

        return [...current, message]
      })
      bottomRef?.current?.scrollIntoView();
    }

    pusherClient.bind('messages:new', createHandler)

    return () => {
      pusherClient.unsubscribe(conversationId.toString())
      pusherClient.unbind('messages:new', createHandler)
    }
  }, [conversationId])

  return (
    <div className="flex-1 overflow-y-auto flex flex-col gap-3 pt-4 px-2">
      {currentMessages.map(message => <MessageItem key={message.id} data={message}/>) }
      <div ref={bottomRef} className="pt-20"/>
    </div>
  )
}
