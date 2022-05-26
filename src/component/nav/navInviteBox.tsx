import React from "react";
import { styled } from "@stitches/react";
import * as theme from "../../theme/theme";

const NavInviteBox = styled("div", {
  background: `${theme.BACKGROUND_YELLOW}`,
  height: `${theme.NAV_INVITE_BOX_HEIGHT}`,
  marginTop: "0.5rem",
  marginBottom: "0.5rem",
  minHeight: "90px",
});

export function ComponentNavInviteBox(props:any) {
  const { name } = props;

  return (
    <NavInviteBox>
      {name}
    </NavInviteBox>
  );
}
