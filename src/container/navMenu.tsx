import React from "react";
import { styled } from "@stitches/react";
import { BACKGROUND_BLACK, BORDER_BASIC, NAVTOP_HEIGHT } from "../theme/theme";

const NavMenu = styled("div", {
  border: BORDER_BASIC,
  background: BACKGROUND_BLACK,
  width: "80vw",
  minHeight: "80px",
  height: NAVTOP_HEIGHT,
});

export function ContainerNavMenu() {
  return (
    <NavMenu className="navMenu" />
  );
}
