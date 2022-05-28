import React from "react";
import { styled } from "@stitches/react";
import * as theme from "../../theme/theme";
import { BORDER_BASIC } from "../../theme/theme";

const NavSearch = styled("div", {
  height: `${theme.NAV_SEARCH_HEIGHT}`,
  border: BORDER_BASIC
});

export function ComponentNavSearch() {
  return (
    <NavSearch>
      헬로우?
    </NavSearch>
  );
}
