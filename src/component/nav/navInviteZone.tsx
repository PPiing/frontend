import React from "react";
import { styled } from "@stitches/react";
import * as theme from "../../theme/theme";
import { ComponentNavFriendBox } from "./navFriendBox";

const NavInviteZone = styled("div", {
  border: theme.BORDER_BASIC,
  width: theme.NAVRIGHT_WIDTH,
  height: "38vh",
});

export function ComponentNavInviteZone() {
  return (
    <NavInviteZone>
      <ComponentNavFriendBox name="Hello" />
      <ComponentNavFriendBox name="spark" />
      <ComponentNavFriendBox name="Hybae" />
      <ComponentNavFriendBox name="kkim" />
    </NavInviteZone>
  );
}
