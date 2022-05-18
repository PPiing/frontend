import React from "react";
import { styled } from "@stitches/react";
import { BACKGROUND_BLACK, BACKGROUND_YELLOW, BORDER_BASIC, NAVFRIEND_HEIGHT, NAVRIGHT_WIDTH, NAVTOP_HEIGHT } from "../theme/theme";

const NavFriendBox = styled("div", {
  border: BORDER_BASIC,
  background: BACKGROUND_YELLOW,
  width: NAVRIGHT_WIDTH,
  height: NAVFRIEND_HEIGHT,
  marginTop: "0.5rem",
  marginBottom: "0.5rem"
});

export function ComponentNavFriendBox(props:any) {
  const { name } = props;

  return (
    <NavFriendBox>
      {name}
    </NavFriendBox>
  );
}
