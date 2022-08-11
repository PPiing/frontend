import React from "react";
import { styled } from "@stitches/react";
import * as theme from "../../theme/theme";
import { postConfirm } from "../../network/api/axios.custom";

const NavInviteBox = styled("div", {
  color: "grey",
  fontSize: "2rem",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  background: `${theme.BACKGROUND_YELLOW}`,
  height: "28px",
  minHeight: "70px",
  border: "0",
  margin: "2px 4px",
  padding: "0px 10px",
  cursor: "pointer",
  filter: "none",
  "&:hover": {
    border: "0",
  },
});

const AlamContent = styled("div", {
  display: "flex",
  flexDirection: "column",
  marginLeft: "0px",
});

const FromName = styled("div", {
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
  display: "flex",
  flexDirection: "column",
  marginLeft: "auto",
});

const AlamAcceptButton = styled("button", {
  backgroundColor: "transparent",
  marginTop: "3px",
  border: "2.5px solid #299022",
  borderRadius: "5px",
  width: "70px",
  color: "#299022",
  "&:active": {
    border: "2.5px solid #05FF00",
    color: "#05FF00",
    filter: "drop-shadow(0 0 2px #05FF00)",
  },
});

const AlamDenyButton = styled("button", {
  backgroundColor: "transparent",
  marginTop: "3px",
  border: "2.5px solid #902e55",
  borderRadius: "5px",
  width: "70px",
  color: "#902e55",
  "&:active": {
    border: "2.5px solid #FF0086",
    color: "#FF0086",
    filter: "drop-shadow(0 0 2px #FF0086)",
  },
});

export function ComponentNavInviteBox(props: any) {
  const { alam } = props;

  const alamTypeMsg = () => {
    if (alam.type === 0) {
      return "request to add a friend";
    } if (alam.type === 1) {
      return "request a game match";
    }
    return "alarm msg error";
  };

  return (
    <NavInviteBox>
      <AlamContent>
        <FromName> {alam.from_nick} </FromName>
        <AlamMessage> {alamTypeMsg()} </AlamMessage>
      </AlamContent>
      <AlamButtonArea>
        <AlamAcceptButton onClick={() => postConfirm(alam.from_seq, alam.seq, true, alam.type)}>
          Accept
        </AlamAcceptButton>
        <AlamDenyButton onClick={() => postConfirm(alam.from_seq, alam.seq, false, alam.type)}>
          Deny
        </AlamDenyButton>
      </AlamButtonArea>
    </NavInviteBox>
  );
}
