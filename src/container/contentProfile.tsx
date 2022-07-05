import React from "react";
import { styled } from "@stitches/react";
import { Routes, Route, useParams } from "react-router-dom";
import * as template from "./contentTemplate";
import * as theme from "../theme/theme";
import { ReqUserProfile } from "../feat/profile/request";
import * as modal from "../component/modal/modal";
import { ReducerType } from "../redux/rootReducer";
import { DisplayData, setModalTrigger } from "../redux/slices/display";

let TierColor = "#000";
let TierString = "gold";
let TierPercent = "0";

const DividedLeftSection = styled(template.DividedLeftSection, {
  justifyContent: "center",
  textAlign: "center",
});

/*
  Profile Zone
*/

const ProfileZone = styled("div", {
});

const ProfileImage = styled(theme.ProfileImage, {
  width: "13rem",
  height: "13rem",
  position: "relative",
  top: "0rem",
  left: "0rem",
  marginBottom: "-15px",
  borderRadius: "50%",
});

const ProfileTier = styled("p", {
  color: "color",
  fontSize: "31px",
  fontWeight: "bold",
  textOverflow: "ellipsis",
  marginBottom: "-70px",
});

const ProfileName = styled("p", {
  fontSize: "70px",
  fontWeight: "bold",
  textOverflow: "ellipsis",
  marginBottom: "10px",
  color: "white",
});

const ProfileProgress = styled("progress", {
  appearance: "none",
  width: "70%",
  height: "18px",
  "&::-webkit-progress-bar": {
    background: "rgba(1, 1, 1, 0.5)",
    borderRadius: "15px",
  },
  "&::-webkit-progress-value": {
    borderRadius: "15px",
    background: "#1D976C",
    boxShadow: "0 0 0.6em lighten(#1D976C, 2), 0 0 0.8em lighten($#1D976C, 4)",
  },
});

function Profile(props: any) {
  const { user } = props;

  return (
    <ProfileZone>
      <ProfileImage
        src={user.img}
        style={{
          border: `5px solid ${TierColor}`,
          boxShadow: `0 0 20px ${TierColor}` }}
      />
      <ProfileTier
        style={{
          color: TierColor,
          textShadow: `0px 0px 10px ${TierColor}`
        }}
      >
        - - - - - {TierString} - - - - -
      </ProfileTier>
      <ProfileName
        style={{
          textShadow: "0px 0px 10px white"
        }}
      >
        {user.nick}
      </ProfileName>
      <ProfileProgress
        value={TierPercent}
        max="100"
        style={{
          filter: `textShadow(0px 0px 10px ${TierColor})`,
          // background: TierColor,
          // borderShadow: `0px 0px 10px ${TierColor}`
        }}
      />
    </ProfileZone>
  )
}

/*
  Profile Zone End
*/

export function ContainerContents() {
  const { userId } = useParams();
  //   const user = ReqUserProfile(userId);
  const user = {
    nick: "skim",
    img: "/asset/profileImage/default.png",
  }
  TierColor = theme.TIER_NOOB_COLOR;
  TierString = theme.TIER_NOOB_TEXT;
  TierPercent = "40";
  return (
    <template.DividedContents>
      <DividedLeftSection>
        <Profile className="profileimg" user={user} />
      </DividedLeftSection>
      <template.DividedRightSection>
        profile: {userId}
      </template.DividedRightSection>
    </template.DividedContents>
  );
}
