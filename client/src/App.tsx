import { BrowserRouter, Routes, Route } from "react-router-dom";
import { io, Socket } from "socket.io-client";

import { HomePage } from "./pages/HomePage";
import { ChatPage } from "./pages/ChatPage";

const socket: Socket = io("http://localhost:5000");

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage socket={socket} />} />
        <Route path="/chat" element={<ChatPage socket={socket} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
