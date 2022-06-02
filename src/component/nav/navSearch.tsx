import React from "react";
import { styled } from "@stitches/react";
import * as theme from "../../theme/theme";
import { BORDER_BASIC } from "../../theme/theme";

const NavSearch = styled("div", {
  height: `${theme.NAV_SEARCH_HEIGHT}`,
  border: BORDER_BASIC
});

//  axios.get.(검색할 스트링).wholeUserList {
//  users: user[]
// }

// -> user {
//    id: unique key
//    profileImg: ""
//    nickname: ""
// }

export function ComponentNavSearch() {
  return (
    <NavSearch>
      this is Search Zone
    </NavSearch>
  );
}
