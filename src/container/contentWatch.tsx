import React, { useState } from "react";
import { styled } from "@stitches/react";
import * as theme from "../theme/theme";

const Contents = styled(theme.Contents, {
  justifyContent: "left",
  alignItems: "initial",
  borderRadius: "0px",
  flexDirection: "row",
});

const GameListSection = styled(theme.Contents, {
  marginLeft: "20px",
  marginTop: "20px",
  marginBottom: "20px",
  width: "330px",
  height: "auto",
  borderRadius: "30px",
});

const GameWatchSection = styled(theme.Contents, {

  margin: "20px",
  width: "calc(100% - 400px)",
  height: "auto",
  borderRadius: "30px",
});

const ListChatArea = styled("div", {
  width: "100%",
  height: "95%",
  overflowY: "scroll",
  overflowX: "hidden",
  marginRight: "1rem",
  "&::-webkit-scrollbar": {
    width: "5px",
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

const ListChatBox = styled(theme.NeonHoverRed, {
  color: "grey",
  width: "90%",
  height: "100px",
  marginLeft: "1rem",
  marginRight: "1rem",
  marginBottom: "1rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
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
      result.push(
        <ListChatBox onClick={() => setGameId(i)}>
          {gameList[i].player1} vs {gameList[i].player2}
        </ListChatBox>
      );
    }
    return result;
  };

  const GameWatchRender = () => {
    const result = [];
    if (gameId >= 0) {
      result.push(
        <>
          {gameList[gameId].player1} vs {gameList[gameId].player2}
        </>
      );
    } else {
      result.push(
        <>
          game watch space
        </>
      );
    }
    return result;
  };

  return (
    <Contents className="contents">
      <GameListSection className="game_list">
        <ListChatArea>
          {GameListRender(gameList)}
        </ListChatArea>
      </GameListSection>
      <GameWatchSection>
        {GameWatchRender()}
      </GameWatchSection>
    </Contents>
  );
}
