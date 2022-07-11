import React, { useState } from "react";
import { useSelector } from "react-redux";
import { styled } from "@stitches/react";
import { Slider, Button } from "@mui/material";
import * as template from "./contentTemplate";
import * as theme from "../theme/theme";
import ToggleBtn from "../component/button/ToggleBtn";
import { ReducerType } from "../redux/rootReducer";
import { GameRuleData, setGameRuleData } from "../redux/slices/gameRule";
import store from "../redux/store";

const RuleSelectionContainer = styled(template.DividedLeftSection, {
  alignItems: "center",
});

const SlidersContainer = styled("div", {
  display: "flex",
  height: "70%",
  width: "90%",
});

const TextContainer = styled("div", {
  display: "flex",
  height: "10%",
  width: "90%",
});

const SliderWrapper = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "33%",
});

const InputScore = styled("select", {
  background: "rgba(255,255,255,0.1)",
});

const TextWrapper = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "90%",
  width: "33%",
});

const RuleText = styled("p", {
  color: theme.NEON_BLU,
  fontWeight: "bold",
  textAlign: "center",
});

export default function GameRuleSet() {
  const myRule = useSelector<ReducerType, GameRuleData>((state) => state.gameRule);

  const memoRule : GameRuleData = {
    score: myRule.score,
    speed: myRule.speed,
    size: myRule.size,
    isRankGame: myRule.isRankGame,
  };

  console.log("=>>", myRule);

  const handleValue = (e:any) => {
    if (e.target.name === "score") {
      memoRule.score = e.target.value;
    } else if (e.target.name === "speed") {
      memoRule.speed = e.target.value;
    } else if (e.target.name === "size") {
      memoRule.size = e.target.value;
    };
  };
  const handleReady = () => {
    // eslint-disable-next-line max-len
    store.dispatch(setGameRuleData({ ...memoRule, isRankGame: memoRule.isRankGame } as GameRuleData))
    console.log("=>>>", myRule);
  };

  return (
    <template.DividedContents>
      <RuleSelectionContainer>
        <ToggleBtn selection1="Rank" selection2="Normal" />
        <SlidersContainer>
          <SliderWrapper>
            <Slider key={myRule.score} name="score" onChange={handleValue} orientation="vertical" aria-label="ball" valueLabelDisplay="on" defaultValue={myRule.score} max={10} min={1} color="primary" marks />
          </SliderWrapper>
          <SliderWrapper>
            <Slider key={myRule.speed} name="speed" onChange={handleValue} orientation="vertical" aria-label="Speed" valueLabelDisplay="on" defaultValue={myRule.speed} max={3} min={1} color="secondary" marks />
          </SliderWrapper>
          <SliderWrapper>
            <Slider key={myRule.size} name="size" onChange={handleValue} orientation="vertical" aria-label="RacketSize" valueLabelDisplay="on" defaultValue={myRule.size} max={2} min={-2} color="primary" marks />
          </SliderWrapper>
        </SlidersContainer>
        <TextContainer>
          <TextWrapper>
            <RuleText>
              Max <br />
              Score
            </RuleText>
          </TextWrapper>
          <TextWrapper>
            <RuleText>
              Ball <br />
              Speed
            </RuleText>
          </TextWrapper>
          <TextWrapper>
            <RuleText>
              Racket <br />
              Size
            </RuleText>
          </TextWrapper>
        </TextContainer>
        <Button onClick={handleReady} variant="contained" size="large" color="error">Ready</Button>
      </RuleSelectionContainer>
      <template.DividedRightSection>
        right
      </template.DividedRightSection>
    </template.DividedContents>
  );
}
