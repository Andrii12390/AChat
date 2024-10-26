import {
  ChatPrompt,
  ConversationList,
  MobileSidebar,
  Sidebar,
} from "../components";
import { 
  getUser,
  getAllConversations 
} from "../actions";

export default async function page() {
  const conversations = await getAllConversations();
  const user = await getUser();
  return (
    <div className="h-full ">
      <Sidebar user={user!}>
        <ConversationList list={conversations} currentUser={user!} />
      </Sidebar>
      <MobileSidebar user={user!}>
        <ConversationList list={conversations} currentUser={user!} />
      </MobileSidebar>
      <div className="pl-72 h-full sm:hidden lg:block md:block">
        <ChatPrompt text="Click on someone to open chat" />
      </div>
    </div>
  );
}
