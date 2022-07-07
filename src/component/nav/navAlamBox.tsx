import React from "react";
import { styled } from "@stitches/react";
import * as theme from "../../theme/theme";
import { putAlarmRead } from "../../network/api/axios.custom";

const NavAlamBox = styled(theme.NeonHoverRed, {
  color: "grey",
  fontSize: "2rem",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  background: `${theme.BACKGROUND_YELLOW}`,
  height: "20px",
  minHeight: "90px",
  border: "0",
  margin: "2px 4px",
  padding: "0px 10px",
  cursor: "pointer",
  filter: "none",
  "&:hover": {
    filter: "brightness(1.6)",
    border: "0",
  },
});

const AlamContent = styled("div", {
  display: "flex",
  flexDirection: "column",
  marginLeft: "0px",
});

const FromName = styled("div", {
  fontSize: "25px",
});

const AlamMessage = styled("div", {
  margin: "0",
  padding: "0",
  fontColor: "white",
  fontSize: "15px",
});

const AlamButtonArea = styled("div", {
  alignContent: "center",
  alignItems: "center",
  width: "12px",
  height: "12px",
  display: "flex",
  flexDirection: "column",
  marginLeft: "auto",
});

const AlamButton = styled("button", {
  width: "100%",
  height: "100%",
  borderRadius: "50%",
  background: "red",
  border: "0px solid red",
  "&:hover": {
    background: "rgba(50, 0, 0)",
  },
  "&:active": {
    background: "rgba(30, 0, 0)",
  },
});

export function ComponentNavAlamBox(props: any) {
  const { alarm } = props;

  const alamTypeMsg = () => {
    return "alarm msg sample.";
  };

  return (
    <NavAlamBox>
      <AlamContent>
        <FromName> {alarm.from_nick} </FromName>
        <AlamMessage> {alamTypeMsg()} </AlamMessage>
      </AlamContent>
      <AlamButtonArea>
        <AlamButton onClick={() => putAlarmRead(alarm.seq)} />
      </AlamButtonArea>
    </NavAlamBox>
  );
}
