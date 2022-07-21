import React from "react";
import { styled } from "@stitches/react";
import * as theme from "../../../theme/theme";

const UserListBox = styled("div", {
  width: "100%",
  height: "5vh",
  overflow: "hidden",
  fontSize: "15px",

});

export function ModalChatUserListBox(props: any) {
  const { partcInfo } = props;
  console.log(partcInfo);
  return (
    <UserListBox>
      <p>asd</p>
    </UserListBox>
  );
}
