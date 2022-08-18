/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@stitches/react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import store from "../../redux/store";
import * as theme from "../../theme/theme";
import { getUserSearch, getNickName } from "../../network/api/axios.custom";
import { deleteJoinedChatRoom, JoinedChatRoomListData } from "../../redux/slices/joinedChatRoomList";
import { ToolTip } from "../button/ToolTip";

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
  tooltip: string,
  enable: boolean,
}

export const DefineUser: UserLevel[] = [
  { name: "Owner", level: 3, code: "CPAU30" },
  { name: "Admin", level: 2, code: "CPAU20" },
  { name: "User", level: 1, code: "CPAU10" },
];

export const DefineAction: ActionLevel[] = [
  { name: "Ban",
    level: 1,
    icon: "/asset/icon_ban.svg",
    tooltip: "Ban the user from chatroom.",
    enable: true },
  { name: "Mute",
    level: 1,
    icon: "/asset/icon_mute.svg",
    tooltip: "Mute the user for 5 minutes.",
    enable: true, },
  { name: "Admin",
    level: 0,
    icon: "/asset/icon_admin.svg",
    tooltip: "Set the user as administrator.",
    enable: true },
]

const UserListBox = styled("div", {
  width: "100%",
  height: "7vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontSize: "1.2rem",
  transition: "all 0.5s",
  "&:hover": {
    fontSize: "1.3rem",
    textShadow: "0px 0px 7px #ffffff",
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
    if (DefineAction[i].level <= MyLevel.level && MyLevel.level > TargetLevel.level) {
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
  transition: "all 0.3s",
  "&:hover": {
    backgroundColor: "#424242",
  },
});

const ButtonImg = styled("div", {
  position: "absolute",
  width: "1.8rem",
  height: "1.8rem",
  transform: "translate(-50%, -50%)",
  top: "50%",
  left: "50%",
  cursor: "pointer",
});

// *****************************************************************************
// Stitches end
// *****************************************************************************

// *****************************************************************************
// Renderer start
// *****************************************************************************

function BanButton(userInfo: any, myAuth: number, roomSeq: number, setButtonResult: any) {
  if (myAuth === 3 && userInfo.targetAuth !== 3) {
    axios.put(`/api/chatrooms/ban/${userInfo?.targetSeq}/${roomSeq}`).then((response) => {
      setButtonResult(<pre style={{ color: "rgb(0, 255, 15)", margin: 0 }}>success!</pre>);
      location.reload();
    });
  } else {
    setButtonResult(<pre style={{ color: "red", margin: 0, textShadow: "0 0 5px red" }}>You are not permitted to do this task.</pre>);
  }
}
function KickButton(userInfo: any, myAuth: number, roomSeq: number, setButtonResult: any) {
  if (myAuth === 3 && userInfo.targetAuth !== 3) {
    axios.delete(`/api/chatrooms/kick/${userInfo?.targetSeq}/${roomSeq}`).then((response) => {
      setButtonResult(<pre style={{ color: "rgb(0, 255, 15)", margin: 0 }}>success!</pre>);
      location.reload();
    });
  } else {
    setButtonResult(<pre style={{ color: "red", margin: 0, textShadow: "0 0 5px red" }}>You are not permitted to do this task.</pre>);
  }
}
function MuteButton(userInfo: any, myAuth: number, roomSeq: number, setButtonResult: any) {
  if (myAuth === 3 && userInfo.targetAuth !== 3) {
    axios.put(`/api/chatrooms/mute/${userInfo?.targetSeq}/${roomSeq}/300`).then((response) => {
      setButtonResult(<pre style={{ color: "rgb(0, 255, 15)", margin: 0 }}>success!</pre>);
      location.reload();
    });
  } else {
    setButtonResult(<pre style={{ color: "red", margin: 0, textShadow: "0 0 5px red" }}>You are not permitted to do this task.</pre>);
  }
}
function AdminButton(userInfo: any, myAuth: number, roomSeq: number, setButtonResult: any) {
  if (myAuth === 3) {
    if (userInfo?.targetAuth === 2) {
      axios.delete(`/api/chatrooms/manager/${userInfo?.targetSeq}/${roomSeq}`).then((response) => {
        location.reload();
      });
    } else if (userInfo?.targetAuth === 1) {
      axios.put(`/api/chatrooms/manager/${userInfo?.targetSeq}/${roomSeq}`).then((response) => {
        location.reload();
      });
    }
  } else {
    setButtonResult(<pre style={{ color: "red", margin: 0, textShadow: "0 0 5px red" }}>You are not permitted to do this task.</pre>);
  }
}

function RenderButton(userInfo: any, myAuth: number, roomSeq: number, setButtonResult: any) {
  let opa = 1;
  if (userInfo.targetAuth === 2) {
    opa = 0.2;
  }

  return (
    <ButtonZone>
      <ButtonDiv key={0}>
        <ButtonImg className="myToolTipParent" onClick={() => { BanButton(userInfo, myAuth, roomSeq, setButtonResult) }}>
          <img
            style={{ filter: "invert(90%)", background: "none", }}
            src="/asset/icon_ban.svg"
            alt="Ban"
          />
          <ToolTip content="Ban the user from chatroom." />
        </ButtonImg>
      </ButtonDiv>
      <ButtonDiv key={1}>
        <ButtonImg className="myToolTipParent" onClick={() => { KickButton(userInfo, myAuth, roomSeq, setButtonResult) }}>
          <img
            style={{ filter: "invert(90%)", background: "none", }}
            src="/asset/icon_kick.svg"
            alt="Kick"
          />
          <ToolTip content="Kick the user from chatroom." />
        </ButtonImg>
      </ButtonDiv>
      <ButtonDiv key={2}>
        <ButtonImg className="myToolTipParent" onClick={() => { MuteButton(userInfo, myAuth, roomSeq, setButtonResult) }}>
          <img
            style={{ filter: "invert(90%)", background: "none", }}
            src="/asset/icon_mute.svg"
            alt="Ban"
          />
          <ToolTip content="Mute the user for 5 minutes." />
        </ButtonImg>
      </ButtonDiv>
      <ButtonDiv key={3}>
        <ButtonImg className="myToolTipParent" onClick={() => { AdminButton(userInfo, myAuth, roomSeq, setButtonResult) }}>
          <img
            style={{ filter: "invert(90%)", background: "none", opacity: opa }}
            src="/asset/icon_admin.svg"
            alt="Admin"
          />
          <ToolTip content="Set the user as administrator." />
        </ButtonImg>
      </ButtonDiv>
    </ButtonZone>
  )
}

export function ModalChatUserListBox(props: any) {
  const { userInfo, myAuth, roomSeq } = props;
  const [userName, setUserName] = React.useState<JSX.Element>(
    <UserNicknameBold>로딩중입니다.</UserNicknameBold>
  );
  const [buttonResult, setButtonResult] = React.useState<JSX.Element>(
    <pre style={{ color: "white", display: "none", }}>no process working.</pre>
  );

  useEffect(() => {
    getNickName(userInfo?.targetSeq).then((response: string) => {
      setUserName(<UserNicknameBold>{response}</UserNicknameBold>);
    }).catch((err) => {
      setUserName(<UserNicknameBold style={{ color: "red" }}>Error occured</UserNicknameBold>);
    });
  }, []);

  function ButtonClickHref(userSeq: any) {
    window.location.href = `/profile/${userSeq}`;
  }

  return (
    <>
      <UserListBox>
        <UserNicknameZone onClick={() => { ButtonClickHref(userInfo?.targetSeq); }}>
          {userName}
        </UserNicknameZone>
        {RenderButton(userInfo, myAuth, roomSeq, setButtonResult)}<br />
      </UserListBox>
      <div style={{ margin: "-5px 0 5px 10px", }}>{buttonResult}</div>
      <hr style={{ marginBottom: "10px" }} />
    </>
  );
}

// *****************************************************************************
// Renderer end
// *****************************************************************************
