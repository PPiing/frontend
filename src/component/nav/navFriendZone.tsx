import React, { useState } from "react";
import { useSelector } from "react-redux";
import { styled } from "@stitches/react";
import * as theme from "../../theme/theme";
import { ComponentNavFriendBox } from "./navFriendBox";
import { FriendData } from "../../redux/slices/friendList";
import { ReducerType } from "../../redux/rootReducer";
import { DisplayData } from "../../redux/slices/display";
import { getFriendList, getUserSearch } from "../../network/api/axios.custom";
import { ComponentNavSearchUserBox } from "./navSearchResultBox";

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
  const display = useSelector<ReducerType, DisplayData>((state) => state.display);

  const [friendListReqSwitch, setFriendListReqSwitch] = useState(0);

  if (friendListReqSwitch === 0) {
    getFriendList();
    setFriendListReqSwitch(1);
  }

  const renderList = () => {
    const renderResult = [];
    if (display.searchSwitch) {
      const response: Promise<any> = getUserSearch(display.searchString);

      response.then((value) => {
        if (value.data.length === 0 || value.status !== 200) {
          renderResult.push(
            <EmptyFriend key={0}>No search results</EmptyFriend>
          );
        } else {
          for (let i = 0; i < value.data.length; i += 1) {
            renderResult.push(
              <ComponentNavSearchUserBox key={i} friend={value.data[i]} />
            );
          }
        }
      });
    } else {
      if (friendList.length === 0) {
        return (
          <EmptyFriend key={0}>Friend list empty -_-</EmptyFriend>
        );
      }
      for (let i = 0; i < friendList.length; i += 1) {
        renderResult.push(
          <ComponentNavFriendBox key={i} friend={friendList[i]} />
        );
      }
    }
    return renderResult;
  };

  return (
    <NavFriendZone>
      {renderList()}
    </NavFriendZone>
  );
}
