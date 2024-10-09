import getAllConversations from "../actions/getAllConversations"
import getUser from "../actions/getUser";
import { Sidebar, ConversationList, MobileSidebar } from "../components/"

export default async function ConversationsLayout({
  children
}: {
  children: React.ReactNode
}) {
  const conversations = await getAllConversations();
  const currentUser = await getUser()
  return (
      <div className="h-dvh">
          <Sidebar>
            <ConversationList  list={conversations} currentUser={currentUser!}/>
           </Sidebar>
           
          {children}
      </div>
  )
}