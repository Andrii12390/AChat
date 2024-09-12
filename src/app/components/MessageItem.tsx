import Image from "next/image";
import React from "react";

type MessageItemProps = {
  text: string;
  time: string;
  profileImage: string;
  isSender: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({ text, time, profileImage, isSender }) => {
  return (
    <div className={`flex gap-2 items-end h-fit ${isSender && "ml-auto"}`}>
      {!isSender && <Image src={profileImage} className="size-[35px] rounded-full" alt="profile image"/>}
      <div
        className={`p-1 text-sm rounded-xl ${
          isSender ? "rounded-br-none" : "rounded-bl-none"
        }  bg-slate-600 overflow-hidden flex`}
      >
        <div>{text}</div>
        <div className="ml-1 mt-auto text-xs text-white/40">{time}</div>
      </div>
      {isSender && <Image src={profileImage} className="size-[35px] rounded-full" alt="profile image" />}
    </div>
  );
}

export default MessageItem