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
  textShadow: "0px 0px 2px #ffffff",
});

const SettingInputText = styled("input", {
  width: "calc(98% - 10px)",
  height: "2vh",
  marginLeft: "1%",
  marginTop: "0.5vh",
  padding: "5px",

  background: "none",
  border: "0.5px solid white",

  fontSize: "1.5vh",
  color: "white",
  textShadow: "0px 0px 1px #ffffff",
});

function RoomName(props: any) {
  const { chatInfo } = props;
  return (
    <div>
      <SettingInputText type="text" defaultValue={chatInfo.chatName} />
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

function RoomPassword(props: any) {
  return (
    <div>
      <SettingInputText type="password" placeholder="Don't " />
    </div>
  )
}

function RoomChangeButton(props: any) {
  return (
    <div>
      <button type="button">수정하기</button>
    </div>
  )
}

function RoomInvite(props: any) {
  return (
    <div>
      <SettingInputText type="text" />
    </div>
  )
}

export function ModalChatSetting(props: any) {
  const { chatInfo } = props;
  const loggedUser = useSelector<ReducerType, LoggedUserData>((state) => state.loggedUser);

  console.log("낌타임!!");
  console.log(chatInfo);
  console.log(loggedUser);

  return (
    <SettingZone>
      <SettingTitle>Setting</SettingTitle>
      <SettingH1>Room Name</SettingH1>
      <RoomName chatInfo={chatInfo} />
      <br />
      <SettingH1>Room Public</SettingH1>
      <RoomPublic chatInfo={chatInfo} />
      <br />
      <SettingH1>Room Password</SettingH1>
      <RoomPassword chatInfo={chatInfo} />
      <br />
      <RoomChangeButton />
      <br />
      <SettingH1>Room Invite</SettingH1>
      <RoomInvite chatInfo={chatInfo} />
      <br />

    </SettingZone>
  )
}
