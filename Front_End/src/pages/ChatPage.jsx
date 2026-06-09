import Chat from "../components/chats/Chat";
import BackButton from "../components/Button/BackButton";

export default function ChatPage() {
  return (
    <div>
      <BackButton />

      <h1>Chat da Aplicação</h1>

      <Chat />
    </div>
  );
}