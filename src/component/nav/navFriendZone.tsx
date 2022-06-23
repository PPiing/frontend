import React from "react";
import { styled } from "@stitches/react";
import * as theme from "../../theme/theme";
import { ComponentNavFriendBox } from "./navFriendBox";

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

type User = {
  name: string;
  profile_link: string;
  status: string;
}

const friends: User[] = [
  {
    name: "skim1",
    profile_link: "/asset/profileImage/default.png",
    status: "online",
  },
  {
    name: "skim2",
    profile_link: "/asset/profileImage/default.png",
    status: "offline",
  },
  {
    name: "skim3",
    profile_link: "/asset/profileImage/default.png",
    status: "in game",
  },
  {
    name: "skim4",
    profile_link: "/asset/profileImage/default.png",
    status: "??",
  },
  {
    name: "skim5",
    profile_link: "/asset/profileImage/default.png",
    status: "online",
  }
];

const renderFrineds = () => {
  const friendsList: any = [];
  for (let i = 0; i < friends.length; i += 1) {
    friendsList.push(
      <ComponentNavFriendBox key={i} friend={friends[i]} />
    );
  }
  return friendsList;
};

export function ComponentNavFriendZone() {
  return (
    <NavFriendZone>
      {renderFrineds()}
    </NavFriendZone>
  );
}
