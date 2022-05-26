import React from "react";
import { styled } from "@stitches/react";
import * as theme from "../../theme/theme";

const NavSearch = styled("div", {
  border: `${theme.BORDER_BASIC}`,
  height: `${theme.NAVSEARCH_HEIGHT}`,
});

export function ComponentNavSearch() {
  return (
    <NavSearch />
  );
}
