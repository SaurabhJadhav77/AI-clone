import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addMessage } from "../redux/chatroomSlice";
import "../styles/Chatroom.css";

const MESSAGES_PER_PAGE = 20;

function Chatroom() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { chatrooms, selectedChatroomId } = useSelector((state) => state.chatroom);
  const selectedChatroom = chatrooms.find((c) => c.id === selectedChatroomId);

  const [loading, setLoading] = useState(true);
  const chatEndRef = useRef(null);
  const room = useSelector((state) =>
    state.chatroom.chatrooms.find((room) => room.id === id)
  );

  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);
  const [image, setImage] = useState(null);
  const [showTyping, setShowTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const totalMessages = room?.messages.length || 0;
  const displayedMessages = room?.messages.slice(
    Math.max(totalMessages - page * MESSAGES_PER_PAGE, 0),
    totalMessages
  );

  const handleSend = () => {
    if (!message && !image) return;

    const newMsg = {
      text: message,
      image: image,
      sender: "user",
      timestamp: new Date().toISOString(),
    };
    dispatch(addMessage({ roomId: id, message: newMsg }));
    setMessage("");
    setImage(null);

    setShowTyping(true);
    setTimeout(() => {
      setShowTyping(false);
      const aiReply = {
        text: "This is a simulated Gemini reply.",
        sender: "ai",
        timestamp: new Date().toISOString(),
      };
      dispatch(addMessage({ roomId: id, message: aiReply }));
    }, 1500);
  };

  const handleScroll = (e) => {
    if (e.target.scrollTop === 0 && page * MESSAGES_PER_PAGE < totalMessages) {
      setLoading(true);
      setTimeout(() => {
        setPage((prev) => prev + 1);
        setLoading(false);
      }, 500);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Message copied to clipboard!");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timeout);
  }, [selectedChatroomId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [room?.messages?.length]);

  if (!room) return <p>Chatroom not found.</p>;

  return (
    <div className="chatroom-container">
      <div className="messages" onScroll={handleScroll}>
        {loading && (
          <>
            {[...Array(3)].map((_, i) => (
              <div className="message-skeleton" key={i}>
                <div className="bubble"></div>
              </div>
            ))}
          </>
        )}

        {displayedMessages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === "user" ? "user" : "ai"}`}
            onClick={() => msg.text && handleCopy(msg.text)}
            title="Click to copy"
          >
            {msg.image && (
              <img src={msg.image} alt="uploaded" className="chat-image" />
            )}
            {msg.text && <p>{msg.text}</p>}
            <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
          </div>
        ))}

        {showTyping && <p className="typing">Gemini is typing...</p>}
        <div ref={messagesEndRef}></div>
      </div>

      <div className="input-area">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default Chatroom;
