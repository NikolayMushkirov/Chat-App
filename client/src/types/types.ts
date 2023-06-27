import { Socket } from "socket.io-client";

export type SocketType = {
  socket: Socket;
};

export type User = {
  userName: string;
  socketID: string | number;
};

export type Messages = {
  name: string;
  text: string;
  id: string | number;
};
