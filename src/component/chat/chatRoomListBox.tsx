import React from "react";
import { styled } from "@stitches/react";
import * as theme from "../../theme/theme";
import * as template from "../../container/contentTemplate";

const ChatRoomListBox = styled(template.ListBox, {
});

const ChatRoomDataArea = styled("div", {
  display: "flex",
  flexDirection: "row",
});

const ChatName = styled("div", {
});

const ChatDetail = styled("div", {
  display: "flex",
  flexDirection: "column",
  marginLeft: "10px",
});

export function ComponentChatRoomListBox(props: any) {
  const { chatRoomData } = props;

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
    <ChatRoomListBox>
      <ChatRoomDataArea>
        <ChatName>{chatRoomData.name}</ChatName>
        <ChatDetail>#{chatRoomData.seq}, {chatRoomTypeDistridutor(chatRoomData.type)}</ChatDetail>
      </ChatRoomDataArea>
    </ChatRoomListBox>
  );
}
