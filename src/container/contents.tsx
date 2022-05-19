import React from "react";
import { styled } from "@stitches/react";
import { BORDER_BASIC } from "../theme/theme";

const Contents = styled("div", {
  border: BORDER_BASIC,
  width: "80vw",
  height: "90vh",
});

export function ContainerContents() {
  return (
    <Contents className="contents" />
  );
}
