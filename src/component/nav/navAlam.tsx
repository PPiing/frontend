import React from "react";
import { styled } from "@stitches/react";
import { BORDER_BASIC, NAVRIGHT_WIDTH, NAVTOP_HEIGHT } from "../../theme/theme";

const NavAlam = styled("div", {
  border: BORDER_BASIC,
  width: NAVRIGHT_WIDTH,
  height: NAVTOP_HEIGHT,
});

export function ComponentNavAlam() {
  return (
    <NavAlam />
  );
}
