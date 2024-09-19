import profileImage from "../images/profile-img.jpg"
import { MessageItem } from './'
import React from "react";

export const MessageList: React.FC = () => {
  return (
    <div className="flex flex-col gap-y-3 flex-1 p-2 overflow-y-auto scroll-smooth no-scrollbar">
      <MessageItem text="Привіт друже" time="12:05" profileImage={profileImage} isSender={true}/>
      <MessageItem text="Пішов нахуй чорт забирай" time="12:05" profileImage={profileImage} isSender={false}/>
    </div>
  );
}