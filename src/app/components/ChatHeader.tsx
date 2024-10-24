"use client";

import { Conversation, User } from "@prisma/client";
import { ChevronLeft, EllipsisVertical, Trash2 } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ChatHeaderProps {
  conversation: Conversation & {
    participants: {
      userId: number;
      username: string;
      conversationId: number;
      avatarColor: String;
    }[];
  };
  user: User | null;
}

export function ChatHeader({ conversation, user }: ChatHeaderProps) {
  const router = useRouter();
  const otherUser = conversation.participants.find(
    (currentUser) => currentUser.userId != user?.id
  );

  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen(!open);
  const handleClose = () => setOpen(false);
  const handleClick = async () => {
    try {
      axios
        .post("/api/conversations", {
          conversationId: conversation.id,
          action: "delete",
        })
        .then(() => {
          router.push("/conversations");
        });
    } catch (error: any) {
      console.log("An error occured while deleting conversation");
    }
  };
  return (
    <div className="w-full px-3  py-[10px] border-b dark:border-white/15 shadow-sm flex items-center justify-between dark:shadow-indigo-500 z-50">
      <div className="flex items-center gap-x-2">
        <div
          className="lg:hidden md:hidden sm:block px-1 py-1 rounded-md hover:bg-slate-100 transition-colors duration-300 relative dark:hover:bg-indigo-500"
          onClick={() => router.push("/conversations")}
        >
          <ChevronLeft size={20} className="" />
        </div>
        <div
          className={`rounded-full w-10 h-10 font-semibold text-black relative flex items-center justify-center ${otherUser?.avatarColor}`}
        >
          {otherUser?.username[0]}
        </div>
        <div className="flex flex-col">
          <div className="text-sm">{otherUser?.username}</div>
          <div className="text-xs text-blue-500 dark:text-indigo-500">
            online
          </div>
        </div>
      </div>
      <div className="relative">
        <div
          className={`px-1 py-1 rounded-md hover:bg-slate-100 dark:hover:bg-indigo-500 transition-colors duration-300 ${
            open ? "bg-slate-100 dark:bg-neutral-900/80" : ""
          }`}
          onClick={handleToggle}
        >
          <EllipsisVertical size={20} />
        </div>
        {open && (
          <div className="absolute bg-slate-100 dark:bg-neutral-800 p-2 rounded-md right-0 top-full mt-2 z-50">
            <ul className="flex flex-col gap-y-2">
              <li
                className="flex items-center gap-2 hover:bg-slate-200 dark:hover:bg-neutral-900/90 p-2 rounded-md transition text-red-600 font-semibold cursor-pointer"
                onClick={() => {
                  handleClick();
                  handleClose();
                }}
              >
                <Trash2 size={20} />
                <div className="text-xs whitespace-nowrap">Delete Chat</div>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
