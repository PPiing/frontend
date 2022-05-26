import React from "react";
import { styled } from "@stitches/react";
import * as theme from "../theme/theme";
import { ComponentNavAlam } from "../component/nav/navAlam";
import { ComponentNavSearch } from "../component/nav/navSearch";
import { ComponentNavFriendZone } from "../component/nav/navFriendZone";
import { ComponentNavInviteZone } from "../component/nav/navInviteZone";

const NavCommunity = styled("div", {
  border: `3px solid ${theme.NEON_RED}`,
  height: `${theme.NAVRIGHT_HEIGHT}`,
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
