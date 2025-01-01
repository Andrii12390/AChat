"use client";

import { Conversation, User } from "@prisma/client";
import { ChevronLeft, EllipsisVertical } from "lucide-react";
import { useRouter } from "@/i18n/routing";
import { useState } from "react";
import { Avatar } from "@/components";
import { useTranslations } from "use-intl";
import { ChatDelete } from "@/components";

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
  user: User | null;
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
    <header className="w-full px-3 py-[10px] border-b dark:border-white/15 shadow-sm flex items-center justify-between z-50">
      <aside className="flex items-center gap-x-2">
        <div
          className="lg:hidden md:hidden sm:block px-1 py-1 rounded-md hover:bg-slate-100 transition-colors relative dark:hover:bg-indigo-500"
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
          <div className="text-xs text-blue-500 dark:text-indigo-500">
            {t("online")}
          </div>
        </div>
      </aside>
      <aside className="relative">
        <div
          className={`px-1 py-1 rounded-md hover:bg-slate-100 dark:hover:bg-indigo-500 transition-colors ${
            open ? "bg-slate-100 dark:bg-neutral-900/80" : ""
          }`}
          onClick={handleToggle}
        >
          <EllipsisVertical size={20} />
        </div>
        {open && (
          <div className="absolute bg-slate-100 dark:bg-neutral-800 p-2 rounded-md right-0 top-full mt-2 z-50">
            <ul className="flex flex-col gap-y-2">
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
