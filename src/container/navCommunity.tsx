import React from "react";
import { styled } from "@stitches/react";
import * as theme from "../theme/theme";
import { ComponentNavAlam } from "../component/nav/navAlam";
import { ComponentNavSearch } from "../component/nav/navSearch";
import { ComponentNavFriendZone } from "../component/nav/navFriendZone";
import { ComponentNavInviteZone } from "../component/nav/navInviteZone";

const NavCommunity = styled(theme.NeonHoverRed, {
  height: `${theme.NAV_RIGHT_HEIGHT}`,
  borderRadius: "50px",
});

export function ContainerNavCommunity() {
  return (
    <NavCommunity className="navCommunity">
      <ComponentNavAlam name="skim" status="sleeping" />
      <ComponentNavSearch />
      <ComponentNavFriendZone />
      <ComponentNavInviteZone />
    </NavCommunity>
  );
}
