import React from "react";
import { styled } from "@stitches/react";
import * as theme from "../../theme/theme";

const NavSearch = styled("div", {
  height: `${theme.NAV_SEARCH_HEIGHT}`,
});

export function ComponentNavSearch() {
  return (
    <NavSearch />
  );
}
