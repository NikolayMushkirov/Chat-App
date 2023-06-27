import React, { useState } from "react";
import { SocketType } from "../types/types";

type Props = SocketType;

const ChatFooter = ({ socket }: Props) => {
  const [message, setMessage] = useState("");

  const handleTyping = () =>
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

  return (
    <>
      <form
        className=" m-6 flex justify-between items-center"
        onSubmit={handleSendMessage}
      >
        <input
          type="text"
          placeholder="Write message"
          className="h-14 w-3/4 rounded pl-10 placeholder:text-black bg-white"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
        />
        <button className="h-8 w-32  bg-green-500 text-white rounded">
          SEND
        </button>
      </form>
    </>
  );
};

export default ChatFooter;
