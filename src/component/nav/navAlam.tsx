import React from "react";
import { styled } from "@stitches/react";
import * as theme from "../../theme/theme";
import { BORDER_BASIC } from "../../theme/theme";

interface myProfile {
  name: string;
  status: string;
}

const ProfileTextName = styled("div", {
  width: "100%",
  height: "65%",
  fontSize: "3rem",
  color: "Orange",
  // border: BORDER_BASIC

});

const ProfileTextStatus = styled("div", {
  width: "100%",
  height: "35%",
  fontSize: "1rem",
  color: "Orange",
  // border: BORDER_BASIC
});

const ProfileImage = styled("img", {
  width: "80%",
  height: "60%",
  padding: "0%",
  margin: "0%",
  border: "none",
  borderRadius: "50%",
});

const NavAlarmProfileImg = styled("div", {
  height: "100%",
  width: "25%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  // border: BORDER_BASIC
});

const NavAlarmProfileText = styled("div", {
  height: "100%",
  width: "50%",
  // border: BORDER_BASIC
});

const NavAlarmAlarm = styled("div", {
  height: "100%",
  width: "25%",
  // border: BORDER_BASIC
});

const NavAlarm = styled("div", {
  height: `${theme.NAV_ALARM_HEIGHT}`,
  // border: BORDER_BASIC,
  display: "flex"
});

export function ComponentNavAlam({ name, status }:myProfile) {
  // const { myName }:myProfile = name;
  // const { myStatus } = status;
  const link:string = "/asset/profileImage/skim.png";

  // console.log(myName);

  return (
    <NavAlarm>
      <NavAlarmProfileImg className="navAlarm">
        <ProfileImage className="profileimg" src={link} />
      </NavAlarmProfileImg>
      <NavAlarmProfileText>
        <ProfileTextName className="profiletext">
          {name}
        </ProfileTextName>
        <ProfileTextStatus className="profilestatus">
          {status}
        </ProfileTextStatus>
      </NavAlarmProfileText>
      <NavAlarmAlarm />
    </NavAlarm>
  );
}
