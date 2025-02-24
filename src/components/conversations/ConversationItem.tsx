"use client";

import { useMemo } from "react";
import { useRouter } from "@/i18n/routing";
import { User } from "@prisma/client";
import { TCustomConversation } from "types";
import { Avatar } from "@/components";
import { useTranslations } from "use-intl";
import useParticipant from "@/hooks/useParticipant";

interface ConversationItemProps {
  data: TCustomConversation;
  currentUser: User;
}

export const ConversationItem = ({
  data,
  currentUser,
}: ConversationItemProps) => {
  const otherParticipant = useParticipant(data, currentUser);

  const t = useTranslations("ConversationsPage");

  const router = useRouter();

  const handleClick = () => {
    router.push(`/conversations/${data.id}`);
  };

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];
    return messages[0];
  }, [data.messages]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) return t("sentImage");

    if (!lastMessage?.text) return t("noMessages");

    return lastMessage.text;
  }, [lastMessage?.text, lastMessage?.image, t]);

  return (
    <div
      onClick={handleClick}
      className="py-2 flex items-center border-b border-border gap-x-2 cursor-pointer "
    >
      <Avatar
        color={data?.avatarColor}
        avatar={data?.avatar}
        username={otherParticipant?.username}
      />
      <div className="flex flex-col justify-between">
        <p className="text-sm max-w-52 overflow-hidden">
          {otherParticipant?.username}
        </p>
        <p className="text-[11px] text-muted-foreground max-w-52 overflow-hidden">
          {lastMessageText}
        </p>
      </div>
    </div>
  );
};
