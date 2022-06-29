import React from "react";
import { styled } from "@stitches/react";
import * as theme from "../theme/theme";
import { ComponentNavAlam } from "../component/nav/navAlam";
import { ComponentNavSearch } from "../component/nav/navSearch";
import { ComponentNavFriendZone } from "../component/nav/navFriendZone";
import { ComponentNavInviteZone } from "../component/nav/navInviteZone";
import * as modal from "../component/modal/modal";

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

const NavCommunity = styled(theme.NeonHoverRed, {
  height: "90%",
  maxHeight: "calc(100% - 100px)",
});

export function ContainerNavCommunity() {
  return (
    <NavCommunity className="navCommunity">
      <modal.CallModal />
      <ComponentNavAlam />
      <ComponentNavSearch />
      <ComponentNavFriendZone />
      <ComponentNavInviteZone />
    </NavCommunity>
  );
}
