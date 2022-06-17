import React from "react";
import { styled } from "@stitches/react";
import * as theme from "../theme/theme";

import { ContainerNavMenu } from "../container/navMenu";
import { ContainerNavCommunity } from "../container/navCommunity";

export const ContainerLeftBox = styled("div", {
  width: "calc(80% - 40px)",
  height: "calc(100% - 40px)",
  padding: "20px",
  backgroundSize: "cover",
  // test
  border: "1px solid red",
});

export const ContainerRightBox = styled("div", {
  width: "calc(20% - 40px)",
  // height: "cale(100% - 40px)",
  padding: "20px",
  boxShadow: "0 0 0.8rem #fff, 0 0 1.1rem #ffffff50,",
  // test
  border: "1px solid red",
  height: "70vh",
});

export const ViewWrapper = styled("div", {
  display: "flex",
  flexDirection: "row",
  width: "100vw",
  height: "100vh",
  overflow: "hidden",
});

export function ViewTemplate({ content } : any) {
  return (
    <ViewWrapper className="view">
      <ContainerLeftBox>
        {content}
      </ContainerLeftBox>
      <ContainerRightBox>
        <ContainerNavMenu />
        <theme.Hr />
        <ContainerNavCommunity />
      </ContainerRightBox>
    </ViewWrapper>
  );
}

export default ViewTemplate;
