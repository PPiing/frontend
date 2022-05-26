import React from "react";
import { styled } from "@stitches/react";
import * as theme from "../../theme/theme";

const NavFriendBox = styled("div", {
  border: `${theme.BORDER_BASIC}`,
  background: `${theme.BACKGROUND_YELLOW}`,
  height: `${theme.NAVFRIENDBOX_HEIGHT}`,
  marginTop: "0.5rem",
  marginBottom: "0.5rem"
});

export function ComponentNavFriendBox(props:any) {
  const { name } = props;

  return (
    <NavFriendBox>
      {name}
    </NavFriendBox>
  );
}
