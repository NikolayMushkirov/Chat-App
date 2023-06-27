import { useState, useRef, useEffect } from "react";
import { SocketType } from "../types/types";
import ChatSideBar from "../components/ChatSideBar";
import { Messages, User } from "../types/types";
import ChatBody from "../components/ChatBody";
import ChatFooter from "../components/ChatFooter";

type Props = SocketType;

const ChatPage = ({ socket }: Props) => {
  const [messages, setMessages] = useState<Messages[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [typingStatus, setTypingStatus] = useState("");

  const lastMessageRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    socket.on("messageResponse", (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  useEffect(() => {
    socket.on("typingResponse", (data) => setTypingStatus(data));
  }, [socket]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex min-h-screen max-h-screen">
      <ChatSideBar socket={socket} users={users} setUsers={setUsers} />
      <div className="w-full bg-chatBodyColor">
        <ChatBody
          messages={messages}
          typingStatus={typingStatus}
          lastMessageRef={lastMessageRef}
        />
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
};

export { ChatPage };
