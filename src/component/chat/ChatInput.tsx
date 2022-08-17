import React, { useState } from "react";
import { styled } from "@stitches/react";

const ChatText = styled("input", {
  width: "90%",
  height: "60%",
  color: "white",
  backgroundColor: "black",
  fontSize: "30px",
});

function ChatInput(props: any) {
  const { socket, seq } = props;
  const [inputMsg, setInputMsg] = useState("");

  const handleChange = (e: any) => {
    setInputMsg(e.target.value);
  };

  const HandleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      if (inputMsg !== "") {
        socket.emit("chat", {
          content: inputMsg,
          at: seq,
        });
        setInputMsg("");
        // console.log("------------------------------------")
        // console.log(`MSG SEND : ${inputMsg}`);
        // for (let i = 0; i < messages.length; i += 1) {
        //   console.log(`send msg For: ${messages[i].id}:
        //${messages[i].nickname}: ${messages[i].msg},  ${JSON.stringify(messages[i])}`);
        // }
        // console.log("------------------------------------")
      }
    }
  };

  return (
    <ChatText
      value={inputMsg}
      onChange={(event: any) => handleChange(event)}
      onKeyPress={HandleKeyDown}
    />
  );
}

export default ChatInput;
