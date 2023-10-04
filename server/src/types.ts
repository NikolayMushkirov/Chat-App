export type User = {
  name: string;
  socketID: string;
};

export type ServerToClientEvents = {
  messageResponse: (data: any) => void;
  typingResponse: (data: any) => void;
  newUserResponse: (users: User[]) => void;
};

export type ClientToServerEvents = {
  message: (data: any) => void;
  typing: (data: any) => void;
  newUser: (data: User) => void;
};
