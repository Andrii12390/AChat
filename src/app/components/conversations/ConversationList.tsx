"use client";

import { useEffect, useMemo, useState } from "react";
import { CustomConversation } from "@/types";
import { ConversationItem, SearchInput } from "@/components";
import { User } from "@prisma/client";
import { pusherClient } from "@/libs/pusher";
import { find } from "lodash";
import { useSession } from "next-auth/react";

interface ConversationListProps {
  list: CustomConversation[];
  currentUser: User;
}

export const ConversationList = ({
  list,
  currentUser,
}: ConversationListProps) => {
  const [listItems, setList] = useState(list);
  const [searchText, setSearchText] = useState("");

  const searchedUserList = useMemo(() => {
    return listItems.filter((item) => {
      const participants = item.participants.filter(
        (participant) => participant.userId !== currentUser.id
      );
      return participants.some((participant) =>
        participant.username.toLowerCase().includes(searchText.toLowerCase())
      );
    });
  }, [searchText, listItems, currentUser]);


  useEffect(() => {

    const pusherKey = currentUser.username;

    pusherClient.subscribe(pusherKey);

    const subscribeToConversations = () => {
      listItems.forEach((conversation) => {
        pusherClient.subscribe(conversation.id.toString());
      });
    };
    
     const unsubscribeFromConversations = () => {
          listItems.forEach((conversation) => {
               pusherClient.unsubscribe(conversation.id.toString());
          });
     };

    subscribeToConversations()

    const newConversationHandler = (conversation: CustomConversation) => {
      setList((prevItems) => {
        if (find(prevItems, { id: conversation.id })) {
          return prevItems;
        }
        return [conversation, ...prevItems];
      });
    };

    const deleteConversationHandler = (conversation: CustomConversation) => {
      setList((prevItems) => {
        return prevItems.filter((item) => item.id !== conversation.id);
      });
    };

    const updateConversationHandler = (conversation: CustomConversation) => {
      setList((prevItems) => {
          return prevItems.map(item => {
            if (item.id === conversation.id) {
              return {
                ...item,
                messages: conversation.messages,
              };
            }
             return item
          });
      });
    };

    pusherClient.bind("conversation:new", newConversationHandler);
    pusherClient.bind("conversation:delete", deleteConversationHandler);
    

    pusherClient.bind('conversation:update', updateConversationHandler);

    return () => {
      pusherClient.unsubscribe(pusherKey);
      unsubscribeFromConversations()
      pusherClient.unbind("conversation:new", newConversationHandler);
      pusherClient.unbind("conversation:delete", deleteConversationHandler);

      listItems.forEach(_ => {
             pusherClient.unbind('conversation:update', updateConversationHandler);
        })
    };
  }, [listItems, currentUser]);

  return (
    <div className="overflow-y-auto px-3 no-scrollbar flex-1">
      <div className="sticky top-0 z-10 py-3">
        <SearchInput searchText={searchText} onSearchChange={setSearchText} />
      </div>
      <div className="flex flex-col gap-2 flex-1">
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
};