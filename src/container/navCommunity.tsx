import React, { Reducer, useState } from "react";
import { styled } from "@stitches/react";
import { useSelector } from "react-redux";
import * as theme from "../theme/theme";
import { ComponentNavAlam } from "../component/nav/navAlam";
import { ComponentNavSearch } from "../component/nav/navSearch";
import { ComponentNavFriendZone } from "../component/nav/navFriendZone";
import { ComponentNavInviteZone } from "../component/nav/navInviteZone";
import { ReducerType } from "../redux/rootReducer";
import { LoggedUserData } from "../redux/slices/loggedUser";

// navCommunity에서 사용할 status 정의
//  (+ 현재 status는 socket으로 처리)

//  axios.get.friendList {
//  users: user[]
// }

// -> user {
//    id: unique key
//    profileImg: ""
//    nickname: ""
// }

export function ContainerNavCommunity() {
  const loggedUser = useSelector<ReducerType, LoggedUserData>((state) => state.loggedUser);

  return (
    <NavCommunity className="navCommunity">
      <ComponentNavAlam name={loggedUser.nick} status="sleeping" />
      <ComponentNavSearch />
      <ComponentNavFriendZone />
      <ComponentNavInviteZone />
    </NavCommunity>
  );
}

const NavCommunity = styled(theme.NeonHoverRed, {
  // height: `calc(${theme.NAV_BOTTOM_HEIGHT} - 20px)`,
  height: "100%",
});
