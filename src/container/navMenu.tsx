import React from "react";
import { styled } from "@stitches/react";
import { BACKGROUND_BLACK, BACKGROUND_BRICK, BORDER_BASIC, NAVTOP_HEIGHT } from "../theme/theme";
import { ComponentButtonMenu } from "../component/buttonMenu";
import { NeonButton } from "../component/neon/NeonButton";

const NavMenu = styled("div", {
    border: BORDER_BASIC,
    width: "80vw",
    minHeight: "80px",
    height: NAVTOP_HEIGHT,
    backgroundImage: BACKGROUND_BRICK,
    display: "flex",
    justifyContent: "center",
});

export function ContainerNavMenu() {
    return (
        <NavMenu className="navMenu">
            <NeonButton text="H O M E">
            </NeonButton>
        </NavMenu>
    );
}
