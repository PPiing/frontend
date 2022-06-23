import React, { useState } from "react";
import { styled } from "@stitches/react";
import { useSelector } from "react-redux";
import * as theme from "../../theme/theme";
import { ReducerType } from "../../redux/rootReducer";
import { LoggedUserData } from "../../redux/slices/loggedUser";
import { getLoggedUserProfile } from "../../network/api/axios.custom";

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

export function ComponentNavAlam() {
  const loggedUser = useSelector<ReducerType, LoggedUserData>((state) => state.loggedUser);
  const [reqTrig, setReqTrig] = useState(0);

  // axios feat
  if (reqTrig === 0) {
    getLoggedUserProfile();
    setReqTrig(1);
  }

  const StatusDisplayDistributor = () => {
    switch (loggedUser.status) {
      case "USST10":
        return "online";
      case "USST20":
        return "offline";
      case "USST30":
        return "in game";
      case "USST40":
        return "sleeping";
      default:
        break;
    }
    return "statue error";
  };

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
          {StatusDisplayDistributor()}
        </ProfileTextStatus>
      </NavAlarmProfileText>
      <NavAlarmAlarm />
    </NavAlarm>
  );
}
