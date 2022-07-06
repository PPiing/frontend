import React from "react";
import { styled, keyframes } from "@stitches/react";
import { Routes, Route, useParams } from "react-router-dom";
import * as template from "./contentTemplate";
import * as theme from "../theme/theme";
import { ReqUserProfile } from "../feat/profile/request";
import * as modal from "../component/modal/modal";
import { ReducerType } from "../redux/rootReducer";
import { DisplayData, setModalTrigger } from "../redux/slices/display";

const DividedLeftSection = styled(template.DividedLeftSection, {
  justifyContent: "center",
  textAlign: "center",
});

/*
  Profile Zone
*/

function Profile(props: any) {
  const { user, tierColor } = props;

  const ProfileZone = styled("div", {
    justifyContent: "center",
    alignItems: "center",
  });

  const ProfileImage = styled(theme.ProfileImage, {
    width: "13rem",
    height: "13rem",
    position: "relative",
    top: "0rem",
    left: "0rem",
    marginBottom: "-15px",
    borderRadius: "50%",
    border: `5px solid ${tierColor}`,
    boxShadow: `0 0 20px ${tierColor}`
  });

  const ProfileTier = styled("p", {
    fontSize: "31px",
    fontWeight: "bold",
    textOverflow: "ellipsis",
    marginBottom: "-70px",
    color: tierColor,
    textShadow: `0px 0px 10px ${tierColor}`
  });

  const ProfileName = styled("p", {
    fontSize: "70px",
    fontWeight: "bold",
    textOverflow: "ellipsis",
    marginBottom: "10px",
    color: "white",
    textShadow: "0px 0px 10px white"
  });

  return (
    <ProfileZone>
      <ProfileImage
        src={user.img}
      />
      <ProfileTier>
        - - - - - {user.tier} - - - - -
      </ProfileTier>
      <ProfileName>
        {user.nick}
      </ProfileName>
    </ProfileZone>
  )
}

/*
  Profile Zone End
*/

/*
  Progress Zone
*/

function Progress(props: any) {
  const { user, tierColor } = props;

  const Load = keyframes({
    "0%": { width: "0" },
    "100%": { width: `${user.tierValue}%` },
  });

  const ProgressDiv = styled("div", {
    background: "rgba(255,255,255,0.1)",
    justifyContent: "flex-start",
    borderRadius: "100px",
    alignItems: "center",
    position: "relative",
    padding: "0",
    display: "flex",
    height: "22px",
    width: "70%",
    marginLeft: "15%",
  });

  const ProgressValue = styled("div", {
    background: `${tierColor}`,
    borderRadius: "100px",
    height: "22px",
    boxShadow: `0 2px 30px -3px ${tierColor}`,
    width: "0",
    animation: `${Load} 3s normal forwards`,
    fontSize: "18px",
    fontWeight: "bold",
    color: "rgba(0,0,0,0.6)",
  });

  return (
    <ProgressDiv>
      <ProgressValue>{user.tierValue}%</ProgressValue>
    </ProgressDiv>
  )
}

/*
  Progress Zone End
*/

/*
  History Zone
*/

function History(props: any) {
  const { user } = props;

  const HistoryWrapper = styled("div", {
    width: "88%",
    height: "50%",
    background: "black",
    marginLeft: "6%",
    marginTop: "50px",
    borderRadius: "5px",
    border: "1px solid white",
    boxShadow: "0 0 5px white",
    transition: "all 0.5s",
  });

  const HistoryZone = styled("div", {
    width: "calc(100% - 24px)",
    height: "calc(100% - 24px)",
    margin: "12px",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "white",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "darkgrey",
      borderRadius: "10px",
    },
  });
  return (
    <HistoryWrapper>
      <HistoryZone />
    </HistoryWrapper>
  );
}

/*
  History Zone End
*/

export function ContainerContents() {
  const { userId } = useParams();
  //   const user = ReqUserProfile(userId);
  const user = {
    nick: "skim",
    img: "/asset/profileImage/default.png",
    tier: "pro",
    tierValue: "84",
    winCount: "72",
    loseCount: "54",
  }
  const tierColor = theme.TIER_COLOR.get(user.tier);
  return (
    <template.DividedContents>
      <DividedLeftSection>
        <Profile user={user} tierColor={tierColor} />
        <Progress user={user} tierColor={tierColor} />
        <History user={user} />
      </DividedLeftSection>
      <template.DividedRightSection>
        profile: {userId}
      </template.DividedRightSection>
    </template.DividedContents>
  );
}
