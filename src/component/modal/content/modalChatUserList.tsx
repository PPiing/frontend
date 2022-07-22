import React from "react";
import { styled } from "@stitches/react";
import { useSelector } from "react-redux";
import * as theme from "../../../theme/theme";
import * as child from "./modalChatUserListBox";
import { getUserSearch } from "../../../network/api/axios.custom";
import { ReducerType } from "../../../redux/rootReducer";
import { LoggedUserData } from "../../../redux/slices/loggedUser";

const UserListZone = styled("div", {
  width: "100%",
  minWidth: "700px",
  height: "100%",
  maxHeight: "700px",
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
  padding: "15px",
  height: "95%",
  overflowY: "scroll",
  overflowX: "hidden",
  backgroundColor: "rgb(37, 37, 37)",
  borderRadius: "20px",
  "&::-webkit-scrollbar": {
    display: "none",
  },
});

// type
/*
: Role
  Owner
  - Admin
  - - User
: Actions
  Room Name
  Room Password
  Room Unlisted
  Admin Appoint
  - Ban
  - Kick
  - Mute
  - - Enter
  - - Exit
*/

export function ModalChatUserList(props: any) {
  const { chatInfo } = props;
  chatInfo.participants[0].userSeq = 0;
  chatInfo.participants[0].userType = "CPAU10";
  chatInfo.participants[1].userSeq = 1;
  chatInfo.participants[1].userType = "CPAU20";
  const loggedUser = useSelector<ReducerType, LoggedUserData>((state) => state.loggedUser);
  let loggedType: any;
  for (let i = 0; i < chatInfo?.participants.length; i += 1) {
    if (chatInfo?.participants[i].userSeq === loggedUser.seq) {
      loggedType = child.getDefinedUserType(chatInfo?.participants[i].userType);
    }
  }
  const renderList = () => {
    const renderResult: JSX.Element[] = [];
    renderResult.push(<hr style={{ border: "1px solid #424242", }} />);
    for (let i = 0; i < chatInfo.participants.length; i += 1) {
      renderResult.push(
        <>
          <child.ModalChatUserListBox
            key={i}
            partcpUser={chatInfo.participants[i]}
            loggedUser={loggedUser}
            loggedType={loggedType}
          />
          <hr key={chatInfo.participants.length + i - 1} style={{ border: "1px solid #424242", }} />
        </>
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
