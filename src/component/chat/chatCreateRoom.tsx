/* eslint-disable no-restricted-globals */
import React, { useState } from "react";
import { styled } from "@stitches/react";
import axios from "axios";
import "./chatCreateRoom.css"

enum ChatType {
  CHTP10 = "CHTP10", // 개인 채팅방 (DM)
  CHTP20 = "CHTP20", // 단체 채팅방 (public)
  CHTP30 = "CHTP30", // 단체 채팅방 (protected)
  CHTP40 = "CHTP40", // 비밀 채팅방 (private)
}

const Wrapper = styled("div", {
  width: "100%",
  height: "100%",
});

const CreateZone = styled("div", {
  color: "white",
  width: "90%",
  marginLeft: "5%",
  height: "100%",
  overflowX: "hidden",
  overflowY: "hidden",
});

const TitleZone = styled("div", {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
  height: "30%",
});

const Title = styled("div", {
  fontSize: "5vh",
  fontWeight: "bold",
  textShadow: "0px 0px 2px #ffffff",
  marginTop: "4vh",
  marginBottom: "-2vh",
});

const H1 = styled("div", {
  fontSize: "27px",
  fontWeight: "600",
  textShadow: "0px 0px 2px #ffffff",
  marginBottom: "-1vh",
});

const InputZone = styled("div", {
  height: "15%",
  marginBottom: "2%",
});

const InputText = styled("input", {
  width: "calc(98% - 10px)",
  height: "3vh",
  marginLeft: "1%",
  marginTop: "0.5vh",
  padding: "5px",
  borderRadius: "5px",

  background: "none",
  border: "0.5px solid white",

  fontSize: "2vh",
  color: "white",
  textShadow: "0px 0px 1px #ffffff",
});

const ButtonArea = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  margin: "3rem",
  height: "20%",
});

const NeonBox = styled("div", {
  width: "20vw",
  height: "8vh",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  fontWeight: "bold",
  fontSize: "2.3rem",

  transition: "all 0.5s",
  borderRadius: "10px",
  background: "none",
  color: "grey",
  cursor: "pointer",

  "&:hover": {
    color: "white",
    background: "rgba(255, 255, 255, 0.2)",
  },
});

export function CreateRoom(props: any) {
  const { propFunc } = props;

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
    console.log(roomName, roomPassword, roomType);
    axios.post("/api/chatrooms/new/", {
      chatType: roomType,
      chatName: roomName,
      password: roomPassword,
      isDirected: false,
    }).then((response) => {
      console.log(response);
      // propFunc("empty");
      location.reload();
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <Wrapper>
      <CreateZone>
        <TitleZone>
          <Title>Create Chat Room</Title>
          <br />
          <pre style={{ fontSize: "2.3vh", }}>
            Create a new chat room.<br />
            You will be the owner.
          </pre>
        </TitleZone>

        <InputZone>
          <H1>Room Name</H1>
          <pre style={{ fontSize: "15px", marginBottom: "1.5vh", }}>
            Create a new chat room. You will be the owner.
          </pre>
          <InputText value={roomName} onChange={(event) => nameChange(event)} />
        </InputZone>

        <InputZone>
          <H1>Room Type</H1>
          <pre style={{ fontSize: "15px", marginBottom: "1.5vh", }}>
            <b>public: </b>&nbsp;&nbsp;&nbsp;No password, anyone can join freely<br />
            <b>protected: </b>Password exists, anyone can join after entering<br />
            <b>private: </b>&nbsp;&nbsp;Must be invited to enter
          </pre>
          <div className="radioWrapper">
            <input
              type="Radio"
              name="select"
              id="option-1"
              checked={roomType === ChatType.CHTP20}
              onChange={() => setType(ChatType.CHTP20)}
            />
            <input
              type="Radio"
              name="select"
              id="option-2"
              checked={roomType === ChatType.CHTP40}
              onChange={() => setType(ChatType.CHTP40)}
            />
            <input
              type="Radio"
              name="select"
              id="option-3"
              checked={roomType === ChatType.CHTP30}
              onChange={() => setType(ChatType.CHTP30)}
            />
            <label htmlFor="option-1" className="option option-1">
              <span>public</span>
            </label>
            <label htmlFor="option-2" className="option option-2">
              <span>private</span>
            </label>
            <label htmlFor="option-3" className="option option-3">
              <span>protected</span>
            </label>
          </div>
        </InputZone>

        <InputZone>
          <H1>Room Password</H1>
          <pre style={{ fontSize: "15px", marginBottom: "1.5vh", }}>
            <b>public: </b>No password, anyone can join freely
          </pre>
          <InputText
            value={roomPassword}
            disabled={roomType !== ChatType.CHTP30}
            onChange={(event) => passwordChange(event)}
          />
        </InputZone>

        <ButtonArea>
          <NeonBox onClick={() => createRoom()}>Create</NeonBox>
          <NeonBox onClick={() => propFunc("empty")}>Close</NeonBox>
        </ButtonArea>
      </CreateZone>
    </Wrapper>
  );
}
