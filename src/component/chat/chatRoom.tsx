/* eslint-disable no-restricted-globals */
/* eslint-disable max-len */
/* eslint-disable array-callback-return */
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
import { ModalChatExit } from "../modal/modalCheck";
import { ModalChatUserList } from "../modal/modalChatUserList";
import { ModalChatSetting } from "../modal/modalChatSetting";
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

const HeaderButtonZone = styled("div", {
  display: "flex",
  flexDirection: "row",
  //   justifyContent: "space-around",
  // width: "35%",
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
  }
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
      style={{ backgroundColor: "#fd4546", marginLeft: "1.5rem", }}
      key="1"
    >
      <HeaderButtonIcon alt="x" src="/asset/icon_x.svg" />
    </HeaderButton>
  );
  if (chatRoomData.type !== "CHTP10") {
    rst.push(
      <HeaderButton
        onClick={handleExitOpen}
        style={{ backgroundColor: "#fdaf24", }}
        key="2"
      >
        <HeaderButtonIcon alt="x" src="/asset/icon_exit.svg" />
      </HeaderButton>
    );
    rst.push(
      <HeaderButton
        onClick={handleSettingOpen}
        style={{ backgroundColor: "#28c231", }}
        key="3"
      >
        <HeaderButtonIcon alt="x" src="/asset/icon_setting.svg" />
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
  }
  return (
    <HeaderButtonZone>
      <Modal open={exitOpen} onClose={handleExitClose}>
        <Box sx={theme.modalStyle} component="div">
          <ModalChatExit
            room={chatRoomData.seq}
          />
        </Box>
      </Modal>
      <Modal open={settingOpen} onClose={handleSettingClose}>
        <Box sx={theme.modalStyle} component="div">
          <ModalChatSetting chatInfo={chatInfo} />
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

export function ComponentChatRoom(props: any) {
  const { propFunc, chatRoomData, socket } = props;
  const [inputMsg, setInputMsg] = useState("");
  const [chatInfo, setChatInfo] = useState([]);
  const dispatch = useDispatch();
  const loggedUser = useSelector<ReducerType, LoggedUserData>((state) => state.loggedUser);
  const [messages, setMessages] = useState<IRecvMessage[]>([]);

  useEffect(() => {
    console.log("thisis getALlMessages!!!");
    axios.getAllMessages(chatRoomData.seq).then((promise: any) => {
      const tMessages = promise.data;
      tMessages.sort((a: any, b: any) => { return a.msgSeq - b.msgSeq });
      const result: IRecvMessage[] = [];
      for (let i = 0; i < tMessages.length; i += 1) {
        result.push({
          id: tMessages[i].msgSeq,
          msg: tMessages[i].msg,
          nickname: tMessages[i].nickname,
        })
      }
      setMessages(result);
      for (let i = 0; i < messages.length; i += 1) {
        console.log(`getMessage For: ${messages[i].id}: ${messages[i].nickname}: ${messages[i].msg}, ${JSON.stringify(messages[i])}`);
      }
    });

    // console.log("addMessage socket!!!, ", messages); // []
    // socket.on("room:chat", (message: any) => {
    //   if (message.chatSeq === chatRoomData.seq) {
    //     console.log("addMessage socket, ", message, messages); // [message], []
    //     setMessages([...messages, message]);
    //     for (let i = 0; i < messages.length; i += 1) {
    //       console.log(
    //         `Socket Recv For: ${messages[i].id}: ${messages[i].nickname}: ${messages[i].msg}, ${JSON.stringify(messages[i])}`
    //       );
    //     }
    //   }
    // });
  }, [chatRoomData]);
  // }, []);

  useEffect(() => {
    console.log("addMessage socket!!!, ", messages); // []
    socket.on("room:chat", (message: any) => {
      console.log("------------------------------------");
      if (message.chatSeq === chatRoomData.seq) {
        console.log("addMessage socket, ", message, messages); // [message], []
        // addMessage(message);
        location.reload();
        for (let i = 0; i < messages.length; i += 1) {
          console.log(
            `Socket Recv For: ${messages[i].id}: ${messages[i].nickname}: ${messages[i].msg}, ${JSON.stringify(messages[i])}`
          );
        }
      }
      console.log("------------------------------------");
    });

    console.log("chatUserCount");
    chatUserCount(chatRoomData.seq).then((response: any) => {
      setChatInfo(response?.data);
    });

    return () => {
      socket.off("room:chat");
    }
  }, []);

  function addMessage(message: any) {
    console.log("addMessage function, ", message, messages); //
    setMessages([...messages, message]);
  }

  function renderMessages(): JSX.Element[] {
    console.log("------------------------------------");
    console.log("renderMessages!!");
    for (let i = 0; i < messages.length; i += 1) {
      console.log(`renderMessages For: ${messages[i].id}: ${messages[i].msg}, ${JSON.stringify(messages[i])}`);
    }
    console.log("------------------------------------")
    return messages.map((item, i) => {
      return (
        <ChatMessage
          key={i}
          nickname={item?.nickname}
          msg={item?.msg}
        />
      );
    });
  }

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
        console.log("------------------------------------")
        console.log(`MSG SEND : ${inputMsg}`);
        for (let i = 0; i < messages.length; i += 1) {
          console.log(`send msg For: ${messages[i].id}: ${messages[i].nickname}: ${messages[i].msg},  ${JSON.stringify(messages[i])}`);
        }
        console.log("------------------------------------")
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

  return (
    <ContentRoom>
      <ChatRoomHeader>
        <HeaderInfo
          dispatch={dispatch}
          chatRoomData={chatRoomData}
          propFunc={propFunc}
          chatInfo={chatInfo}
        />
        <HeaderTitle>
          {chatRoomData.name}
        </HeaderTitle>
      </ChatRoomHeader>
      <ChatRoomRecvArea>
        {renderMessages()}
      </ChatRoomRecvArea>
      <ChatRoomSendArea>
        <input
          style={{
            width: "90%", height: "60%", color: "white", backgroundColor: "black", fontSize: "30px" }}
          value={inputMsg}
          onChange={(event) => handleChange(event)}
          onKeyDown={HandleKeyDown}
        />
      </ChatRoomSendArea>
    </ContentRoom>
  );
}
