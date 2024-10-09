import React from "react";

interface ChatPromptProps {
  text: string;
}

export const ChatPrompt: React.FC<ChatPromptProps> = ({ text }) => {
  return (
    <div className="h-full flex justify-center pt-72 font-semibold text-xl bg-gray-50">
      {text}
    </div>
  );
};
