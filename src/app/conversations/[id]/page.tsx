import { 
  getUser,
  getAllConversations,
  getChatById,
  getMessages 
} from "../../actions";
import {
  ChatHeader,
  ConversationList,
  MessageComposer,
  MessageList,
  Sidebar,
} from "../../components/";

async function Chat({ params }: { params: { id: string } }) {
  const conversation = await getChatById(Number(params.id));
  const messages = await getMessages(Number(params.id));
  const conversations = await getAllConversations();
  const currentUser = await getUser();
  const user = await getUser();
  if (!conversation) {
    return (
      <div className=" h-full flex justify-center pt-72 font-semibold text-xl bg-gray-50">
        Chat not found
      </div>
    );
  }
  return (
    <div className="h-full ">
      <Sidebar>
        <ConversationList list={conversations} currentUser={currentUser!} />
      </Sidebar>

      <div className="h-full  lg:ml-72 md:ml-72 flex flex-col">
        <ChatHeader conversation={conversation} user={user} />
        <MessageList messages={messages} />
        <MessageComposer />
      </div>
    </div>
  );
}

export default Chat;
