import React, { useState } from "react";
import { styled } from "@stitches/react";
import { useDispatch } from "react-redux";
import * as theme from "../../theme/theme";
import { setChatRoomId, DisplayData } from "../../redux/slices/display";
import { chatUserCount } from "../../network/api/axios.custom";
import { ChatMessage } from "./chatMessage";

const ContentRoom = styled(theme.NeonHoverRed, {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "5rem",
  borderRadius: "5%",
  width: "95%",
  height: "95%",
});

const ContentExitButton = styled(theme.NeonHoverRed, {
  position: "absolute",
  right: "20px",
  top: "20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "2rem",
  borderRadius: "20%",
  width: "30px",
  height: "30px",
  cursor: "pointer",
});

const ChatRoomHeader = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  height: "120px",
})

const HeaderTitle = styled("p", {
  marginLeft: "2rem",
})

const HeaderInfo = styled("div", {
  display: "flex",
  flexDirection: "row",
  marginRight: "5rem",
})

const HeaderButton = styled(theme.NeonHoverRed, {
  fontSize: "1rem",
  width: "2rem",
  height: "2rem",
  margin: "0.5rem",
  cursor: "pointer",
})

const ChatRoomRecvArea = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  height: "100%",
})

const ChatRoomSendArea = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100px",
})

export function ComponentChatRoom(props: any) {
  const { propFunc, chatRoomData } = props;
  const [inputMsg, setInputMsg] = useState("");
  const handleChange = (e: any) => {
    setInputMsg(e.target.value);
  };

  const dispatch = useDispatch();

  const HandleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      setInputMsg("");
      if (inputMsg !== "") {
        //...socket 으로 메세지 전송
      }
    }
  };

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

  console.log(`${chatRoomData.seq}!`);
  const chatUsers = chatUserCount(chatRoomData.seq);

  console.log(chatUsers);

  return (
    <ContentRoom>
      <ContentExitButton onClick={() => { propFunc("empty"); dispatch(setChatRoomId({ chatRoomId: -1 } as DisplayData)); }}>X</ContentExitButton>
      <ChatRoomHeader>
        <HeaderTitle>{chatRoomData.name}</HeaderTitle>
        <HeaderInfo>
          <HeaderButton>1</HeaderButton>
          <HeaderButton>1</HeaderButton>
          <HeaderButton>1</HeaderButton>
        </HeaderInfo>
      </ChatRoomHeader>
      <ChatRoomRecvArea>
        <ChatMessage username="hyungyyo" message="sample message" />
        <ChatMessage username="hyungyyo" message="샘플 메세지" />
      </ChatRoomRecvArea>
      <ChatRoomSendArea>
        <input style={{ width: "90%", height: "60%", color: "white", backgroundColor: "black", fontSize: "30px" }} value={inputMsg} onChange={(event) => handleChange(event)} onKeyDown={HandleKeyDown} />
      </ChatRoomSendArea>
    </ContentRoom>
  );
}
