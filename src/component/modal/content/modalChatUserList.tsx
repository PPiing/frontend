import React from "react";
import { styled } from "@stitches/react";
import * as theme from "../../../theme/theme";
import { ModalChatUserListBox } from "./modalChatUserListBox";

const UserListZone = styled("div", {
  width: "100%",
  height: "100%",
  overflow: "hidden",
  // backgroundColor: "#FFFFFF",
  fontSize: "15px",
});

const UserListText = styled("div", {
  marginLeft: "3px",
  marginTop: "3px",
  fontSize: "2vh",
  fontWeight: "bold",
  textShadow: "0px 0px 1px #ffffff",
});

const UserListTable = styled("div", {
  margin: "5px",
  height: "100%",
  overflowY: "scroll",
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

export function ModalChatUserList(props: any) {
  const { chatInfo } = props;

  const renderList = () => {
    const renderResult = [];
    for (let i = 0; i < 3; i += 1) {
      renderResult.push(
        <ModalChatUserListBox key={i} chatInfo={chatInfo} />
      );
    }
    return renderResult;
  };

  return (
    <UserListZone>
      <UserListText>
        User list
      </UserListText>
      <UserListTable>
        {renderList()}
      </UserListTable>
    </UserListZone>
  );
}
