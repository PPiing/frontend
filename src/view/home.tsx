import React from "react";
import { styled } from "@stitches/react";

import { ContainerNavMenu } from "../container/navMenu";
import { ContainerNavCommunity } from "../container/navCommunity";
import { ContainerContents } from "../container/contents";

const ViewWrapper = styled("div", {
  display: "flex",
  flexDirection: "row",
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
