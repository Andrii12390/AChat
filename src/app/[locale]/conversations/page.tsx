import { getUser, getAllConversations } from "@/actions";
import {
  ChatPrompt,
  ConversationList,
  MobileSidebar,
  Sidebar,
} from "@/components";

const Chat = async () => {
  const user = await getUser();

  const conversations = await getAllConversations();

  return (
    <main className="h-full">
      <MobileSidebar user={user!}>
        <ConversationList list={conversations} currentUser={user!} />
      </MobileSidebar>
      <Sidebar user={user!}>
        <ConversationList list={conversations} currentUser={user!} />
      </Sidebar>
      <div className="pl-72 h-full sm:hidden lg:block md:block">
        <ChatPrompt />
      </div>
    </main>
  );
};

export default Chat;
