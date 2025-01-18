"use client";

import { Conversation, User } from "@prisma/client";
import { ChevronLeft, EllipsisVertical } from "lucide-react";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "use-intl";
import { useState } from "react";
import { ChatDelete, Avatar } from "@/components";

interface ChatHeaderProps {
  conversation: Conversation & {
    participants: {
      userId: number;
      username: string;
      conversationId: number;
      avatarColor: string;
      avatar: string | undefined;
    }[];
  };
  user: Omit<User, "password" | "createdAt" | "updatedAt">;
}

export const ChatHeader = ({ conversation, user }: ChatHeaderProps) => {
  const router = useRouter();
  const otherUser = conversation.participants.find(
    (currentUser) => currentUser.userId != user?.id
  );
  const t = useTranslations("ConversationsPage");

  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen(!open);
  const handleClose = () => setOpen(false);

  return (
    <header className="w-full px-3 py-[10px] border-b border-border shadow-sm flex items-center justify-between">
      <aside className="flex items-center gap-x-2">
        <div
          className="lg:hidden md:hidden sm:block px-1 py-1 rounded-md hover:bg-hover transition-colors relative"
          onClick={() => router.push("/conversations")}
        >
          <ChevronLeft size={20} />
        </div>
        <Avatar
          color={otherUser?.avatarColor}
          avatar={otherUser?.avatar}
          username={otherUser?.username}
        />
        <div>
          <span className="text-sm">{otherUser?.username}</span>
          <div className="text-xs text-primary-foreground">
            {t("online")}
          </div>
        </div>
      </aside>
      <aside className="relative">
        <div
          className="px-1 py-1 rounded-md hover:bg-hover transition-colors cursor-pointer"
          onClick={handleToggle}
        >
          <EllipsisVertical size={20} />
        </div>
        {open && (
          <div className="absolute bg-popover p-2 rounded-md border border-border right-0 mt-2 shadow-md">
            <ul className="flex flex-col gap-y-2 ">
              <ChatDelete
                conversationId={conversation.id}
                onClose={handleClose}
              />
            </ul>
          </div>
        )}
      </aside>
    </header>
  );
};
