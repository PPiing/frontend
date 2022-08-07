import { styled } from "@stitches/react";
import { useSelector } from "react-redux";
import * as theme from "../../theme/theme";
import { ReducerType } from "../../redux/rootReducer";
import { LoggedUserData } from "../../redux/slices/loggedUser";

const SettingZone = styled("div", {
  width: "100%",
  height: "100%",
  minWidth: "700px",
  maxHeight: "700px",
  overflowX: "hidden",
  overflowY: "scroll",
  "&::-webkit-scrollbar": {
    display: "none",
  },
});

const SettingTitle = styled("div", {
  fontSize: "3vh",
  fontWeight: "bold",
  textShadow: "0px 0px 2px #ffffff",
  textAlign: "center",
});

const SettingH1 = styled("div", {
  fontSize: "2.3vh",
  fontWeight: "300",
  textShadow: "0px 0px 1px #ffffff",
});

function RoomName(props: any) {
  return (
    <div>
      <input type="text" />
    </div>
  )
}

function RoomPassword(props: any) {
  return (
    <div>
      <input type="text" />
    </div>
  )
}

function RoomPublic(props: any) {
  return (
    <div>
      <input type="checkbox" />
    </div>
  )
}

function RoomInvite(props: any) {
  return (
    <div>
      <input type="text" />
    </div>
  )
}

export function ModalChatSetting(props: any) {
  const { chatInfo } = props;
  const loggedUser = useSelector<ReducerType, LoggedUserData>((state) => state.loggedUser);

  return (
    <SettingZone>
      <SettingTitle>Setting</SettingTitle>
      <SettingH1>Room Name</SettingH1>
      <RoomName />
      <br />
      <SettingH1>Room Password</SettingH1>
      <RoomPassword />
      <br />
      <SettingH1>Room Public</SettingH1>
      <RoomPublic />
      <br />
      <SettingH1>Room Invite</SettingH1>
      <RoomInvite />
      <br />

    </SettingZone>
  )
}
