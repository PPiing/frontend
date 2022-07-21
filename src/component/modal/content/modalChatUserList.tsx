import React from "react";
import { styled } from "@stitches/react";
import * as theme from "../../../theme/theme";
import { ModalChatUserListBox } from "./modalChatUserListBox";
import { getUserSearch } from "../../../network/api/axios.custom";

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
  height: "95%",
  border: "2px solid white",
  overflowY: "scroll",
  overflowX: "hidden",
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
  console.log("chat info : ", chatInfo);

  const renderList = () => {
    const renderResult: JSX.Element[] = [];
    for (let i = 0; i < chatInfo.participants.length; i += 1) {
      console.log("test debug");
      getUserSearch(chatInfo.participants[i].userSeq).then((response: any) => {
        console.log("inside then ", chatInfo.participants[i].userSeq, response);
        renderResult.push(
          <ModalChatUserListBox key={i} userInfo={response?.data} />
        );
      }).catch((error) => {
        console.log("ModalChatUserList, getUserSearch", error);
      });
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
