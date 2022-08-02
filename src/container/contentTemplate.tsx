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
  justifyContent: "center",
  alignItems: "center",
  color: theme.NEON_RED,
  width: "calc(100% - 420px)",
  height: `calc(${theme.NAV_LEFT_HEIGHT})`,
});

export const ListBox = styled("div", {
  color: "grey",
  width: "90%",
  height: "100px",
  marginLeft: "1rem",
  marginRight: "1rem",
  marginBottom: "1rem",
  transition: "all 0.5s",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  filter: "drop-shadow(0 0 0px gray)",
  borderRadius: "10px",
  "&.clicked": {
    color: `${theme.NEON_RED}`,
    borderColor: `${theme.NEON_RED}`,
    backgroundColor: "#2E2E2E",
  },
  "&.non-clicked": {
    color: "grey",
    borderColor: "grey",
  },
  "&:hover": {
    // border: `3px solid ${theme.NEON_RED}`,
    color: `${theme.NEON_RED}`,
    backgroundColor: "#1C1C1C",
    filter: "drop-shadow(0 0 0px #000) brightness(1.6)",
  },
});
