import React from "react";
import { styled } from "@stitches/react";
import * as theme from "../theme/theme";

const Contents = styled(theme.NeonHoverRed, {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.NEON_RED,
  height: `calc(${theme.NAV_BOTTOM_HEIGHT} - 5px)`,
  borderRadius: "50px",
});

export function ContainerContents() {
  return (
    <Contents className="contents">
      Home
    </Contents>
  );
}
