import React from "react";
import { styled } from "../../theme/theme";

interface ChatMessageData {
  username: string;
  message: string;
}

const Message = styled("div", {
  display: "flex",
  flexDirection: "row",
  width: "90%",
  height: "4rem",
  backgroundColor: "#252525",
  borderRadius: "1rem",
  fontSize: "1.5rem",
  margin: "0.5rem",
})

const MessageSender = styled("div", {
  display: "flex",
  alignItems: "center",
  marginLeft: "1rem",
  width: "25%",
  fontWeight: "bold",
})

const MessageText = styled("div", {
  display: "flex",
  color: "white",
  alignItems: "center",
  width: "75%",

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
