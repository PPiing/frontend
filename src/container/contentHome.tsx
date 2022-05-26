import React from "react";
import { styled } from "@stitches/react";
import * as theme from "../theme/theme";

const Contents = styled("div", {
  border: `${theme.BORDER_BASIC}`,
  height: `${theme.NAVBOTTOM_HEIGHT}`,
});

export function ContainerContents() {
  return (
    <Contents className="contents" />
  );
}
