import React from "react";
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
});

export function ContainerContents() {
  return (
    <Contents className="contents">
      <GameListSection className="game_list">
        <ListChatArea>
          <ListChatBox>1</ListChatBox>
          <ListChatBox>1</ListChatBox>
          <ListChatBox>1</ListChatBox>
          <ListChatBox>1</ListChatBox>
        </ListChatArea>
      </GameListSection>
      <GameWatchSection>
        game
      </GameWatchSection>
    </Contents>
  );
}
