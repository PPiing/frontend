import React from "react";
import { styled } from "@stitches/react";
import * as theme from "../../theme/theme";
import { ComponentNavInviteBox } from "./navInviteBox";

const NavInviteZone = styled("div", {
  height: `${theme.NAV_INVITE_HEIGHT}`,
});

// socket.intive event로 입력

// useState = socket event를 배열화

// -> 배열화된 event를 navInviteBox 에 전달하고 렌더링

export function ComponentNavInviteZone() {
  return (
    <NavInviteZone>
      <ComponentNavInviteBox name="Hello" />
      <ComponentNavInviteBox name="spark" />
      <ComponentNavInviteBox name="Hybae" />
    </NavInviteZone>
  );
}
