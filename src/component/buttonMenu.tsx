import React from "react";
import { styled } from "@stitches/react";
import { BACKGROUND_BLACK, BACKGROUND_BRICK, BACKGROUND_YELLOW, BORDER_BASIC, NAVRIGHT_WIDTH, NAVTOP_HEIGHT } from "../theme/theme";
import { NeonButton } from "./neon/NeonButton";

const ButtonMenu = styled("div", {
    border: BORDER_BASIC,
    width: NAVRIGHT_WIDTH,
    height: NAVTOP_HEIGHT,
    fontSize: "18px",
});

export function ComponentButtonMenu(props: any) {
    const { text } = props;
    return (
        <ButtonMenu>
            <NeonButton text={text}>
            </NeonButton>
        </ButtonMenu>
    );
}
