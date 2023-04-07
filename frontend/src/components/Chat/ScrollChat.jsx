import React, { useContext, useEffect } from "react";
import ScrollableFeed from "react-scrollable-feed";
import { Avatar, Tooltip } from "@chakra-ui/react";
import { AuthContext } from "../../context/AuthContext";

const ScrollChat = ({ messages }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "block" }} key={i}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "20px",
                justifyContent: "flex-end",
              }}
            >
              <span
                style={{
                  display: "block",
                  backgroundColor: "#da95fc",
                  borderRadius: "20px",
                  padding: "5px 15px",
                  maxWidth: "max-content",
                }}
              >
                {m.userMessage}
              </span>
              <Tooltip label={m.sender?.name} placement="bottom-start" hasArrow>
                <Avatar
                  ml={2}
                  size="sm"
                  cursor="pointer"
                  name={m.sender?.name}
                  src={currentUser?.avatar}
                />
              </Tooltip>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "20px",
                justifyContent: "flex-start",
              }}
            >
              <Tooltip label="Bot Ngaos" placement="bottom-start" hasArrow>
                <Avatar
                  mr={2}
                  size="sm"
                  cursor="pointer"
                  name="Bot Ngaos"
                  src="https://img.freepik.com/premium-vector/chatbot-icon-concept-chat-bot-chatterbot-robot-virtual-assistance-website_123447-1615.jpg?w=2000"
                />
              </Tooltip>
              <span
                style={{
                  display: "block",
                  backgroundColor: "#BEE3F8",
                  borderRadius: "20px",
                  padding: "5px 15px",
                  maxWidth: "max-content",
                }}
              >
                {m.botMessage}
              </span>
            </div>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollChat;
