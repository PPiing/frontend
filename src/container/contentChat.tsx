import React, { useEffect, useState } from "react";
import { styled } from "@stitches/react";
import * as template from "./contentTemplate";
import * as theme from "../theme/theme";
import socketManager from "../feat/chat/socket";
import { CreateRoom } from "../component/chat/chatCreateRoom";
import { FindRoom } from "../component/chat/chatFindRoom";

const TypeSelectSection = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
  height: "10%",
  margin: "10px",
});

const RoomListSection = styled("div", {
  display: "block",
  flexDirection: "column",
  height: "80%",
  overflowY: "scroll",
  overflowX: "hidden",
  "&::-webkit-scrollbar": {
    display: "none",
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

const MenuSection = styled("div", {
  display: "flex",
  justifyContent: "flex-end",
  height: "10%",
  alignItems: "center",
});

const MenuButton = styled(theme.NeonHoverRed, {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "50px",
  height: "50px",
  cursor: "pointer",
  marginRight: "1rem",
  color: "grey",
});

const NeonBox = styled(theme.NeonHoverRed, {
  width: "45%",
  height: "70%",
  borderRadius: "10px",
  backgroundColor: "transparent",
  fontWeight: "bold",
  fontSize: "2.3rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "&.clicked": {
    color: `${theme.NEON_RED}`,
    borderColor: `${theme.NEON_RED}`,
  },
  "&.non-clicked": {
    color: "grey",
    borderColor: "grey",
  },
});

// Content~ 컴포넌트는 렌더링 확인을 위한 샘플입니다.

const ContentFind = styled(theme.NeonHoverRed, {
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "5rem",
  borderRadius: "5%",
  width: "95%",
  height: "95%",
});

const ContentRoom = styled(theme.NeonHoverRed, {
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "5rem",
  borderRadius: "5%",
  width: "95%",
  height: "95%",
});

const ContentEmpty = styled(theme.NeonHoverRed, {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "5rem",
  borderRadius: "5%",
  width: "95%",
  height: "95%",
});

const ContentExitButton = styled(theme.NeonHoverRed, {
  position: "absolute",
  right: "20px",
  top: "20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "2rem",
  borderRadius: "20%",
  width: "30px",
  height: "30px",
  cursor: "pointer",
});
/*
테스트용 임시 룸
roomType이 chatType으로 변경되어야 함
CHTP10 : 개인 채팅방 (DM)
CHTP20 : 단체 채팅방 (public)
CHTP30 : 단체 채팅방 (protected)
CHTP40 : 비밀 채팅방 (private)
*/
const joinedRoomList = [
  {
    roomNumber: 1,
    roomType: "dm",
  },
  {
    roomNumber: 2,
    roomType: "chat",
  },
  {
    roomNumber: 3,
    roomType: "chat",
  },
  {
    roomNumber: 4,
    roomType: "dm",
  },
  {
    roomNumber: 5,
    roomType: "dm",
  },
  {
    roomNumber: 6,
    roomType: "chat",
  },
  {
    roomNumber: 7,
    roomType: "dm",
  },
  {
    roomNumber: 8,
    roomType: "dm",
  },
  {
    roomNumber: 9,
    roomType: "chat",
  },
  {
    roomNumber: 10,
    roomType: "dm",
  },
  {
    roomNumber: 11,
    roomType: "dm",
  },
  {
    roomNumber: 12,
    roomType: "chat",
  },
  {
    roomNumber: 13,
    roomType: "dm",
  },
  {
    roomNumber: 14,
    roomType: "dm",
  },
];

const socket = socketManager.socket("/chatrooms");

/*
소켓 연결 및 연결 확인 출력
*/
socket.on("connect", () => {
  console.log(socket.connected);
  console.log(socket);
});

export function ContainerContents() {
  // login for test
  const [userId, setUserId] = useState(-1);
  const [inputId, setInputId] = useState("");

  useEffect(() => {
  }, [inputId]);

  /*
  소켓 연결
  */
  useEffect(() => {
    if (userId !== -1 && userId !== 0) {
      socket.connect();
    }
  }, [userId]);

  /*
  temp
  소켓 넘버 입력
  */
  const handleChange = (e: any) => {
    setInputId(e.target.value);
  };

  /*
  temp
  소켓 연결 시 입력한 넘버 리셋
  */
  const login = () => {
    setUserId(Number(inputId));
    setInputId("");
  };
  //

  const [listType, setListType] = useState("chat");
  const [roomId, setRoomId] = useState(-1);
  const [contentType, setContentType] = useState("");

  /*
  CHAT, DM 룸 렌더를 위한 타입 변경
  */
  const changeListType = (type: string) => {
    if (listType !== type) setListType(type);
  };

  /*
  CHAT, DM 타입에 맞는 룸 렌더
  */
  const renderJoinedRoomList = () => {
    const renderList = [];
    for (let i = 0; i < joinedRoomList.length; i += 1) {
      if (joinedRoomList[i].roomType === listType) {
        const isClicked: boolean = (roomId === i);
        renderList.push(
          <template.ListBox key={i} onClick={() => { setRoomId(i); setContentType("room"); }} className={isClicked ? "clicked" : "non-clicked"}>
            {joinedRoomList[i].roomNumber}
          </template.ListBox>
        );
      }
    }
    return (renderList);
  };

  /*
  우측 화면에 보여줄 콘텐츠 타입 변경
  */
  const changeContent = (content: string) => {
    if (contentType !== content) setContentType(content);
  };

  /*
  CHAT, DM 타입 선택
  */
  const renderTypeSelectButton = () => {
    const renderList = [];
    const buttonText = ["chat", "dm"];
    for (let i = 0; i < buttonText.length; i += 1) {
      const isClicked: boolean = listType === buttonText[i];
      renderList.push(
        <NeonBox key={i} onClick={() => changeListType(buttonText[i])} className={isClicked ? "clicked" : "non-clicked"}>
          {buttonText[i].toUpperCase()}
        </NeonBox>
      );
    }
    return renderList;
  };

  /*
  콘텐츠 선택에 따라 우측에 적절한 화면 렌더
  */
  const renderContent = () => {
    switch (contentType) {
      case "create":
        return (
          <CreateRoom propFunc={changeContent} user={userId} />
        );
      case "find":
        console.log("FIND");
        return (
          <FindRoom propFunc={changeContent} />
        );
      case "room":
        return (
          <ContentRoom>
            <ContentExitButton onClick={() => changeContent("empty")}>X</ContentExitButton>
            {joinedRoomList[roomId].roomType.toUpperCase()} ROOM {roomId + 1}
          </ContentRoom>
        );
      default:
        return (
          <ContentEmpty>
            EMPTY
          </ContentEmpty>
        );
    }
  };

  return (
    <template.DividedContents>
      <template.DividedLeftSection>
        <TypeSelectSection>
          {renderTypeSelectButton()}
        </TypeSelectSection>
        <RoomListSection>
          {renderJoinedRoomList()}
        </RoomListSection>
        <MenuSection>
          <input style={{ width: "100px", height: "50px", marginRight: "15px", color: "white", backgroundColor: "black", fontSize: "30px" }} value={inputId} onChange={(event) => handleChange(event)} />
          <MenuButton onClick={() => login()}>login</MenuButton>
          <MenuButton onClick={() => changeContent("create")}>create</MenuButton>
          <MenuButton onClick={() => changeContent("find")}>find</MenuButton>
        </MenuSection>
      </template.DividedLeftSection>
      <template.DividedRightSection>
        {renderContent()}
      </template.DividedRightSection>
    </template.DividedContents>
  );
}
