import React, { useState } from "react";
import { ViewTemplate } from "./viewTemplate";
import socketManager from "../feat/game/socket";

import InGame from "../container/contentGame";
import GameRuleSet from "../container/contentGameRule";

const socket = socketManager.socket("/");

socket.on("connect", () => {
  console.log("gameRoomSocket", socket.connected);
});

export function Game() {
  const [isInGame, setIsInGame] = useState(true);

  // socket.on("test:ready", () => {
  //   console.log("test Game Ready!");
  //   setIsInGame(false);
  // });

  return (
    <div>
      {
      isInGame ?
        (<ViewTemplate content={<GameRuleSet />} />) :
        (<ViewTemplate content={<InGame />} />)
        }
      {/* <ViewTemplate content={<InGame />} /> */}
    </div>
  );
}

export default Game;
