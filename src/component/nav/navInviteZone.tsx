import React from "react";
import { styled } from "@stitches/react";
import * as theme from "../../theme/theme";
import { ComponentNavInviteBox } from "./navInviteBox";

const NavInviteZone = styled("div", {
  height: `${theme.NAV_INVITE_HEIGHT}`,
});

export function ComponentNavInviteZone() {
  return (
    <NavInviteZone>
      <ComponentNavInviteBox name="Hello" />
      <ComponentNavInviteBox name="spark" />
      <ComponentNavInviteBox name="Hybae" />
    </NavInviteZone>
  );
}
