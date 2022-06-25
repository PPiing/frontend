import React, { useState } from "react";
import { styled } from "@stitches/react";
import { useSelector } from "react-redux";
import * as theme from "../../theme/theme";
import { ReducerType } from "../../redux/rootReducer";
import { LoggedUserData } from "../../redux/slices/loggedUser";
import { getLoggedUserProfile } from "../../network/api/axios.custom";
import { StatusDisplayDistributor } from "../../feat/profile/utils";

const ProfileTextName = styled("div", {
  width: "100%",
  height: "auto",
  fontSize: "2.5rem",
  color: "Orange",
});

const ProfileTextStatus = styled("div", {
  width: "100%",
  height: "35%",
  fontSize: "1rem",
  color: "Orange",
});

const NavAlarmProfileImg = styled("div", {
  height: "100%",
  width: "25%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  float: "left",
  objectFit: "cover",
});

const NavAlarmProfileText = styled("div", {
  height: "100%",
  width: "50%",
  // marginTop: "3.5%",
  paddingTop: "3%",
  marginLeft: "10px",
});

const NavAlarmAlarm = styled("div", {
  height: "100%",
  width: "25%",
  // border: BORDER_BASIC
});

const NavAlarm = styled("div", {
  minHeight: "85px",
  maxHeight: "100px",
  height: `${theme.NAV_ALARM_HEIGHT}`,
  display: "flex",
});

export function ComponentNavAlam() {
  const loggedUser = useSelector<ReducerType, LoggedUserData>((state) => state.loggedUser);
  const [reqTrig, setReqTrig] = useState(0);

  // axios feat
  if (reqTrig === 0) {
    getLoggedUserProfile();
    setReqTrig(1);
  }

  return (
    <NavAlarm>
      <NavAlarmProfileImg className="navAlarm">
        <theme.ProfileImage className="profileimg" src={loggedUser.img} />
      </NavAlarmProfileImg>
      <NavAlarmProfileText>
        <ProfileTextName className="profiletext">
          {loggedUser.nick}
        </ProfileTextName>
        <ProfileTextStatus className="profilestatus">
          {StatusDisplayDistributor(loggedUser.status)}
        </ProfileTextStatus>
      </NavAlarmProfileText>
      <NavAlarmAlarm />
    </NavAlarm>
  );
}
