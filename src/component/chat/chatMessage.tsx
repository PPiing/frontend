import React from "react";
import { styled } from "../../theme/theme";

interface ChatMessageData {
  username: string;
  message: string;
}

const Message = styled("div", {
  display: "flex",
  flexDirection: "row",
  width: "96%",
  height: "4rem",
  backgroundColor: "#252525",
  borderRadius: "1rem",
  fontSize: "1.5rem",
  margin: "0.5rem",
  marginTop: "1.2rem",
  marginBottom: "0rem",
})

const MessageSender = styled("div", {
  display: "flex",
  alignItems: "center",
  marginLeft: "1rem",
  width: "16%",
  textOverflow: "ellipsis",
  fontWeight: "350",
})

const MessageText = styled("div", {
  display: "flex",
  color: "white",
  alignItems: "center",
  width: "84%",
  backgroundColor: "#252525",
  marginLeft: "10px",
})

export function ChatMessage(props: ChatMessageData) {
  const { username, message } = props;

  return (
    <Message>
      <MessageSender>{username}</MessageSender>
      <MessageText>{message}</MessageText>
    </Message>
  )
}
