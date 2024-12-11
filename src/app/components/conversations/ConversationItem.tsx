"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "@/i18n/routing";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { CustomConversation } from "@/types";
import useParticipant from "@/hooks/useParticipant";
import { Avatar } from "@/components";
import { useTranslations } from "use-intl";

interface ConversationItemProps {
  data: CustomConversation;
  currentUser: User;
}

export const ConversationItem = ({ data, currentUser }: ConversationItemProps) => {
  const otherParticipant = useParticipant(data, currentUser);

  const t = useTranslations("ConversationsPage");

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
    if (lastMessage?.image) {
      return t("sentImage");
    }
    if (!lastMessage?.text) {
      return t("noMessages");
    }
  
    return lastMessage.text;
  }, [lastMessage?.text, lastMessage?.image, t]);
  

  return (
    <div
      onClick={onClick}
      className="py-2 border-neutral-100 flex items-center border-b dark:border-white/15 gap-x-2 cursor-pointer"
    >
      <Avatar
        color={data.avatarColor}
        avatar={data.avatar}
        username={otherParticipant?.username}
      />
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
