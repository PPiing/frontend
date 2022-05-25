import React from "react";
import { styled } from "@stitches/react";
import { BORDER_BASIC, NAVFRIEND_HEIGHT, NAVRIGHT_WIDTH, NAVTOP_HEIGHT } from "../../theme/theme";
import { ComponentNavFriendBox } from "./navFriendBox";

const NavFriendZone = styled("div", {
  border: BORDER_BASIC,
  width: NAVRIGHT_WIDTH,
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
