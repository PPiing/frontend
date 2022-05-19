import React from "react";
import { styled } from "@stitches/react";
import { BACKGROUND_BLACK, BACKGROUND_YELLOW, BORDER_BASIC, NAVFRIEND_HEIGHT, NAVRIGHT_WIDTH, NAVTOP_HEIGHT } from "../theme/theme";

const NavSearch = styled("div", {
  border: BORDER_BASIC,
  width: NAVRIGHT_WIDTH,
  height: NAVFRIEND_HEIGHT,
  background: BACKGROUND_BLACK,
});

export function ComponentNavSearch() {
  return (
    <NavSearch />
  );
}
