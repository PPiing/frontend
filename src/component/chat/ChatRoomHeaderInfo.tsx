import React, { useState } from "react";
import { styled } from "@stitches/react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import * as theme from "../../theme/theme";
import { DisplayData, setChatRoomId } from "../../redux/slices/display";
import { ModalChatExit } from "../modal/modalCheck";
import { ModalChatSetting } from "../modal/modalChatSetting";
import { ModalChatUserList } from "../modal/modalChatUserList";

const HeaderButtonZone = styled("div", {
  display: "flex",
  flexDirection: "row",
  //   justifyContent: "space-around",
  // width: "35%",
});

const HeaderButton = styled("div", {
  width: "2.5rem",
  height: "2.5rem",
  cursor: "pointer",
  borderRadius: "100%",
  marginRight: "1rem",
  position: "relative",
  //   margin: "0.5rem",
  //   marginTop: "-2rem",
});

const HeaderButtonIcon = styled("img", {
  position: "absolute",
  width: "1.8rem",
  height: "1.8rem",
  opacity: "0.7",
  transform: "translate(-50%, -50%)",
  top: "50%",
  left: "50%",
});

function ChatRoomHeaderInfo(props: any) {
  const { dispatch, chatRoomData, propFunc, chatInfo } = props;
  theme.modalStyle.top = "50%";
  theme.modalStyle.left = "50%";
  theme.modalStyle.width = "auto";
  const [exitOpen, setExitOpen] = useState(false);
  const handleExitOpen = () => setExitOpen(true);
  const handleExitClose = () => setExitOpen(false);

  const [settingOpen, setSettingOpen] = useState(false);
  const handleSettingOpen = () => setSettingOpen(true);
  const handleSettingClose = () => setSettingOpen(false);

  const [listOpen, setListOpen] = useState(false);
  const handleListOpen = () => setListOpen(true);
  const handleListClose = () => setListOpen(false);

  const rst = [];
  rst.push(
    <HeaderButton
      onClick={() => {
        propFunc("empty");
        dispatch(setChatRoomId({ chatRoomId: -1 } as DisplayData));
      }}
      style={{ backgroundColor: "#fd4546", marginLeft: "1.5rem" }}
      key="1"
    >
      <HeaderButtonIcon alt="x" src="/asset/icon_x.svg" />
    </HeaderButton>
  );
  if (chatRoomData.type !== "CHTP10") {
    rst.push(
      <HeaderButton
        onClick={handleExitOpen}
        style={{ backgroundColor: "#fdaf24" }}
        key="2"
      >
        <HeaderButtonIcon alt="x" src="/asset/icon_exit.svg" />
      </HeaderButton>
    );
    rst.push(
      <HeaderButton
        onClick={handleSettingOpen}
        style={{ backgroundColor: "#28c231" }}
        key="3"
      >
        <HeaderButtonIcon alt="x" src="/asset/icon_setting.svg" />
      </HeaderButton>
    );
    rst.push(
      <HeaderButton
        onClick={handleListOpen}
        style={{ backgroundColor: "#F2F2F2" }}
        key="4"
      >
        <HeaderButtonIcon alt="x" src="/asset/icon_users.svg" />
      </HeaderButton>
    );
  }
  return (
    <HeaderButtonZone>
      <Modal open={exitOpen} onClose={handleExitClose}>
        <Box sx={theme.modalStyle} component="div">
          <ModalChatExit room={chatRoomData.seq} />
        </Box>
      </Modal>
      <Modal open={settingOpen} onClose={handleSettingClose}>
        <Box sx={theme.modalStyle} component="div">
          <ModalChatSetting chatSeq={chatRoomData.seq} />
        </Box>
      </Modal>
      <Modal open={listOpen} onClose={handleListClose}>
        <Box sx={theme.modalStyle} component="div">
          <ModalChatUserList chatInfo={chatInfo} />
        </Box>
      </Modal>
      {rst}
    </HeaderButtonZone>
  );
}

export default ChatRoomHeaderInfo;
