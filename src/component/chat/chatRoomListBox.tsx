import React from "react";
import { styled } from "@stitches/react";
import { useDispatch, useSelector } from "react-redux";
import * as template from "../../container/contentTemplate";
import { DisplayData, setChatRoomId } from "../../redux/slices/display";
import { ReducerType } from "../../redux/rootReducer";

const ChatRoomListBox = styled(template.ListBox, {
  alignContent: "start",
  justifyContent: "start",
});

const ChatRoomDataArea = styled("div", {
  display: "flex",
  flexDirection: "column",
  marginLeft: "20px",
});

const ChatName = styled("div", {
  fontSize: "35px",
  fontWeight: "350",
});

const ChatDetail = styled("div", {
  fontSize: "18px",
  fontWeight: "300",
});

export function ComponentChatRoomListBox(props: any) {
  const { chatRoomData } = props;
  const { stateUpdateFunc } = props;
  const display = useSelector<ReducerType, DisplayData>((state) => state.display);
  const dispatch = useDispatch();

  const chatRoomTypeDistridutor = (type: string) => {
    switch (type) {
      case "CHTP10":
        return "DM";
      case "CHTP20":
        return "public";
      case "CHTP30":
        return "protected";
      case "CHTP40":
        return "private";
      default:
        break;
    }
    return "Chat room type error";
  };

  return (
    <ChatRoomListBox
      onClick={() => {
        dispatch(setChatRoomId({ chatRoomId: chatRoomData.seq } as DisplayData));
        stateUpdateFunc("room");
      }}
      className={display.chatRoomId === chatRoomData.seq ? "clicked" : "non-clicked"}
    >
      <ChatRoomDataArea>
        <ChatName>{chatRoomData.name}</ChatName>
        <ChatDetail>#{chatRoomData.seq}, {chatRoomTypeDistridutor(chatRoomData.type)}</ChatDetail>
      </ChatRoomDataArea>
    </ChatRoomListBox>
  );
}
