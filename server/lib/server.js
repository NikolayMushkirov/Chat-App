const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const PORT = 5000;
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});
let users = [];
io.on("connection", (socket) => {
    console.log(socket, "socket");
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on("message", (data) => {
        io.emit("messageResponse", data);
    });
    socket.on("typ  ing", (data) => {
        socket.broadcast.emit("typingResponse", data);
    });
    socket.on("newUser", (data) => {
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
app.get("/api", (req, res) => {
    res.json({ message: "Server is running" });
});
server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
