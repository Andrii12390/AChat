import ChatItem from "./ChatItem"
import profileImage from "../images/profile-img.jpg"
import React from "react"

const ChatList: React.FC = () => {
  return (
    <div className="w-80 bg-slate-900 border-r border-white/10 flex flex-col py-2 pb-10 px-2 gap-y-3 overflow-y-auto scroll-smooth no-scrollbar">
    <input
      type="text"
      placeholder="Search by tag or username"
      className="w-full bg-slate-950/50 rounded-2xl px-2 py-2 text-white/80 placeholder:text-sm  outline-none focus:outline-indigo-900/50"
    />
    <ChatItem
      username="Andrii"
      profileImage={profileImage}
      lastMessage={{ text: "Hello", time: "12:30" }}
    />
  </div>
  )
}

export default ChatList