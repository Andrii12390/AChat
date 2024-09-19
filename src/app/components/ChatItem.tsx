import Image from "next/image";
import React from "react";

interface ChatItemProps {
  profileImage: any;
  username: string;
  lastMessage: {
    time: string;
    text: string;
  };
};


export const ChatItem: React.FC<ChatItemProps> = ({ profileImage, username, lastMessage }) => {
  return (
    <div className="flex">
      <Image src={profileImage} width={35} className="rounded-full" alt="profile image"/>
      <div className="w-full flex flex-col justify-between ml-2 text-white">
        <div className="flex items-center justify-between">
          <div className="text-sm">{username}</div>
          <div className="text-xs text-white/40">{lastMessage.time}</div>
        </div>
        <div className="text-xs text-white/40">{lastMessage.text}</div>
      </div>
    </div>
  );
}
