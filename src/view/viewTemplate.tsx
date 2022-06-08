import React from "react";
import { styled } from "@stitches/react";
import * as theme from "../theme/theme";

import { ContainerNavMenu } from "../container/navMenu";
import { ContainerNavCommunity } from "../container/navCommunity";

export const ContainerLeftBox = styled("div", {
  width: "calc(80vw - 40px)",
  height: "calc(100vh - 40px)",
  padding: "20px",
  overflaw: "hidden",
  backgroundSize: "cover",
});

export const ContainerRightBox = styled("div", {
  width: "calc(20vw - 40px)",
  minWidth: "300px",
  height: "calc(100vh - 40px)",
  padding: "20px",
  overflaw: "hidden",
  //   borderLeft: "3px solid white",
  boxShadow: "0 0 0.8rem #fff, 0 0 1.1rem #ffffff50,",
});

export const ViewWrapper = styled("div", {
  display: "flex",
  flexDirection: "row",
  width: "100%",
  height: "100%",
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
