"use client";

import {
  ChatHeader,
  Loader,
  MessageComposer,
  MessageList,
} from "@/components";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { KeyboardEvent, useEffect, useState } from "react";

const Chat = ({ params }: { params: { id: string } }) => {
  const chatId = parseInt(params.id);
  const [user, setUser] = useState(null);
  const router = useRouter();

  const locale = useLocale();
  
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
      const res = await axios.get("/api/users");
      setUser(res.data);
    }
    getUser();
  }, []);
  
  useEffect(() => {
    const handlePress = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.push(`/${locale}/conversations`);
    };

    document.addEventListener("keydown", (e) => handlePress(e as unknown as KeyboardEvent));

    return () => {
      document.removeEventListener("keydown", (e) => handlePress(e as unknown as KeyboardEvent));
    };
  }, [router]);

  return (
    <main className="h-full lg:ml-72 md:ml-72 flex flex-col bg-background overflow-hidden">
      {(!user || conversation.isLoading || messages.isLoading) ? (
        <Loader />
      ) : (
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
