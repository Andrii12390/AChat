import { ChatPrompt } from "../components/";

const Chat: React.FC = () => {
  return (
      <main className="sm:hidden lg:block md:block pl-72 h-dvh">
        <ChatPrompt text="Click on someone to start chat"/>
      </main>
  );
};

export default Chat;
