import Image from "next/image";
import React from "react";

type ChatItemProps = {
  profileImage: string;
  username: string;
  lastMessage: {
    time: string;
    text: string;
  };
};


const ChatItem: React.FC<ChatItemProps> = ({ profileImage, username, lastMessage }) => {
  return (
    <div className="flex">
      <Image src={profileImage} width={35} className="rounded-full" alt="profile image"/>
      <div className="w-full flex flex-col justify-between ml-1 text-white">
        <div className="flex items-center justify-between">
          <div className="text-sm">{username}</div>
          <div className="text-xs text-white/40">{lastMessage.time}</div>
        </div>
        <div className="text-xs text-white/40">{lastMessage.text}</div>
      </div>
    </div>
  );
}

export default ChatItem