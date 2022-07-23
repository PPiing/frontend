/* eslint-disable react/destructuring-assignment */
import React, { useEffect } from "react";
import { styled } from "@stitches/react";
import * as theme from "../../../theme/theme";
import { getUserSearch } from "../../../network/api/axios.custom";
// *****************************************************************************
// Type, Define, Getter start
// *****************************************************************************

type UserLevel = {
  name: string,
  level: number,
  code: string,
}

type ActionLevel = {
  name: string,
  level: number,
  icon: string,
  enable: boolean,
}

export const DefineUser: UserLevel[] = [
  { name: "Owner", level: 0, code: "CPAU10" },
  { name: "Admin", level: 1, code: "CPAU20" },
  { name: "User", level: 2, code: "CPAU30" },
];

export const DefineAction: ActionLevel[] = [
  //   { name: "Enter",
  //     level: 2 },
  //   { name: "Exit",
  //     level: 2 },
  { name: "Ban",
    level: 1,
    icon: "/asset/icon_ban.svg",
    enable: true },
  { name: "Mute",
    level: 1,
    icon: "/asset/icon_mute.svg",
    enable: true, },
  { name: "AdminAppoint",
    level: 0,
    icon: "/asset/icon_admin.svg",
    enable: true },
  //   { name: "RoomToggle", // public / private
  //     level: 0 },
  //   { name: "Set Password",
  //     level: 0 },
  //   { name: "Set Roomname",
  //     level: 0 },
]

const UserListBox = styled("div", {
  width: "100%",
  height: "5vh",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontSize: "1rem",
  transition: "all 0.5s",
  "&:hover": {
    fontSize: "1.1rem",
    marginTop: "-0.15rem",
    marginBottom: "0.6rem",
  },
});

export function getDefinedUserType(code: string): UserLevel {
  for (let i = 0; i < DefineUser.length; i += 1) {
    if (DefineUser[i].code === code) {
      return DefineUser[i];
    }
  }
  return (DefineUser[2]);
}

export function getDefinedActionList(MyLevel: UserLevel, TargetLevel: UserLevel): ActionLevel[] {
  const result: ActionLevel[] = [];
  for (let i = 0; i < DefineAction.length; i += 1) {
    if (DefineAction[i].level >= MyLevel.level &&
      MyLevel.level >= TargetLevel.level) {
      result.push(DefineAction[i]);
    }
  }
  return (result);
}

// *****************************************************************************
// Type, Define, Getter end
// *****************************************************************************

// *****************************************************************************
// Stitches start
// *****************************************************************************

const UserNicknameZone = styled("div", {
  width: "60%",
  marginLeft: "1%",
  color: "gray",
});

const UserNicknameBold = styled("a", {
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
});

const ButtonZone = styled("div", {
  display: "flex",
  flexDirection: "row",
});

const ButtonDiv = styled("div", {
  width: "2.5rem",
  height: "2.5rem",
  borderRadius: "100%",
  marginRight: "1rem",
  position: "relative",
  cursor: "pointer",
  backgroundColor: "white",
  transition: "all 0.3s",
  boxShadow: "0px 0px 6px #ffffff",
  "&:hover": {
    backgroundColor: "#424242",
    boxShadow: "0px 0px 6px gray",
  },
});

const ButtonImg = styled("div", {
  position: "absolute",
  width: "1.8rem",
  height: "1.8rem",
  transform: "translate(-50%, -50%)",
  top: "50%",
  left: "50%",
//   filter: "invert(1)",
});

// *****************************************************************************
// Stitches end
// *****************************************************************************

// *****************************************************************************
// Renderer start
// *****************************************************************************

function RenderButton(partcpUser: any, partcpType: UserLevel, loggedType: UserLevel): JSX.Element {
  const result: JSX.Element[] = [];
  const actionList: ActionLevel[] = getDefinedActionList(loggedType, partcpType);
  console.log("actionList :", actionList);
  console.log("partcpUser :", partcpUser);
  console.log("partcpType :", partcpType);
  console.log("loggedType :", loggedType);
  for (let i = 0; i < actionList.length; i += 1) {
    result.push(
      <ButtonDiv key={i}>
        <ButtonImg>
          <img src={actionList[i].icon} alt={actionList[i].name} />
        </ButtonImg>
      </ButtonDiv>
    );
  }
  return (
    <ButtonZone>
      {result}
    </ButtonZone>
  );
}

export function ModalChatUserListBox(props: any) {
  const { partcpUser, loggedUser, loggedType } = props;
  const partcpType = getDefinedUserType(partcpUser.code);
  const [userName, setUserName] = React.useState<string>("로딩중입니다.");
  useEffect(() => {
    getUserSearch(partcpUser.userSeq).then((response: any) => {
      setUserName(response.data.user_info.userName);
    }).catch((error) => {
      setUserName("오류가 발생했습니다.");
    });
  }, []);

  return (
    <UserListBox>
      <UserNicknameZone>
        <p>
          :&nbsp;&nbsp;
          <UserNicknameBold>
            {userName}
          </UserNicknameBold>
        </p>
      </UserNicknameZone>
      {RenderButton(partcpUser, partcpType, loggedType)}
    </UserListBox>
  );
}

// *****************************************************************************
// Renderer end
// *****************************************************************************
