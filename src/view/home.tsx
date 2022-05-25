import React from "react";
import { styled } from "@stitches/react";

import { ContainerNavMenu } from "../container/navMenu";
import { ContainerNavCommunity } from "../container/navCommunity";
import { ContainerContents } from "../container/contentHome";

const ViewWrapper = styled("div", {
  display: "flex",
  flexDirection: "row",
  width: "100vw",
  height: "100vh",
  overflaw: "hidden",
});

export function Home() {
  return (
    <ViewWrapper className="view">
      <div>
        <ContainerNavMenu />
        <ContainerContents />
      </div>
      <ContainerNavCommunity />
    </ViewWrapper>
  );
}

export default Home;
