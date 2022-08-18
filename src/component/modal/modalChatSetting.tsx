/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@stitches/react";
import { useSelector } from "react-redux";
import { ReducerType } from "../../redux/rootReducer";
import { LoggedUserData } from "../../redux/slices/loggedUser";
import { getUserSimpleSearch, inviteUser, getChatInfo } from "../../network/api/axios.custom";
import "../chat/chatCreateRoom.css";

enum ChatType {
  CHTP10 = "CHTP10", // 개인 채팅방 (DM)
  CHTP20 = "CHTP20", // 단체 채팅방 (public)
  CHTP30 = "CHTP30", // 단체 채팅방 (protected)
  CHTP40 = "CHTP40", // 비밀 채팅방 (private)
}

enum UserType {
  CPAU30 = "CPAU30", // Owner
  CPAU20 = "CPAU20", // Administrator
  CPAU10 = "CPAU10", // Member
}

interface participant {
  partcSeq: number;
  userSeq: number;
  chatSeq: number;
  partcAuth: UserType;
  enteredAt: string;
  leavedAt?: string;
}

interface ChatInfoType {
  chatSeq: number;
  chatName: string;
  chatType: ChatType;
  isPassword?: boolean;
  participants: participant[];
}

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

const Pre = styled("pre", {
  fontSize: "1.5vh",
  marginLeft: "0.5vw",
  marginTop: "0.5vh",
});

function RoomSetting(props: any) {
  const { chatInfo } = props;
  const [roomName, setRoomName] = useState<string>("");
  const [roomType, setRoomType] = useState<ChatType>(ChatType.CHTP20);
  const [roomPassword, setRoomPassword] = useState<string>("");
  const [result, setResult] = useState<any>(<Pre />);
  const [isAuthored, setIsAuthored] = useState<boolean>(false);
  const loggedUser = useSelector<ReducerType, LoggedUserData>((state) => state.loggedUser);

  const setType = (type: ChatType) => {
    if (type !== ChatType.CHTP30) setRoomPassword("");
    if (roomType !== type) setRoomType(type);
  };

  useEffect(() => {
    setRoomName(chatInfo?.chatName);
    setType(chatInfo?.chatType);
    for (let i = 0; i < chatInfo?.participants?.length; i += 1) {
      if (chatInfo?.participants[i].userSeq === loggedUser.seq &&
          chatInfo?.participants[i].partcAuth === UserType.CPAU30) {
        setIsAuthored(true);
      }
    }
  }, [chatInfo]);

  const nameChange = (event: any) => {
    setRoomName(event.target.value);
  };

  const passwordChange = (event: any) => {
    setRoomPassword(event.target.value);
  };

  const onClickUpdate = () => {
    if (isAuthored === true) {
      const parameters: any = {
        chatSeq: chatInfo?.chatSeq,
        chatName: roomName,
        chatType: roomType,
      }
      if (roomType === ChatType.CHTP40) {
        parameters.password = roomPassword;
      }

      axios.patch(`/api/chatrooms/room/${chatInfo?.chatSeq}`, parameters).then((response) => {
        location.reload();
      }).catch((error) => {
        <Pre style={{ color: "red", }}>Error occured. (${error})</Pre>
      });
      console.log("axios here");
    } else {
      setResult(
        <Pre style={{ color: "red", }}>You are not permitted to do this task.</Pre>
      );
    }
  }

  return (
    <>
      <SettingH1>Room Name</SettingH1>
      <SettingInputText type="text" value={roomName || ""} onChange={(event) => nameChange(event)} />
      <br /><br />
      <SettingH1>Room Public</SettingH1>
      <div className="radioWrapper">
        <input
          type="Radio"
          name="select"
          id="option-1"
          checked={roomType === ChatType.CHTP20}
          onChange={() => setType(ChatType.CHTP20)}
        />
        <input
          type="Radio"
          name="select"
          id="option-2"
          checked={roomType === ChatType.CHTP40}
          onChange={() => setType(ChatType.CHTP40)}
        />
        <input
          type="Radio"
          name="select"
          id="option-3"
          checked={roomType === ChatType.CHTP30}
          onChange={() => setType(ChatType.CHTP30)}
        />
        <label htmlFor="option-1" className="option option-1">
          <span>public</span>
        </label>
        <label htmlFor="option-2" className="option option-2">
          <span>private</span>
        </label>
        <label htmlFor="option-3" className="option option-3">
          <span>protected</span>
        </label>
      </div>
      <br /><br />
      <SettingH1>Room Password</SettingH1>
      <SettingInputText
        type="text"
        value={roomPassword || ""}
        disabled={roomType !== ChatType.CHTP30}
        onChange={(event) => passwordChange(event)}
        placeholder="to maintain current password, leave blank."
      />
      <br /><br />
      <button type="button" onClick={onClickUpdate}>수정하기</button>
      <br />
      {result}
      <br />
    </>
  );
};

function RoomInvite(props: any) {
  const { chatInfo } = props;
  const [isAuthored, setIsAuthored] = useState<boolean>(false);
  const loggedUser = useSelector<ReducerType, LoggedUserData>((state) => state.loggedUser);

  useEffect(() => {
    for (let i = 0; i < chatInfo?.participants?.length; i += 1) {
      if (chatInfo?.participants[i].userSeq === loggedUser.seq &&
          chatInfo?.participants[i].partcAuth === UserType.CPAU30) {
        setIsAuthored(true);
      }
    }
  }, [chatInfo]);

  const [searchText, setSearchText] = useState(
    <Pre style={{ color: "gray" }}>
      Enter full user name and press enter.
    </Pre>
  );

  function RoomInviteEnter(e: any) {
    if (e.key === "Enter") {
      if (e.target.value.length > 0 && isAuthored === true) {
        getUserSimpleSearch(e.target.value).then((res: any) => {
          for (let i = 0; i < res?.data?.length; i += 1) {
            if (res?.data[i]?.nickName === e.target.value) {
              inviteUser(res.data[0].userSeq, chatInfo.chatSeq).then((res: any) => {
                console.log(res);
                if (res?.name === "AxiosError") {
                  setSearchText(
                    <Pre style={{ color: "red" }}>
                      {res?.response?.data?.message}
                    </Pre>
                  );
                }
              });
            }
          }
        });
      } else {
        setSearchText(
          <Pre style={{ color: "red" }}>
            You are not permitted to do this task.
          </Pre>
        );
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
  const { chatSeq } = props;
  const [chatInfo, setChatInfo] = useState<ChatInfoType>({} as ChatInfoType);

  useEffect(() => {
    getChatInfo(chatSeq).then((res: any) => {
      setChatInfo(res?.data);
    });
  }, []);

  return (
    <SettingZone>
      <SettingTitle>Setting</SettingTitle>
      <pre style={{ fontSize: "1.5vh", textAlign: "center", marginBottom: "2vh", }}>
        Only 'owner' can change some informations about channel.
      </pre>
      <RoomSetting chatInfo={chatInfo} />
      <SettingH1>Room Invite</SettingH1>
      <RoomInvite chatInfo={chatInfo} />
    </SettingZone>
  )
}
