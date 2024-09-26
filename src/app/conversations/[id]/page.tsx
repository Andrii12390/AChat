import getChatById from "../../actions/getChatById";
import getMessages from "../../actions/getMessages";
import getUser from "../../actions/getUser";
import { ChatHeader, ChatPrompt, MessageComposer, MessageList } from "../../components/";

async function Chat({ params }: { params: { id: string } }) {
  const conversation = await getChatById(Number(params.id));
  const messages = await getMessages(Number(params.id));
  const user = await getUser()
  if (!conversation) {
    return (
      <div className="ml-72 h-full flex justify-center pt-72 font-semibold text-xl bg-gray-50">
        Chat not found
      </div>
    );
  }
  return (
    <div className="h-full ml-72 flex flex-col">
      <ChatHeader conversation={conversation} user={user}/>
      <MessageList messages={messages} />
      <MessageComposer />
    </div>
  );
}

export default Chat;
