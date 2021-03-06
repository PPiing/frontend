/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from "react";
import { styled } from "@stitches/react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { ReducerType } from "../../redux/rootReducer";
import { LoggedUserData } from "../../redux/slices/loggedUser";
import * as theme from "../../theme/theme";
import { ModalChatExit } from "../modal/content/modalChatExit";
import { ModalChatUserList } from "../modal/content/modalChatUserList";
import { setChatRoomId, DisplayData } from "../../redux/slices/display";
import { chatUserCount } from "../../network/api/axios.custom";
import { ChatMessage } from "./chatMessage";
import IRecvMessage from "../../interface/recvMessage.interface";
import * as axios from "../../network/api/axios.custom";

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
  overflow: "hidden",
})

const HeaderTitle = styled("p", {
  marginRight: "2rem",
  color: "white",
  textShadow: "0px 0px 10px #ffffff",
})

const HeaderButtonZone = styled("div", {
  display: "flex",
  flexDirection: "row",
  //   justifyContent: "space-around",
  //   width: "30%",
})

const HeaderButton = styled("div", {
  width: "2.5rem",
  height: "2.5rem",
  cursor: "pointer",
  borderRadius: "100%",
  marginRight: "1rem",
  position: "relative",
  //   margin: "0.5rem",
  //   marginTop: "-2rem",
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

function HeaderInfo(props: any) {
  const { dispatch, chatRoomData, propFunc, chatInfo } = props;
  console.log("chatInfo in headerInfo :", chatInfo);
  theme.modalStyle.top = "50%";
  theme.modalStyle.left = "50%";
  theme.modalStyle.width = "auto";
  const [exitOpen, setExitOpen] = useState(false);
  const handleExitOpen = () => setExitOpen(true);
  const handleExitClose = () => setExitOpen(false);

  const [settingOpen, setSettingOpen] = useState(false);
  const handleSettingOpen = () => setSettingOpen(true);
  const handleSettingClose = () => setSettingOpen(false);

  const [listOpen, setListOpen] = useState(false);
  const handleListOpen = () => setListOpen(true);
  const handleListClose = () => setListOpen(false);

  const rst = [];
  rst.push(
    <HeaderButton
      onClick={() => {
        propFunc("empty");
        dispatch(setChatRoomId({ chatRoomId: -1 } as DisplayData));
      }}
      style={{
        backgroundColor: "#fd4546",
        marginLeft: "1.5rem",
      }}
      key="1"
    >
      <HeaderButtonIcon
        alt="x"
        src="/asset/icon_x.svg"
      />
    </HeaderButton>
  );
  //   if (chatRoomData.type !== "CHTP10") {
  rst.push(
    <HeaderButton
      onClick={handleExitOpen}
      style={{ backgroundColor: "#fdaf24", }}
      key="2"
    >
      <HeaderButtonIcon
        alt="x"
        src="/asset/icon_exit.svg"
      />
    </HeaderButton>
  );
  rst.push(
    <HeaderButton
      onClick={handleSettingOpen}
      style={{ backgroundColor: "#28c231", }}
      key="3"
    >
      <HeaderButtonIcon
        alt="x"
        src="/asset/icon_setting.svg"
      />
    </HeaderButton>
  );
  rst.push(
    <HeaderButton
      onClick={handleListOpen}
      style={{ backgroundColor: "#F2F2F2", }}
      key="4"
    >
      <HeaderButtonIcon alt="x" src="/asset/icon_users.svg" />
    </HeaderButton>
  );
  //   }
  return (
    <HeaderButtonZone>
      <Modal open={exitOpen} onClose={handleExitClose}>
        <Box sx={theme.modalStyle} component="div">
          <ModalChatExit room={chatRoomData.seq} />
        </Box>
      </Modal>
      <Modal open={settingOpen} onClose={handleSettingClose}>
        <Box sx={theme.modalStyle} component="div">
          <div />
        </Box>
      </Modal>
      <Modal open={listOpen} onClose={handleListClose}>
        <Box sx={theme.modalStyle} component="div">
          <ModalChatUserList chatInfo={chatInfo} />
        </Box>
      </Modal>
      {rst}
    </HeaderButtonZone>
  );
}

const renderMessage = () => {

}

export function ComponentChatRoom(props: any) {
  const { propFunc, chatRoomData, socket } = props;
  //   console.log("?????? ???????????? ??????", chatRoomData, "?????????, ", propFunc);
  const [inputMsg, setInputMsg] = useState("");
  const [chatInfo, setChatInfo] = useState([]);
  const dispatch = useDispatch();
  const loggedUser = useSelector<ReducerType, LoggedUserData>((state) => state.loggedUser);
  const [messages, setMessages] = useState<IRecvMessage[]>([]);

  useEffect(() => {
    console.log("AXIOS");
    axios.getAllMessages(chatRoomData.seq)
      .then((promise: any) => promise.data)
      .then((data) => {
        console.log(`AXIOS RESULT : ${data}`);
      })
  }, []);

  useEffect(() => {
    socket.on("room:chat", (res:any) => {
      console.log(`getMessage : ${res}`);
    });
  });

  useEffect(() => {
    chatUserCount(chatRoomData.seq || "").then((response: any) => {
      setChatInfo(response?.data);
    });
  }, []);

  // socket.on("room:chat", (message: any) => {
  //   console.log(message);
  //   //setMessages([...messages, message]);
  // })

  const renderMessage = () => {

  }

  // TODO
  // ??????????????? ?????? ??????????????? ????????? ??? useEffect??? ?????? ????????? ?????? ???????????? ??????
  //   useEffect(() => {
  //     chatMessageSearch(chatRoomData.seq, -1, 20, Number(loggedUser.seq))
  //       .then((response) => console.log(response))
  //       .catch((error) => console.log(error));
  //   }, []);

  const handleChange = (e: any) => {
    setInputMsg(e.target.value);
  };

  const HandleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      setInputMsg("");
      if (inputMsg !== "") {
        socket.emit("chat", {
          content: inputMsg,
          at: chatRoomData.seq,
        });
        console.log("MSG SEND");
      }
    }
  };

  // [ API | "/chatrooms/room/{roomid}" ]
  //
  // {
  //   "chatSeq": 0,
  //   "chatName": "???????????? ????????????",
  //   "chatType": "CHTP20",
  //   "isPassword": false,
  //   "participants": [
  //     null
  //   ]
  // }
  useEffect(() => {
    chatUserCount(chatRoomData.seq).then((response: any) => {
      setChatInfo(response?.data);
    });
  }, []);
  //   console.log("??????????????????????????????", chatInfo);

  return (
    <ContentRoom>
      <ChatRoomHeader>
        <HeaderInfo
          dispatch={dispatch}
          chatRoomData={chatRoomData}
          propFunc={propFunc}
          chatInfo={chatInfo}
        />
        <HeaderTitle>{chatRoomData.name}</HeaderTitle>
      </ChatRoomHeader>
      <ChatRoomRecvArea>
        <ChatMessage username="hyungyyo" message="sample message" />
        <ChatMessage username="hyungyyo" message="?????? ?????????" />
      </ChatRoomRecvArea>
      <ChatRoomSendArea>
        <input style={{ width: "90%", height: "60%", color: "white", backgroundColor: "black", fontSize: "30px" }} value={inputMsg} onChange={(event) => handleChange(event)} onKeyDown={HandleKeyDown} />
      </ChatRoomSendArea>
    </ContentRoom>
  );
}
