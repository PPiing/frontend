import React from "react";
import { styled } from "@stitches/react";
import * as theme from "../../theme/theme";

const ContentRoom = styled(theme.NeonHoverRed, {
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "5rem",
  borderRadius: "5%",
  width: "95%",
  height: "95%",
});

export function ComponentChatRoom(props: any) {
  const { propFunc } = props;
  const { chatRoomData } = props;

  return (
    <ContentRoom>
      a
    </ContentRoom>
  );
}
