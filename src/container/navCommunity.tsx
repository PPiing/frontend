import React from "react";
import { styled } from "@stitches/react";

const NavCommunity = styled("div", {
  border: "1px solid red",
  minWidth: "200px",
  width: "20vw",
  height: "100vh",
});

export function ContainerNavCommunity() {
  return (
    <NavCommunity className="navCommunity" />
  );
}
