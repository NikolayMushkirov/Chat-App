import { Socket } from "socket.io-client";

export type SocketType = {
  socket: Socket;
};

export type UserType = {
  userName: string;
  socketID: string | number;
};

export type MessagesType = {
  name: string;
  text: string;
  id: string | number;
};
