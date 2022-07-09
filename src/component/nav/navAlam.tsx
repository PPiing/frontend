import React, { useState } from "react";
import { styled } from "@stitches/react";
import { useSelector, useDispatch } from "react-redux";
import * as theme from "../../theme/theme";
import * as modal from "../modal/modal";
import { ReducerType } from "../../redux/rootReducer";
import { ModalNavFriendBox } from "../modal/content/modalNavFriendBox";
import { LoggedUserData } from "../../redux/slices/loggedUser";
import { getCommonAlamList, getLoggedUserProfile } from "../../network/api/axios.custom";
import { StatusDisplayDistributor } from "../../feat/profile/utils";
import { DisplayData, setModalTrigger } from "../../redux/slices/display";
import { CommonAlamData } from "../../redux/slices/commonAlam";
import { ComponentNavAlamBox } from "./navAlamBox";
import socketManager from "../../network/api/socket";

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
  width: "15%",
  alignContent: "center",
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  marginLeft: "auto",
  marginRight: "7px",
});

const NavNotificationButton = styled("img", {
  width: "100%",
  height: "auto",
  margin: "auto",
  transition: "all 0.5s",
  "&:hover": {
    color: "#FF0086",
    filter: "drop-shadow(0 0 2px #FF0086)",
  },
  "&:active": {
    color: "#FF0086",
    transition: "all 0s",
    filter: "drop-shadow(0 0 5px #FF0086)",
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

const socket = socketManager.socket("/");
socket.connect();

export function ComponentNavAlam() {
  const loggedUser = useSelector<ReducerType, LoggedUserData>((state) => state.loggedUser);
  const commonAlamList = useSelector<ReducerType, CommonAlamData[]>(
    (state) => state.commonAlamList
  );
  const [reqTrig, setReqTrig] = useState(0);
  const dispatch = useDispatch();
  // axios feat
  if (reqTrig === 0) {
    getCommonAlamList();
    getLoggedUserProfile();
    setReqTrig(1);
  }

  socket.on("ivA", () => {
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
      <NavAlarmAlarm>
        <NavNotificationButton
          src="/asset/notification_icon.png"
          onClick={() => {
            modal.SetModalSize("300px", "460px", "35%", "5%");
            modal.SetModalContent(
              <div>
                <NavAlarmList>
                  {renderAlarmList()}
                </NavAlarmList>
              </div>
            );
            dispatch(setModalTrigger({ ismodal: true } as DisplayData));
          }}
        />
      </NavAlarmAlarm>
    </NavAlarm>
  );
}
