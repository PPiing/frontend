import React from "react";
import { styled } from "@stitches/react";
import * as theme from "../../theme/theme";
import { ComponentNavFriendBox } from "./navFriendBox";

const NavFriendZone = styled("div", {
  border: theme.BORDER_BASIC,
  width: theme.NAVRIGHT_WIDTH,
  height: "43vh",
});

export function ComponentNavFriendZone() {
  return (
    <NavFriendZone>
      <ComponentNavFriendBox name="Hello" />
      <ComponentNavFriendBox name="spark" />
      <ComponentNavFriendBox name="Hybae" />
      <ComponentNavFriendBox name="kkim" />
    </NavFriendZone>
  );
}
