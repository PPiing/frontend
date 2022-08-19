/* eslint-disable no-restricted-globals */
import React, { useState } from "react";
import { styled } from "@stitches/react";
import { useSelector } from "react-redux";
import * as theme from "../../theme/theme";
import { ComponentNavInviteBox } from "./navInviteBox";
import { ReducerType } from "../../redux/rootReducer";
import { gameRule, GameRuleData, setGameRuleData } from "../../redux/slices/gameRule";
import store from "../../redux/store";
import { ChoosableAlamData } from "../../redux/slices/choosableAlamList";
import { getConfirmAlamList } from "../../network/api/axios.custom";
import socketManager from "../../network/api/socket";

const NavInviteZone = styled("div", {
  height: "calc(35% - 25px)",
  "@media (max-height: 800px)": {
    height: "20%",
  },
  "@media (max-height: 550px)": {
    height: "10%",
  },
  transition: "all 0.5s",
  margin: "5px",
  marginTop: "10px",
  marginBottom: "10px",
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

const EmptyAccessRequireAlam = styled("div", {
  alignContent: "center",
  alignItems: "center",
  paddingTop: "10px",
  marginLeft: "auto",
  marginRight: "auto",
  display: "table",
  fontSize: "1.5rem",
  color: "gray",
  fontWeight: "300",
});

const socketAlarm = socketManager.socket("/alarm");
const socketGame = socketManager.socket("/");

socketAlarm.connect();
socketGame.connect();

export function ComponentNavInviteZone() {
  const myRule = useSelector<ReducerType, GameRuleData>((state) => state.gameRule);
  const choosableAlamList =
    useSelector<ReducerType, ChoosableAlamData[]>((state) => state.choosableAlamList);
  const [reqSwitch, setReqSwitch] = useState(0);

  if (reqSwitch === 0) {
    getConfirmAlamList();
    setReqSwitch(1);
  }

  socketAlarm.on("alarm:confirm", () => {
    setReqSwitch(0);
    location.reload();
  });

  socketGame.on("game:start", () => {
    console.log("Invite Game start!=> ");
    store.dispatch(setGameRuleData({ ...myRule, isInGame: true } as GameRuleData));
    window.location.href = "/game";
  });

  socketGame.on("game:ready", (res) => {
    console.log("Invite Game ready!=> ", res.blueUser, res.blueUser);
    // eslint-disable-next-line max-len
    store.dispatch(setGameRuleData({ ...myRule, blueUser: res.blueUser, redUser: res.redUser } as GameRuleData));
    socketGame.emit("game:ready", { roomId: res.roomId });
  });
  // socketGame.on("game:start", () => {
  //   console.log("Invite Game Start!");
  // });

  const renderChoosableAlams = () => {
    if (choosableAlamList.length === 0) {
      return (
        <EmptyAccessRequireAlam key={0}>Alarm empty -_-</EmptyAccessRequireAlam>
      );
    }
    const alamList = [];
    for (let i = choosableAlamList.length - 1; i >= 0; i -= 1) {
      alamList.push(
        <ComponentNavInviteBox key={i} alam={choosableAlamList[i]} />
      );
    }
    return alamList;
  };

  return (
    <NavInviteZone>
      {/* <ComponentNavInviteBox name="Hello" />
      <ComponentNavInviteBox name="spark" />
      <ComponentNavInviteBox name="Hybae" /> */}
      {renderChoosableAlams()}
    </NavInviteZone>
  );
}
