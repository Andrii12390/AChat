import React from "react";
import { ChatPrompt } from "../components/";

const Chat: React.FC = () => {
  return (
      <main className="pl-72 h-dvh">
        <ChatPrompt />
      </main>
  );
};

export default Chat;


  {/* <ChatList />
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
        </div> */}
