import React from "react";
import { styled } from "@stitches/react";

const NavMenu = styled("div", {
  border: "1px solid red",
  width: "80vw",
  minHeight: "80px",
  height: "10vh",
});

export function ContainerNavMenu() {
  return (
    <NavMenu className="navMenu" />
  );
}
