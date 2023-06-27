import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SocketType } from "../types/types";

type Props = SocketType;

const HomePage = ({ socket }: Props) => {
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("userName", userName);
    socket.emit("newUser", { userName, socketID: socket.id });
    navigate("/chat");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-indigoMainColor to-indigoLightColor">
      <form
        className="flex flex-col items-center justify-center gap-2"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl  font-bold text-neutral-50">
          Sign in to Open Chat
        </h2>
        <label className="text-xl text-neutral-50" htmlFor="username">
          Username
        </label>
        <input
          className="w-96 border-2 rounded outline-none"
          type="text"
          minLength={6}
          name="username"
          id="username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button className="mt-4 p-2 text-neutral-50 border-2 rounded-lg">
          SIGN IN
        </button>
      </form>
    </div>
  );
};

export { HomePage };
