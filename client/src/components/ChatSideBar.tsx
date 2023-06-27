import React, { useEffect } from "react";

import { SocketType, User } from "../types/types";

type SetUsersType = React.Dispatch<React.SetStateAction<User[]>>;

type Props = {
  users: User[];
  setUsers: SetUsersType;
} & SocketType;

const ChatSideBar = ({ socket, users, setUsers }: Props) => {
  useEffect(() => {
    socket.on("newUserResponse", (data) => setUsers(data));
  }, [socket, users]);

  return (
    <div className="pt-2 pl-6 w-1/6 flex flex-col  gap-5 text-white bg-gradient-to-b from-indigoMainColor to-indigoLightColor">
      <h2 className="text-xl font-bold cursor-pointer">Open Chat</h2>
      <div>
        <h4 className="text-base font-bold">Active Users</h4>
        <div className="mt-3 flex flex-col gap-3">
          {users.map((user) => (
            <p key={user.socketID}>{user.userName}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatSideBar;
