import React from "react";
import { styled } from "@stitches/react";
import { BORDER_BASIC, NAVRIGHT_WIDTH } from "../theme/theme";
import { ComponentNavAlam } from "../component/nav/navAlam";
import { ComponentNavSearch } from "../component/nav/navSearch";
import { ComponentNavFriendZone } from "../component/nav/navFriendZone";
import { ComponentNavInviteZone } from "../component/nav/navInviteZone";

const NavCommunity = styled("div", {
  border: BORDER_BASIC,
  //   minWidth: "200px",
  width: NAVRIGHT_WIDTH,
  height: "100vh",
  padding: "10px",
});

export function ContainerNavCommunity() {
  return (
    <NavCommunity className="navCommunity">
      <ComponentNavAlam />
      <ComponentNavSearch />
      <ComponentNavFriendZone />
      <ComponentNavInviteZone />
    </NavCommunity>
  );
}
