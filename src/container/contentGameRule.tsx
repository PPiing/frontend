import React, { useState } from "react";
import { styled } from "@stitches/react";
import * as template from "./contentTemplate";
import * as theme from "../theme/theme";
import ToggleBtn from "../component/button/ToggleBtn";

const RuleSelectionContainer = styled(template.DividedLeftSection, {
  alignItems: "center",
});

const MaxScoreSelector = styled("div", {
  background: "rgba(255,255,255,0.1)",
  width: "90%",
  height: "20%",
  marginTop: "5%",
  border: theme.BORDER_BASIC,
});

const BallSpeedSelector = styled("div", {
  background: "rgba(255,255,255,0.1)",
  width: "90%",
  height: "25%",
  marginTop: "5%",
  border: theme.BORDER_BASIC,
});

const RacketSizeSelector = styled("div", {
  background: "rgba(255,255,255,0.1)",
  width: "90%",
  height: "25%",
  marginTop: "5%",
  border: theme.BORDER_BASIC,
});

const InputScore = styled("select", {
  background: "rgba(255,255,255,0.1)",
});

const RuleText = styled("p", {
  color: theme.NEON_BLU
});

export default function GameRuleSet() {
  return (
    <template.DividedContents>
      <RuleSelectionContainer>
        <ToggleBtn selection1="Rank" selection2="Normal" />
        <MaxScoreSelector>
          <RuleText>
            점수 몇점?
          </RuleText>
          <InputScore>
            <option value=""> ㅗㅗ </option>
            <option value=""> ㅗㅗ </option>
            <option value=""> ㅗㅗ </option>
            <option value=""> ㅗㅗ </option>
          </InputScore>
        </MaxScoreSelector>
        <BallSpeedSelector> ballSpeed </BallSpeedSelector>
        <RacketSizeSelector> RacketSize </RacketSizeSelector>
      </RuleSelectionContainer>
      <template.DividedRightSection>
        right
      </template.DividedRightSection>
    </template.DividedContents>
  );
}
