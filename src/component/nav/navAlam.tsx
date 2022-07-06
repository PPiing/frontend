import React, { useState } from "react";
import { styled } from "@stitches/react";
import { useSelector, useDispatch } from "react-redux";
import * as theme from "../../theme/theme";
import * as modal from "../modal/modal";
import { ReducerType } from "../../redux/rootReducer";
import { ModalNavFriendBox } from "../modal/content/modalNavFriendBox";
import { LoggedUserData } from "../../redux/slices/loggedUser";
import { getLoggedUserProfile } from "../../network/api/axios.custom";
import { StatusDisplayDistributor } from "../../feat/profile/utils";
import { DisplayData, setModalTrigger } from "../../redux/slices/display";

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
  const dispatch = useDispatch();
  // axios feat
  if (reqTrig === 0) {
    getLoggedUserProfile();
    setReqTrig(1);
  }

  return (
    <NavAlarm>
      <NavAlarmProfileImg
        className="navAlarm"
        onClick={() => {
          modal.SetModalSize("300px", "350px", "20%", "20%");
          modal.SetModalContent(<ModalNavFriendBox user={loggedUser} />);
          // modal.SetModalContent(<ModalNavFriendBox nick={friend.nick} />);
          dispatch(setModalTrigger({ ismodal: true } as DisplayData));
        }}
      >
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
