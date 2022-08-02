import React, { useState } from "react";
import { styled } from "@stitches/react";
import * as theme from "../../theme/theme";
import store from "../../redux/store";
import { DisplayData, setSearchRetRec, setSearchString, setSearchSwitch } from "../../redux/slices/display";

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
  border: "1px solid #424242",
  transition: "all 0.5s",
  "&:focus": {
    border: `2px solid ${theme.NEON_RED}`,
    color: `${theme.NEON_RED}`,
    filter: "brightness(1.6)",
  },
  fontSize: "100%",
  color: "Gray",
});

export function ComponentNavSearch() {
  const [searchSwitchInit, setSearchSwitchInit] = useState(0);

  if (searchSwitchInit === 0) {
    store.dispatch(setSearchSwitch({ searchSwitch: false } as DisplayData));
    setSearchSwitchInit(1);
  }

  const HandleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      if (event.target.value.length > 0) {
        store.dispatch(setSearchSwitch({ searchSwitch: true } as DisplayData));
        store.dispatch(setSearchString({ searchString: event.target.value } as DisplayData));
      }
    } if (event.target.value.length === 0) {
      store.dispatch(setSearchSwitch({ searchSwitch: false } as DisplayData));
      store.dispatch(setSearchString({ searchString: "" } as DisplayData));
      store.dispatch(setSearchRetRec({ searchRetRec: false } as DisplayData));
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
