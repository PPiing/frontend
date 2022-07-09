import React from "react";
import { styled } from "@stitches/react";
import { ViewTemplate } from "./viewTemplate";
import * as theme from "../theme/theme";

import InGame from "../container/contentGame";
import GameRuleSet from "../container/contentGameRule";

export function Game() {
  const isIngame : boolean = true;

  return (
    <div>
      {
      isIngame ?
        (<ViewTemplate content={<GameRuleSet />} />) :
        (<ViewTemplate content={<InGame />} />)
    }
    </div>
  );
}

export default Game;
