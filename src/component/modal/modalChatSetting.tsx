import React, { useState } from "react";
import { styled } from "@stitches/react";
import { useSelector } from "react-redux";
import * as theme from "../../theme/theme";
import { ReducerType } from "../../redux/rootReducer";
import { LoggedUserData } from "../../redux/slices/loggedUser";
import { getUserSimpleSearch, inviteUser } from "../../network/api/axios.custom";

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
  marginBottom: "-1vh",
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
  const { chatInfo } = props;

  const Pre = styled("pre", {
    fontSize: "1.5vh",
    marginLeft: "0.5vw",
    marginTop: "0.5vh",
  });

  const [searchText, setSearchText] = useState(
    <Pre style={{ color: "gray" }}>
      Enter full user name and press enter.
    </Pre>
  );

  function RoomInviteEnter(e: any) {
    if (e.key === "Enter") {
      if (e.target.value.length > 0) {
        getUserSimpleSearch(e.target.value).then((res: any) => {
          for (let i = 0; i < res.data.length; i += 1) {
            if (res.data[i].nickName === e.target.value) {
              inviteUser(res.data[0].userSeq, chatInfo.chatSeq).then((res: any) => {
                console.log(res);
                if (res.name === "AxiosError") {
                  setSearchText(
                    <Pre style={{ color: "red" }}>
                      {res.response.data.message}
                    </Pre>
                  );
                }
              });
            }
          }
        });
      }
    }
  }

  return (
    <div>
      <SettingInputText type="text" onKeyPress={(e) => { RoomInviteEnter(e) }} />
      {searchText}
    </div>
  )
}

export function ModalChatSetting(props: any) {
  const { chatInfo } = props;
  const loggedUser = useSelector<ReducerType, LoggedUserData>((state) => state.loggedUser);

  return (
    <SettingZone>
      <SettingTitle>Setting</SettingTitle>
      <pre style={{ fontSize: "1.5vh", textAlign: "center", marginBottom: "2vh", }}>
        Only 'owner' can change some informations about channel.
      </pre>
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
    </SettingZone>
  )
}
