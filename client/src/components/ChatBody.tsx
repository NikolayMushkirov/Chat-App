import { useNavigate } from "react-router-dom";
import { MessagesType } from "../types/types";

type Props = {
  messages: MessagesType[];
  typingStatus: string;
  lastMessageRef: React.MutableRefObject<HTMLParagraphElement | null>;
};

const ChatBody = ({ messages, typingStatus, lastMessageRef }: Props) => {
  const navigate = useNavigate();

  const handleLeaveChat = () => {
    localStorage.removeItem("userName");
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <header className="m-6 flex justify-between items-center ">
        <p className="font-bold">Hangout with Colleagues</p>
        <button
          className="p-3 text-white text-xs bg-orange-500 rounded"
          onClick={handleLeaveChat}
        >
          LEAVE CHAT
        </button>
      </header>

      <div className=" h-2/3 pr-10 flex flex-col items-end bg-white overflow-y-scroll">
        {messages.map((message) =>
          message.name === localStorage.getItem("userName") ? (
            <div className="" key={message.id}>
              <p className="text-right my-2">You</p>
              <p className="w-72 my-2 py-2 pl-3 bg-green-200 rounded">
                {message.text}
              </p>
            </div>
          ) : (
            <div className="bg-white" key={message.id}>
              <p className="text-right my-2">{message.name}</p>
              <p className="w-72 my-2 py-2 pl-3 bg-green-200 rounded">
                {message.text}
              </p>
            </div>
          )
        )}
        <p className="mt-2 ">{typingStatus}</p>
        <div className="lastRef" ref={lastMessageRef} />
      </div>
    </>
  );
};

export default ChatBody;
