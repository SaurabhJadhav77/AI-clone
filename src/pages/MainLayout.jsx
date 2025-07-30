// MainLayout.js
import React, { useState } from "react";
import Dashboard from "./Dashboard";
import Chatroom from "./Chatroom";
import "../styles/MainLayout.css";

const MainLayout = () => {
  const [activeRoomId, setActiveRoomId] = useState(null);

  const handleOpenChat = (roomId) => {
    setActiveRoomId(roomId);
  };

  const handleCloseChat = () => {
    setActiveRoomId(null);
  };

  return (
    <div className={`main-layout ${activeRoomId ? "with-chat" : ""}`}>
      <Dashboard onOpenChat={handleOpenChat} />
      {activeRoomId && <Chatroom roomId={activeRoomId} onClose={handleCloseChat} />}
    </div>
  );
};

export default MainLayout;