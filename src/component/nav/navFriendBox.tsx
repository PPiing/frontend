import React, { useState } from "react";
import { styled } from "@stitches/react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import * as template from "./navBoxTemplate";
import * as theme from "../../theme/theme";
import { ModalNavFriendBox } from "../modal/modalNavFriendBox";
import { StatusDisplayDistributor } from "../../feat/profile/utils";

export function ComponentNavFriendBox(props: any) {
  const setStatusColor = (status:string) => {
    if (status === "online") return ("#00d100");
    if (status === "offline") return ("grey");
    if (status === "in game") return ("yellow");
    return ("red");
  };
  const { friend } = props;

  const statusColor:string = setStatusColor(StatusDisplayDistributor(friend.status));

  const style = theme.modalStyle;
  style.top = "40%";
  style.width = "300px";
  style.height = "auto";
  style.left = "calc(100% - 450px)";
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <template.NavBox>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="div">
          <div>"heelo world"</div>
          {/* <ModalNavFriendBox user={friend} /> */}
        </Box>
      </Modal>
      <template.ProfileImage
        src={`${window.location.origin}${friend.img}`}
        className="profile"
        onClick={handleOpen}
      />
      <template.Profile>
        <template.ProfileName> {friend.nick} </template.ProfileName>
        <template.Status>
          <template.StatusCircle style={{ backgroundColor: statusColor }} />
          <template.StatusMessage>{StatusDisplayDistributor(friend.status)}</template.StatusMessage>
        </template.Status>
      </template.Profile>
    </template.NavBox>
  );
}
