import { Send } from "lucide-react";
import React from 'react';

export const ChatFooter: React.FC = () => {
  return (
    <div className="p-2 border-t border-white/10 flex items-center">
      <input
        type="text"
        className="w-full rounded-xl px-2 py-1 bg-slate-900 outline-none"
        placeholder="Type message"
      />
      <Send className="text-white/40 hover:text-blue-400 transition-colors duration-300" />
    </div>
  );
}
