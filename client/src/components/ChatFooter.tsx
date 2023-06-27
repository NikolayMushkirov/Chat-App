type Props = {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
  handleTyping: () => void;
};

const ChatFooter = ({
  message,
  setMessage,
  handleSendMessage,
  handleTyping,
}: Props) => {
  return (
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
  );
};

export default ChatFooter;
