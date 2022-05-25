import React from "react";
import { styled } from "@stitches/react";
import * as theme from "../../theme/theme";

const NavAlam = styled("div", {
  border: theme.BORDER_BASIC,
  width: theme.NAVRIGHT_WIDTH,
  height: theme.NAVTOP_HEIGHT,
});

export function ComponentNavAlam() {
  return (
    <NavAlam />
  );
}
