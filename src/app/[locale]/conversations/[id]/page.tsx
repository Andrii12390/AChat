import {
  getUser,
  getChatById,
  getMessages,
} from "@/actions";
import {
  ChatHeader,
  MessageComposer,
  MessageList,
} from "@/components";

const Chat = async ({ params }: { params: { id: string } }) => {
  const chatId = parseInt(params.id);
  const conversation = await getChatById(chatId);

  const messages = await getMessages(chatId);
  
  const user = await getUser();

  if (!conversation.participants) {
    return (
      <main className="lg:pl-72 md:pl-72 pt-72 h-full flex justify-center font-semibold text-xl">
        Chat not found
      </main>
    );
  }
  return (
    <main className="h-full lg:ml-72 md:ml-72 flex flex-col dark:bg-neutral-950/85">
      <ChatHeader conversation={conversation} user={user} />
      <MessageList messages={messages} />
      <MessageComposer />
    </main>
  );
}

export default Chat;
