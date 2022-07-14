/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from "react";
import { styled } from "@stitches/react";
import { useDispatch } from "react-redux";
import * as theme from "../../theme/theme";
import * as modal from "../modal/modal";
import { setChatRoomId, DisplayData, setModalTrigger } from "../../redux/slices/display";
import { chatUserCount } from "../../network/api/axios.custom";
import { StatusDisplayDistributor } from "../../feat/profile/utils";
import { ChatMessage } from "./chatMessage";

const ContentRoom = styled("div", {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "5rem",
  width: "100%",
  height: "100%",
});

const ContentExitButton = styled("div", {
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
  border: "1px solid #fff",
});

const ChatRoomHeader = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  height: "120px",
  backgroundColor: "#000000",
})

const HeaderTitle = styled("p", {
  marginRight: "2rem",
})

const HeaderInfo = styled("div", {
  display: "flex",
  flexDirection: "row",
  marginRight: "5rem",
})

const HeaderButton = styled("div", {
  fontSize: "1rem",
  width: "1.3rem",
  height: "1.3rem",
  margin: "0.5rem",
  cursor: "pointer",
  marginTop: "-2rem",
  border: "1px solid #fff",
  textAlign: "center",
  verticalAlign: "middle",
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
      <ChatRoomHeader>
        <HeaderInfo>
          <HeaderButton // room exit button
            onClick={() => {
              modal.SetModalSize("700px", "300px", "40%", "30%");
              modal.SetModalContent(<div />);
              dispatch(setModalTrigger({ ismodal: true } as DisplayData));
            }}
            style={{
              border: "0",
              backgroundColor: "#fd4546",
              borderRadius: "100%",
              marginLeft: "1.5rem",
            }}
          />
          <HeaderButton // hide tab
            onClick={() => {
              propFunc("empty");
              dispatch(setChatRoomId({ chatRoomId: -1 } as DisplayData));
            }}
            style={{
              border: "0",
              backgroundColor: "#fdaf24",
              borderRadius: "100%",
            }}
          />
          <HeaderButton // modal on : setting
            onClick={() => {
              modal.SetModalSize("900px", "900px", "7%", "24%");
              modal.SetModalContent(<div />);
              dispatch(setModalTrigger({ ismodal: true } as DisplayData));
            }}
            style={{
              border: "0",
              backgroundColor: "#28c231",
              borderRadius: "100%",
            }}
          />
          <HeaderButton // modal on : user list
            onClick={() => {
              modal.SetModalSize("900px", "900px", "7%", "24%");
              modal.SetModalContent(<div />);
              dispatch(setModalTrigger({ ismodal: true } as DisplayData));
            }}
            style={{
              background: "#FBFBEF",
              borderRadius: "10px",
              width: "5.7rem",
              height: "1.3rem",
              textAlign: "center",
              verticalAlign: "middle",
              fontSize: "1rem",
              color: "black",
            }}
          >
            <b>00</b> joined
          </HeaderButton>
        </HeaderInfo>
        <HeaderTitle>{chatRoomData.name}</HeaderTitle>
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
