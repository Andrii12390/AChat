import React from 'react'
import { ChatPrompt, ConversationList, MobileSidebar } from '../components'
import getAllConversations from '../actions/getAllConversations';
import getUser from '../actions/getUser';

export default async function page() {
  const conversations = await getAllConversations();
  const currentUser = await getUser()
  return (
    <div className="h-full lg:pl-72 md:pl-72">
      <MobileSidebar>
           <ConversationList  list={conversations} currentUser={currentUser!}/>
      </MobileSidebar>
      <div className="h-full sm:hidden lg:block md:block">
        <ChatPrompt text="Click on someone to open chat"/>
      </div>
    </div>
  )
}
