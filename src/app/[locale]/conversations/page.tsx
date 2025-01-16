"use client";

import {
  ChatPrompt,
  ConversationList,
  MobileSidebar,
  Sidebar,
  Loader
} from "@/components";
import { useQuery } from "@tanstack/react-query";

const Chat = () => {
   const user = useQuery({
       queryKey: ["user"],
       queryFn: () => fetch("/api/users").then((res) => res.json())
  })

  const conversations = useQuery({
    queryKey: ["conversations"],
    queryFn: () => fetch("/api/conversations").then((res) => res.json())
  });

  return (
    <main className="h-full">

        <div>
          <MobileSidebar isLoading={user.isLoading || conversations.isLoading} user={user.data}>
            
              <ConversationList list={conversations.data} currentUser={user.data} />
            
          </MobileSidebar>
          <Sidebar isLoading={user.isLoading || conversations.isLoading} user={user.data}>
            <ConversationList list={conversations.data} currentUser={user.data} />
          </Sidebar>
        </div>
      <div className="pl-72 h-full sm:hidden lg:block md:block">
        <ChatPrompt />
      </div>
    </main>
  );
};

export default Chat;