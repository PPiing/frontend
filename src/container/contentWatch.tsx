import React, { useState } from "react";
import { styled } from "@stitches/react";
import { useSelector, useDispatch } from "react-redux";
import * as template from "./contentTemplate";
import * as theme from "../theme/theme";
import { ReducerType } from "../redux/rootReducer";
import { LoggedUserData, loggedUser, setLoggedUser, setLoggedUserStatus } from "../redux/slices/loggedUser";

const RoomListSection = styled("div", {
  display: "block",
  flexDirection: "column",
  height: "100%",
  overflowY: "scroll",
  overflowX: "hidden",
  marginTop: "20px",
  marginBottom: "20px",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.NEON_RED,
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "grey",
    borderRadius: "10px",
  },
});

type GameRoom = {
  player1: string;
  player1Img: string;
  player2: string;
  player2Img: string;
};

export function ContainerContents() {
  const [gameId, setGameId] = useState(-1);
  // eslint-disable-next-line no-array-constructor
  const gameList: Array<GameRoom> = new Array<GameRoom>();

  gameList.push({ player1: "kkim", player1Img: "", player2: "skim", player2Img: "" });
  gameList.push({ player1: "jinbekim", player1Img: "", player2: "hybae", player2Img: "" });
  gameList.push({ player1: "hyungyyo", player1Img: "", player2: "spark", player2Img: "" });

  const GameListRender = (gameList: Array<GameRoom>) => {
    const result = [];
    for (let i = 0; i < gameList.length; i += 1) {
      if (i === gameId) {
        result.push(
          <template.ListBox
            onClick={() => setGameId(i)}
            key={i}
            style={{ color: theme.NEON_RED, borderColor: theme.NEON_RED }}
          >
            {gameList[i].player1} vs {gameList[i].player2}
          </template.ListBox>
        );
      } else {
        result.push(
          <template.ListBox onClick={() => setGameId(i)} key={i}>
            {gameList[i].player1} vs {gameList[i].player2}
          </template.ListBox>
        );
      }
    }
    return result;
  };

  // temp
  const loggedUser = useSelector<ReducerType, LoggedUserData>((state) => state.loggedUser);
  const dispatch = useDispatch();

  const GameWatchRender = () => {
    const result = [];
    if (gameId >= 0) {
      result.push(
        <p key={0}>
          {gameList[gameId].player1} vs {gameList[gameId].player2}
        </p>
      );
    } else {
      result.push(
        <p key={0}>
          game watch space. {loggedUser.nick} test {loggedUser.status}
          <button onClick={() => { dispatch(setLoggedUserStatus({status: 0} as LoggedUserData)); }}>
            asdf
          </button>
        </p>
      );
    }
    return result;
  };

  return (
    <template.DividedContents>
      <template.DividedLeftSection>
        <RoomListSection>
          {GameListRender(gameList)}
        </RoomListSection>
      </template.DividedLeftSection>
      <template.DividedRightSection>
        {GameWatchRender()}
      </template.DividedRightSection>
    </template.DividedContents>
  );
}
