import React from "react";
import { styled } from "@stitches/react";
import * as theme from "../theme/theme";

const Contents = styled(theme.NeonHoverRed, {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.NEON_RED,
  borderRadius: "50px",
  "&.chat_list": {
    width: "30%",
    flexDirection: "column",
  },
  "&.chat_content": {
    marginLeft: "20px",
    width: "70%",
  }
});

// FIXME
// height 에서 border 3px * 2 만큼 임시로 더해주었음
const ContentsDivider = styled("div", {
  display: "flex",
  flexDirection: "row",
  height: `calc(${theme.NAV_BOTTOM_HEIGHT} - 5px + 6px)`,
});

const SelectButton = styled(theme.NeonHoverRed, {
  width: "40%",
  height: "60%",
  borderRadius: "50px",
  backgroundColor: "transparent",
  fontWeight: "bold",
  fontSize: "2rem",
  color: "Gray",
  marginLeft: "10px",
  marginRight: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
});

const ListSelectArea = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
  width: "100%",
  height: "10%",
});

const ListChatArea = styled("div", {
  width: "100%",
  height: "80%",
  overflowY: "scroll",
  overflowX: "hidden",
  marginRight: "1rem",
  "&::-webkit-scrollbar": {
    width: "5px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.NEON_RED,
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "grey",
    borderRadius: "10px",
  },
});

const ListChatBox = styled(theme.NeonHoverRed, {
  color: "grey",
  width: "90%",
  height: "100px",
  margin: "1rem",
});

const ListMenuArea = styled("div", {
  display: "flex",
  width: "100%",
  height: "10%",
});

const MenuButton = styled(theme.NeonHoverRed, {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  left: "55%",
  margin: "10px",
  width: "50px",
  height: "50px",
  borderRadius: "20%",
  border: "3px solid grey",
  color: "grey",
  backgroundColor: "transparent",
});

export function ContainerContents() {
  return (
    <ContentsDivider>
      <Contents className="chat_list">
        <ListSelectArea>
          <SelectButton className="select_box" id="chat">Chat</SelectButton>
          <SelectButton className="select_box" id="dm">DM</SelectButton>
        </ListSelectArea>
        <ListChatArea>
          <ListChatBox>1</ListChatBox>
          <ListChatBox>2</ListChatBox>
          <ListChatBox>3</ListChatBox>
          <ListChatBox>4</ListChatBox>
          <ListChatBox>5</ListChatBox>
          <ListChatBox>6</ListChatBox>
          <ListChatBox>7</ListChatBox>
          <ListChatBox>8</ListChatBox>
        </ListChatArea>
        <ListMenuArea>
          <MenuButton>
            find
          </MenuButton>
          <MenuButton>
            create
          </MenuButton>
        </ListMenuArea>
      </Contents>
      <Contents className="chat_content">
        content
      </Contents>
    </ContentsDivider>
  );
}
