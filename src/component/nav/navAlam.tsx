import React from "react";
import { styled } from "@stitches/react";
import * as theme from "../../theme/theme";

const NavAlam = styled("div", {
  height: `${theme.NAV_ALARM_HEIGHT}`,
});

export function ComponentNavAlam() {
  return (
    <NavAlam />
  );
}
