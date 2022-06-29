import React from "react";
import { styled } from "@stitches/react";
import * as theme from "../../theme/theme";
import { StatusDisplayDistributor } from "../../feat/profile/utils";

const ProfileImage = styled("img", {
  width: "70px",
  height: "70px",
  padding: "0",
  margin: "0",
  border: "none",
  borderRadius: "50%",
});

const NavSearchResultBox = styled(theme.NeonHoverRed, {
  color: "grey",
  fontSize: "2rem",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  background: `${theme.BACKGROUND_YELLOW}`,
  height: "28px",
  minHeight: "90px",
  border: "0",
  margin: "2px 4px",
  padding: "0px 10px",
  cursor: "pointer",
  filter: "none",
  "&:hover": {
    filter: "brightness(1.6)",
    border: "0",
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
  marginLeft: "12px",
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
  marginLeft: "10px",
});

const Status = styled("div", {
  display: "flex",
  flexDirection: "row",
});

export function ComponentNavSearchUserBox(props: any) {
  const setStatusColor = (status:string) => {
    if (status === "online") return ("green");
    if (status === "offline") return ("grey");
    if (status === "in game") return ("yellow");
    return ("red");
  };

  const { searchUser } = props;

  console.log("props data: ", searchUser);

  const statusColor:string = setStatusColor(StatusDisplayDistributor(searchUser.userStatus));
  return (
    <NavSearchResultBox>
      <ProfileImage src={searchUser.userImage} className="profile" />
      <Profile>
        <ProfileName> {searchUser.userName} </ProfileName>
        <Status>
          <StatusCircle style={{ backgroundColor: statusColor }} />
          <StatusMessage> {StatusDisplayDistributor(searchUser.userStatus)} </StatusMessage>
        </Status>
      </Profile>
    </NavSearchResultBox>
  );
}
