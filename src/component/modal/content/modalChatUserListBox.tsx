import React from "react";
import { styled } from "@stitches/react";
import * as theme from "../../../theme/theme";

const UserListBox = styled("div", {
  width: "100%",
  height: "100%",
  overflow: "hidden",
  // backgroundColor: "#FFFFFF",
  fontSize: "15px",
});

export function ModalChatUserListBox(props: any) {
  return (
    <UserListBox />
  );
}
