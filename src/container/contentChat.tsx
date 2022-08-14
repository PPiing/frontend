import React, { useEffect, useState } from "react";
import { styled } from "@stitches/react";
import { useSelector, useDispatch } from "react-redux";
import * as template from "./contentTemplate";
import * as theme from "../theme/theme";
import socketManager from "../network/api/socket";
import { CreateRoom } from "../component/chat/chatCreateRoom";
import { FindRoom } from "../component/chat/chatFindRoom";
import { ReducerType } from "../redux/rootReducer";
import store from "../redux/store";
import {
  addJoinedChatRoom,
  JoinedChatRoomListData,
  removeJoinedChatRoomList,
} from "../redux/slices/joinedChatRoomList";
import { ComponentChatRoomListBox } from "../component/chat/chatRoomListBox";
import { DisplayData, setChatRoomId } from "../redux/slices/display";
import { ComponentChatRoom } from "../component/chat/ChatRoom";

const TypeSelectSection = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
  height: "10%",
  margin: "10px",
  cursor: "pointer",
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

const MenuButton = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "50px",
  height: "50px",
  cursor: "pointer",
  marginRight: "1rem",
  color: "grey",
});

const NeonBox = styled("div", {
  width: "45%",
  height: "70%",
  borderRadius: "10px",
  backgroundColor: "transparent",
  fontWeight: "bold",
  fontSize: "2.3rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  transition: "all 1s",
  "&.clicked": {
    color: `${theme.NEON_RED}`,
    borderColor: `${theme.NEON_RED}`,
    backgroundColor: "#2E2E2E",
  },
  "&.non-clicked": {
    color: "grey",
    borderColor: "grey",
  },
  "&:hover": {
    // border: `3px solid ${theme.NEON_RED}`,
    color: `${theme.NEON_RED}`,
    backgroundColor: "#1C1C1C",
    filter: "drop-shadow(0 0 0px #000) brightness(1.6)",
  },
});

// Content~ 컴포넌트는 렌더링 확인을 위한 샘플입니다.

const ContentFind = styled("div", {
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "5rem",
  borderRadius: "5%",
  width: "95%",
  height: "95%",
});

const ContentEmpty = styled("div", {
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

const ContentExitButton = styled("div", {
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

socket.on("error", () => {
  window.location.href = "/";
});

export function ContainerContents() {
  const [listType, setListType] = useState("chat");
  const [contentType, setContentType] = useState("");
  const display = useSelector<ReducerType, DisplayData>(
    (state) => state.display
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
      socket.on("chat:init", (data) => {
        store.dispatch(removeJoinedChatRoomList({} as JoinedChatRoomListData));
        data.map((item: JoinedChatRoomListData) =>
          dispatch(addJoinedChatRoom(item))
        );
        console.log(data);
      });
    }
    return () => {
      socket.off("chat:init");
    };
  }, []);

  const joinedChatRoomList = useSelector<ReducerType, JoinedChatRoomListData[]>(
    (state) => state.joinedChatRoomList
  );

  if (display.chatRoomId !== -1 && contentType !== "room") {
    setContentType("room");
  }

  const changeListType = (type: string) => {
    if (listType !== type) setListType(type);
  };

  const getIndexChatRoomList = (seq: number) => {
    for (let i = 0; i < joinedChatRoomList.length; i += 1) {
      if (seq === joinedChatRoomList[i].seq) {
        return i;
      }
    }
    return 0;
  };

  const renderJoinedRoomList = () => {
    if (listType === "chat") {
      return joinedChatRoomList
        .filter(
          (room) =>
            room.type === "CHTP20" ||
            room.type === "CHTP30" ||
            room.type === "CHTP40"
        )
        .map((item, i) => (
          <ComponentChatRoomListBox
            key={i}
            chatRoomData={item}
            stateUpdateFunc={setContentType}
          />
        ));
    }
    return joinedChatRoomList
      .filter((room) => room.type === "CHTP10")
      .map((item, i) => (
        <ComponentChatRoomListBox
          key={i}
          chatRoomData={item}
          stateUpdateFunc={setContentType}
        />
      ));
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
        <NeonBox
          key={i}
          onClick={() => changeListType(buttonText[i])}
          className={isClicked ? "clicked" : "non-clicked"}
        >
          {buttonText[i].toUpperCase()}
        </NeonBox>
      );
    }
    return renderList;
  };

  const renderContent = () => {
    switch (contentType) {
      case "create":
        return <CreateRoom propFunc={changeContent} />;
      case "find":
        return <FindRoom propFunc={changeContent} />;
      case "room":
        return (
          <ComponentChatRoom
            propFunc={changeContent}
            chatRoomData={
              joinedChatRoomList[getIndexChatRoomList(display.chatRoomId)]
            }
            socket={socket}
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
        <TypeSelectSection>{renderTypeSelectButton()}</TypeSelectSection>
        <hr style={{ border: "1px solid gray", width: "80%" }} />
        <RoomListSection>{renderJoinedRoomList()}</RoomListSection>
        <MenuSection>
          <MenuButton
            onClick={() => {
              changeContent("create");
              dispatch(setChatRoomId({ chatRoomId: -1 } as DisplayData));
            }}
          >
            create
          </MenuButton>
          <MenuButton
            onClick={() => {
              changeContent("find");
              dispatch(setChatRoomId({ chatRoomId: -1 } as DisplayData));
            }}
          >
            find
          </MenuButton>
        </MenuSection>
      </template.DividedLeftSection>
      <template.DividedRightSection>
        {renderContent()}
      </template.DividedRightSection>
    </template.DividedContents>
  );
}
