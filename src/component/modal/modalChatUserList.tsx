import React, { useEffect, useState } from "react";
import { styled } from "@stitches/react";
import { useSelector } from "react-redux";
import * as theme from "../../theme/theme";
import * as child from "./modalChatUserListBox";
import { getUserSearch } from "../../network/api/axios.custom";
import { ReducerType } from "../../redux/rootReducer";
import { LoggedUserData } from "../../redux/slices/loggedUser";
import { ModalChatUserListBox } from "./modalChatUserListBox";
import * as axios from "../../network/api/axios.custom";

const UserListZone = styled("div", {
  width: "100%",
  minWidth: "700px",
  height: "100%",
  maxHeight: "700px",
  //   overflow: "hidden",
  fontSize: "15px",
});

const UserListText = styled("div", {
  marginLeft: "3px",
  marginTop: "3px",
  fontSize: "3vh",
  marginBottom: "-1vh",
  fontWeight: "bold",
  textShadow: "0px 0px 2px #ffffff",
  textAlign: "center",
});

const UserListTable = styled("div", {
  margin: "5px",
  padding: "15px",
  height: "95%",
  //   overflowY: "scroll",
  //   overflowX: "hidden",
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

interface ChatUserList {
  roomSeq: string;
}

interface ChatUserListInfo {
  targetAuth: number;
  targetSeq: number;
}

export function ModalChatUserList(props: ChatUserList) {
  const { roomSeq } = props;
  const [userLIstInfo, setUserListInfo] = useState<ChatUserListInfo[]>([]);
  const loggedUser = useSelector<ReducerType, LoggedUserData>(
    (state) => state.loggedUser
  );
  let myAuth: number = 0;
  useEffect(() => {
    axios
      .getChatInfo(roomSeq)
      .then((response: any) => response.data.participants)
      .then((participants) => {
        setUserListInfo(
          participants.map((item: any) => {
            if (loggedUser.seq === item.userSeq) {
              myAuth = convertAuth(item.partcAuth);
            }
            const newUser = {
              targetAuth: convertAuth(item.partcAuth),
              targetSeq: item.userSeq,
            };
            return newUser;
          })
        );
      })
  }, []);

  const convertAuth = (auth: string) => {
    switch (auth) {
      case "CPAU30":
        return 3;
      case "CPAU20":
        return 2;
      case "CPAU10":
        return 1;
      default:
        return 0;
    }
  }

  const tempRender = () => {
    return userLIstInfo.map((item: ChatUserListInfo, i) => {
      return (
        <ModalChatUserListBox key={i} userInfo={item} myAuth={myAuth} />
      )
    })
  }

  // chatInfo.participants[0].partcAuth = "CPAU30";
  // chatInfo.participants[1].partcAuth = "CPAU20";
  // chatInfo.participants[2].partcAuth = "CPAU10";
  // const loggedUser = useSelector<ReducerType, LoggedUserData>((state) => state.loggedUser);
  // let loggedType: any;
  // for (let i = 0; i < chatInfo?.participants.length; i += 1) {
  //   if (chatInfo?.participants[i].userSeq === loggedUser.seq) {
  //     loggedType = child.getDefinedUserType(chatInfo?.participants[i].partcAuth);
  //   }
  // }
  // const renderList = () => {
  //   const renderResult: JSX.Element[] = [];
  //   for (let i = 0; i < chatInfo.participants.length; i += 1) {
  //     if (i === 0) renderResult.push(<hr key="0" style={{ border: "1px solid #424242", }} />);
  //     renderResult.push(
  //       <div key={i + 1}>
  //         <child.ModalChatUserListBox
  //           key={i}
  //           partcpUser={chatInfo.participants[i]}
  //           loggedUser={loggedUser}
  //           loggedType={loggedType}
  //         />
  //         <hr
  //           key={i + 1}
  //           style={{ border: "1px solid #424242", }}
  //         />
  //       </div>
  //     );
  //   }
  //   return renderResult;
  // };

  return (
    <UserListZone>
      <UserListText>
        User list
      </UserListText>
      <pre style={{ fontSize: "1.5vh", textAlign: "center", }}>
        Click on username to move to that user's profile page.
      </pre>
      <UserListTable>
        {tempRender()}
      </UserListTable>
    </UserListZone>
  );
}
