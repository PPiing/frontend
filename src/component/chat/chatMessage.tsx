import React from "react";
import { styled } from "../../theme/theme";

interface ChatMessageData {
  username: string;
  message: string;
  createAt: string;
}

const Message = styled("div", {
  display: "flex",
  flexDirection: "row",
  width: "96%",
  // minHeight: "2.5rem",
  paddingTop: "1%",
  paddingBottom: "1%",
  backgroundColor: "#252525",
  borderRadius: "1rem",
  fontSize: "1.2rem",
  margin: "0.5rem",
  marginTop: "1.2rem",
  marginBottom: "0rem",
})

const MessageSender = styled("div", {
  display: "flex",
  alignItems: "center",
  marginLeft: "3%",
  width: "16.5%",
  marginRight: "0.5%",
  whiteSpace: "nowrap",
  overflowY: "hidden",
  overflowX: "scroll",
  fontWeight: "350",
  "&::-webkit-scrollbar": {
    display: "none",
  }
})

const MessageText = styled("div", {
  display: "flex",
  color: "white",
  alignItems: "center",
  width: "65%",
  backgroundColor: "#252525",
  marginLeft: "10px",
  wordBreak: "break-all",
})

const MessageWhen = styled("div", {
  display: "flex",
  color: "white",
  alignItems: "center",
  textAlign: "right",
  width: "10%",
  fontSize: "1rem",
  backgroundColor: "#252525",
})

export function ChatMessage(props: ChatMessageData) {
  const { username, message } = props;

  return (
    <Message>
      <MessageSender>{username}</MessageSender>
      <MessageText>{message}</MessageText>
      <MessageWhen>2022.08.15<br />18:15</MessageWhen>
    </Message>
  )
}
