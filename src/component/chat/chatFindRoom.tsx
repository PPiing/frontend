import React, { ReactElement, useEffect, useState } from "react";
import { styled } from "@stitches/react";
import * as theme from "../../theme/theme";
import socketManager from "../../feat/chat/socket";
import * as axios from "../../network/api/axios.custom";
import IRoomList from "../../interface/roomlist.interface";

enum ChatType {
  CHTP10 = "CHTP10", // 개인 채팅방 (DM)
  CHTP20 = "CHTP20", // 단체 채팅방 (public)
  CHTP30 = "CHTP30", // 단체 채팅방 (protected)
  CHTP40 = "CHTP40", // 비밀 채팅방 (private)
}

const ChatFindRoom = styled(theme.NeonHoverRed, {
  position: "relative",
  display: "inline-block",
  fontSize: "5rem",
  borderRadius: "1rem",
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

const RoomListBox = styled(theme.NeonHoverRed, {
  display: "inline-block",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "2rem",
  borderRadius: "1rem",
  width: "44%",
  minWidth: "300px",
  height: "15%",
  margin: "1%",
  cursor: "pointer",
});

export function FindRoom(props: any) {
  const { propFunc } = props;

  const [roomList, setRoomList] = useState<IRoomList[]>([]);

  /*
  마운트, 언마운트 시 채팅 룸 조회
  */
  useEffect(() => {
    axios.chatroomsSearch()
      .then((promise: any) => promise.data)
      .then((data) => {
        console.log(data);
        setRoomList(data);
      });
  }, []);

  /*
  조회해 온 룸 리스트 렌더
  */
  const renderRoomList = () => {
    return (
      <div>
        {roomList.map((item: any, i: number) => (
          <RoomListBox key={i}>{roomList[i].chatSeq}<br />{roomList[i].chatName}</RoomListBox>
        ))}
      </div>
    );
  };

  return (
    <ChatFindRoom>
      <div>
        <ContentExitButton onClick={() => propFunc("empty")}>X</ContentExitButton>
      </div>
      <div>
        {renderRoomList()}
      </div>
    </ChatFindRoom>
  );
}
