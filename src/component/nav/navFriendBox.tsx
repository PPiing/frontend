import React from "react";
import { styled } from "@stitches/react";
import * as theme from "../../theme/theme";

const ProfileImage = styled("img", {
  width: "80px",
  height: "80px",
  padding: "0",
  margin: "0",
  border: "none",
  borderRadius: "50%",
});

const NavFriendBox = styled(theme.NeonHoverRed, {
  color: "grey",
  fontSize: "2rem",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  background: `${theme.BACKGROUND_YELLOW}`,
  height: `${theme.NAV_FRIEND_BOX_HEIGHT}`,
  minHeight: "90px",
  border: "3px solid grey",
  margin: "2px 4px",
  padding: "0px 10px",
  cursor: "pointer",
  filter: "none",
  "&:hover": {
    filter: "brightness(1.6)",
  },
});

const ProfileName = styled("div", {
});

const StatusCircle = styled("div", {
  position: "relative",
  right: "10px",
  top: "10px",
  width: "10px",
  height: "10px",
  borderRadius: "50%",
  backgroundColor: "white",
  margin: "0",
  padding: "0",
});

const StatusMessage = styled("div", {
  margin: "0",
  padding: "0",
  width: "80px",
  fontColor: "white",
  fontSize: "20px",
});

const Profile = styled("div", {
  display: "flex",
  flexDirection: "column",
});

const Status = styled("div", {
  display: "flex",
  flexDirection: "row",
});

export function ComponentNavFriendBox({ friend }:any) {
  const setStatusColor = (status:string) => {
    if (status === "online") return ("green");
    if (status === "offline") return ("grey");
    if (status === "in game") return ("yellow");
    return ("red");
  };

  const { name } = friend;
  const link:string = friend.profile_link;
  const statusColor:string = setStatusColor(friend.status);
  return (
    <NavFriendBox>
      <ProfileImage className="profile" src={link} alt={name} />
      <Profile>
        <ProfileName> {friend.name} </ProfileName>
        <Status>
          <StatusCircle style={{ backgroundColor: statusColor }} />
          <StatusMessage> {friend.status} </StatusMessage>
        </Status>
      </Profile>
    </NavFriendBox>
  );
}
