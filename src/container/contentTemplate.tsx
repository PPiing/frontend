import { styled, } from "@stitches/react";
import * as theme from "../theme/theme";

export const Contents = styled(theme.NeonHoverRed, {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.NEON_RED,
  height: `calc(${theme.NAV_LEFT_HEIGHT})`,
  borderRadius: "50px",
});
