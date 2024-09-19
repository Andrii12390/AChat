import profileImage from "../images/profile-img.jpg"
import { ChatHeader, MessageList, ChatFooter, ChatList } from "../components";
import React from "react";

const Chat: React.FC = () => {
  return (
      <main className="flex h-dvh">
        <ChatList />
        <div className="bg-slate-900 w-full flex flex-col text-white">
          <ChatHeader
            user={{
              username: "Andrii",
              activeStatus: "online",
              profileImage: profileImage,
            }}
          />
          <MessageList />
          <ChatFooter />
        </div>

      </main>
  );
};

export default Chat;