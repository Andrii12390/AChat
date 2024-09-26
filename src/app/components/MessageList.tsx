"use client"

import { useRef, useState } from "react";
import useConversation from "../hooks/useConversation";
import { MessageItem } from "./";

interface MessageListProps {
  messages: ({
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
})[]
}

export function MessageList({messages}: MessageListProps) {
  const [currentMessages, setCurrentMessages] = useState(messages)

  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  return (
    <div className="flex-1 overflow-y-auto flex flex-col gap-3 pt-4 px-2">
      {messages.map(message => <MessageItem key={message.id} data={message}/>) }
      <div ref={bottomRef} className="pt-20"/>
    </div>
  )
}
