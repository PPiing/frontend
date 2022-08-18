import React, { useState } from "react";
import { styled } from "@stitches/react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import * as theme from "../../theme/theme";
import { ReducerType } from "../../redux/rootReducer";
import { ModalNavFriendBox } from "../modal/modalNavFriendBox";
import { LoggedUserData } from "../../redux/slices/loggedUser";
import { getCommonAlamList, getLoggedUserProfile } from "../../network/api/axios.custom";
import { StatusDisplayDistributor } from "../../feat/profile/utils";
import { CommonAlamData } from "../../redux/slices/commonAlam";
import { ComponentNavAlamBox } from "./navAlamBox";
import socketManager from "../../network/api/socket";

const ProfileTextName = styled("div", {
  width: "95%",
  height: "auto",
  marginTop: "10px",
  fontSize: "1.8rem",
  display: "block",
  color: "white",
  textShadow: "0px 0px 3px #ffffff",
  fontWeight: "600",
  overflowX: "scroll",
  overflowY: "hidden",
  whiteSpace: "nowrap",
  "&::-webkit-scrollbar": {
    display: "none",
  },
});

const ProfileTextStatus = styled("div", {
  width: "100%",
  height: "35%",
  fontSize: "1.3rem",
  fontWeight: "300",
  color: "#F2F2F2",
  textShadow: "0px 0px 3px #F2F2F2",
});

const ProfileImage = styled(theme.ProfileImage, {
//   width: "8vh",
//   height: "8vh",
  maxWidth: "auto",
  height: "85%",
  marginTop: "6.5px",
  overflow: "hidden",
  position: "relative",
});

// const NavAlarmProfileImg = styled("div", {
//   height: "100%",
//   width: "25%",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   float: "left",
//   objectFit: "cover",
// });

const NavAlarmProfileText = styled("div", {
  height: "100%",
  width: "50%",
  // marginTop: "3.5%",
  paddingTop: "3%",
  marginLeft: "10px",
});

const NavAlarmAlarm = styled("div", {
  height: "100%",
  width: "15%",
  alignContent: "center",
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  marginLeft: "auto",
  marginRight: "7px",
});

const NavNotificationButton = styled("img", {
  width: "90%",
  height: "auto",
  margin: "auto",
  marginLeft: "-10%",
  filter: "invert(90%)",
  background: "none",
  transition: "all 0.5s",
  "&:hover": {
    color: "#FF0086",
    filter: "invert(90%) drop-shadow(0 0 5px #FF0086)",
  },
  "&:active": {
    color: "#FF0086",
    transition: "all 0.5s",
    filter: "invert(90%) drop-shadow(0 0 5px #FF0086)",
  },
});

const NavAlarm = styled("div", {
  minHeight: "85px",
  maxHeight: "100px",
  height: `${theme.NAV_ALARM_HEIGHT}`,
  display: "flex",
});

const NavAlarmList = styled("div", {
  margin: "5px",
  height: "450px",
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

const EmptyAlarm = styled("div", {
  alignContent: "center",
  alignItems: "center",
  paddingTop: "10px",
  marginLeft: "auto",
  marginRight: "auto",
  display: "table",
  fontSize: "1.5rem",
  color: "gray",
});

const socket = socketManager.socket("/alarm");
socket.connect();

export function ComponentNavAlam() {
  const setStatusColor = (status:string) => {
    if (status === "online") return ("#00d100");
    if (status === "offline") return ("grey");
    if (status === "in game") return ("yellow");
    return ("red");
  };
  // const [statusColor, setStatusColor] = useState("#fff");
  const loggedUser = useSelector<ReducerType, LoggedUserData>((state) => state.loggedUser);
  const statusColor = setStatusColor(StatusDisplayDistributor(loggedUser.status));
  const commonAlamList = useSelector<ReducerType, CommonAlamData[]>(
    (state) => state.commonAlamList
  );
  const [reqTrig, setReqTrig] = useState(0);
  // axios feat
  if (reqTrig === 0) {
    getCommonAlamList();
    getLoggedUserProfile();
    setReqTrig(1);
  }

  socket.on("alarm:normal", () => {
    getCommonAlamList();
  });

  const renderAlarmList = () => {
    const renderResult = [];

    if (commonAlamList.length === 0) {
      renderResult.push(
        <EmptyAlarm key={0}>Alarm list empty</EmptyAlarm>
      );
    }
    for (let i = 0; i < commonAlamList.length; i += 1) {
      renderResult.push(
        <ComponentNavAlamBox key={i} alarm={commonAlamList[i]} />
      );
    }
    return renderResult;
  };

  const profileStyle = theme.modalStyle;
  profileStyle.top = "40%";
  profileStyle.width = "300px";
  profileStyle.height = "auto";
  profileStyle.left = "calc(100% - 450px)";
  const [profileOpen, setProfileOpen] = useState(false);
  const handleProfileOpen = () => setProfileOpen(true);
  const handleProfileClose = () => setProfileOpen(false);

  const alarmStyle = theme.modalStyle;
  alarmStyle.top = "40%";
  alarmStyle.width = "270px";
  profileStyle.height = "auto";
  alarmStyle.left = "calc(100% - 300px)";
  const [alarmOpen, setAlarmOpen] = useState(false);
  const handleAlarmOpen = () => setAlarmOpen(true);
  const handleAlarmClose = () => setAlarmOpen(false);

  return (
    <NavAlarm>
      <Modal
        open={profileOpen}
        onClose={handleProfileClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={profileStyle} component="div">
          <ModalNavFriendBox user={loggedUser} />
        </Box>
      </Modal>
      <Modal
        open={alarmOpen}
        onClose={handleAlarmClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={alarmStyle} component="div">
          <div>
            <NavAlarmList>
              {renderAlarmList()}
            </NavAlarmList>
          </div>
        </Box>
      </Modal>
      {/* <NavAlarmProfileImg
        className="navAlarm"
        onClick={handleProfileOpen}
      > */}
      <ProfileImage
        className="profileimg"
        src={`${window.location.origin}${loggedUser.img}`}
        onClick={handleProfileOpen}
      />
      {/* </NavAlarmProfileImg> */}
      <NavAlarmProfileText>
        <ProfileTextName className="profiletext">
          {loggedUser.nick}
        </ProfileTextName>
        <ProfileTextStatus style={{ color: statusColor, textShadow: `0 0 5px ${statusColor}` }} className="profilestatus">
          {StatusDisplayDistributor(loggedUser.status)}
        </ProfileTextStatus>
      </NavAlarmProfileText>
      <NavAlarmAlarm>
        <NavNotificationButton
          src="/asset/icon_alarm.svg"
          onClick={handleAlarmOpen}
        />
      </NavAlarmAlarm>
    </NavAlarm>
  );
}
