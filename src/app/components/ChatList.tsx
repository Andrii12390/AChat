"use client"

import { ChatItem } from './'
import profileImage from "../images/profile-img.jpg"
import React from "react"
import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'

export const ChatList: React.FC = () => {
  return (
    <div className="w-80 bg-slate-900 border-r border-white/10 flex flex-col gap-y-1">
    <div className="px-2 pt-2 pb-1 border-b border-white/10">
      <input
        type="text"
        placeholder="Search by tag or username"
        className="w-full bg-slate-950/50 rounded-2xl px-2 py-2 text-white/80 placeholder:text-sm  outline-none focus:outline-indigo-900/50"
      />
    </div>
    <div className="flex flex-1 flex-col gap-y-3 overflow-y-auto scroll-smooth no-scrollbar px-2 pt-2">


    <ChatItem
      username="Andrii"
      profileImage={profileImage}
      lastMessage={{ text: "Hello", time: "12:30" }}
    />

  </div>
  <div className="flex items-center h-[48.8px] border-t border-white/10 pl-2">
  <button onClick={() => signOut()} className="text-white/40 hover:text-blue-400 transition-colors duration-300">
      <LogOut/>
  </button>
  </div>
  </div>
  )
}
