import { styled, } from "@stitches/react";
import * as theme from "../theme/theme";

export const Contents = styled(theme.NeonHoverRed, {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.NEON_RED,
  height: `calc(${theme.NAV_LEFT_HEIGHT})`,
});

export const DividedContents = styled("div", {
  display: "flex",
  flexDirection: "row",
  color: theme.NEON_RED,
  height: `calc(${theme.NAV_LEFT_HEIGHT})`,
});

export const DividedLeftSection = styled(theme.NeonHoverRed, {
  display: "flex",
  flexDirection: "column",
  color: theme.NEON_RED,
  width: "400px",
  height: `calc(${theme.NAV_LEFT_HEIGHT})`,
  marginRight: "20px",
});

export const DividedRightSection = styled(theme.NeonHoverRed, {
  display: "flex",
  color: theme.NEON_RED,
  width: "calc(100% - 420px)",
  height: `calc(${theme.NAV_LEFT_HEIGHT})`,
});

export const ListBox = styled(theme.NeonHoverRed, {
  color: "grey",
  width: "90%",
  height: "100px",
  marginLeft: "1rem",
  marginRight: "1rem",
  marginBottom: "1rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  filter: "drop-shadow(0 0 0px gray)",
  "&.clicked": {
    color: `${theme.NEON_RED}`,
    borderColor: `${theme.NEON_RED}`,
  },
  "&.non-clicked": {
    color: "grey",
    borderColor: "grey",
  },
  "&:hover": {
    border: `3px solid ${theme.NEON_RED}`,
    color: `${theme.NEON_RED}`,
    filter: `drop-shadow(0 0 0px ${theme.NEON_RED}) brightness(1.6)`,
  },
});
