import React from "react";
import { styled } from "@stitches/react";
import * as theme from "../../theme/theme";
import { ComponentNavFriendBox } from "./navFriendBox";

const NavFriendZone = styled("div", {
  border: `${theme.BORDER_BASIC}`,
  height: `${theme.NAVFRIEND_HEIGHT}`,
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
