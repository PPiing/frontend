import React from "react";
import { styled } from "@stitches/react";
import { BORDER_BASIC, NAVTOP_HEIGHT } from "../theme/theme";
import { NeonButton } from "../component/neon/NeonButton";

const NavMenu = styled("div", {
  border: BORDER_BASIC,
  width: "80vw",
  minHeight: "80px",
  height: NAVTOP_HEIGHT,
});

export function ContainerNavMenu() {
  return (
    <NavMenu className="navMenu">
      <NeonButton
        className="menuButtonHome"
        text="HOME"
        onclick={console.log("custom event here!")}
      />
    </NavMenu>
  );
}
