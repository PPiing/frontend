import React, { useState } from "react";
import { styled } from "@stitches/react";
import { useDispatch, useSelector } from "react-redux";
import { ReducerType } from "../../redux/rootReducer";
import { LoggedUserData } from "../../redux/slices/loggedUser";
import ChatInput from "./ChatInput";
import ChatRoomHeaderInfo from "./ChatRoomHeaderInfo";
import ChatRoomMessageArea from "./ChatRoomMessageArea";

const ContentRoom = styled("div", {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "4rem",
  width: "100%",
  height: "100%",
  fontWeight: "300",
});

const ChatRoomHeader = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  height: "9%",
  backgroundColor: "#000000",
  overflow: "hidden",
});

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
});

const ChatRoomRecvArea = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "99%",
  margin: "1% 1% 0% 0%",
  height: "90%",
  overflowY: "scroll",
  "&::-webkit-scrollbar": {
    background: "none",
    width: "0.6rem",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#222222",
    borderRadius: "3rem",
    width: "0.4rem",
    right: "60px",
  },
});

const ChatRoomSendArea = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100px",
});

export function ComponentChatRoom(props: any) {
  const { propFunc, chatRoomData, socket } = props;
  const [chatInfo, setChatInfo] = useState([]);
  const dispatch = useDispatch();
  const loggedUser = useSelector<ReducerType, LoggedUserData>(
    (state) => state.loggedUser
  );

  // [ API | "/chatrooms/room/{roomid}" ]
  //
  // {
  //   "chatSeq": 0,
  //   "chatName": "푸주홍의 등산크럽",
  //   "chatType": "CHTP20",
  //   "isPassword": false,
  //   "participants": [
  //     null
  //   ]
  // }

  return (
    <ContentRoom>
      <ChatRoomHeader>
        <ChatRoomHeaderInfo
          dispatch={dispatch}
          chatRoomData={chatRoomData}
          propFunc={propFunc}
          chatInfo={chatInfo}
        />
        <HeaderTitle>{chatRoomData.name}</HeaderTitle>
      </ChatRoomHeader>
      <ChatRoomRecvArea>
        <ChatRoomMessageArea roomSeq={chatRoomData.seq} socket={socket} />
      </ChatRoomRecvArea>
      <ChatRoomSendArea>
        <ChatInput socket={socket} seq={chatRoomData.seq} />
      </ChatRoomSendArea>
    </ContentRoom>
  );
}
