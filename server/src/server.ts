import express, { Express, Request, Response } from "express";
import { Server, Socket } from "socket.io";
import http from "http";
import cors from "cors";

import { ClientToServerEvents, User } from "./types";

const PORT = 5000;
let users: User[] = [];

const app: Express = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: Socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("message", (data: ClientToServerEvents) => {
    io.emit("messageResponse", data);
  });

  socket.on("typ  ing", (data: ClientToServerEvents) => {
    socket.broadcast.emit("typingResponse", data);
  });

  socket.on("newUser", (data: User) => {
    users.push(data);
    io.emit("newUserResponse", users);
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
    users = users.filter((user) => user.socketID !== socket.id);
    io.emit("newUserResponse", users);
    socket.disconnect();
  });
});

app.get("/api", (req: Request, res: Response) => {
  res.json({ message: "Server is running" });
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
