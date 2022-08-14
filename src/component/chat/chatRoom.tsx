import React, { useState, useEffect } from "react";
import { styled } from "@stitches/react";
import { useDispatch, useSelector } from "react-redux";
import { ReducerType } from "../../redux/rootReducer";
import { LoggedUserData } from "../../redux/slices/loggedUser";
import { chatUserCount } from "../../network/api/axios.custom";
import { ChatMessage } from "./chatMessage";
import IRecvMessage from "../../interface/recvMessage.interface";
import * as axios from "../../network/api/axios.custom";
import ChatInput from "./ChatInput";
import ChatRoomHeaderInfo from "./ChatRoomHeaderInfo";

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

export function ComponentChatRoom(props: any) {
  const { propFunc, chatRoomData, socket } = props;
  const [chatInfo, setChatInfo] = useState([]);
  const dispatch = useDispatch();
  const loggedUser = useSelector<ReducerType, LoggedUserData>((state) => state.loggedUser);
  const [messages, setMessages] = useState<IRecvMessage[]>([]);

  useEffect(() => {
    axios.getAllMessages(chatRoomData.seq).then((response: any) => {
      const tMessages = response?.data;
      tMessages?.sort((a: any, b: any) => { return a.msgSeq - b.msgSeq });
      const result: IRecvMessage[] = [];
      for (let i = 0; i < tMessages?.length; i += 1) {
        result.push({
          id: tMessages[i]?.msgSeq,
          msg: tMessages[i]?.msg,
          nickname: tMessages[i]?.nickname,
        })
      }
      setMessages(result);
      console.log("---loading messages---");
      for (let i = 0; i < messages.length; i += 1) {
        console.log(`getMessage For: ${messages[i].id}: ${messages[i].nickname}: ${messages[i].msg}, ${JSON.stringify(messages[i])}`);
      }
    }).catch((err: any) => {
      console.log(err);
    });
  }, [chatRoomData]);

  useEffect(() => {
    chatUserCount(chatRoomData.seq).then((response: any) => {
      setChatInfo(response?.data);
    });
    socket.on("room:chat", (message: IRecvMessage) => {
      console.log("new message!");
      if (message.chatSeq === chatRoomData.seq) {
        console.log("addMessage socket, ", message, messages); // [message], []
        setMessages([...messages, message]);
        for (let i = 0; i < messages.length; i += 1) {
          console.log(
            `Socket Recv For: ${messages[i].id}: ${messages[i].nickname}: ${messages[i].msg}, ${JSON.stringify(messages[i])}`
          );
        }
      }
    });
    return () => {
      socket.off("room:chat");
    }
  }, []);

  function renderMessages(): JSX.Element[] {
    console.log(`call renderMessages Methods : ${messages.length}`);
    messages.map((item) => console.log(item))
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
        <HeaderTitle>
          {chatRoomData.name}
        </HeaderTitle>
      </ChatRoomHeader>
      <ChatRoomRecvArea>
        {renderMessages()}
      </ChatRoomRecvArea>
      <ChatRoomSendArea>
        <ChatInput socket={socket} seq={chatRoomData.seq} />
      </ChatRoomSendArea>
    </ContentRoom>
  );
}
