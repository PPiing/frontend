import React from "react";
import { styled } from "@stitches/react";
import * as theme from "../theme/theme";

import { ContainerNavMenu } from "../container/navMenu";
import { ContainerNavCommunity } from "../container/navCommunity";

export function ViewTemplate({ content } : any) {
  return (
    <theme.ViewWrapper className="view">
      <theme.ContainerLeftBox>
        {content}
      </theme.ContainerLeftBox>
      <theme.ContainerRightBox>
        <ContainerNavMenu />
        <theme.Hr />
        <ContainerNavCommunity />
      </theme.ContainerRightBox>
    </theme.ViewWrapper>
  );
}

export default ViewTemplate;
