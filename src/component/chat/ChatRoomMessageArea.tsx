import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import * as axios from "../../network/api/axios.custom";
import { ReducerType } from "../../redux/rootReducer";
import { BlockData } from "../../redux/slices/blockList";
import { ChatMessage } from "./chatMessage";

interface IMessage {
  msgSeq: number;
  chatSeq: number;
  userSeq: number | undefined;
  msg: string;
  createAt: Date | null;
  nickname: string;
}

function ChatRoomMessageArea(props: any) {
  const { roomSeq, socket } = props;
  const [messages, setMessages] = useState<IMessage[]>([]);
  const bottomRef = useRef<null | HTMLDivElement>(null);
  const blockUsers = useSelector<ReducerType, BlockData[]>((state) => state.blockList);

  useEffect(() => {
    setMessages([]);
  }, []);

  useEffect(() => {
    axios.getAllMessages(roomSeq).then((response: any) => setMessages(response.data.reverse()));
  }, [roomSeq]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  socket.on("room:chat", (message: any) => {
    if (roomSeq === message.chatSeq &&
      !blockUsers.includes({ seq: message.userSeq } as BlockData)) {
      const newMsg: IMessage = {
        msgSeq: message.id,
        chatSeq: message.chatSeq,
        userSeq: message.id[0],
        msg: message.msg,
        createAt: null,
        nickname: message.nickname,
      }
      setMessages([...messages, newMsg]);
    }
  });

  const renderMessages = () => {
    return (
      messages.map((item, i) => {
        return (
          <ChatMessage key={i} nickname={item.nickname} msg={item.msg} />
        )
      })
    )
  }

  return (
    <div style={{ width: "100%", height: "100%", overflowY: "auto" }}>
      {renderMessages()}
      <div ref={bottomRef} />
    </div>
  )
}

export default ChatRoomMessageArea;
