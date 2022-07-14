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
  color: "white",
  textShadow: "0px 0px 10px #ffffff",
})

const HeaderInfo = styled("div", {
  display: "flex",
  flexDirection: "row",
  marginRight: "6rem",
})

const HeaderButton = styled("div", {
  fontSize: "1rem",
  width: "2.5rem",
  height: "2.5rem",
  margin: "0.5rem",
  cursor: "pointer",
  marginTop: "-2rem",
  border: "1px solid #fff",
  textAlign: "center",
  verticalAlign: "middle",
})

const HeaderButtonIcon = styled("img", {
  position: "absolute",
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
  console.log("마으마ㅡ아므아므아ㅡ", chatUsers);

  return (
    <ContentRoom>
      <ChatRoomHeader>
        <HeaderInfo>
          <HeaderButton // room exit button
            onClick={() => {
              propFunc("empty");
              dispatch(setChatRoomId({ chatRoomId: -1 } as DisplayData));
            }}
            style={{
              border: "0",
              backgroundColor: "#fd4546",
              borderRadius: "100%",
              marginLeft: "1.5rem",
            }}
          >
            <HeaderButtonIcon
              alt="x"
              src="/asset/x_mark.svg"
              style={{
                width: "2.3rem",
                height: "2.3rem",
                top: "1.4rem",
                left: "1.6rem",
                opacity: "0.7",
              }}
            />
          </HeaderButton>
          <HeaderButton // hide tab
            onClick={() => {
              modal.SetModalSize("700px", "300px", "40%", "30%");
              modal.SetModalContent(<div />);
              dispatch(setModalTrigger({ ismodal: true } as DisplayData));
            }}
            style={{
              border: "0",
              backgroundColor: "#fdaf24",
              borderRadius: "100%",
            }}
          >
            <HeaderButtonIcon
              alt="x"
              src="/asset/exit_mark.svg"
              style={{
                width: "1.8rem",
                height: "1.8rem",
                top: "1.6rem",
                left: "5.3rem",
                opacity: "0.7",
              }}
            />
          </HeaderButton>
          <HeaderButton // modal on : setting
            onClick={() => {
              modal.SetModalSize("800px", "800px", "10%", "27%");
              modal.SetModalContent(<div />);
              dispatch(setModalTrigger({ ismodal: true } as DisplayData));
            }}
            style={{
              border: "0",
              backgroundColor: "#28c231",
              borderRadius: "100%",
            }}
          >
            <HeaderButtonIcon
              alt="x"
              src="/asset/setting_mark.svg"
              style={{
                width: "1.8rem",
                height: "1.8rem",
                top: "1.6rem",
                left: "8.8rem",
                opacity: "0.7",
              }}
            />
          </HeaderButton>
          <HeaderButton // modal on : setting
            onClick={() => {
              modal.SetModalSize("800px", "800px", "10%", "27%");
              modal.SetModalContent(<div />);
              dispatch(setModalTrigger({ ismodal: true } as DisplayData));
            }}
            style={{
              border: "0",
              backgroundColor: "#F2F2F2",
              borderRadius: "100%",
            }}
          >
            <HeaderButtonIcon
              alt="x"
              src="/asset/users_mark.svg"
              style={{
                width: "1.8rem",
                height: "1.8rem",
                top: "1.6rem",
                left: "12.35rem",
                opacity: "0.7",
              }}
            />
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
