import React from "react";
import { styled } from "@stitches/react";
import * as theme from "../../theme/theme";

const NavSearch = styled("div", {
  minHeight: "30px",
  maxHeight: "50px",
  height: `${theme.NAV_SEARCH_HEIGHT}`,
  transition: "all 0.5s",
  alignItems: "center",
});

const NavSearchBox = styled("input", {
  height: "80%",
  width: "95%",
  marginLeft: "auto",
  marginRight: "auto",
  display: "table",
  backgroundColor: "transparent",
  outline: "none",
  border: "2px solid gray",
  transition: "all 0.5s",
  borderRadius: "5px",
  "&:focus": {
    border: `2px solid ${theme.NEON_RED}`,
    color: `${theme.NEON_RED}`,
    filter: "brightness(1.6)",
  },
  fontSize: "100%",
  color: "Gray",
});

export function ComponentNavSearch() {
  const HandleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      if (event.target.value.length > 0) {
        // console.log("!", event.target.value);
        // axios feat
      }
    }
  };

  return (
    <NavSearch>
      <NavSearchBox
        type="text"
        id="header-search"
        placeholder="Search users"
        name="s"
        onKeyDown={HandleKeyDown}
      />
    </NavSearch>
  );
}
