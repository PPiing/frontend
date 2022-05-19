import React from "react";
import { styled } from "@stitches/react";
import { BACKGROUND_BLACK, BACKGROUND_YELLOW, BORDER_BASIC, NAVFRIEND_HEIGHT, NAVRIGHT_WIDTH, NAVTOP_HEIGHT } from "../theme/theme";
import { ComponentNavFriendBox } from "./navFriendBox";

const NavFriendZone = styled("div", {
  border: BORDER_BASIC,
  background: BACKGROUND_BLACK,
  width: NAVRIGHT_WIDTH,
  height: "83vh",
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
