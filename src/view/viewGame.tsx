import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    socket.on("game:ready", (res) => {
      console.log("Game ready!=> ", res.blueUser, res.blueUser);
    });
    socket.on("game:start", () => {
      console.log("Game Start!");
      setIsInGame(false);
    });
    socket.on("game:render", () => {
      console.log("server's render =>");
      setIsInGame(false);
    });
    return () => {
      socket.off("game:ready");
      socket.off("game:start");
      socket.off("game:render");
    };
  });

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
