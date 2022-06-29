import React from "react";
import { styled } from "@stitches/react";
import * as theme from "../../../theme/theme";
import { StatusDisplayDistributor } from "../../../feat/profile/utils";

let TierColor = "#000";
let TierString = "gold";
let StatusColor = "green";
const StatusString = "in game;"

const ModalContentDiv = styled("div", {
  textAlign: "center",
//   overflow: "hidden",
});

const ProfileImage = styled(theme.ProfileImage, {
  width: "8rem",
  height: "8rem",
  position: "relative",
  top: "0rem",
  left: "0rem",
  marginBottom: "-25px",
  borderRadius: "50%",
});

const ProfileTier = styled("p", {
  color: "color",
  fontSize: "25px",
  fontWeight: "bold",
  textOverflow: "ellipsis",
  marginBottom: "-50px",
});

const ProfileName = styled("p", {
  fontSize: "50px",
  fontWeight: "bold",
  textOverflow: "ellipsis",
});

const ProfileStatus = styled("div", {
  width: "0.8rem",
  height: "0.8rem",
  borderRadius: "50%",
  marginTop: "-37px",
  marginLeft: "120px",
});

const ProfileStatusString = styled("div", {
  fontSize: "22px",
  marginLeft: "10px",
  marginTop: "-22px",
});

function setStatusColor(status:string) {
  if (status === "online") return ("green");
  if (status === "offline") return ("grey");
  if (status === "in game") return ("yellow");
  return ("red");
};

export function ModalNavFriendBox(props: any) {
  const { friend } = props;
  TierColor = "darkblue";
  StatusColor = setStatusColor(StatusDisplayDistributor(friend.status));
  TierString = "diamond";

  return (
    <ModalContentDiv>
      <ProfileImage
        src={friend.img}
        style={{
          border: `3px solid ${TierColor}`,
          boxShadow: `0 0 15px ${TierColor}` }}
      />
      {/* <ProfileStatus style={{ backgroundColor: StatusColor }} /> */}
      <ProfileTier style={{ color: TierColor, filter: `textShadow(0px 0px 10px ${TierColor})` }}>
        - - - - {TierString} - - - -
      </ProfileTier>
      <ProfileName>
        {friend.nick}
      </ProfileName>
      <div>
        <ProfileStatus style={{ backgroundColor: StatusColor }} />
        <ProfileStatusString style={{ color: StatusColor }}>
          {StatusDisplayDistributor(friend.status)}
        </ProfileStatusString>
      </div>
    </ModalContentDiv>
  );
}
