import React from "react";
import { styled } from "@stitches/react";
import * as theme from "../../../theme/theme";

const UserListBox = styled("div", {
  width: "100%",
  height: "5vh",
  overflow: "hidden",
  border: "1px solid gray",
  fontSize: "15px",

});

export function ModalChatUserListBox(props: any) {
  const { chatInfo } = props;
  return (
    <UserListBox>
      <p>asd</p>
    </UserListBox>
  );
}
