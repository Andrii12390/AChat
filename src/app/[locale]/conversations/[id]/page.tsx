"use client"

import {
  ChatHeader,
  Loader,
  MessageComposer,
  MessageList,
} from "@/components";
import { useQuery} from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

const Chat = ({ params }: { params: { id: string } }) => {
  const chatId = parseInt(params.id);
  const [user, setUser] = useState(null);

  const conversation = useQuery({
    queryKey: [`conversation${chatId}`],
    queryFn: () => fetch(`/api/conversations?id=${chatId}`).then((res) => res.json()),
  });

  const messages = useQuery({
    queryKey: [`messages${chatId}`],
    queryFn: () => fetch(`/api/messages?id=${chatId}`).then((res) => res.json()),
  });

  useEffect(() => {
    async function getUser() {
      const res = await axios.get("/api/users")
      setUser(res.data)
    }
    getUser()
  }, [])

  return (
    <main className="h-full lg:ml-72 md:ml-72 flex flex-col bg-background overflow-hidden">
      {(!user || conversation.isLoading || messages.isLoading) ? (
        <Loader />
      ): (
        <>
          <ChatHeader conversation={conversation.data} user={user} />
          <MessageList messages={messages.data} />
          <MessageComposer />
        </>
      )}
    </main>
  );
};

export default Chat;
