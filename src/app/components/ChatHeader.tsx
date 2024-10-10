"use client";

import { Conversation, User } from "@prisma/client";
import useParticipant from "../hooks/useParticipant";
import profileImage from "../images/profile-img.jpg";
import Image from "next/image";
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
    }[];
  };
  user: User | null;
}

export function ChatHeader({ conversation, user }: ChatHeaderProps) {
  const router = useRouter();
  const otherUser = useParticipant(conversation, user!);

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
    <div className="w-full px-3  py-[10px] border-b shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-x-2">
        <div
          className="lg:hidden md:hidden sm:block px-1 py-1 rounded-md hover:bg-slate-100 transition-colors duration-300 relative"
          onClick={() => router.push("/conversations")}
        >
          <ChevronLeft size={20} className="" />
        </div>
        <Image
          src={profileImage}
          alt="User image"
          className="w-10 h-10 rounded-full"
        />
        <div className="flex flex-col">
          <div className="text-sm">{otherUser.username}</div>
          <div className="text-xs text-blue-500">online</div>
        </div>
      </div>
      <div
        className={`px-1 py-1 rounded-md hover:bg-slate-100 transition-colors duration-300 relative ${
          open && "bg-slate-100"
        }`}
        onClick={handleToggle}
      >
        <EllipsisVertical size={20} />
        {open && (
          <div
            className="absolute bg-slate-100 p-2 rounded-md right-3 top-7"
            onClick={handleClose}
          >
            <ul className="flex gap-y-2">
              <li
                className="flex items-center gap-2 hover:bg-slate-200 p-2 rounded-md transition text-red-600 cursor-pointer"
                onClick={handleClick}
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
