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
  console.log(conversations)
  const currentUser = await getUser();
  return (
    <div className="h-full ">
      <Sidebar>
        <ConversationList list={conversations} currentUser={currentUser!} />
      </Sidebar>
      <MobileSidebar>
        <ConversationList list={conversations} currentUser={currentUser!} />
      </MobileSidebar>
      <div className="pl-72 h-full sm:hidden lg:block md:block">
        <ChatPrompt text="Click on someone to open chat" />
      </div>
    </div>
  );
}
