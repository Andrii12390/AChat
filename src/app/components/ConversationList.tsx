'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CustomConversation } from "../types";
import { ConversationItem } from "./";
import { useSession } from "next-auth/react";
import { User } from "@prisma/client";
import { pusherClient } from "../libs/pusher";
import { find } from "lodash";
import useConversation from "../hooks/useConversation";

interface ConversationListProps {
  list: CustomConversation[],
  currentUser: User
}

export function ConversationList({ list, currentUser }: ConversationListProps) {
  const [listItems, setList] = useState(list);
  const router = useRouter();
  const { conversationId } = useConversation();
  const session = useSession();

  const pusherKey = currentUser.username
  useEffect(() => {
    if (!pusherKey) {
      return;
    }

    pusherClient.subscribe(pusherKey);
  
    const newConversationHandler = (conversation: CustomConversation) => {
      setList((prevItems) => {
        if (find(prevItems, { id: conversation.id })) {
          return prevItems;
        }
        return [conversation, ...prevItems];
      });
    };
  
    pusherClient.bind('conversation:new', newConversationHandler);
  
    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind('conversation:new', newConversationHandler);
    };
  }, [pusherKey]);

  return (
    <div className="flex flex-col gap-2 overflow-y-auto">
      {listItems.map((item) => (
        <ConversationItem
          key={item.id}
          data={item}
          currentUser={currentUser}
        />
      ))}
    </div>
  );
}
