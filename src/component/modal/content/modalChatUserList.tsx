import React from "react";
import { styled } from "@stitches/react";
import * as theme from "../../../theme/theme";
import { ModalChatUserListBox } from "./modalChatUserListBox";
import { getUserSearch } from "../../../network/api/axios.custom";

const UserListZone = styled("div", {
  width: "100%",
  height: "100%",
  overflow: "hidden",
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
  height: "95%",
  border: "2px solid white",
  overflowY: "scroll",
  overflowX: "hidden",
  "&::-webkit-scrollbar": {
    width: "5px",
    margin: "5px",
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
  chatInfo.participants[0].userSeq = 1;
  chatInfo.participants[1].userSeq = 1;

  const renderList = () => {
    const renderResult: JSX.Element[] = [];
    for (let i = 0; i < chatInfo.participants.length; i += 1) {
      renderResult.push(
        <>
          <ModalChatUserListBox key={i} partcInfo={chatInfo.participants[i]} />
          <hr key={chatInfo.participants.length + i} />
        </>
      );
    }
    return renderResult;
  };

  console.log("in ModalChatUserList, chatInfo: ", chatInfo);

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
