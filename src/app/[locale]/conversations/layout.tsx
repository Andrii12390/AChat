import { 
  getUser,
  getAllConversations,
} from "@/actions";
import {
  ConversationList,
  Sidebar,
} from "@/components";

const ChatLayout = async ({children}: {children: React.ReactNode }) => {
  const conversations = await getAllConversations();
  
  const user = await getUser();

  return (
    <main className="h-full">
      <Sidebar user={user!}>
        <ConversationList list={conversations} currentUser={user!} />
      </Sidebar>
      {children}
    </main>
  );
}

export default ChatLayout;
