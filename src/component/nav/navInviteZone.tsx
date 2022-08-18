/* eslint-disable no-restricted-globals */
import React, { useState } from "react";
import { styled } from "@stitches/react";
import { useSelector } from "react-redux";
import * as theme from "../../theme/theme";
import { ComponentNavInviteBox } from "./navInviteBox";
import { ReducerType } from "../../redux/rootReducer";
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

const socket = socketManager.socket("/alarm");
socket.connect();

export function ComponentNavInviteZone() {
  const choosableAlamList =
    useSelector<ReducerType, ChoosableAlamData[]>((state) => state.choosableAlamList);
  const [reqSwitch, setReqSwitch] = useState(0);

  if (reqSwitch === 0) {
    getConfirmAlamList();
    setReqSwitch(1);
  }

  socket.on("alarm:confirm", () => {
    setReqSwitch(0);
    location.reload();
  });

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
