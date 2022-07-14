import React, { useState } from "react";
import { styled } from "@stitches/react";
import axios from "axios";
import * as theme from "../../theme/theme";
import socketManager from "../../feat/chat/socket";

enum ChatType {
  CHTP10 = "CHTP10", // 개인 채팅방 (DM)
  CHTP20 = "CHTP20", // 단체 채팅방 (public)
  CHTP30 = "CHTP30", // 단체 채팅방 (protected)
  CHTP40 = "CHTP40", // 비밀 채팅방 (private)
}

const ChatCreateRoom = styled("div", {
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

const NeonBox = styled("div", {
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

export function CreateRoom(props: any) {
  const { propFunc, user } = props;

  console.log(user);

  const [roomName, setRoomName] = useState("");
  const [roomPassword, setRoomPassword] = useState("");
  const [roomType, setRoomType] = useState(ChatType.CHTP20);

  /*
  방 제목 입력
  */
  const nameChange = (event: any) => {
    setRoomName(event.target.value);
  };

  /*
  방 패스워드 입력
  */
  const passwordChange = (event: any) => {
    setRoomPassword(event.target.value);
  };

  /*
  방 타입 선택
  CHTP30이 아닌 경우 패스워드 비활성화
  */
  const setType = (type: ChatType) => {
    if (type !== ChatType.CHTP30) setRoomPassword("");
    if (roomType !== type) setRoomType(type);
  };

  /*
  api를 통해 방 생성
  방 생성 성공 시 우측 컨텐츠 화면 empty 상태로 변경
  */
  const createRoom = () => {
    axios.post(`/api/chatrooms/new/${user}`, {
      chatType: roomType,
      chatName: roomName,
      password: roomPassword,
      isDirected: false,
    })
      .then((response) => {
        console.log(response);
        propFunc("empty");
      })
      .catch((error) => {
        console.log(error);
      });
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
          <Radio type="radio" checked={roomType === ChatType.CHTP20} onChange={() => setType(ChatType.CHTP20)} />
          <Text>PUBLIC</Text>
        </RadioInput>
        <RadioInput>
          <Radio type="radio" checked={roomType === ChatType.CHTP40} onChange={() => setType(ChatType.CHTP40)} />
          <Text>PRIVATE</Text>
        </RadioInput>
        <RadioInput>
          <Radio type="radio" checked={roomType === ChatType.CHTP30} onChange={() => setType(ChatType.CHTP30)} />
          <Text>PROTECTED</Text>
        </RadioInput>
      </InputArea>
      <InputArea>
        RoomPassword
        <TextInput
          value={roomPassword}
          disabled={roomType !== ChatType.CHTP30}
          onChange={(event) => passwordChange(event)}
        />
      </InputArea>
      <ButtonArea>
        <NeonBox onClick={() => createRoom()}>Create</NeonBox>
        <NeonBox onClick={() => propFunc("empty")}>Close</NeonBox>
      </ButtonArea>
    </ChatCreateRoom>
  );
}
