import React from "react";
import { styled } from "@stitches/react";
import { useSelector } from "react-redux";
import * as theme from "../../theme/theme";
import { ComponentNavInviteBox } from "./navInviteBox";
import { ReducerType } from "../../redux/rootReducer";
import { ChoosableAlamData } from "../../redux/slices/choosableAlamList";

const NavInviteZone = styled("div", {
  height: "calc(35% - 25px)",
  "@media (max-height: 800px)": {
    height: "20%",
  },
  "@media (max-height: 550px)": {
    height: "10%",
  },
  transition: "all 0.5s",
  margin: "5px",
  marginTop: "10px",
  marginBottom: "10px",
  overflowY: "scroll",
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

// socket.intive event로 입력

// useState = socket event를 배열화

// -> 배열화된 event를 navInviteBox 에 전달하고 렌더링

export function ComponentNavInviteZone() {
  const choosableAlamList =
    useSelector<ReducerType, ChoosableAlamData[]>((state) => state.choosableAlamList);

  const renderChoosableAlams = () => {
    const alamList = [];
    for (let i = choosableAlamList.length - 1; i >= 0; i -= 1) {
      alamList.push(
        <ComponentNavInviteBox alam={choosableAlamList[i]} />
      );
    }
    return alamList;
  };

  return (
    <NavInviteZone>
      {/* <ComponentNavInviteBox name="Hello" />
      <ComponentNavInviteBox name="spark" />
      <ComponentNavInviteBox name="Hybae" /> */}
      {renderChoosableAlams()}
    </NavInviteZone>
  );
}
