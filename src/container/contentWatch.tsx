import React, { useEffect, useState } from "react";
import { styled } from "@stitches/react";
import * as template from "./contentTemplate";
import * as theme from "../theme/theme";
import { getGameList } from "../network/api/axios.custom";

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
  player2: string;
  roomId: string;
};

export function ContainerContents() {
  const [gameId, setGameId] = useState(-1);
  const [gameLists, setGameLists] = useState<any[]>([]);

  useEffect(() => {
    // getGameList().then((response: any) => setGameLists(response.data));
    getGameList().then((response: any) => console.log(response.data));
  }, []);

  const GameListsRender = () => {
    return gameLists.map((item, i) => {
      return (
        <template.ListBox
          onClick={() => setGameId(item.roomId)}
          key={i}
          style={{ color: theme.NEON_RED, borderColor: theme.NEON_RED }}
        >
          {item.player1} vs {item.player2}
        </template.ListBox>
      )
    })
  }

  const GameWatchRender = () => {
    const result = [];
    if (gameId >= 0) {
      result.push(
        <p key={0}>
          {gameLists[gameId].player1} vs {gameLists[gameId].player2}
        </p>
      );
    } else {
      result.push(
        <p key={0}>
          game watch space.
        </p>
      );
    }
    return result;
  };

  return (
    <template.DividedContents>
      <template.DividedLeftSection>
        <RoomListSection>
          {GameListsRender()}
        </RoomListSection>
      </template.DividedLeftSection>
      <template.DividedRightSection>
        {GameWatchRender()}
      </template.DividedRightSection>
    </template.DividedContents>
  );
}
