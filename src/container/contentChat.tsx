import React, { useEffect, useState } from "react";
import { styled } from "@stitches/react";
import { useSelector } from "react-redux";
import * as template from "./contentTemplate";
import * as theme from "../theme/theme";
import socketManager from "../feat/chat/socket";
import { CreateRoom } from "../component/chat/chatCreateRoom";
import { FindRoom } from "../component/chat/chatFindRoom";
import { ReducerType } from "../redux/rootReducer";
import { JoinedChatRoomListData } from "../redux/slices/joinedChatRoomList";
import { ComponentChatRoomListBox } from "../component/chat/chatRoomListBox";
import { DisplayData } from "../redux/slices/display";
import { ComponentChatRoom } from "../component/chat/chatRoom";

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

const ContentEmpty = styled(theme.NeonHoverRed, {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "5rem",
  borderRadius: "5%",
  width: "95%",
  height: "95%",
  flexDirection: "column",
});

const ContentEmptyDiscription = styled("div", {
  fontSize: "20px",
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

const socket = socketManager.socket("/chatrooms");

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
  * Socket process.
  */
  useEffect(() => {
    if (userId !== -1 && userId !== 0) {
      socket.connect();
    }
  }, [userId]);

  const handleChange = (e: any) => {
    setInputId(e.target.value);
  };

  const login = () => {
    setUserId(Number(inputId));
    setInputId("");
  };

  /*
  * Chat core.
  */
  const [listType, setListType] = useState("chat");
  const [contentType, setContentType] = useState("");

  const display = useSelector<ReducerType, DisplayData>((state) => state.display);

  if (display.chatRoomId !== -1 && contentType !== "room") {
    setContentType("room");
  }

  const changeListType = (type: string) => {
    if (listType !== type) setListType(type);
  };

  const joinedChatRoomList = useSelector<ReducerType, JoinedChatRoomListData[]>(
    (state) => state.joinedChatRoomList
  );

  const getIndexChatRoomList = (seq: number) => {
    for (let i = 0; i < joinedChatRoomList.length; i += 1) {
      if (String(seq) === joinedChatRoomList[i].seq) {
        return i;
      }
    }
    return 0;
  };

  const renderJoinedRoomList = () => {
    const renderList: any[] = [];
    for (let i = 0; i < joinedChatRoomList.length; i += 1) {
      if (listType === "chat") {
        if (joinedChatRoomList[i].type === "CHTP20" || joinedChatRoomList[i].type === "CHTP30" || joinedChatRoomList[i].type === "CHTP40") {
          renderList.push(
            <ComponentChatRoomListBox
              key={joinedChatRoomList[i].seq}
              chatRoomData={joinedChatRoomList[i]}
              stateUpdateFunc={setContentType}
            />
          );
        }
      } else if (joinedChatRoomList[i].type === "CHTP10") {
        renderList.push(
          <ComponentChatRoomListBox
            key={joinedChatRoomList[i].seq}
            chatRoomData={joinedChatRoomList[i]}
            stateUpdateFunc={setContentType}
          />
        );
      }
    }
    return renderList;
  };

  const changeContent = (content: string) => {
    if (contentType !== content) setContentType(content);
  };

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

  const renderContent = () => {
    switch (contentType) {
      case "create":
        return (
          <CreateRoom propFunc={changeContent} user={userId} />
        );
      case "find":
        return (
          <FindRoom propFunc={changeContent} />
        );
      case "room":
        return (
          <ComponentChatRoom
            propFunc={changeContent}
            chatRoomData={joinedChatRoomList[getIndexChatRoomList(display.chatRoomId)]}
          />
        );
      default:
        return (
          <ContentEmpty>
            CHAT
            <ContentEmptyDiscription>
              Community chat featrue.
            </ContentEmptyDiscription>
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
