import React from "react";
import { styled } from "@stitches/react";

import { ContainerNavMenu } from "../container/navMenu";
import { ContainerNavCommunity } from "../container/navCommunity";
import { ContainerContents } from "../container/contentHome";

const ContainerLeftBox = styled("div", {
  width: "calc(80vw - 40px)",
  height: "calc(100vh - 40px)",
  padding: "20px",
  overflaw: "hidden",
});

const ContainerRightBox = styled("div", {
  width: "calc(20vw - 40px)",
  minWidth: "300px",
  height: "calc(100vh - 40px)",
  padding: "20px",
  overflaw: "hidden",
});

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
      <ContainerLeftBox>
        <ContainerNavMenu />
        <ContainerContents />
      </ContainerLeftBox>
      <ContainerRightBox>
        <ContainerNavCommunity />
      </ContainerRightBox>
    </ViewWrapper>
  );
}

export default Home;
