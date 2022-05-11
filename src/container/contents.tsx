import React from "react";
import { styled } from "@stitches/react";

const Contents = styled("div", {
  border: "1px solid black",
  width: "80vw",
  height: "90vh"
});

export function ContainerContents() {
  return (
    <Contents className="contents" />
  );
}
