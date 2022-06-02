import React from "react";
import { styled } from "@stitches/react";
import * as theme from "../theme/theme";

import { ContainerNavMenu } from "../container/navMenu";
import { ContainerNavCommunity } from "../container/navCommunity";

import { ContainerContents } from "../container/contentGame";

export function Game() {
  return (
    <theme.ViewWrapper className="view">
      <theme.ContainerLeftBox>
        <ContainerContents />
      </theme.ContainerLeftBox>
      <theme.ContainerRightBox>
        <ContainerNavMenu />
        <theme.Hr />
        <ContainerNavCommunity />
      </theme.ContainerRightBox>
    </theme.ViewWrapper>
  );
}

export default Game;
