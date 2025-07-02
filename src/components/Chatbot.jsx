// Chatbot.jsx
import React, { useState } from "react";
import "./chatbot.css";
import botIcon from "./assets/chatbot-icon.png";

const Chatbot = () => {
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    alert("Chatbot Coming Soon! 🚀");
    // Later: open chatbot modal or navigate
  };

  return (
    <div
      className="chatbot-container"
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={botIcon}
        alt="Chatbot Icon"
        className={`bot-icon ${hovered ? "wave" : ""}`}
      />
      {hovered && (
        <div className="chatbot-tooltip">
          Hi! How can I help you?
        </div>
      )}
    </div>
  );
};

export default Chatbot;
