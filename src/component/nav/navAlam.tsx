import React from "react";
import { styled } from "@stitches/react";
import * as theme from "../../theme/theme";

const NavAlam = styled("div", {
  border: `${theme.BORDER_BASIC}`,
  height: `${theme.NAVALARM__HEIGHT}`,
});

export function ComponentNavAlam() {
  return (
    <NavAlam />
  );
}
