"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { CustomConversation } from "../types";
import useParticipant from "../hooks/useParticipant";
import Image from "next/image";
import profileImage from "../images/profile-img.jpg";

interface ConversationItemProps {
  data: CustomConversation;
  currentUser: User;
}

export function ConversationItem({ data, currentUser }: ConversationItemProps) {
  const otherParticipant = useParticipant(data, currentUser);

  const session = useSession();
  const router = useRouter();

  const onClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];
    return messages[0];
  }, [data.messages]);

  const username = useMemo(() => {
    return session.data?.user?.name;
  }, [session.data?.user?.name]);

  const lastMessageText = useMemo(() => {
    if (!lastMessage?.text) {
      return "No messages yet";
    }

    return lastMessage.text;
  }, []);


  return (
    <div
      onClick={onClick}
      className="py-2 px-3 flex items-center gap-x-2 cursor-pointer"
    >
        <div className={`rounded-full w-10 h-10 font-semibold text-black relative flex items-center justify-center ${data.avatarColor}`}>
          {otherParticipant?.username[0]}
        </div>
      <div className="flex flex-col justify-between">
        <div className="text-sm max-w-52 overflow-hidden">
          {otherParticipant?.username}
        </div>
        <div className="text-xs text-gray-500 max-w-52 overflow-hidden">
          {lastMessageText}
        </div>
      </div>
    </div>
  );
}
