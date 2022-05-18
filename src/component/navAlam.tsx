import React from "react";
import { styled } from "@stitches/react";
import { BACKGROUND_BLACK, BACKGROUND_BRICK, BACKGROUND_YELLOW, BORDER_BASIC, NAVRIGHT_WIDTH, NAVTOP_HEIGHT } from "../theme/theme";

const NavAlam = styled("div", {
    border: BORDER_BASIC,
    width: NAVRIGHT_WIDTH,
    height: NAVTOP_HEIGHT,
    // background: BACKGROUND_BLACK,
    // backgroundImage: BACKGROUND_BRICK,
});

export function ComponentNavAlam() {
    return (
        <NavAlam />
    );
}
