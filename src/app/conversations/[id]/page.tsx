'use client';

import useConversation from "../../hooks/useConversation";

import { ChatPrompt } from "../../components/";

function Home ({ params }: { params: { id: string } }) {
  const { isOpen } = useConversation();
  console.log(params.id)
  
  return (
    <div className="h-full pl-72">
    <ChatPrompt />
  </div>
  )
  
}

export default Home;