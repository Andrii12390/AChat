'use client'

import type { extendedMessage } from "@/types";
import { useEffect, useRef, useState } from "react";
import { MessageItem, ScrollButton } from "@/components";
import { pusherClient } from "@/libs/pusher";
import { find } from "lodash";
import useConversation from "@/hooks/useConversation";


interface MessageListProps {
  messages: extendedMessage[];
}

export function MessageList({ messages }: MessageListProps) {
  const [currentMessages, setCurrentMessages] = useState(messages);
  const { conversationId } = useConversation();

  const bottomRef = useRef<HTMLDivElement>(null);
  const messageListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    pusherClient.subscribe(conversationId.toString());

    const createHandler = (message: extendedMessage) => {
      setCurrentMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }
        return [...current, message];
      });
    };

    pusherClient.bind("messages:new", createHandler);

    return () => {
      pusherClient.unsubscribe(conversationId.toString());
      pusherClient.unbind("messages:new", createHandler);
    };
  }, [conversationId]);

  useEffect(() => {
    bottomRef?.current?.scrollIntoView();
  }, [currentMessages]);

  return (
    <div ref={messageListRef} className="h-full overflow-y-scroll no-scrollbar flex flex-col gap-3 pt-4 px-2">
      <ScrollButton containerRef={messageListRef} />
      {currentMessages.map((message) => (
        <MessageItem key={message.id} data={message} />
      ))}
      <div ref={bottomRef} className="pt-20" />
    </div>
  );
}



