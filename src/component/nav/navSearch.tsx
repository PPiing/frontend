import React from "react";
import { styled } from "@stitches/react";
import * as theme from "../../theme/theme";

const NavSearch = styled("div", {
  border: theme.BORDER_BASIC,
  width: theme.NAVRIGHT_WIDTH,
  height: theme.NAVFRIEND_HEIGHT,
  background: theme.BACKGROUND_BLACK,
});

export function ComponentNavSearch() {
  return (
    <NavSearch />
  );
}
