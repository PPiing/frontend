import React, { useState } from "react";
import { styled } from "@stitches/react";
import * as theme from "../../theme/theme";
import socketManager from "../../feat/chat/socket";

const ChatCreateRoom = styled(theme.NeonHoverRed, {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  fontSize: "3rem",
  borderRadius: "5%",
  width: "95%",
  height: "95%",
});

const InputArea = styled("div", {
  display: "flex",
  flexDirection: "row",
  position: "relative",
  left: "3rem",
  margin: "1rem",
});

const TextInput = styled("input", {
  fontSize: "3rem",
  width: "400px",
  height: "50px",
  position: "absolute",
  left: "25rem",
});

const RadioInput = styled("div", {
  display: "flex",
  flexDirection: "row",
});

const Text = styled("div", {
  fontSize: "2rem",
  position: "relative",
  top: "1rem",
  left: "8.5rem",
});

const Radio = styled("input", {
  position: "relative",
  top: "2rem",
  left: "8rem",
  marginLeft: "3rem",
});

const ButtonArea = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  margin: "3rem",
});

const NeonBox = styled(theme.NeonHoverRed, {
  width: "20rem",
  height: "3rem",
  borderRadius: "10px",
  backgroundColor: "transparent",
  fontWeight: "bold",
  fontSize: "2.3rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "grey",
});

export function CreateRoom() {
  const [roomName, setRoomName] = useState("");
  const [roomPassword, setRoomPassword] = useState("");
  const [roomType, setRoomType] = useState("public");

  const nameChange = (event: any) => {
    setRoomName(event.target.value);
  };

  const passwordChange = (event: any) => {
    setRoomPassword(event.target.value);
  };

  const setType = (type: string) => {
    if (type !== "private") setRoomPassword("");
    if (roomType !== type) setRoomType(type);
  };

  return (
    <ChatCreateRoom>
      <InputArea>
        RoomName
        <TextInput value={roomName} onChange={(event) => nameChange(event)} />
      </InputArea>
      <InputArea>
        RoomType
        <RadioInput>
          <Radio type="radio" checked={roomType === "public"} onChange={() => setType("public")} />
          <Text>PUBLIC</Text>
        </RadioInput>
        <RadioInput>
          <Radio type="radio" checked={roomType === "private"} onChange={() => setType("private")} />
          <Text>PRIVATE</Text>
        </RadioInput>
        <RadioInput>
          <Radio type="radio" checked={roomType === "protected"} onChange={() => setType("protected")} />
          <Text>PROTECTED</Text>
        </RadioInput>
      </InputArea>
      <InputArea>
        RoomPassword
        <TextInput value={roomPassword} disabled={roomType !== "private"} onChange={(event) => passwordChange(event)} />
      </InputArea>
      <ButtonArea>
        <NeonBox>Create</NeonBox>
        <NeonBox>Close</NeonBox>
      </ButtonArea>
    </ChatCreateRoom>
  );
}
