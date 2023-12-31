import { useState, useRef, useEffect } from "react";

import { SocketType } from "../types/types";
import { MessagesType, UserType } from "../types/types";

import ChatSideBar from "../components/ChatSideBar";
import ChatBody from "../components/ChatBody";
import ChatFooter from "../components/ChatFooter";

type Props = SocketType;

const ChatPage = ({ socket }: Props) => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<MessagesType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [typingStatus, setTypingStatus] = useState("");

  const handleTypingStatus = () =>
    socket.emit("typing", `${localStorage.getItem("userName")} is typing`);

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem("userName")) {
      socket.emit("message", {
        text: message,
        name: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage("");
  };

  const lastMessageRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    socket.on("messageResponse", (newMessage: MessagesType) => {
      setMessages([...messages, newMessage]);
    });
  }, [socket, messages]);

  useEffect(() => {
    socket.on("typingResponse", (status: string) => setTypingStatus(status));
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
        <ChatFooter
          message={message}
          setMessage={setMessage}
          handleTypingStatus={handleTypingStatus}
          handleSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};

export { ChatPage };
