import React from "react";
import { styled } from "@stitches/react";
import { BACKGROUND_BLACK, BORDER_BASIC, NAVRIGHT_WIDTH } from "../theme/theme";
import { ComponentNavAlam } from "../component/navAlam";
import { ComponentNavSearch } from "../component/navSearch";
import { ComponentNavFriendZone } from "../component/navFriendZone";


const NavCommunity = styled("div", {
  border: BORDER_BASIC,
  minWidth: "200px",
  width: NAVRIGHT_WIDTH,
  height: "100vh",
  background: BACKGROUND_BLACK
});

export function ContainerNavCommunity() {
  return (
    <NavCommunity className="navCommunity">
      <ComponentNavAlam />
      <ComponentNavSearch />
      <ComponentNavFriendZone />
    </NavCommunity>
  );
}
