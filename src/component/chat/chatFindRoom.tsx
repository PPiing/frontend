/* eslint-disable react/button-has-type */
import React, { ReactElement, useEffect, useState } from "react";
import { styled } from "@stitches/react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import * as theme from "../../theme/theme";
import * as myaxios from "../../network/api/axios.custom";
import IRoomList from "../../interface/roomlist.interface";

enum ChatType {
  CHTP10 = "CHTP10", // 개인 채팅방 (DM)
  CHTP20 = "CHTP20", // 단체 채팅방 (public)
  CHTP30 = "CHTP30", // 단체 채팅방 (protected)
  CHTP40 = "CHTP40", // 비밀 채팅방 (private)
}

const ChatRoomHeader = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  height: "9%",
  marginBottom: "3%",
  backgroundColor: "#000000",
  overflow: "hidden",
})

const HeaderTitle = styled("div", {
  marginRight: "2rem",
  color: "white",
  textAlign: "right",
  fontSize: "3rem",
  fontWeight: "900",
  overflowX: "scroll",
  overflowY: "hidden",
  whiteSpace: "nowrap",
  fontFamily: "NanumSquare",
  "&::-webkit-scrollbar": {
    display: "none",
  },
})

const HeaderButton = styled("div", {
  width: "2.5rem",
  height: "2.5rem",
  cursor: "pointer",
  borderRadius: "100%",
  marginRight: "1rem",
  position: "relative",
})

const HeaderButtonIcon = styled("img", {
  position: "absolute",
  width: "1.8rem",
  height: "1.8rem",
  opacity: "0.7",
  transform: "translate(-50%, -50%)",
  top: "50%",
  left: "50%",
})

const ChatFindRoom = styled("div", {
  position: "relative",
  display: "inline-block",
  fontSize: "5rem",
  borderRadius: "1rem",
  width: "100%",
  height: "100%",
  color: "white",
});

const RoomListZone = styled("div", {
  overflowX: "hidden",
  overflowY: "scroll",
  "&::-webkit-scrollbar": {
    background: "none",
  },
  width: "100%",
  height: "38%",
});

const RoomListBox = styled("button", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  fontSize: "1.5rem",
  borderRadius: "1rem",
  width: "95%",
  height: "10%",
  marginLeft: "4%",
  marginBottom: "1%",
  minWidth: "300px",
  cursor: "pointer",
  overflow: "hidden",
  backgroundColor: "black",
  color: "white",
  border: "1px solid white",
});

const ChatJoinMain = styled("div", {
  width: "100%",
  height: "40%",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
});

export function FindRoom(props: any) {
  const { propFunc } = props;
  const [roomList, setRoomList] = useState<IRoomList[]>([]);
  const [join, setJoin] = useState(<div style={{ textAlign: "center", fontSize: "2rem", }}>Click the room that you want to join.</div>);
  const [passRst, setPassRst] = useState(<div style={{ display: "none", }}>.</div>);

  /*
  마운트, 언마운트 시 채팅 룸 조회
  */
  useEffect(() => {
    myaxios.chatroomsSearch()
      .then((promise: any) => promise.data)
      .then((data) => {
        setRoomList(data);
      });
  }, []);

  /*
  조회해 온 룸 리스트 렌더
  */

  function setJoinControl(room: any) {
    const ChatJoinTextDiv = styled("div", {
      textAlign: "center",
    });

    const ChatJoinInput = styled("input", {
      width: "60%",
      height: "4rem",
      marginLeft: "calc(20% - 30px)",
      fontSize: "35%",
      backgroundColor: "black",
      color: "white",
      border: "1px solid white",
      borderRadius: "5px",
      padding: "15px",
    });

    const ChatJoinButton = styled("button", {
      width: "40%",
      height: "4rem",
      marginLeft: "30%",
      backgroundColor: "#28c231",
      borderRadius: "5px",
      fontSize: "40%",
      fontWeight: "bold",
    });

    console.log("setJoinControl", room);

    const puborpriv = room.chatType === ChatType.CHTP20 ? "public" : "protected";

    const rst = [];
    rst.push(<ChatJoinTextDiv style={{ fontSize: "3rem", fontWeight: "bold", }}>{room?.chatName}</ChatJoinTextDiv>);
    rst.push(<ChatJoinTextDiv style={{ fontSize: "2rem", fontWeight: "300", }}>Are you sure that you want to join this <b>{puborpriv}</b> room?</ChatJoinTextDiv>);
    setPassRst(<div style={{ display: "none", }}>.</div>);
    if (room?.chatType === "CHTP30") {
      rst.push(
        <div>
          <ChatJoinInput
            type="password"
            placeholder="input password and press Enter."
            onKeyDown={(e: any) => {
              if (e.key === "Enter") {
                axios.put(`/api/chatrooms/join/${room.chatSeq}`, {
                  password: e.target.value,
                }).then((response: any) => {
                  console.log(response);
                }).catch((error: any) => {
                  console.log(error);
                  setPassRst(<div style={{ color: "red", fontSize: "2rem" }}>{error.response.data.message}</div>);
                });
              }
            }}
          />
        </div>
      );
    } else {
      rst.push(
        <ChatJoinButton
          onClick={(e) => {
            console.log("wow!");
          }}
        >YES
        </ChatJoinButton>
      );
    }
    setJoin(<div>{rst}</div>);
  }

  const renderRoomList = () => {
    return (
      <RoomListZone>
        {roomList.map((item: any, i: number) => (
          <RoomListBox key={i} onClick={(e) => { setJoinControl(roomList[i]) }}>
            {roomList[i].chatName}
          </RoomListBox>
        ))}
      </RoomListZone>
    );
  };

  return (
    <ChatFindRoom>
      <ChatRoomHeader>
        <HeaderButton
          onClick={() => { propFunc("empty"); }}
          style={{ backgroundColor: "#fd4546", marginLeft: "1.5rem", }}
          key="1"
        >
          <HeaderButtonIcon alt="x" src="/asset/icon_x.svg" />
        </HeaderButton>
        <HeaderTitle>
          Chat Room List
        </HeaderTitle>
      </ChatRoomHeader>
      {renderRoomList()}
      <ChatRoomHeader style={{ height: "10%", marginBottom: "0%", }}>
        <HeaderButton
          onClick={() => {
            setJoin(<div style={{ textAlign: "center", fontSize: "2rem", }}>Click the room that you want to join.</div>);
            setPassRst(<div style={{ display: "none", }}>.</div>);
          }}
          style={{ backgroundColor: "#fdaf24", marginLeft: "1.5rem", }}
          key="1"
        >
          <HeaderButtonIcon alt="x" src="/asset/icon_exit.svg" />
        </HeaderButton>
        <HeaderTitle>
          Chat Room Join
        </HeaderTitle>
      </ChatRoomHeader>
      <ChatJoinMain>
        {join}
        {passRst}
      </ChatJoinMain>
    </ChatFindRoom>
  );
}
