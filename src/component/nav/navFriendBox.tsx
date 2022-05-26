import React from "react";
import { styled } from "@stitches/react";
import * as theme from "../../theme/theme";

const NavFriendBox = styled("div", {
  background: `${theme.BACKGROUND_YELLOW}`,
  height: `${theme.NAV_FRIEND_BOX_HEIGHT}`,
  marginTop: "0.5rem",
  marginBottom: "0.5rem",
  minHeight: "90px",
});

export function ComponentNavFriendBox(props:any) {
  const { name } = props;

  return (
    <NavFriendBox>
      {name}
    </NavFriendBox>
  );
}
