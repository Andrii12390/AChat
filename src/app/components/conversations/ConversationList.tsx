'use client'

import { useEffect, useMemo, useState } from "react";
import { CustomConversation } from "@/types";
import { ConversationItem, SearchInput } from "@/components";
import { User } from "@prisma/client";
import { pusherClient } from "@/libs/pusher";
import { find } from "lodash";

interface ConversationListProps {
  list: CustomConversation[],
  currentUser: User
}

export const ConversationList = ({ list, currentUser }: ConversationListProps) => {
  const [listItems, setList] = useState(list);  
  const [searchText, setSearchText] = useState('');

  const searchedUserList = useMemo(() => {
    return listItems.filter(item => {

      const participants = item.participants.filter(participant => participant.userId !== currentUser.id);
      return participants.some(participant => 
        participant.username.toLowerCase().includes(searchText.toLowerCase())
      );
    });
  }, [searchText, listItems, currentUser]);
  
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
    <div className="overflow-y-auto px-3 no-scrollbar max-h-[calc(100vh-0.5rem)]">
      <div className="sticky top-0 bg-white dark:bg-neutral-950/90 z-10 py-3">
        <SearchInput searchText={searchText} onSearchChange={setSearchText} />
      </div>
      <div className="flex flex-col gap-2">
      {searchedUserList.map((item) => (
        <ConversationItem
          key={item.id}
          data={item}
          currentUser={currentUser}
        />
      ))}
      </div>
    </div>
  );
}
