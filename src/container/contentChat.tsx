import React, { useState } from "react";
import { styled } from "@stitches/react";
import * as template from "./contentTemplate";
import * as theme from "../theme/theme";

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

export function ContainerContents() {
  const [listType, setListType] = useState("chat");
  const [roomId, setRoomId] = useState(-1);

  const changeListType = (type: string) => {
    if (listType !== type) setListType(type);
  };

  const renderJoinedRoomList = () => {
    const renderList = [];
    for (let i = 0; i < joinedRoomList.length; i += 1) {
      if (joinedRoomList[i].roomType === listType) {
        const isClicked: boolean = (roomId === i);
        renderList.push(
          <template.ListBox key={i} onClick={() => setRoomId(i)} className={isClicked ? "clicked" : "non-clicked"}>
            {joinedRoomList[i].roomNumber}
          </template.ListBox>
        );
      }
    }
    return (renderList);
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
          <MenuButton>1</MenuButton>
          <MenuButton>2</MenuButton>
        </MenuSection>
      </template.DividedLeftSection>
      <template.DividedRightSection>a</template.DividedRightSection>
    </template.DividedContents>
  );
}
