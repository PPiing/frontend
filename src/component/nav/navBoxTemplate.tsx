import { styled, } from "@stitches/react";
import * as theme from "../../theme/theme";

export const ProfileImage = styled("img", {
  width: "70px",
  height: "70px",
  padding: "0",
  margin: "0",
  border: "none",
  borderRadius: "50%",
});

export const NavBox = styled(theme.NeonHoverRed, {
  color: "white",
  fontSize: "2rem",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  background: `${theme.BACKGROUND_YELLOW}`,
  height: "28px",
  minHeight: "90px",
  border: "0",
  boxShadow: "none",
  margin: "2px 4px",
  padding: "0px 10px",
  cursor: "pointer",
  filter: "none",
  "&:hover": {
    filter: "brightness(1)",
    border: "0",
    boxShadow: "none",
    backgroundColor: "#151515"
  }
});

export const ProfileName = styled("div", {
  fontSize: "1.8rem",
  fontWeight: "600",
  margin: "0",
  overflowX: "scroll",
  overflowY: "hidden",
  whiteSpace: "nowrap",
  "&::-webkit-scrollbar": {
    display: "none",
  },
});

export const StatusMessage = styled("div", {
  margin: "0",
  padding: "0",
  width: "80px",
  fontColor: "white",
  fontSize: "20px",
  fontWeight: "300",
  textShadow: "0",
});

export const Profile = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  verticalAlign: "middle",
  textShadow: "0px 0px 1px #ffffff",
  margin: "0",
  marginLeft: "15px",
});
