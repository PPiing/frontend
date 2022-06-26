import React from "react";
import { useSelector } from "react-redux";
import { styled } from "@stitches/react";
import * as theme from "../../theme/theme";
import { ComponentNavFriendBox } from "./navFriendBox";
import { FriendData } from "../../redux/slices/friendList";
import { ReducerType } from "../../redux/rootReducer";

const NavFriendZone = styled("div", {
  margin: "5px",
  height: `${theme.NAV_FRIEND_HEIGHT}`,
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

const EmptyFriend = styled("div", {
  alignContent: "center",
  alignItems: "center",
  paddingTop: "10px",
  marginLeft: "auto",
  marginRight: "auto",
  display: "table",
  fontSize: "1.5rem",
  color: "gray",
});

export function ComponentNavFriendZone() {
  const friendList = useSelector<ReducerType, FriendData[]>((state) => state.friendList);

  const renderFrineds = () => {
    if (friendList.length === 0) {
      return (
        <EmptyFriend>Friend list empty -_-</EmptyFriend>
      );
    }
    const friendsList = [];
    for (let i = 0; i < friendList.length; i += 1) {
      friendsList.push(
        <ComponentNavFriendBox friend={friendList[i]} />
      );
    }
    return friendsList;
  };

  return (
    <NavFriendZone>
      {renderFrineds()}
    </NavFriendZone>
  );
}
