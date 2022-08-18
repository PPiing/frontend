import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ViewTemplate } from "./viewTemplate";
import socketManager from "../network/api/socket";
import { ReducerType } from "../redux/rootReducer";
import { gameRule, GameRuleData, setGameRuleData } from "../redux/slices/gameRule";
import store from "../redux/store";
import InGame from "../container/contentGame";
import GameRuleSet from "../container/contentGameRule";

const socket = socketManager.socket("/");

socket.on("connect", () => {
  console.log("gameRoomSocket", socket.connected);
});

export function Game() {
  const myRule = useSelector<ReducerType, GameRuleData>((state) => state.gameRule);
  const [isInGame, setIsInGame] = useState(false);

  useEffect(() => {
    socket.on("game:ready", (res) => {
      console.log("Game ready!=> ", res.blueUser, res.blueUser);
      socket.emit("game:ready", {roomId: res.roomId});
    });
    socket.on("game:start", () => {
      console.log("Game Start!");
      setIsInGame(true);
      store.dispatch(setGameRuleData({ ...myRule, isInGame: true } as GameRuleData));
    });
    socket.on("game:render", () => {
      console.log("server's render =>");
      setIsInGame(true);
      store.dispatch(setGameRuleData({ ...myRule, isInGame: true } as GameRuleData));
    });
    socket.on("game:end", () => {
      console.log("server's game end =>");
      setIsInGame(false);
      store.dispatch(setGameRuleData({ ...myRule, isInGame: false } as GameRuleData));
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
      (<ViewTemplate content={<InGame />} />) :
      (<ViewTemplate content={<GameRuleSet />} />)
        }
      {/* <ViewTemplate content={<InGame />} /> */}
    </div>
  );
}

export default Game;
